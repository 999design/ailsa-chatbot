var ua = require('universal-analytics');
require('dotenv').load();

var visitors = {};

//pass conversation ID
function init(uid) {
	if (!visitors[uid]) {
		console.log('Init analytics', uid);

		visitors[uid] = {ua: ua(process.env.ANALYTCIS_ID, uid), history: []};

		//don;t seem to get events without pageview? so log a dummy one
		visitors[uid].ua.pageview("/chatbot").send();
	}
}

exports.start = function(uid) {
	console.log('Start', uid);

	init(uid);
	visitors[uid].ua.event('bot-start').send();
};

exports.end = function(uid) {
	console.log('End', uid);

	//help with cleanup!
	delete visitors[uid];
};

//see dialog
exports.view = function(uid, dlg) {
	console.log('View', uid, dlg);

	init(uid);
	//keep last
	visitors[uid].prev = visitors[uid].cur;
	visitors[uid].history.push(dlg);
	visitors[uid].ua.event('bot-view', dlg).send();
};

//answer
exports.answer = function(uid, ans) {
	console.log('Answer', uid, ans);

	init(uid);
	visitors[uid].ua.event('bot-answer', ans).send();
};

//feedback at end
exports.feedback = function(uid, ans) {
	console.log('Feedback', uid, ans);

	init(uid);
	visitors[uid].ua.event('bot-feedback', ans).send();
};

exports.previous = function(uid, n) {
	if (visitors[uid])
		return visitors[uid].history[visitors[uid].history.length - n - 1];
}

//should delete entries for visitors when done!