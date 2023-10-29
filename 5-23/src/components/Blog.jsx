import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeHandler, deleteHandler }) => {
  const [details, setDetails] = useState(false)
  const [like, setLike] = useState(0)

  const handleLike = () => {
    setLike(like + 1)
    const likes = ( blog.likes + like )
    try {
      likeHandler({ ...blog, likes: likes })
    } catch (error) {
      console.log('adding a like went wrong!')
    }
  }

  const handleDelete = () => {
    try {
      deleteHandler(blog.id)
    } catch (error) {
      console.log('You can\'t delete someone else\'s blogs!')
    }
  }

  return (
    <div className='blog'>
      <>
        <p>
          {blog.title} {blog.author}
        </p>
        <div>
          <button id='viewButton' onClick={() => setDetails(!details)}>{details ? 'hide' : 'view'}</button>
          <button id='likeButton' onClick={handleLike}>like</button>
        </div>
      </>
      {details &&
        <>
          <p>{blog.url}</p>
          <p>likes {blog.likes + like}</p>
          <p>{blog.user.name}</p>
        </>
      }
      <button id='deleteButton' onClick={handleDelete}>delete</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired
}

export default Blog
