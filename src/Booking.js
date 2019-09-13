class Booking {
  constructor(users, bookings, roomServices, rooms, dayInQuestion) {
    this.users = users;
    this.bookings = bookings;
    this.roomServices = roomServices;
    this.rooms = rooms;
    this.dayInQuestion = dayInQuestion;
  }

  findRoomsBookedOnGivenDate(date) {
    return this.bookings.filter(booking => booking.date === date);
  }

  calculateOccupancyOnGivenDate(date) {
    return (
      (this.findRoomsBookedOnGivenDate(date).length / this.rooms.length) * 100
    );
  }
}

export default Booking;
