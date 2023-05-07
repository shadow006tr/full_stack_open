import React from 'react';

const Person = ({person, filter, toggleDeletion}) => {
  return (
    <p key={person.name}>
      {person.name} {person.number}
      <button onClick={toggleDeletion}>Delete</button>
    </p>
  )
}

export default Person;
