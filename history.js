
var visitors = {};

//pass conversation ID
function init(uid) {
	if (!visitors[uid]) {
		console.log('Begin history', uid);

		visitors[uid] = [];
	}
}

//see dialog
exports.add = function(uid, dlg) {
	console.log('add', uid, dlg);

	init(uid);
	//keep track
	visitors[uid].push(dlg);
};

exports.previous = function(uid, n) {
	if (visitors[uid])
		return visitors[uid][visitors[uid].length - n - 1];
}

exports.end = function(uid) {
	//try to help memory management
	delete visitors[uid];
}