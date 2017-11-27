var ua = require('universal-analytics');
require('dotenv').load();

var visitors = {};

//random ID will be generated, everything will look like this user (until restart)
function init(uid) {
	if (!visitors[uid]) {
		console.log('Init analytics', uid);

		visitors[uid] = ua(process.env.ANALYTCIS_ID, uid);

		//don;t seem to get events without pageview? so log a dummy one
		visitors[uid].pageview("/chatbot").send();
	}
}

exports.start = function(uid) {
	console.log('Start', uid);

	init(uid);
	visitors[uid].event('bot-start').send();
};

//see dialog
exports.view = function(uid, dlg) {
	console.log('View', uid, dlg);

	init(uid);
	visitors[uid].event('bot-view', dlg).send();
};

//answer
exports.answer = function(uid, ans) {
	console.log('Answer', uid, ans);

	init(uid);
	visitors[uid].event('bot-answer', ans).send();
};

//feedback at end
exports.feedback = function(uid, ans) {
	console.log('Feedback', uid, ans);

	init(uid);
	visitors[uid].event('bot-feedback', ans).send();
};
