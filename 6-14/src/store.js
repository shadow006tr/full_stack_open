import {configureStore} from '@reduxjs/toolkit'
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer.js'
import filterReducer from './reducers/filterReducer.js'
import notificationReducer from './reducers/notificationReducer.js'
import anecdoteService from './services/anecdotes'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

anecdoteService.getAll().then(anecdotes =>
  store.dispatch(setAnecdotes(anecdotes))
)

export default store
