const { table } = require('table')
const pick = require('lodash.pick')
const zipObject = require('lodash.zipobject')

const HEADER = [
  'Time', 'Home', 'Home Score', 'Away Score', 'Away',
  '1', 'X', '2', 'Over 2.5', 'Under 2.5', 'Both to score'
]

// const CORRECT_SCORE = [
//   '0-0', '1-0', '0-1', '1-1', '2-0', '2-1', '2-2', '1-2', '0-2',
//   '3-0', '3-1', '3-2', '3-3', '2-3', '1-3', '0-3',
//   '4-0', '4-1', '4-2', '4-3', '4-4', '3-4', '2-4', '1-4', '0-4'
// ]

function percentageToOdds (percentage) {
  return (100.0 / percentage).toFixed(4)
}

function predictions (probability) {
  return [
    percentageToOdds(probability.home), percentageToOdds(probability.draw), percentageToOdds(probability.away),
    percentageToOdds(probability.over_2_5), percentageToOdds(probability.under_2_5), percentageToOdds(probability.btts)
  ]
}

// function correctScores (correctScore) {
//   return Object.values(pick(correctScore, CORRECT_SCORE)).map(percentageToOdds)
// }

function serialize (matches) {
  const matchesValues = matches.map(match => {
    const {
      time,
      localTeam: { data: { name: localTeam } },
      scores: { localteam_score: localTeamScore, visitorteam_score: visitorTeamScore },
      visitorTeam: { data: { name: visitorTeam } },
    } = match

    const timePrefix = ['FT', 'HT', 'NS'].includes(time.status) ? time.status : `${time.minute}'`
    return [
      timePrefix, localTeam, localTeamScore, visitorTeamScore, visitorTeam,
      ...predictions(match.probability.data.predictions)
    ]
  })

  return matchesValues.map(matchValue => zipObject(HEADER, matchValue))
}


module.exports = serialize
