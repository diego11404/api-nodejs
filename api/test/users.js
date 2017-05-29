"use strict"
let request = require('supertest-as-promised');
const app = require('../app'),
  mongoose = require('mongoose'),
  conf = require('../lib/config')

request = request(app)

describe('Recurso /user', () => {
  before(() => {
    mongoose.connect(`mongodb:\/\/${conf.host}/${conf.database}`)
  })
  after((done) => {
    mongoose.disconnect(done);
    mongoose.model = {}
  })
  describe('/Post', () => {
    it('Deberia crear un usuario', (done) => {
      let user = {
        "username": "diego3",
        "password": "1234"
      }
      request
        .post('/user')
        .set('Accept', 'application/json')
        .send(user)
        .expect(201)
        .expect("Content-Type", /application\/json/)
        .end((err, res) => {
          let body = res.body;
          expect(body).to.have.property('user')
          let user = body.user;
          expect(user).to.have.property("username", "diego3")
          
          done(err)
        })

    })
  })

})