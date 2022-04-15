import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const total = good + neutral + bad
  if (total === 0) return (
    <div>
      <h1>statistiikka</h1>
      <p>Ei yhtään palautetta annettu</p>
    </div>
  )
  return (
    <div>
      <h1>statistiikka</h1>
      <table>
        <tbody>
          <Statistic name={'hyvä'} value={good}></Statistic>
          <Statistic name={'neutraali'} value={neutral}></Statistic>
          <Statistic name={'huono'} value={bad}></Statistic>
          <Statistic name={'yhteensä'} value={total}></Statistic>
          <Statistic name={'keskiarvo'} value={(good * 1 + bad * -1) / (total)}></Statistic>
          <Statistic name={'positiivisia'} value={100 * good / (total) + ' %'}></Statistic>
        </tbody>
      </table>
    </div >

  )
}

const Statistic = ({ name, value }) => {
  return (
    <tr><td>{name}</td><td>{value}</td></tr>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>anna palautetta</h1>

      <Button handleClick={() => setGood(good + 1)} text='hyvä' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutraali' />
      <Button handleClick={() => setBad(bad + 1)} text='huono' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)