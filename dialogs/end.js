var builder = require('botbuilder');

module.exports = [
    (session) => {
        
        builder.Prompts.choice(session,
            'Did you find out everything you wanted to today?',
            ['Yes', 'No'],
            { listStyle: builder.ListStyle.button });
    },
    (session, result) => {
        if (result.response.entity == 'Yes') {
            session.send('Great!');

        	builder.Prompts.choice(session,
	            'Would you like to find out anything else?',
	            ['Yes', 'No'],
	            { listStyle: builder.ListStyle.button }
            );
       	}
        else {
            session.send('Help somehow...');

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
            session.send('OK, bye for now.');
    }

];
