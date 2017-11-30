module.exports = function(sharedParameter) {

	var histories = {};

	//pass conversation ID
	function init(uid) {
		if (!histories.hasOwnProperty(uid)) {
			console.log('Begin history', uid);

			histories[uid] = [];
		}
	}

    return {

        //see dialog
		add: function(uid, dlg) {
			console.log('add', uid, dlg);

			init(uid);
			//keep track
			histories[uid].push(dlg);
		},

		previous: function(uid, n) {
			console.log('previous', histories[uid]);

			if (histories[uid])
				return histories[uid][histories[uid].length - (n || 1) - 1];
		},

		end: function(uid) {
			//try to help memory management
			delete histories[uid];
		}

    };

}();


