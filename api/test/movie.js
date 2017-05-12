"use strict"
let request = require('supertest-as-promised');
const app = require('../app');
request = request(app)

describe('Recurso /movie', () => {
  describe('/Post', () => {
    it('Deberia crear una nueva movie', (done) => {
      let movie = {
        "movie": {
          "title": "about time",
          "year": "2013"
        }
      }
      request
        .post('/movie')
        .set('Accept', 'application/json')
        .send(movie)
        .expect(201)
        .expect("Content-Type", /application\/json/)
        .end((err,res) => {
          let body = res.body;
          expect(body).to.have.property("movie")
          let movie = body.movie
          expect(movie).to.have.property("title", "about time")
          expect(movie).to.have.property("year", "2013")
          expect(movie).to.have.property("id")
          done(err)
        })

    })
  })
})
