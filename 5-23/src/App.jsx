import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification.jsx'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import LoginForm from './components/LoginForm.jsx'
import Toggleable from './components/Toggleable.jsx'
import BlogForm from './components/BlogForm.jsx'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const getBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }

  const showMessage = (type, message) => {
    setMessageType(type)
    setMessage(message)
    setTimeout(() => {
      setMessageType(null)
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showMessage('success', 'Logged in successfully')
    } catch (exception) {
      showMessage('error', 'Wrong credentials')
    }
  }

  const handleLike = async (blogObject) => {
    try {
      await blogService.addLike(blogObject)
    } catch (exception) {
      showMessage('error', 'adding a like went wrong!')
    }
  }

  const handleDelete = async (id) => {
    try {
      await blogService.deleteUser(id)
      setBlogs(blogs.filter(found => found.id !== id))
    } catch (exception) {
      showMessage('error', 'You can\'t delete someone else\'s blogs!')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      setUser(null)
      window.localStorage.removeItem('loggedBlogAppUser')
      showMessage('success', 'Logged out successfully')
    } catch (exception) {
      showMessage('error', 'Can\'t log out')
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.create(blogObject)
      if (blog) {
        showMessage('success', `a new blog ${blogObject.title} by ${blogObject.author} added`)
        setBlogs(blogs.concat(blog))
      }
    } catch (exception) {
      showMessage('error', 'The blog has not been added. Please check that you typed something in the author field')
    }
  }



  const loginForm = () => (
    <Toggleable buttonLabel='log  in'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Toggleable>
  )

  const blogFormRef = useRef()
  const blogForm = () => (
    <>
      <h2>blogs</h2>
      <p>{user.name} is logged in <button id='logoutButton' onClick={handleLogout}>logout</button></p>
      {blogs.map((blog, index) =>
        <Blog
          className='blog'
          key={index}
          blog={blog}
          likeHandler={handleLike}
          deleteHandler={handleDelete} />
      )}
      <Toggleable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} user={user.name} />
      </Toggleable>
    </>
  )

  return (
    <div>
      <Notification message={message} messageType={messageType} />
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App
