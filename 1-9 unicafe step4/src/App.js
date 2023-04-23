import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Statistics = ({good, neutral, bad}) => {

    if (good + neutral + bad === 0) return <><h1>statistics</h1><br/>No feedback given</>

    return (
      <>
        <h1>statistics</h1>
        <br />
        <p><b>good:</b> {good}</p>
        <p><b>neutral:</b> {neutral}</p>
        <p><b>bad:</b> {bad}</p>
        <br />
        <p><b>all:</b> {good + neutral + bad}</p>
        <p><b>average:</b> {(good - bad) / (good + neutral + bad)}</p>
        <p><b>positive:</b> {good / (good + neutral + bad)} %</p>
      </>
    )
  }


  const handleClick = (getter, setter) => () => setter(getter + 1)

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={handleClick(good, setGood)}>good</button>
      <button onClick={handleClick(neutral, setNeutral)}>neutral</button>
      <button onClick={handleClick(bad, setBad)}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
