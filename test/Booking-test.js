import chai from 'chai';
const expect = chai.expect;

import spies from 'chai-spies';
chai.use(spies);

import domUpdates from '../src/domUpdates';

describe('BOOKING', () => {
  it('should return true', () => {
    expect(true).to.equal(true);
  });
});
