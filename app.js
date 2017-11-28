var builder = require('botbuilder');
var restify = require('restify');
var analytics = require('./analytics');

require('dotenv').load();

// Create connector
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const bot = new builder.UniversalBot(connector);

//where to start?
const entry = 'entry';

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

//keep some state to try and sort out the convo startup
var conversations = {};

//This works in emulator, not facebook/directline for webchat
//Handle hello/bye
bot.on('conversationUpdate', function (message) {
    console.dir(message);

    var convId = message.address.conversation.id;

    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id != message.address.bot.id) {
                //someone other than us got added
                console.log('User joined?');

                if (!conversations[convId])
                    conversations[convId] = {};

                conversations[convId].userAddress = message.address;

                if (conversations[convId].botAddress)
                    //all in, go!
                    bot.beginDialog(conversations[convId].userAddress, '/');
            }
            else if (identity.id == message.address.bot.id) {
                //we joined?
                console.log('We joined?');
                
                if (!conversations[convId])
                    conversations[convId] = {};

                conversations[convId].botAddress = message.address;

                if (conversations[convId].userAddress)
                    //all in, go!
                    bot.beginDialog(conversations[convId].userAddress, '/');
            }
        });
    }
    // can say bye on message.membersRemoved

});

bot.dialog('/', 
    (session) => {

        analytics.start(session.message.address.conversation.id);

        session.beginDialog(entry);
    }
);

//mains
var mains = require('./dialogs/main');
for (var dialog in mains) 
    bot.dialog(dialog, mains[dialog]);

//Sub-Dialogs
bot.dialog('end', require('./dialogs/end'));

//Let's go
server.post('/api/messages', connector.listen());
