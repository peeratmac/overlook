class Booking {
  constructor(users, rooms, bookings, roomServices) {
    this.users = users;
    this.rooms = rooms;
    this.bookings = bookings;
    this.roomServices = roomServices;
    // this.userID = userID;
    // this.date = date;
    // this.roomNumber = roomNumber;
  }

  getNumberOfAvailableRooms(date) {
    console.log('here');
    return this.bookings.filter(booking => booking.date === date);
  }
}

export default Booking;
