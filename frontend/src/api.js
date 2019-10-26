import superagent from 'superagent'

export function fetchSoccerMatches () {
  return superagent.get('/api/livescore').then(({ body }) => body)
}
