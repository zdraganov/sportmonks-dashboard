import React from 'react'
import { fetchSoccerMatches } from './api'

const HEADER = [
  'Time', 'Home', 'Home Score', 'Away Score', 'Away',
  '1', 'X', '2', 'Over 2.5', 'Under 2.5', 'Both to score'
]

const styles = {
  table: { border: '1px solid black' },
  thead: { border: '1px solid black' },
  tbody: { border: '1px solid black' },
  tr: { border: '1px solid black' },
  th: { border: '1px solid black' },
  td: { border: '1px solid black' }
}

export default class SoccerTable extends React.Component {
  state = {
    matches: []
  }

  async componentDidMount () {
    const matches = await fetchSoccerMatches()
    this.setState({ matches })
  }

  render () {

    return (
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr style={styles.tr}>
            {
              HEADER.map((h, i) => <th style={styles.th} key={i}>{h}</th>)
            }
          </tr>
        </thead>
        <tbody style={styles.tbody}>
          {
            this.state.matches.map((match, i) => (
              <tr key={i} style={styles.tr}>
                {HEADER.map((h, i) => <td style={styles.td} key={i}>{match[h]}</td>)}
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}
