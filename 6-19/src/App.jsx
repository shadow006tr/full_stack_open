import AnecdoteList from './components/AnecdoteList.jsx'
import AnecdoteForm from './components/AnecdoteForm.jsx'
import AnecdotesFilter from './components/Filter.jsx'
import Notification from './components/Notification.jsx'

const App = () => (
  <div>
    <h2>Anecdotes</h2>
    <Notification />
    <AnecdotesFilter />
    <AnecdoteList />
    <AnecdoteForm />
  </div>
)
export default App
