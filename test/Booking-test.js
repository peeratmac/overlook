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

// NEED SPY

chai.spy.on(domUpdates, [], () => {});

describe('BOOKING', () => {
  let hotel, booking;
  beforeEach(() => {
    hotel = new Hotel(data.users, data.rooms, data.bookings, data.roomServices);
    hotel.mainHotelHandler();
    // hotel.domDisplayMainPage();
  });

  it('should expect main hotel handler to be able to find the rooms booked on the date', () => {
    let bookingOnSep13 = [
      { userID: 40, date: '2019/09/13', roomNumber: 40 },
      { userID: 51, date: '2019/09/13', roomNumber: 35 },
      { userID: 58, date: '2019/09/13', roomNumber: 42 },
      { userID: 17, date: '2019/09/13', roomNumber: 2 },
      { userID: 37, date: '2019/09/13', roomNumber: 16 },
      { userID: 8, date: '2019/09/13', roomNumber: 3 },
      { userID: 64, date: '2019/09/13', roomNumber: 4 },
      { userID: 14, date: '2019/09/13', roomNumber: 32 },
      { userID: 73, date: '2019/09/13', roomNumber: 8 },
      { userID: 52, date: '2019/09/13', roomNumber: 30 },
      { userID: 55, date: '2019/09/13', roomNumber: 26 },
      { userID: 51, date: '2019/09/13', roomNumber: 11 },
      { userID: 25, date: '2019/09/13', roomNumber: 49 },
      { userID: 20, date: '2019/09/13', roomNumber: 37 },
      { userID: 58, date: '2019/09/13', roomNumber: 17 },
      { userID: 36, date: '2019/09/13', roomNumber: 22 },
      { userID: 50, date: '2019/09/13', roomNumber: 13 }
    ];
    expect(hotel.bookingMagic.findRoomsBookedOnGivenDate('2019/09/13')).to.eql(
      bookingOnSep13
    );
  });

  it('should be able calculate hotel occupancy percentage on a given date', () => {
    expect(
      hotel.bookingMagic.calculateOccupancyOnGivenDate('2019/09/12')
    ).to.equal(40);
  });

  it('should be able to give number of rooms available on a given date', () => {
    expect(
      hotel.bookingMagic.calculateNumberOfRoomsAvailable('2019/09/13')
    ).to.equal(33);
  });

  it('should be able to calculate nightly revenue from room cost alone', () => {
    expect(
      hotel.bookingMagic.calculateNightlyRoomRevenue('2019/09/13')
    ).to.equal(5054.88);
  });

  it('should be able to calculate nightly revenue from room services alone', () => {
    expect(
      hotel.bookingMagic.calculateNightlyRoomServiceRevenue('2019/09/14')
    ).to.equal(30.07);
  });

  it('should be able to calculate total nightly revenue', () => {
    expect(
      hotel.bookingMagic.calculateNightlyCombinedRevenue('2019/09/12')
    ).to.equal(6223.190000000001);
  });

  // * Room Services
  it('should be able to find all room services order for the day', () => {
    console.log(hotel.bookingMagic.findRoomServicesOrder('2019/07/28'));
  });
});
