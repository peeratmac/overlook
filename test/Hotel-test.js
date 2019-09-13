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

describe('HOTEL', () => {
  let hotel;
  beforeEach(() => {
    hotel = new Hotel(data.users, data.rooms, data.bookings, data.roomServices);
    hotel.mainHotelHandler();
  });

  it('should be able to get today date', () => {
    let currentDay = `${new Date().getFullYear()}/${String(
      new Date().getMonth() + 1
    ).padStart(2, '0')}/${String(new Date().getDate()).padStart(2, '0')}`;
    expect(hotel.getTodayDate()).to.equal(currentDay);
  });

  it('should be able to get a customer name', () => {
    expect(hotel.getCustomerName('Matilde Larson')).to.equal(
      data.users[0].name
    );
  });

  it('should be able to get a customer name', () => {
    expect(hotel.getCustomerID(6)).to.equal(data.users[5].id);
  });

  it('should be able to add a customer name (id generated - name provided by input) and return that new customer', () => {
    expect(hotel.addCustomerName('Lana Del Rey')).to.equal(
      data.users[data.users.length - 1]
    );
    console.log(data.users[data.users.length - 1]);
  });
});
