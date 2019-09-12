import Booking from './Booking';
import Customer from './Customer';
import RoomService from './RoomService';
import domUpdates from './domUpdates';
class Hotel {
  constructor(users, rooms, bookings, roomServices) {
    this.allUsersData = users;
    this.allRoomsData = rooms;
    this.allBookingsData = bookings;
    this.allRoomServicesData = roomServices;
  }

  getTodayDate() {
    let date = `${new Date().getFullYear()}/${String(
      new Date().getMonth() + 1
    ).padStart(2, '0')}/${String(new Date().getDate()).padStart(2, '0')}`;
    domUpdates.showDate(date);
  }

  instantiateBookings() {}
}

export default Hotel;
