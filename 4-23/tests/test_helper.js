const lodash = require('lodash');
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'test1',
    author: 'Danny',
    url: 'https://test1.com',
    likes: 0,
  },
  {
    title: 'test2',
    author: 'Danny',
    url: 'https://test2.com',
    likes: 2,
  },
]
const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducedBlogs = blogs.map(blog => ({
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }))
  const likes = blogs.map(blog => blog.likes)

  return reducedBlogs[likes.indexOf(Math.max(...likes))]
}

const mostBlogs = (blogs) => {
  const authors = lodash.countBy(blogs.map(blog => blog.author))
  const blogsPerAuthor = lodash.values(authors)
  const authorNames = lodash.keys(authors)
  const maxBlogs = blogsPerAuthor.indexOf(Math.max(...blogsPerAuthor))

  return {
    author: authorNames[maxBlogs],
    blogs: blogsPerAuthor[maxBlogs]
  }
}

const mostLikes = (blogs) => {
  const authorLikes = lodash.reduce(blogs, (op, {author, likes}) => {
    op[author] = op[author] || 0
    op[author] += likes
    return op
  }, {})
  const maxLikes = lodash.keys(authorLikes).sort((a, b) => authorLikes[b] - authorLikes[a])[0]
  return {author: maxLikes, likes: authorLikes[maxLikes]}
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  initialBlogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  usersInDb
}
