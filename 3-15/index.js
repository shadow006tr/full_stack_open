require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const {request} = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

morgan.token('body', function (req, res) { return req.body.id ? JSON.stringify(req.body) : '' })

app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

// app.get('/info', (request, response) => {
//   response.send('' +
//     '<p1>Phone book has info for ' + persons.length + ' people</p1><br>' +
//     '<p1>' + new Date() + '</p1>')
// })

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  // if(Person.find({ name: body.name }) !== {}) {
  //   return response.status(400).json({
  //     error: Person.find({ name: body.name })
  //   })
  // }

  const person = new Person(body)

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
