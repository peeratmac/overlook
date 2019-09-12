import domUpdates from './domUpdates';

class Customer {
  constructor(id, name, roomsData, bookingsData, roomServicesData) {
    this.id = id;
    this.name = name;
    this.rooms = roomsData || [];
    this.bookings = bookingsData || [];
    this.roomServices = roomServicesData || [];
  }
}

export default Customer;
