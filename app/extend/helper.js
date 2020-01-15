const sd = require('silly-datetime');
module.exports = {
    formatTime(params) {
        return sd.format(new Date(params),'YYYY-MM-DD HH:mm')
    }
}