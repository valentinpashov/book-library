import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import routes from '../src/router.js';

describe('Routes', () => {
  let app;

  before(() => {
    app = express();
    app.set('view engine', 'hbs');
    app.set('views', './src/views');

    app.use(routes);
  });

  it('should route to home controller', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.contain('home');
        done(err);
      });
  });

  it('should route to book controller', (done) => {
    request(app)
      .get('/movies')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.contain('movies'); // Примерна проверка
        done(err);
      });
  });

  it('should return 404 for unknown routes', (done) => {
    request(app)
      .get('/unknown-route')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.contain('404');
        done(err);
      });
  });
});