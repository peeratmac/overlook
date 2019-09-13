import domUpdates from './domUpdates';

class Customer {
  constructor(id, name, roomData, bookingData, roomServiceData) {
    this.id = id;
    this.name = name;
    this.rooms = roomData || [];
    this.bookings = bookingData || [];
    this.roomServices = roomServiceData || [];
  }
}

export default Customer;
