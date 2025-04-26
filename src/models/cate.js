const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CatSchema = new Schema
({
    'ca0': 'String',
    'ca1': 'String',
    'ca2': 'String'
});

module.exports = mongoose.model('cate', CatSchema);