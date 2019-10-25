const {todayMatches} = require('./service')
const print = require('./print')

todayMatches().then(response => print(response.data))
