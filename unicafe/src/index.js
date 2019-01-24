import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  const { good, neutral, bad } = props
  return (
    <div>
      <h1>statistiikka</h1>
      <p>hyvä {good}</p>
      <p>neutraali {neutral}</p>
      <p>huono {bad}</p>
      <p>yhteensä {good + neutral + bad}</p>
      <p>keskiarvo {(good * 1 + bad * -1) / (good + neutral + bad)}</p>
      <p>positiivisia {100 * good / (good + neutral + bad)} %</p>
    </div>

  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodByOne = () => setGood(good + 1)
  const increaseNeutralByOne = () => setNeutral(neutral + 1)
  const increaseBadByOne = () => setBad(bad + 1)

  return (
    <div>
      <h1>anna palautetta</h1>
      <button onClick={increaseGoodByOne}>hyvä</button>
      <button onClick={increaseNeutralByOne}>neutraali</button>
      <button onClick={increaseBadByOne}>huono</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)