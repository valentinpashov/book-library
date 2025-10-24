import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import homeController from '../src/controllers/home-controller.js';
import movieService from '../src/services/movie-service.js';

const app = express();
app.use(express.json());
app.use('/', homeController);

describe('Home Controller', () => {
  let serviceStub;

  afterEach(() => {
    sinon.restore();
  });

  it('should render home page with books on GET /', async () => {
    serviceStub = sinon.stub(movieService, 'getAll').returns([{ title: 'Movie' }]);

    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
    expect(res.text).to.contain('Movie');
    expect(serviceStub.calledOnce).to.be.true;
  });

  it('should render about page on GET /about', async () => {
    const res = await request(app).get('/about');
    expect(res.status).to.equal(200);
    expect(res.text).to.contain('about');
  });

  it('should render register page on GET /register', async () => {
    const res = await request(app).get('/register');
    expect(res.status).to.equal(200);
    expect(res.text).to.contain('register');
  });

  it('should render login page on GET /login', async () => {
    const res = await request(app).get('/login');
    expect(res.status).to.equal(200);
    expect(res.text).to.contain('login');
  });
});