const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/pollquery`,{ useNewUrlParser: true }, (err) => {
    if(err) throw err;
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected')
});

module.exports = mongoose;