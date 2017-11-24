var builder = require('botbuilder');

module.exports = [
    (session) => {
        
        builder.Prompts.choice(session,
            'Thanks for chatting, did you find what you were looking for?',
            ['Yes', 'No'],
            { listStyle: builder.ListStyle.button });
    },
    (session, result) => {
        if (result.response.entity == 'Yes') {
            session.send("Great, have a good day! And remember if you need housing advice in the future you can visit out Get Advice pages. https://scotland.shelter.org.uk/get_advice");

        	builder.Prompts.choice(session,
	            'Would you like to find out anything else?',
	            ['Yes', 'No'],
	            { listStyle: builder.ListStyle.button }
            );
       	}
        else {
            session.send("I'm sorry that I couldn't help you, I'm just a robot after all. Here's how you can contact us https://scotland.shelter.org.uk/about_us/contact_us");

            builder.Prompts.choice(session,
	            'Would you like to try again?',
	            ['Yes', 'No'],
	            { listStyle: builder.ListStyle.button }
            );
        }
    },
    (session, result) => {
    	if (result.response.entity == 'Yes')
    		//this is tenant/landlord choice, should remember!
            session.beginDialog('A');
        else 
            session.send('OK, bye for now!');
    }

];
