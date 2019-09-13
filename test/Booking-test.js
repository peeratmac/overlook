import chai from 'chai';
const expect = chai.expect;

import spies from 'chai-spies';
chai.use(spies);

import data from './data';

import Booking from '../src/Booking';
import Customer from '../src/Customer';
import Hotel from '../src/Hotel';
import RoomService from '../src/RoomService';
import domUpdates from '../src/domUpdates';

describe('BOOKING', () => {
  let hotel, booking;
  beforeEach(() => {
    hotel = new Hotel(data.users, data.rooms, data.bookings, data.roomServices);
    hotel.mainHotelHandler();
  });

  it('should expect main hotel handler to be able to find number of rooms booked on the date', () => {
    let bookingOnSep13 = [
      { userID: 40, date: '2019/09/13', roomNumber: 40 },
      { userID: 51, date: '2019/09/13', roomNumber: 35 }
    ];
    expect(hotel.bookingMagic.findRoomsBookedOnGivenDate('2019/09/13')).to.eql(
      bookingOnSep13
    );
  });
});
