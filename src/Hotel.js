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
}

export default Hotel;
