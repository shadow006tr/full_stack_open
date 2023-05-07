import React from 'react';

const Header = ({ name }) => (
  <h1>{name}</h1>
)

const Content = ({ parts }) => (
  <>
    {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
  </>
)

const Total = ({ parts }) => {
  const init = 0
  const summery = parts.reduce((s, p) => s + p.exercises, init)

  return (
    <>
      <p>
        <b>Total exercises:</b>
        {' ' + summery}
      </p>
    </>
  )
}

const Course = ({ courses }) => {
  return (
    <>
      {courses.map(course => (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
          <br />
        </div>
      ))}
    </>
  )
}

export default Course;
