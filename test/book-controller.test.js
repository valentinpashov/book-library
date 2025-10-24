import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import bookController from '../src/controllers/book-controller.js';
import movieService from '../src/services/movie-service.js';

const app = express();
app.use(express.json());
app.use('/books', bookController);

describe('Book Controller', () => {
  let serviceStub;

  afterEach(() => {
    sinon.restore();
  });

  it('should retrieve all books on /search', async () => {
    serviceStub = sinon.stub(movieService, 'getAll').returns([]);

    const res = await request(app).get('/books/search');
    expect(res.status).to.equal(200);
    expect(res.text).to.contain('movies');
    expect(serviceStub.calledOnce).to.be.true;
  });

  it('should render create page on GET /create', async () => {
    const res = await request(app).get('/books/create');
    expect(res.status).to.equal(200);
    expect(res.text).to.contain('create');
  });

  it('should create a new movie on POST /create', async () => {
    serviceStub = sinon.stub(movieService, 'create');

    const res = await request(app)
      .post('/books/create')
      .send({ title: 'New Movie' });

    expect(res.status).to.equal(302);
    expect(serviceStub.calledOnce).to.be.true;
  });

  it('should get movie details on GET /:movieId/details', async () => {
    serviceStub = sinon.stub(movieService, 'findOne').returns({ title: 'Movie' });

    const res = await request(app).get('/books/1/details');
    expect(res.status).to.equal(200);
    expect(res.text).to.contain('Movie');
    expect(serviceStub.calledOnce).to.be.true;
  });

  it('should delete a movie on DELETE /:movieId/delete', async () => {
    serviceStub = sinon.stub(movieService, 'delete');

    const res = await request(app).delete('/books/1/delete');

    expect(res.status).to.equal(302);
    expect(serviceStub.calledOnce).to.be.true;
  });
});