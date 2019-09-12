import chai from 'chai';
const expect = chai.expect;

import spies from 'chai-spies';
chai.use(spies);

import Customer from '../src/Customer';
import domUpdates from '../src/domUpdates';

let customer1, customer2, customer3;

describe('CUSTOMER', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});
