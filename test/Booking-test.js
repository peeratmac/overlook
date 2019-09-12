import chai from 'chai';
const expect = chai.expect;

import spies from 'chai-spies';
chai.use(spies);

import testData from './testData';

import Booking from '../src/Booking';
import Customer from '../src/Customer';
import Hotel from '../src/Hotel';
import RoomService from '../src/RoomService';
import domUpdates from '../src/domUpdates';

describe('BOOKING', () => {
  let hotel, booking;
  beforeEach(() => {});

  it('should get number of rooms available', () => {});
});
