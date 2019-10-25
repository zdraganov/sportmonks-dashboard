require('dotenv').config()

const {SportmonksApi} = require('sportmonks')
const sportmonks = new SportmonksApi(process.env.SPORTMONKS_API_TOKEN)

const BASE_INCLUDES = { localTeam: true, visitorTeam: true, probability: true }

function getMatchDetails (ids) {
  return sportmonks.get(`v2.0/fixtures/multi/{ids}`, { ...BASE_INCLUDES, ids })
}

function todayMatches () {
  return sportmonks.get('v2.0/livescores', BASE_INCLUDES)
}

function runningMatches () {
  return sportmonks.get('v2.0/livescores/now', BASE_INCLUDES)
}

function serializeMatch (match) {
  return {
    localTeam: match.localTeam.data.name,
    visitorTeam: match.visitorTeam.data.name,
    localTeamScore: match.scores.localteam_score,
    visitorTeamScore: match.scores.visitorteam_score,
    time: match.time,
    probability: match.probability
  }
}

module.exports = {
  getMatchDetails,
  todayMatches,
  runningMatches,
  serializeMatch
}

