var builder = require('botbuilder');

module.exports = [
    (session) => {
        session.send('PRT doesn\'t apply...');

        builder.Prompts.choice(session,
            'Find out more?',
            ['Yes', 'No'],
            { listStyle: builder.ListStyle.button });
    },
    (session, result, next) => {
        if (result.response.entity == 'Yes')
            session.send('Send more info...');
        else
            session.send('OK');

        next();
    },
    (session) => {
        session.beginDialog('end');
    }
];
