module.exports = function(sharedParameter) {

	var ua = require('universal-analytics');
	require('dotenv').load();

	var visitors = {};

	//pass conversation ID
	function init(uid) {
		if (!visitors.hasOwnProperty(uid)) {
			console.log('Init analytics', uid);

			visitors[uid] = ua(process.env.ANALYTCIS_ID, uid);

			//don;t seem to get events without pageview? so log a dummy one
			visitors[uid].pageview("/chatbot").send();
		}
	}

	return {
	
		start: function(uid, src) {
			console.log('Start', uid);

			init(uid);
			visitors[uid].event('bot-start', src).send();
		},

		end: function(uid) {
			console.log('End', uid);

			//help with cleanup!
			delete visitors[uid];
		},

		//see dialog
		view: function(uid, dlg) {
			console.log('View', uid, dlg);

			init(uid);
			visitors[uid].event('bot-view', dlg).send();
		},

		//answer
		answer: function(uid, ans) {
			console.log('Answer', uid, ans);

			init(uid);
			visitors[uid].event('bot-answer', ans).send();
		},

		//feedback at end
		feedback: function(uid, ans) {
			console.log('Feedback', uid, ans);

			init(uid);
			visitors[uid].event('bot-feedback', ans).send();
		}
	};

}();