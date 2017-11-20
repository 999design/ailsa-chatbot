var builder = require('botbuilder');

module.exports = [
    (session) => {
        session.send('PRT doesn\'t apply...');

        builder.Prompts.choice(session,
            'Find out more?',
            ['Yes', 'No'],
            { listStyle: builder.ListStyle.button });
    },
    (session, result) => {
        session.send('Whatevs...');
    }
];
