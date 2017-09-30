
var novel = require('../model/novel');

const NovelCtr = {
    getColumns: function(params, callback) {
    	var param = {
    		recId: params.recId
    	};
        
        novel.get(param, (error, novels) => {

        	var results = {
        		description: "",
	            resultCode: 999,
	            body:null
        	};

        	if(error) {
        		results.description = error;
        	} else {
        		results.resultCode = 0;
        		results.body = {
        			list: novels
        		}        		
        	}
        	return callback(results);            
        });
    },
}
module.exports = NovelCtr;