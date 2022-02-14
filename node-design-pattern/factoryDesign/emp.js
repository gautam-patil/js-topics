const Engineer = require('./engineer')
const Manager = require('./manager')
const Director = require('./director')

const emp = function(fname, lname, type){
    if(type === 'engineer'){
        Engineer(fname,lname)
    } else if(type === 'manager') {
        Manager(fname, lname)
    } else if(type === 'director'){
        Director(fname, lname)
    }
}

module.exports = emp