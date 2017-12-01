var builder = require('botbuilder');
var analytics = require('../analytics');
var history = require('../history');

const startPoint = "entry";
const restart = "Yes, start over";
const goback = "Yes, go back";
const no = "No thanks";
const opts = [restart, /*goback,*/ no];

const endDelay = 3000;//msecs

module.exports = [
    (session) => {
        //note reached here
        analytics.view(session.message.address.conversation.id, 'end');

        session.sendTyping();

        builder.Prompts.choice(session,
            'Thanks for chatting, did you find what you were looking for?',
            ['Yes', 'No'],
            { listStyle: builder.ListStyle.button });
    },
    (session, result) => {
        analytics.feedback(session.message.address.conversation.id, result.response.entity);

        session.sendTyping();

        if (result.response.entity == 'Yes') {

            session.send("Great, thanks for chatting. And remember if you need housing advice in the future you can visit our [Get Advice pages](https://scotland.shelter.org.uk/get_advice?utm_source=chatbot), or for more specific landlord advice visit [Renting Scotland](https://rentingscotland.org/).");

            session.sendTyping();

            setTimeout(function () {
            	builder.Prompts.choice(session,
    	            'Would you like to find out anything else?',
    	            opts,
    	            { listStyle: builder.ListStyle.button }
                );
            }, endDelay);
       	}
        else {

            session.send("I'm sorry that I couldn't help you, I'm just a robot after all. Why not [contact us](https://scotland.shelter.org.uk/about_us/contact_us?utm_source=chatbot)?");

            session.sendTyping();

            setTimeout(function () {
                builder.Prompts.choice(session,
    	            'Would you like to try again?',
    	            opts,
    	            { listStyle: builder.ListStyle.button }
                );
            }, endDelay);
        }
    },
    (session, result) => {
        var convId = session.message.address.conversation.id;
        //analytics.answer(convId, result.response.entity);

        session.sendTyping();

    	if (result.response.entity == restart)
    		//this is tenant/landlord choice, should remember!
            session.beginDialog(startPoint);
        else if (result.response.entity == goback) {
            //analytics tracks history
            var dlg = history.previous(convId);
            console.log('Going back to', dlg);
            session.beginDialog(dlg || startPoint);
        }
        else {
            session.send('OK, bye for now!');
            analytics.end(convId);
            history.end(convId);
        }
    }

];
