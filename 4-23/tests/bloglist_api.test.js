const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const {agent} = require('supertest')
const app = require('../app')
const api = agent(app)
const User = require('../models/user')
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('blog getters', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
  })

  test('The id property exists', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('blog posters', () => {

  const createUserGetToken = async () => {
    const user = await api
      .post('/api/users')
      .send({ username: 'username', password: 'password' })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const token = await api
      .post('/api/login/')
      .send({ username: user.body.username, password: 'password' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    return token
  }

  test('a valid blogpost can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'test',
      url: 'https://test.com',
      userId: "6522ebfccf794bc45b09cbd6"
    }

   const token = await createUserGetToken()

    await api
      .post('/api/blogs')
      .set({'Authorization': `Bearer ${token.body.token}`, Accept: 'application/json'})
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('likes property will default to the value 0', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'test',
      url: 'https://test.com',
    }

    const token = await createUserGetToken()

    await api
      .post('/api/blogs')
      .set({'Authorization': `Bearer ${token.body.token}`, Accept: 'application/json'})
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const likes = response.body.map(r => r.likes)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(likes[helper.initialBlogs.length]).toEqual(0)
  })

  test('400 on missing title or url', async () => {
    const blogWithoutAuthor = {
      title: 'async/await simplifies making async calls',
      url: 'https://test.com',
    }
    const blogWithoutUrl = {
      title: 'async/await simplifies making async calls',
      author: 'test',
    }

    const token = await createUserGetToken()

    await api
      .post('/api/blogs')
      .set({'Authorization': `Bearer ${token.body.token}`, Accept: 'application/json'})
      .send(blogWithoutAuthor)
      .expect(400)

    await api
      .post('/api/blogs')
      .set({'Authorization': `Bearer ${token.body.token}`, Accept: 'application/json'})
      .send(blogWithoutUrl)
      .expect(400)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'shadow',
      name: 'Danny Wisotsky',
      password: 'hello',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('no username doesnt write', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Danny Wisotsky',
      password: 'hello',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(result.body.error).toContain('Username is missing')
  })

  test('too short username doesnt write', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'sh',
      name: 'Danny Wisotsky',
      password: 'hello',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(result.body.error).toContain('Username is too short')
  })

  test('no password doesnt write', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'shadow',
      name: 'Danny Wisotsky',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(result.body.error).toContain('Password is missing')
  })

  test('too short password doesnt write', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'shadow',
      name: 'Danny Wisotsky',
      password: 'he',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(result.body.error).toContain('Password is too short')
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
