"use strict"
let request = require('supertest-as-promised')
const app = require('../app');

request = request(app);

describe('API DE CF', () => {
  describe('GET /', () => {
    it('Deberia decir hola nena', (done) => {
      request.get('/')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end((err, res) => {
          let body = res.body
         expect(body).to.have.property('mensaje', 'hola nena')
          done(err)
        })
    })
  })
})
