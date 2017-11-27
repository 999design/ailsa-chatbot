var ua = require('universal-analytics');
require('dotenv').load();

var visitor;

exports.init = function() {
	if (!visitor)
		visitor = ua(process.env.ANALYTCIS_ID, {https: true});
}

//start 

//see dialog

//respond

//end

