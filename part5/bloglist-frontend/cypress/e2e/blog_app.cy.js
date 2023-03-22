// 5.17
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Anna Sue',
      username: 'annasue',
      password: '123456',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
  })

  // 5.18
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('annasue')
      cy.get('#password').type('123456')
      cy.get('input[type=submit]').click()
      cy.contains('Anna Sue logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('annasue')
      cy.get('#password').type('wrong')
      cy.get('input[type=submit]').click()
      cy.get('.message')
        .contains('Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Anna Sue logged in')
    })
  })

  // 5.19
  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', `${Cypress.env('BACKEND')}/login/`, {
        username: 'annasue',
        password: '123456',
      }).then((response) =>
        localStorage.setItem('loggedInUser', JSON.stringify(response.body)),
      )
      cy.visit('')
    })

    it('A blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('WordPress Theme Detector')
      cy.get('#author').type('Kinsta')
      cy.get('#url').type('https://kinsta.com/tools/wordpress-theme-detector/')
      cy.get('button').contains('create').click()
      cy.contains('WordPress Theme Detector Kinsta')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        const blog = {
          title: 'WordPress Theme Detector',
          author: 'Kinsta',
          url: 'https://kinsta.com/tools/wordpress-theme-detector/',
        }

        cy.request({
          url: `${Cypress.env('BACKEND')}/blogs/`,
          method: 'POST',
          body: blog,
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('loggedInUser')).token
            }`,
          },
        })
        cy.visit('')
        cy.get('button').contains('View').click()
      })

      // 5.20
      it('user can like a blog', function () {
        cy.get('button').contains('like').click()
        cy.contains('likes 1')
      })

      // 5.21
      it('user can delete a blog', function () {
        cy.get('button').contains('remove').click()
        cy.get('.message').contains('Removed')
        cy.get('html').should('not.contain', 'WordPress Theme Detector')
      })

      describe('see blogs created by other users', function () {
        beforeEach(function () {
          const user = {
            name: 'Bobby Brown',
            username: 'bobbybrown',
            password: '123456',
          }
          cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)

          const blog = {
            title: 'How to Customize Your WordPress Theme',
            author: 'Rachel McCollin',
            url: 'https://kinsta.com/blog/how-to-customize-wordpress-theme/',
            likes: 2,
          }
          cy.request('POST', `${Cypress.env('BACKEND')}/login/`, {
            username: 'bobbybrown',
            password: '123456',
          }).then((response) =>
            cy.request({
              url: `${Cypress.env('BACKEND')}/blogs/`,
              method: 'POST',
              body: blog,
              headers: {
                Authorization: `Bearer ${response.body.token}`,
              },
            }),
          )
          cy.visit('')
        })

        // 5.22
        it('only the creator can see the delete button', function () {
          cy.contains('How to Customize Your WordPress Theme')
            .contains('View')
            .click()
          cy.contains('How to Customize Your WordPress Theme').should(
            'not.contain',
            'remove',
          )
        })

        // 5.23
        it('blogs are ordered accroding to likes with the most liked blog being first ', function () {
          cy.get('.blog_details')
            .eq(0)
            .contains('How to Customize Your WordPress Theme Rachel McCollin')
          cy.get('.blog_details')
            .eq(1)
            .contains('WordPress Theme Detector Kinsta')
        })
      })
    })
  })
})
