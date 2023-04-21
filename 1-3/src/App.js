const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <>
    <p>
      {props.part} {props.exercises}
    </p>
  </>
)

const Total = (props) => (
  <>
    <p>
      <b>Total exercises:</b>
      {' ' + props.summ}
    </p>
  </>
)
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <>
      <Header course={course} />
      <br />
      <Part part={part1.name} exercises={part1.exercises} />
      <Part part={part2.name} exercises={part2.exercises} />
      <Part part={part3.name} exercises={part3.exercises} />
      <br />
      <Total summ={part1.exercises + part2.exercises + part3.exercises} />
    </>
  )
}

export default App
