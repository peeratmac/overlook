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

  // * Rooms Booked (Highest and Lowest)

  findDateWithMostRoomsBooked() {
    let bookingDataWithDateAndRoomsCount = this.bookings.reduce(
      (acc, booking) => {
        !acc[booking.date] ? (acc[booking.date] = 1) : acc[booking.date]++;
        return acc;
      },
      {}
    );

    let maxRoomCount = Object.values(bookingDataWithDateAndRoomsCount).sort(
      (a, b) => b - a
    )[0];

    let maxRoomDates = Object.keys(bookingDataWithDateAndRoomsCount).filter(
      date => bookingDataWithDateAndRoomsCount[date] === maxRoomCount
    );

    return { maxRoomDates: maxRoomDates, maxRoomCount: maxRoomCount };
  }

  findDateWithLeastRoomsBooked() {
    let bookingDataWithDateAndRoomsCount = this.bookings.reduce(
      (acc, booking) => {
        !acc[booking.date] ? (acc[booking.date] = 1) : acc[booking.date]++;
        return acc;
      },
      {}
    );

    let lengthOfData = Object.values(bookingDataWithDateAndRoomsCount).length;

    let minRoomCount = Object.values(bookingDataWithDateAndRoomsCount).sort(
      (a, b) => b - a
    )[lengthOfData - 1];

    let minRoomDates = Object.keys(bookingDataWithDateAndRoomsCount).filter(
      date => bookingDataWithDateAndRoomsCount[date] === minRoomCount
    );

    return { minRoomDates: minRoomDates, minRoomCount: minRoomCount };
  }
}

export default Booking;
