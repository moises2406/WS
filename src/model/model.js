const {model,Schema} = require('mongoose');



const MS = new Schema({

    body:{type:String},
    from:{type:String},
    to:{type:String},
    timestamp:{type:Number}
});

const DB = model('teremessges',MS)

module.exports = DB;