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
    this.currentUser = '';
  }

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
    // ! Don't forget to change this and remove the comment^^
    // ! use '2019/07/28' to check for data or styling
    let allOrdersToday = this.bookingMagic.findRoomServicesOrderMap(
      this.getTodayDate()
    );

    domUpdates.showAllOrdersList(allOrdersToday);

    let todayRoomServicesRevenue = this.bookingMagic.calculateNightlyRoomServiceRevenue(
      this.getTodayDate()
    );

    domUpdates.showRoomServicesRevenueOnOrdersPage(todayRoomServicesRevenue);
  }

  roomsPageDomUpdates() {
    let mostPopular = this.bookingMagic.mostRoomsBookedMap();
    domUpdates.showMostPopularDate(mostPopular);

    let leastPopular = this.bookingMagic.leastRoomsBookedMap();
    domUpdates.showLeastPopularDate(leastPopular);
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

  getUserRoomServices(userID) {
    return this.roomServiceData.filter(order => order.userID === userID);
  }

  getUserRoomServicesMap(userID) {
    return this.getUserRoomServices(userID).map(order => {
      return ` Menu: ${order.food}, Bill: ${order.totalCost}`;
    });
  }

  // * Look Up Customer

  getCustomerID2(nameInput) {
    let idX = this.userData.find(user => user.name === nameInput).id;
    return idX;
  }

  lookUpCustomerMeals(searchedCustomer) {
    this.currentUser = searchedCustomer;
    let idX = this.getCustomerID2(searchedCustomer);
    return this.getUserRoomServicesMap(idX);
  }

  lookUpCustomerTotalMeals(searchedCustomer) {
    this.currentUser = searchedCustomer;
    let idX = this.getCustomerID2(searchedCustomer);

    return this.getUserRoomServices(idX).reduce((acc, foodItem) => {
      return (acc = acc + foodItem.totalCost);
    }, 0);
  }

  // * Customer Booking History
  lookUpCustomerBookingHistory(searchedCustomer) {
    this.currentUser = searchedCustomer;
    let idX = this.getCustomerID2(searchedCustomer);

    let roomsBookedOnGivenDate = this.bookingData.filter(
      booking => booking.userID === idX
    );

    return roomsBookedOnGivenDate;
  }

  lookUpCustomerBookingHistoryMap(searchedCustomer) {
    return this.lookUpCustomerBookingHistory(searchedCustomer).map(
      userHistory => {
        return ` Date: ${userHistory.date}, Room: ${userHistory.roomNumber} `;
      }
    );
  }

  // Live Search
  grabCustomers() {
    this.userData.forEach(user => {
      const roomDataX = [1, 2, 3];
      const bookingDataX = this.lookUpCustomerBookingHistoryMap(user.name);
      const roomServiceDataX = this.lookUpCustomerMeals(user.name);
      let userToSearch = new Customer(
        user.id,
        user.name,
        roomDataX,
        bookingDataX,
        roomServiceDataX
      );
      this.users.push(userToSearch);
      console.log(this.users);
    });
  }
}

export default Hotel;
