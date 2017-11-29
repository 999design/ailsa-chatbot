var builder = require('botbuilder');
var analytics = require('../analytics');

const startPoint = "entry";
const restart = "Yes, start over";
const goback = "Yes, go back";
const no = "No thanks";

module.exports = [
    (session) => {
        //note reached here
        analytics.view(session.message.address.conversation.id, 'end');

        builder.Prompts.choice(session,
            'Thanks for chatting, did you find what you were looking for?',
            ['Yes', 'No'],
            { listStyle: builder.ListStyle.button });
    },
    (session, result) => {
        analytics.feedback(session.message.address.conversation.id, result.response.entity);

        if (result.response.entity == 'Yes') {

            session.send("Great, have a good day! And remember if you need housing advice in the future you can visit our Get Advice pages. https://scotland.shelter.org.uk/get_advice?utm_source=chatbot");

        	builder.Prompts.choice(session,
	            'Would you like to find out anything else?',
	            [restart, goback, no],
	            { listStyle: builder.ListStyle.button }
            );
       	}
        else {

            session.send("I'm sorry that I couldn't help you, I'm just a robot after all. Here's how you can contact us https://scotland.shelter.org.uk/about_us/contact_us?utm_source=chatbot");

            builder.Prompts.choice(session,
	            'Would you like to try again?',
	            [restart, goback, no],
	            { listStyle: builder.ListStyle.button }
            );
        }
    },
    (session, result) => {
        analytics.answer(session.message.address.conversation.id, result.response.entity);

    	if (result.response.entity == restart)
    		//this is tenant/landlord choice, should remember!
            session.beginDialog(startPoint);
        else if (result.response.entity == goback)
            //analytics tracks history
            session.beginDialog(analytics.previous(session.message.address.conversation.id, 2));
        else 
            session.send('OK, bye for now!');
    }

];
