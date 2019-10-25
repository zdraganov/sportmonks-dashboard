import superagent from 'superagent'

export function fetchSoccerMatches () {
  return superagent.get('/livescore').then(({ body }) => body)
}
