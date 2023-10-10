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
  const likes = blogs.map(blog => blog.likes)

  return blogs[likes.indexOf(Math.max(...likes))]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
