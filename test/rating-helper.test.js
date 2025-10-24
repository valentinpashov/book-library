import { expect } from 'chai';
import showRatingHelper from '../src/helpers/rating-helper.js';

describe('Rating Helper', () => {
  it('should return empty string for rating 0', () => {
    const result = showRatingHelper(0);
    expect(result).to.equal('');
  });

  it('should return correct stars for integer ratings', () => {
    const result = showRatingHelper(3);
    expect(result).to.equal('&#x2605;&#x2605;&#x2605;');
  });

  it('should ignore decimal part of the rating', () => {
    const result = showRatingHelper(3.6);
    expect(result).to.equal('&#x2605;&#x2605;&#x2605;');
  });

  it('should handle large ratings correctly', () => {
    const result = showRatingHelper(5);
    expect(result).to.equal('&#x2605;&#x2605;&#x2605;&#x2605;&#x2605;');
  });

  it('should handle negative ratings as empty', () => {
    const result = showRatingHelper(-3);
    expect(result).to.equal('');
  });
});