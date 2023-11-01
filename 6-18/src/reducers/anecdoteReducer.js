import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
const sortDescending = (arr) => arr.sort((a, b) => b.votes - a.votes)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      const changedAnecdote = action.payload
      return sortDescending(state.map(anecdote =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      ))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return sortDescending(action.payload)
    }
  },
})
export const {
  setAnecdote,
  appendAnecdote,
  setAnecdotes
} = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (id, anecdote) => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.addVote(id, anecdote)
    dispatch(setAnecdote(changedAnecdote))
  }
}
export default anecdotesSlice.reducer
