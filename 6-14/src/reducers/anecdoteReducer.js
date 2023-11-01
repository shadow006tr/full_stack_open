import { createSlice } from '@reduxjs/toolkit'
const asObject = (anecdote) => {
  return {...anecdote, votes: 0}
}
const sortDescending = (arr) => arr.sort((a, b) => b.votes - a.votes)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push(asObject(content))
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return sortDescending(state.map(note =>
        note.id !== id ? note : changedAnecdote
      ))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})
export const {
  createAnecdote,
  addVote,
  setAnecdotes
} = anecdotesSlice.actions
export default anecdotesSlice.reducer
