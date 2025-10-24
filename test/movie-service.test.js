import { expect } from 'chai';
import sinon from 'sinon';
import movieService from '../src/services/movie-service.js';
import movies from '../src/book.js';

describe('Movie Service', () => {
  let mockMovies;

  beforeEach(() => {
    mockMovies = [
      { id: '1', place: 'Paris', price: '10', year: '2020', rating: 5 },
      { id: '2', place: 'Rome', price: '15', year: '2021', rating: 4 }
    ];
    sinon.stub(movies, 'push');
    sinon.replace(movies, 'find', sinon.fake(() => mockMovies[0]));
    sinon.replace(movies, 'filter', sinon.fake((cb) => mockMovies.filter(cb)));
    sinon.replace(movies, 'splice', sinon.fake());
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return all movies', () => {
    const result = movieService.getAll();
    expect(result).to.deep.equal(mockMovies);
  });

  it('should filter movies by search term', () => {
    const result = movieService.getAll({ search: 'Paris' });
    expect(result).to.have.length(1);
    expect(result[0].place).to.equal('Paris');
  });

  it('should filter movies by price', () => {
    const result = movieService.getAll({ price: '10' });
    expect(result).to.have.length(1);
    expect(result[0].price).to.equal('10');
  });

  it('should filter movies by year', () => {
    const result = movieService.getAll({ year: '2020' });
    expect(result).to.have.length(1);
    expect(result[0].year).to.equal('2020');
  });

  it('should find one movie by id', () => {
    const result = movieService.findOne('1');
    expect(result).to.deep.equal(mockMovies[0]);
  });

  it('should create a new movie', () => {
    const newMovie = { place: 'London', price: '20', year: '2022', rating: 5 };
    const newId = movieService.create(newMovie);
    expect(movies.push.calledOnce).to.be.true;
    expect(newId).to.be.a('string');
  });

  it('should delete a movie by id', () => {
    movieService.delete('1');
    expect(movies.splice.calledOnce).to.be.true;
  });

  it('should update a movie by id', () => {
    const updatedMovie = { id: '1', place: 'Berlin', price: '12', year: '2020', rating: 3 };
    movieService.update('1', updatedMovie);
    expect(mockMovies[0].place).to.equal('Berlin');
  });
});