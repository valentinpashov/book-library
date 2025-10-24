import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import routes from '../src/router.js';
import handlebars from 'express-handlebars';
import showRatingHelper from '../src/helpers/rating-helper.js';

describe('Express App', () => {
  let app;

  before(() => {
    app = express();

    app.engine(
      "hbs",
      handlebars.engine({
        extname: "hbs",
        helpers: {
          showRating: showRatingHelper,
        }
      })
    );

    app.set("view engine", "hbs");
    app.set("views", "./src/views");

    app.use("/static", express.static("src/public"));
    app.use(express.urlencoded({ extended: false }));

    app.use(routes);
  });

  it('should have the correct view engine setup', () => {
    expect(app.get('view engine')).to.equal('hbs');
  });

  it('should serve static files', (done) => {
    request(app)
      .get('/static/somefile.txt')
      .expect(200, done);
  });

  it('should respond to base URL', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('should render views with custom helpers', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect(res => {
        expect(res.text).to.contain('&#x2605;'); 
      })
      .end(done);
  });
});