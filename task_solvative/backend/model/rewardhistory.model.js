const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let rewardSchema = new Schema({
	
    fromName : {
        type : String,
    },
    toName : {
        type : String,
    },
    fromId :{
        type : String
    },
    toId : {
        type : String
    },
    reward :{
        type : Number,
    },
    transferstatus : {
        type : Boolean,
        default : false
    },

	date: {
		type: Date,
		default: Date.now
	}
})


module.exports = mongoose.model('reward', rewardSchema, 'reward');