
var histories = {};

//pass conversation ID
function init(uid) {
	if (!histories[uid]) {
		console.log('Begin history', uid);

		histories[uid] = [];
	}
}

//see dialog
exports.add = function(uid, dlg) {
	console.log('add', uid, dlg);

	init(uid);
	//keep track
	histories[uid].push(dlg);
};

exports.previous = function(uid, n) {
	console.log('previous', histories[uid]);

	if (histories[uid])
		return histories[uid][histories[uid].length - (n || 1) - 1];
}

exports.end = function(uid) {
	//try to help memory management
	delete histories[uid];
}