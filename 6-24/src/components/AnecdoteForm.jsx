import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests.js'
import {useNotificationDispatch} from '../NotificationContext.jsx'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({ type: "SET", payload: `anecdote '${newAnecdote.content}' has been created` })
      setTimeout(() => dispatch({ type: "SET", payload: ''}), 5000)
    },
    onError: () => {
      dispatch({ type: "SET", payload: `too short anecdote, must have length 5 or more`})
      setTimeout(() => dispatch({ type: "SET", payload: ''}), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
