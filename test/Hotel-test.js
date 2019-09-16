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

  it('should be able to get user room services data given userID', () => {
    let result = [
      {
        userID: 14,
        date: '2019/07/29',
        food: 'Rustic Concrete Sandwich',
        totalCost: 14.9
      },
      {
        userID: 14,
        date: '2019/09/01',
        food: 'Awesome Granite Sandwich',
        totalCost: 18.34
      }
    ];
    let mapResult = [
      ' Menu: Rustic Concrete Sandwich, Bill: 14.9',
      ' Menu: Awesome Granite Sandwich, Bill: 18.34'
    ];
    expect(hotel.getUserRoomServices(14)).to.eql(result);
    expect(hotel.getUserRoomServicesMap(14)).to.eql(mapResult);
  });

  it('should return all time order history for room services based on current customer searched', () => {
    let carolinaAllTimeMeals = [
      ' Menu: Fantastic Metal Sandwich, Bill: 21.6',
      ' Menu: Generic Soft Sandwich, Bill: 12.77'
    ];
    expect(hotel.lookUpCustomerMeals('Carolina Greenfelder')).to.eql(
      carolinaAllTimeMeals
    );
  });

  it('should calculate specific customer all time room service cost', () => {
    let carolinaAllTimeCost = 34.370000000000005;
    expect(hotel.lookUpCustomerTotalMeals('Carolina Greenfelder')).to.eql(
      carolinaAllTimeCost
    );
  });

  it('should be able to look up customer booking history based on the search of specific customer', () => {
    const customerHistory = [
      { userID: 4, date: '2019/10/19', roomNumber: 5 },
      { userID: 4, date: '2019/08/02', roomNumber: 45 },
      { userID: 4, date: '2019/07/27', roomNumber: 7 },
      { userID: 4, date: '2019/09/18', roomNumber: 36 },
      { userID: 4, date: '2019/08/09', roomNumber: 50 },
      { userID: 4, date: '2019/10/04', roomNumber: 7 },
      { userID: 4, date: '2019/10/02', roomNumber: 30 },
      { userID: 4, date: '2019/10/19', roomNumber: 15 },
      { userID: 4, date: '2019/09/22', roomNumber: 10 },
      { userID: 4, date: '2019/10/02', roomNumber: 20 },
      { userID: 4, date: '2019/10/11', roomNumber: 48 },
      { userID: 4, date: '2019/07/28', roomNumber: 18 },
      { userID: 4, date: '2019/08/10', roomNumber: 6 },
      { userID: 4, date: '2019/09/28', roomNumber: 28 },
      { userID: 4, date: '2019/07/29', roomNumber: 41 },
      { userID: 4, date: '2019/09/24', roomNumber: 18 },
      { userID: 4, date: '2019/09/16', roomNumber: 24 },
      { userID: 4, date: '2019/07/31', roomNumber: 33 },
      { userID: 4, date: '2019/09/16', roomNumber: 32 },
      { userID: 4, date: '2019/08/25', roomNumber: 33 },
      { userID: 4, date: '2019/10/22', roomNumber: 40 }
    ];

    expect(hotel.lookUpCustomerBookingHistory('Brook Christiansen')).to.eql(
      customerHistory
    );
  });

  it('should be able to grab all customers to set it up for live search functionality and to create new customers', () => {
    hotel.grabCustomers();
    expect(hotel.users).to.be.an('array');
  });
});
