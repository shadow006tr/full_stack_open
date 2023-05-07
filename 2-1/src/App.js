import React from 'react'

const Header = ({ name }) => (
  <h1>{name}</h1>
)

const Content = ({ parts }) => (
  <>
    {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
  </>
)

// const Total = ({ parts }) => {
//   let summery = 0
//   parts.forEach(part => summery += part.exercises)
//
//   return (
//     <>
//       <p>
//         <b>Total exercises:</b>
//         {' ' + summery}
//       </p>
//     </>
//   )
// }

const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
  </>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
