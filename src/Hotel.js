import Booking from './Booking';
import Customer from './Customer';
import RoomService from './RoomService';
import domUpdates from './domUpdates';
class Hotel {
  constructor(users, rooms, bookings, roomServices) {
    this.userData = users;
    this.roomData = rooms;
    this.bookingData = bookings;
    this.roomServiceData = roomServices;
    this.users = [];
    this.bookingMagic;

    // Todo: today's date, search date, search room type, search specific customer/user, what is the current customer
  }

  // ! commenting out domUpdates due to jQuery requires a window with a document - need chai spy

  mainHotelHandler() {
    this.bookingMagic = new Booking(
      this.userData,
      this.bookingData,
      this.roomServiceData,
      this.roomData,
      this.getTodayDate()
    );

    let roomsBookedOnGivenDate = this.bookingMagic.findRoomsBookedOnGivenDate(
      this.getTodayDate()
    );

    return roomsBookedOnGivenDate;
  }

  mainPageDomUpdates() {
    this.mainHotelHandler();

    let roomsAvailable = this.bookingMagic.calculateNumberOfRoomsAvailable(
      this.getTodayDate()
    );
    domUpdates.showRoomsAvailable(roomsAvailable);

    let todayOccupancy = this.bookingMagic.calculateOccupancyOnGivenDate(
      this.getTodayDate()
    );
    domUpdates.showOccupancyPercentage(todayOccupancy);

    let todayRoomsRevenue = this.bookingMagic.calculateNightlyRoomRevenue(
      this.getTodayDate()
    );
    domUpdates.showRoomsRevenue(todayRoomsRevenue);

    let todayRoomServicesRevenue = this.bookingMagic.calculateNightlyRoomServiceRevenue(
      this.getTodayDate()
    );
    domUpdates.showRoomServicesRevenue(todayRoomServicesRevenue);

    let totalRevenue = this.bookingMagic.calculateNightlyCombinedRevenue(
      this.getTodayDate()
    );
    domUpdates.showTotalRevenue(totalRevenue);
  }

  ordersPageDomUpdates() {
    // ! Hardcoded in the date with data for right now to display
    let allOrdersToday = this.bookingMagic.findRoomServicesOrderMap(
      '2019/07/28'
    );
    domUpdates.showAllOrdersList(allOrdersToday);
  }

  getTodayDate() {
    let date = `${new Date().getFullYear()}/${String(
      new Date().getMonth() + 1
    ).padStart(2, '0')}/${String(new Date().getDate()).padStart(2, '0')}`;
    return date;
  }

  getCustomerName(nameInput) {
    let customer;
    customer = this.userData.find(user => user.name === nameInput).name;
    return customer;
  }

  getCustomerID(idInput) {
    let customer;
    customer = this.userData.find(user => user.id === idInput).id;
    return customer;
  }

  addCustomerName(name) {
    let currentLength = this.userData.length;
    let id = currentLength + 1;
    let newUser = new Customer(id, name, [], [], []);
    this.userData.push(newUser);
    return this.userData[id - 1];
  }
}

export default Hotel;
