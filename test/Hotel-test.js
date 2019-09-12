import chai from 'chai';
const expect = chai.expect;

import spies from 'chai-spies';
chai.use(spies);

import Hotel from '../src/Hotel';
import domUpdates from '../src/domUpdates';

let hotel;

describe('HOTEL', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});
