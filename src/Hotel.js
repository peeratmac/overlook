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

    // Todo: today's date, search date, search room type, search specific customer/user, what is the current customer
  }

  mainHotelHandler() {}

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
}

export default Hotel;
