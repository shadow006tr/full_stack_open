describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'password'
    }
    const anotherUser = {
      name: 'Danny Wisotsky',
      username: 'danny',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    cy.contains('cancel')
  })

  describe('Login',function() {
    beforeEach(function () {
      cy.contains('log in').click()
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Superuser is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('Superuser logged in').should('not.exist')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('https://docs.cypress.io/guides/overview/why-cypress#In-a-nutshell')
      cy.contains('save').click()
      cy.contains('a blog created by cypress')
    })

    describe('When a blog is created', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'a blog created by cypress', author: 'cypress', url: 'https://docs.cypress.io/guides/overview/why-cypress#In-a-nutshell' })
      })
      it('Can like a blog', function() {
        cy.contains('a blog created by cypress').parent().get('#viewButton').click()
        cy.contains('a blog created by cypress').parent().contains('likes 0')
        cy.contains('a blog created by cypress').parent().get('#likeButton').click()
        cy.contains('a blog created by cypress').parent().contains('likes 1')
      })
      it('Can delete a blog created by the user', function() {
        cy.contains('a blog created by cypress').parent().get('#deleteButton').click()
        cy.contains('a blog created by cypress').should('not.exist')
      })
      it('Can\'t delete a blog when logged in with a different user', function() {
        cy.get('#logoutButton').click()
        cy.login({ username: 'danny', password: 'password' })
        cy.contains('a blog created by cypress').parent().get('#deleteButton').click()
        cy.get('.error')
          .should('contain', 'You can\'t delete someone else\'s blogs!')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
          .and('have.css', 'border-style', 'solid')
      })
    })

    it('the blogs are ordered according to likes', function () {
      cy.createBlog(
        { title: 'The title with the most likes',
          author: 'cypress',
          url: 'https://docs.cypress.io/guides/overview/why-cypress#In-a-nutshell',
          likes: 5
        })
      cy.createBlog(
        { title: 'The title with the second most likes',
          author: 'cypress',
          url: 'https://docs.cypress.io/guides/overview/why-cypress#In-a-nutshell',
          likes: 3
        })
      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
    })
  })
})
