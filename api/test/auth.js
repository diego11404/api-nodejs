"use strict"
let request = require('supertest-as-promised');
const app = require('../app'),
  mongoose = require('mongoose'),
  conf = require('../lib/config')

request = request(app)

describe('Recurso /auth', () => {
  before(() => {
    mongoose.connect(`mongodb:\/\/${conf.host}/${conf.database}`)
  })
  after((done) => {
    mongoose.disconnect(done);
    mongoose.model = {}
  })
  describe('/Post', () => {
    it('Deberia autenticar un usuario', (done) => {
      let user = {
        "username": "diego",
        "password": "123"
      }
      request
        .post('/user')
        .set('Accept', 'application/json')
        .send(user)
        .expect(201)
        .expect("Content-Type", /application\/json/)
        .then((res) => {
          return request
            .post('/auth')
            .set('Accept', 'application/json')
            .send(user)
            .expect(201)
            .expect("Content-type", /application\/json/)
            .then((res) => {
              let body = res.body
              expect(body).to.have.property('token')
              done()
            }, done)

        })

    })
  })

})