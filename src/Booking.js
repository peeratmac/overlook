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

  calculateNumberOfRoomsAvailable(date) {
    return this.rooms.length - this.findRoomsBookedOnGivenDate(date).length;
  }

  calculateNightlyRoomRevenue(date) {
    let roomNumbersTaken = this.findRoomsBookedOnGivenDate(date).map(
      rooms => rooms.roomNumber
    );
    let total = roomNumbersTaken.reduce((acc, eachTakenRoom) => {
      acc =
        acc +
        this.rooms.find(room => room.number === eachTakenRoom).costPerNight;
      return acc;
    }, 0);
    return total;
  }

  calculateNightlyRoomServiceRevenue(date) {
    let ordersPlaced = this.roomServices.filter(order => order.date === date);

    let total = ordersPlaced.reduce((acc, eachOrder) => {
      acc = acc + eachOrder.totalCost;
      return acc;
    }, 0);
    return total;
  }

  calculateNightlyCombinedRevenue(date) {
    return (
      this.calculateNightlyRoomRevenue(date) +
      this.calculateNightlyRoomServiceRevenue(date)
    );
  }

  // * Room Services

  findRoomServicesOrder(date) {
    let ordersPlaced = this.roomServices.filter(order => order.date === date);
    return ordersPlaced;
  }

  findRoomServicesOrderMap(date) {
    return this.findRoomServicesOrder(date).map(order => {
      return ` Menu: ${order.food}, Bill: ${order.totalCost}`;
    });
  }
}

export default Booking;
