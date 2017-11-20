var builder = require('botbuilder');

module.exports = [
    (session) => {
        session.send('This is the end...');

        builder.Prompts.choice(session,
            'Find everything?',
            ['Yes', 'No'],
            { listStyle: builder.ListStyle.button });
    },
    (session, result) => {
        session.send('Whatevs...');
    }
];
