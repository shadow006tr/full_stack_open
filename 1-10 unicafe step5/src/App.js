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
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <br />
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
        <StatisticLine text="positive" value={good / (good + neutral + bad)} />
      </>
    )
  }

  const StatisticLine = ({text, value}) => <p><b>{text}:</b> {value}</p>

  const Button = ({clickHandler, text}) => <button onClick={clickHandler}>{text}</button>

  const handleClick = (getter, setter) => () => setter(getter + 1)

  return (
    <>
      <h1>give feedback</h1>
      <Button clickHandler={handleClick(good, setGood)} text="good" />
      <Button clickHandler={handleClick(neutral, setNeutral)} text="neutral" />
      <Button clickHandler={handleClick(bad, setBad)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
