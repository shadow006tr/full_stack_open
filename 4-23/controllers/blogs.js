const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const {userExtractor} = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {

  const body = request.body

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  if (!body.author || !body.url) {
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  if (blog.user.toString() !== user.id.toString()) {
    response.status(401).json({ error: 'User is incorrect for deletion' }).end()
  } else {
    await Blog.findByIdAndRemove(request.params.id)
    await User.findByIdAndUpdate(user.id, {blogs: user.blogs.filter(found => found.id !== blog.id)})
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  try {
    const result = await Blog.updateOne(
      { _id: request.params.id },
      { $set: {
          title: body.title,
          author: body.author,
          url: body.url,
          likes: body.likes
        }}
    )
    if (result) {
      response.status(200).json(result).end()
    }
  } catch (error) {
    next(error)
    response.status(404).end()
  }
})

module.exports = blogsRouter
