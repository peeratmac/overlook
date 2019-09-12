import domUpdates from './domUpdates';

class Customer {
  constructor(id, name, allRooms, allBookings, allRoomServices) {
    this.id = id;
    this.name = name;
    this.rooms = allRooms || [];
    this.bookings = allBookings || [];
    this.roomServices = allRoomServices || [];
  }
}

export default Customer;
