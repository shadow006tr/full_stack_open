import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addVote, initializeAnecdotes} from '../reducers/anecdoteReducer.js'
import {setNotification} from '../reducers/notificationReducer.js'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, []);

  const anecdotes = useSelector(({anecdotes, filter}) => anecdotes.filter((anecdote) => anecdote.content.includes(filter)))

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id, {...anecdote, votes: anecdote.votes + 1}))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList;
