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

chai.spy.on(
  domUpdates,
  [
    'showOccupancyPercentage',
    'showRoomsRevenue',
    'showRoomServicesRevenue',
    'showTotalRevenue',
    'showAllOrdersList',
    'showRoomServicesRevenueOnOrdersPage',
    'updateSelectedDateText',
    'showAllOrdersListForDate',
    'showRoomServicesRevenueOnOrdersPageForDate',
    'displayCustomerName',
    'showOrderHistoryList',
    'showOrderHistoryTotal',
    'showMostPopularDate',
    'showLeastPopularDate',
    'appendRoomList',
    'appendEmptyRoomList',
    'displayFoodMenu'
  ],
  () => {}
);

describe('BOOKING', () => {
  let hotel, booking;
  beforeEach(() => {
    hotel = new Hotel(data.users, data.rooms, data.bookings, data.roomServices);
    hotel.mainHotelHandler();
    hotel.mainPageDomUpdates();
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
    let roomServiceOrderJuly28 = [
      {
        userID: 91,
        date: '2019/07/28',
        food: 'Licensed Soft Sandwich',
        totalCost: 20.09
      },
      {
        userID: 46,
        date: '2019/07/28',
        food: 'Handmade Cotton Sandwich',
        totalCost: 24.74
      },
      {
        userID: 53,
        date: '2019/07/28',
        food: 'Refined Wooden Sandwich',
        totalCost: 20.52
      }
    ];
    expect(hotel.bookingMagic.findRoomServicesOrder('2019/07/28')).to.eql(
      roomServiceOrderJuly28
    );
  });

  it('should be able to map out the room services order in the correct format that will get displayed on the DOM', () => {
    let roomServiceOrderJuly28 = [
      ' Menu: Licensed Soft Sandwich, Bill: 20.09',
      ' Menu: Handmade Cotton Sandwich, Bill: 24.74',
      ' Menu: Refined Wooden Sandwich, Bill: 20.52'
    ];
    expect(hotel.bookingMagic.findRoomServicesOrderMap('2019/07/28')).to.eql(
      roomServiceOrderJuly28
    );
  });

  it('should find the date with the highest number of rooms booked along with count', () => {
    let max = {
      maxRoomDates: ['2019/10/28', '2019/09/07', '2019/10/23'],
      maxRoomCount: 27
    };
    expect(hotel.bookingMagic.findDateWithMostRoomsBooked()).to.eql(max);
  });

  it('should find the date with the lowest number of rooms booked along with count', () => {
    let min = { minRoomDates: ['2019/07/23'], minRoomCount: 10 };
    expect(hotel.bookingMagic.findDateWithLeastRoomsBooked()).to.eql(min);
  });

  it('should be able to list all unavailable rooms based on a given date', () => {
    let rooms = [
      40,
      35,
      42,
      2,
      16,
      3,
      4,
      32,
      8,
      30,
      26,
      11,
      49,
      37,
      17,
      22,
      13
    ];
    expect(hotel.bookingMagic.listOfAllUnavailableRooms('2019/09/13')).to.eql(
      rooms
    );
  });

  it('should list all available rooms with all the room information from rooms dataset', () => {
    let roomInfo = [
      {
        number: 1,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'twin',
        numBeds: 1,
        costPerNight: 265.03
      },
      {
        number: 7,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 376.56
      },
      {
        number: 9,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'twin',
        numBeds: 1,
        costPerNight: 327.76
      },
      {
        number: 13,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 1,
        costPerNight: 372.83
      },
      {
        number: 19,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 356.33
      },
      {
        number: 22,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 190.26
      },
      {
        number: 28,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 215.76
      },
      {
        number: 44,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 368.33
      }
    ];
    expect(
      hotel.bookingMagic.listOfAvailableRoomsWithType(
        '2019/09/13',
        'Residential Suite'
      )
    ).to.eql(roomInfo);
  });

  it('should allow users to see available menu selection with pricing', () => {
    let allMenuWithPricing = [
      { food: 'Rustic Concrete Sandwich', totalCost: 14.9 },
      { food: 'Rustic Cotton Sandwich', totalCost: 17.33 },
      { food: 'Tasty Wooden Sandwich', totalCost: 11.15 },
      { food: 'Practical Granite Sandwich', totalCost: 14.87 },
      { food: 'Fantastic Cotton Sandwich', totalCost: 17.61 },
      { food: 'Awesome Cotton Sandwich', totalCost: 20.79 },
      { food: 'Refined Metal Sandwich', totalCost: 12.32 },
      { food: 'Incredible Concrete Sandwich', totalCost: 24.77 },
      { food: 'Unbranded Wooden Sandwich', totalCost: 7.95 },
      { food: 'Intelligent Fresh Sandwich', totalCost: 12.32 },
      { food: 'Unbranded Wooden Sandwich', totalCost: 12.83 },
      { food: 'Handcrafted Rubber Sandwich', totalCost: 22.45 },
      { food: 'Tasty Granite Sandwich', totalCost: 18.73 },
      { food: 'Refined Cotton Sandwich', totalCost: 12.65 },
      { food: 'Handcrafted Metal Sandwich', totalCost: 12.36 },
      { food: 'Rustic Soft Sandwich', totalCost: 6.78 },
      { food: 'Incredible Cotton Sandwich', totalCost: 8.26 },
      { food: 'Awesome Soft Sandwich', totalCost: 9.63 },
      { food: 'Generic Wooden Sandwich', totalCost: 10.63 },
      { food: 'Refined Plastic Sandwich', totalCost: 7.47 },
      { food: 'Rustic Metal Sandwich', totalCost: 14.95 },
      { food: 'Incredible Granite Sandwich', totalCost: 9.28 },
      { food: 'Sleek Steel Sandwich', totalCost: 12.79 },
      { food: 'Intelligent Fresh Sandwich', totalCost: 19.44 },
      { food: 'Generic Cotton Sandwich', totalCost: 21.66 },
      { food: 'Licensed Plastic Sandwich', totalCost: 10.64 },
      { food: 'Generic Plastic Sandwich', totalCost: 18.34 },
      { food: 'Sleek Frozen Sandwich', totalCost: 15.24 },
      { food: 'Rustic Plastic Sandwich', totalCost: 9.94 },
      { food: 'Tasty Granite Sandwich', totalCost: 20.84 },
      { food: 'Licensed Cotton Sandwich', totalCost: 14.74 },
      { food: 'Refined Rubber Sandwich', totalCost: 9.89 },
      { food: 'Tasty Soft Sandwich', totalCost: 23.7 },
      { food: 'Ergonomic Metal Sandwich', totalCost: 19.14 },
      { food: 'Licensed Frozen Sandwich', totalCost: 21.75 },
      { food: 'Awesome Soft Sandwich', totalCost: 9.06 },
      { food: 'Fantastic Metal Sandwich', totalCost: 21.6 },
      { food: 'Handmade Concrete Sandwich', totalCost: 18.49 },
      { food: 'Handmade Steel Sandwich', totalCost: 8.84 },
      { food: 'Small Cotton Sandwich', totalCost: 22.94 },
      { food: 'Intelligent Granite Sandwich', totalCost: 18.11 },
      { food: 'Practical Fresh Sandwich', totalCost: 21.51 },
      { food: 'Practical Steel Sandwich', totalCost: 15.85 },
      { food: 'Handmade Concrete Sandwich', totalCost: 12.28 },
      { food: 'Intelligent Wooden Sandwich', totalCost: 19.3 },
      { food: 'Handmade Soft Sandwich', totalCost: 5.32 },
      { food: 'Handcrafted Cotton Sandwich', totalCost: 6.27 },
      { food: 'Small Metal Sandwich', totalCost: 22.75 },
      { food: 'Gorgeous Soft Sandwich', totalCost: 6.65 },
      { food: 'Sleek Metal Sandwich', totalCost: 11.61 },
      { food: 'Generic Metal Sandwich', totalCost: 7.31 },
      { food: 'Small Steel Sandwich', totalCost: 12.6 },
      { food: 'Small Cotton Sandwich', totalCost: 23.16 },
      { food: 'Awesome Metal Sandwich', totalCost: 12.56 },
      { food: 'Unbranded Plastic Sandwich', totalCost: 17.66 },
      { food: 'Fantastic Fresh Sandwich', totalCost: 11.42 },
      { food: 'Sleek Rubber Sandwich', totalCost: 13.13 },
      { food: 'Generic Steel Sandwich', totalCost: 12.14 },
      { food: 'Rustic Concrete Sandwich', totalCost: 15.59 },
      { food: 'Sleek Frozen Sandwich', totalCost: 8.55 },
      { food: 'Handcrafted Steel Sandwich', totalCost: 10 },
      { food: 'Licensed Frozen Sandwich', totalCost: 13.15 },
      { food: 'Ergonomic Wooden Sandwich', totalCost: 24.79 },
      { food: 'Intelligent Granite Sandwich', totalCost: 9.66 },
      { food: 'Gorgeous Steel Sandwich', totalCost: 18.44 },
      { food: 'Unbranded Concrete Sandwich', totalCost: 22.8 },
      { food: 'Generic Soft Sandwich', totalCost: 12.77 },
      { food: 'Tasty Wooden Sandwich', totalCost: 8.23 },
      { food: 'Licensed Soft Sandwich', totalCost: 20.09 },
      { food: 'Incredible Plastic Sandwich', totalCost: 21.09 },
      { food: 'Handmade Frozen Sandwich', totalCost: 24.31 },
      { food: 'Intelligent Rubber Sandwich', totalCost: 17.18 },
      { food: 'Gorgeous Concrete Sandwich', totalCost: 24.79 },
      { food: 'Small Plastic Sandwich', totalCost: 5.66 },
      { food: 'Licensed Rubber Sandwich', totalCost: 10.26 },
      { food: 'Refined Granite Sandwich', totalCost: 12 },
      { food: 'Tasty Concrete Sandwich', totalCost: 12.01 },
      { food: 'Awesome Soft Sandwich', totalCost: 20.77 },
      { food: 'Practical Concrete Sandwich', totalCost: 11.49 },
      { food: 'Incredible Concrete Sandwich', totalCost: 7.13 },
      { food: 'Handmade Cotton Sandwich', totalCost: 24.74 },
      { food: 'Licensed Steel Sandwich', totalCost: 24.53 },
      { food: 'Rustic Concrete Sandwich', totalCost: 6.56 },
      { food: 'Incredible Cotton Sandwich', totalCost: 23.08 },
      { food: 'Gorgeous Concrete Sandwich', totalCost: 22.99 },
      { food: 'Gorgeous Frozen Sandwich', totalCost: 13.28 },
      { food: 'Tasty Soft Sandwich', totalCost: 16.48 },
      { food: 'Ergonomic Plastic Sandwich', totalCost: 17.88 },
      { food: 'Awesome Granite Sandwich', totalCost: 18.34 },
      { food: 'Intelligent Steel Sandwich', totalCost: 11.2 },
      { food: 'Practical Frozen Sandwich', totalCost: 24.91 },
      { food: 'Handcrafted Concrete Sandwich', totalCost: 22.63 },
      { food: 'Practical Fresh Sandwich', totalCost: 7.69 },
      { food: 'Unbranded Soft Sandwich', totalCost: 20.31 },
      { food: 'Refined Wooden Sandwich', totalCost: 20.52 },
      { food: 'Licensed Metal Sandwich', totalCost: 17.77 },
      { food: 'Licensed Fresh Sandwich', totalCost: 20.84 },
      { food: 'Small Soft Sandwich', totalCost: 12.55 },
      { food: 'Intelligent Steel Sandwich', totalCost: 19.94 },
      { food: 'Tasty Granite Sandwich', totalCost: 9.23 }
    ];
    expect(hotel.bookingMagic.listAllAvailableMenusWithPricing()).to.eql(
      allMenuWithPricing
    );
  });

  it('should list menu from lowest price to highest price', () => {
    let menuInOrder = [
      { food: 'Handmade Soft Sandwich', totalCost: 5.32 },
      { food: 'Small Plastic Sandwich', totalCost: 5.66 },
      { food: 'Handcrafted Cotton Sandwich', totalCost: 6.27 },
      { food: 'Rustic Concrete Sandwich', totalCost: 6.56 },
      { food: 'Gorgeous Soft Sandwich', totalCost: 6.65 },
      { food: 'Rustic Soft Sandwich', totalCost: 6.78 },
      { food: 'Incredible Concrete Sandwich', totalCost: 7.13 },
      { food: 'Generic Metal Sandwich', totalCost: 7.31 },
      { food: 'Refined Plastic Sandwich', totalCost: 7.47 },
      { food: 'Practical Fresh Sandwich', totalCost: 7.69 },
      { food: 'Unbranded Wooden Sandwich', totalCost: 7.95 },
      { food: 'Tasty Wooden Sandwich', totalCost: 8.23 },
      { food: 'Incredible Cotton Sandwich', totalCost: 8.26 },
      { food: 'Sleek Frozen Sandwich', totalCost: 8.55 },
      { food: 'Handmade Steel Sandwich', totalCost: 8.84 },
      { food: 'Awesome Soft Sandwich', totalCost: 9.06 },
      { food: 'Tasty Granite Sandwich', totalCost: 9.23 },
      { food: 'Incredible Granite Sandwich', totalCost: 9.28 },
      { food: 'Awesome Soft Sandwich', totalCost: 9.63 },
      { food: 'Intelligent Granite Sandwich', totalCost: 9.66 },
      { food: 'Refined Rubber Sandwich', totalCost: 9.89 },
      { food: 'Rustic Plastic Sandwich', totalCost: 9.94 },
      { food: 'Handcrafted Steel Sandwich', totalCost: 10 },
      { food: 'Licensed Rubber Sandwich', totalCost: 10.26 },
      { food: 'Generic Wooden Sandwich', totalCost: 10.63 },
      { food: 'Licensed Plastic Sandwich', totalCost: 10.64 },
      { food: 'Tasty Wooden Sandwich', totalCost: 11.15 },
      { food: 'Intelligent Steel Sandwich', totalCost: 11.2 },
      { food: 'Fantastic Fresh Sandwich', totalCost: 11.42 },
      { food: 'Practical Concrete Sandwich', totalCost: 11.49 },
      { food: 'Sleek Metal Sandwich', totalCost: 11.61 },
      { food: 'Refined Granite Sandwich', totalCost: 12 },
      { food: 'Tasty Concrete Sandwich', totalCost: 12.01 },
      { food: 'Generic Steel Sandwich', totalCost: 12.14 },
      { food: 'Handmade Concrete Sandwich', totalCost: 12.28 },
      { food: 'Refined Metal Sandwich', totalCost: 12.32 },
      { food: 'Intelligent Fresh Sandwich', totalCost: 12.32 },
      { food: 'Handcrafted Metal Sandwich', totalCost: 12.36 },
      { food: 'Small Soft Sandwich', totalCost: 12.55 },
      { food: 'Awesome Metal Sandwich', totalCost: 12.56 },
      { food: 'Small Steel Sandwich', totalCost: 12.6 },
      { food: 'Refined Cotton Sandwich', totalCost: 12.65 },
      { food: 'Generic Soft Sandwich', totalCost: 12.77 },
      { food: 'Sleek Steel Sandwich', totalCost: 12.79 },
      { food: 'Unbranded Wooden Sandwich', totalCost: 12.83 },
      { food: 'Sleek Rubber Sandwich', totalCost: 13.13 },
      { food: 'Licensed Frozen Sandwich', totalCost: 13.15 },
      { food: 'Gorgeous Frozen Sandwich', totalCost: 13.28 },
      { food: 'Licensed Cotton Sandwich', totalCost: 14.74 },
      { food: 'Practical Granite Sandwich', totalCost: 14.87 },
      { food: 'Rustic Concrete Sandwich', totalCost: 14.9 },
      { food: 'Rustic Metal Sandwich', totalCost: 14.95 },
      { food: 'Sleek Frozen Sandwich', totalCost: 15.24 },
      { food: 'Rustic Concrete Sandwich', totalCost: 15.59 },
      { food: 'Practical Steel Sandwich', totalCost: 15.85 },
      { food: 'Tasty Soft Sandwich', totalCost: 16.48 },
      { food: 'Intelligent Rubber Sandwich', totalCost: 17.18 },
      { food: 'Rustic Cotton Sandwich', totalCost: 17.33 },
      { food: 'Fantastic Cotton Sandwich', totalCost: 17.61 },
      { food: 'Unbranded Plastic Sandwich', totalCost: 17.66 },
      { food: 'Licensed Metal Sandwich', totalCost: 17.77 },
      { food: 'Ergonomic Plastic Sandwich', totalCost: 17.88 },
      { food: 'Intelligent Granite Sandwich', totalCost: 18.11 },
      { food: 'Generic Plastic Sandwich', totalCost: 18.34 },
      { food: 'Awesome Granite Sandwich', totalCost: 18.34 },
      { food: 'Gorgeous Steel Sandwich', totalCost: 18.44 },
      { food: 'Handmade Concrete Sandwich', totalCost: 18.49 },
      { food: 'Tasty Granite Sandwich', totalCost: 18.73 },
      { food: 'Ergonomic Metal Sandwich', totalCost: 19.14 },
      { food: 'Intelligent Wooden Sandwich', totalCost: 19.3 },
      { food: 'Intelligent Fresh Sandwich', totalCost: 19.44 },
      { food: 'Intelligent Steel Sandwich', totalCost: 19.94 },
      { food: 'Licensed Soft Sandwich', totalCost: 20.09 },
      { food: 'Unbranded Soft Sandwich', totalCost: 20.31 },
      { food: 'Refined Wooden Sandwich', totalCost: 20.52 },
      { food: 'Awesome Soft Sandwich', totalCost: 20.77 },
      { food: 'Awesome Cotton Sandwich', totalCost: 20.79 },
      { food: 'Tasty Granite Sandwich', totalCost: 20.84 },
      { food: 'Licensed Fresh Sandwich', totalCost: 20.84 },
      { food: 'Incredible Plastic Sandwich', totalCost: 21.09 },
      { food: 'Practical Fresh Sandwich', totalCost: 21.51 },
      { food: 'Fantastic Metal Sandwich', totalCost: 21.6 },
      { food: 'Generic Cotton Sandwich', totalCost: 21.66 },
      { food: 'Licensed Frozen Sandwich', totalCost: 21.75 },
      { food: 'Handcrafted Rubber Sandwich', totalCost: 22.45 },
      { food: 'Handcrafted Concrete Sandwich', totalCost: 22.63 },
      { food: 'Small Metal Sandwich', totalCost: 22.75 },
      { food: 'Unbranded Concrete Sandwich', totalCost: 22.8 },
      { food: 'Small Cotton Sandwich', totalCost: 22.94 },
      { food: 'Gorgeous Concrete Sandwich', totalCost: 22.99 },
      { food: 'Incredible Cotton Sandwich', totalCost: 23.08 },
      { food: 'Small Cotton Sandwich', totalCost: 23.16 },
      { food: 'Tasty Soft Sandwich', totalCost: 23.7 },
      { food: 'Handmade Frozen Sandwich', totalCost: 24.31 },
      { food: 'Licensed Steel Sandwich', totalCost: 24.53 },
      { food: 'Handmade Cotton Sandwich', totalCost: 24.74 },
      { food: 'Incredible Concrete Sandwich', totalCost: 24.77 },
      { food: 'Ergonomic Wooden Sandwich', totalCost: 24.79 },
      { food: 'Gorgeous Concrete Sandwich', totalCost: 24.79 },
      { food: 'Practical Frozen Sandwich', totalCost: 24.91 }
    ];
    expect(hotel.bookingMagic.listTheMenuInOrder()).to.eql(menuInOrder);
  });

  describe('SPIES', () => {
    it('should call for updates on the DOM function to display food menu', () => {
      hotel.bookingMagic.menuToBook();
      expect(domUpdates.displayFoodMenu).to.have.been.called(100);
    });

    it('should call to update available rooms based on the filter for date and room type', () => {
      hotel.bookingMagic.listOfAvailableRoomsWithType(
        '2019/09/18',
        'junior suite'
      );
      expect(domUpdates.appendRoomList).to.have.been.called(20);
      expect(domUpdates.appendEmptyRoomList).to.not.have.been.called();
    });
  });
});
