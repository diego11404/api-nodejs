"use strict"
let request = require('supertest-as-promised');
const app = require('../app'),
  _ = require('lodash'),
  mongoose = require('../lib/model/connection'),
  conf = require('../lib/config')

request = request(app)

describe('Recurso /movie', () => {
  before(() => {
    mongoose.connect(`mongodb:\/\/${conf.host}/${conf.database}`)
  })
  after((done) => {
    mongoose.disconnect(done);
    mongoose.model = {}
  })
  describe('/Post', () => {
    it('Deberia crear una nueva pelicula', (done) => {
      let movie = {
        "title": "about time",
        "year": "2013"
      }
      request
        .post('/movie')
        .set('Accept', 'application/json')
        .send(movie)
        .expect(201)
        .expect("Content-Type", /application\/json/)
        .end((err, res) => {
          let body = res.body;
          expect(body).to.have.property('movie')
          let movie = body.movie;
          expect(movie).to.have.property("title", "about time")
          expect(movie).to.have.property("year", "2013")
          expect(movie).to.have.property("_id")
          done(err)
        })

    })
  })
  describe('/Get all movies', () => {
    it('Deberia obtener todas las peliculas', (done) => {
      let id1 = "";
      let id2 = "";
      let data1 = {
          "title": "tarzan",
          "year": "2200"
      }
      let data2 = {
          "title": "she want to breaking",
          "year": "2017"
      }
      request
        .post('/movie')
        .set('Accept', 'application/json')
        .send(data1)
        .expect(201)
        .expect("Content-Type", /application\/json/)
        .then((res) => {
          id1 = res.body.movie._id; 
          return request
            .post('/movie')
            .set('Accept', 'application/json')
            .send(data2)
            .expect(201)
            .expect("Content-Type", /application\/json/)
        })
        .then((res) => {
          id2 = res.body.movie._id
          return request
            .get('/movie/')
            .set('Accept', 'application/json')
            .expect(201)
            .expect("Content-Type", /application\/json/)
        }, done)
        .then(res => {
          let body = res.body;
          let allmovies = body.allmovies;
          expect(body).to.have.property('allmovies')

          let movie1 = _.find(allmovies, { _id: id1 })
          let movie2 = _.find(allmovies, { _id: id2 })
    

           expect(movie1).to.have.property('title', 'tarzan')
           expect(movie1).to.have.property('year', '2200')
           expect(movie1).to.have.property('_id')

           expect(movie2).to.have.property('title', 'she want to breaking')
           expect(movie2).to.have.property('year', '2017')
           expect(movie2).to.have.property('_id')
          done()
        }, done)


    })
  })
  describe('/Get:id', () => {
    it('Deberia Obtener una pelicula', (done) => {
      let id = "";
      let data = {
          "title": "Artificial Inteligence",
          "year": "2018"
      }
      request.post('/movie')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .then(res => {
          id = res.body.movie._id;
          return request
            .get('/movie/' + id)
            .set('Accept', 'application/json')
            .expect(200)
            .expect("Content-Type", /application\/json/)
        }, done)
        .then(res => {
          let body = res.body
          expect(body).to.have.property('movieId')
          let movie = body.movieId
          expect(movie).to.have.property("_id", id)
          
          expect(movie).to.have.property("title", "Artificial Inteligence")
          expect(movie).to.have.property("year", "2018")
          
          done()
        }, done)

    })
  })
  describe("/PUT", () => {
    it("Deberia Actualizar una pelicula", (done) => {
      let id = "";
      let data = {
          "title": "nodejs",
          "year": "2017"
      }
      request.post('/movie')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .then(res => {
          id = res.body.movie._id;
          let update = {
              "title": "tarzar",
              "year": "2017"
          }
          return request
            .put('/movie/' + id)
            .set('Accept', 'application/json')
            .send(update)
            .expect(200)
            .expect("Content-Type", /application\/json/)
        }, done)
        .then(res => {

          let body = res.body
          expect(body).to.have.property('movie')
          let movie = body.movie
          expect(movie).to.have.property("title", "tarzar")
          expect(movie).to.have.property("year", "2017")
          expect(movie).to.have.property("_id", id)
          
          done()
        }, done)
    })
  })
  describe("/DELETE", () => {
    it("Deberia Eliminar una pelicula", (done) => {
      let id = "";
      let data = {
          "title": "nodejs",
          "year": "2017"
      }
      request.post('/movie')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .then(res => {
          id = res.body.movie._id;
          return request
            .delete('/movie/' + id)
            .set('Accept', 'application/json')
            .expect(400)
            .expect("Content-Type", /application\/json/)
        }, done)
        .then(res => {
          let body = res.body
          expect(body).to.be.empy
          done()
        }, done)
    })
  })
})
