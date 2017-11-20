var builder = require('botbuilder');
var restify = require('restify');

require('dotenv').load();

// Create connector
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const bot = new builder.UniversalBot(connector);

const entry = 'entry';

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});


//Handle hello/bye
bot.on('conversationUpdate', function (message) {

    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id != message.address.bot.id) {
                //someone other than us got added

                bot.beginDialog(message.address, '/');
                
            }
        });
    }
    // can say bye on message.membersRemoved

});

bot.dialog('/', [
    (session) => {
        session.beginDialog(entry);
    }
]);

//mains
var mains = require('./dialogs/main');
for (var dialog in mains) 
    bot.dialog(dialog, mains[dialog]);

//Sub-Dialogs
bot.dialog('end', require('./dialogs/end'));
bot.dialog('na', require('./dialogs/na'));

//Let's go
server.post('/api/messages', connector.listen());
