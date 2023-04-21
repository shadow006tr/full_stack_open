const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => (
  <>
    <p>
      {props.parts[0].name} {props.parts[0].exercises}
    </p>
    <p>
      {props.parts[1].name} {props.parts[1].exercises}
    </p>
    <p>
      {props.parts[2].name} {props.parts[2].exercises}
    </p>
  </>
)

const Total = (props) => {
  let summery = 0
  props.parts.forEach(part => summery += part.exercises)

  return (
    <>
      <p>
        <b>Total exercises:</b>
        {' ' + summery}
      </p>
    </>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name} />
      <br />
      <Content parts={course.parts} />
      <br />
      <Total parts={course.parts} />
    </>
  )
}

export default App
