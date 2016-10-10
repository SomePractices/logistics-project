var mongoose = require('mongoose');
var StaffSchema = require('../schemas/staff');

var Staff = mongoose.model('Staff',StaffSchema);

module.exports = Staff;