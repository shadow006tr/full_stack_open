const lodash = require('lodash');

const dummy = (blogs) => {
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
