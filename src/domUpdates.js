import $ from 'jquery';
import Hotel from './Hotel';
import Booking from './Booking';

const domUpdates = {
  showDate(date) {
    $('.header__date').text(date);
    $('.today-date').text(date);
  },

  showCurrentUser(name) {
    $('.header__customer-name').text(`Current Customer: ${name}`);
  },

  showOccupancyPercentage(percent) {
    $('.occupancy-percentage').text(`${percent}% occupancy right now`);
  },

  showRoomsAvailable(rooms) {
    $('.total-rooms-available').text(`${rooms} avaialble`);
  },

  showRoomsRevenue(revenue) {
    $('.room-revenue').text(`$${revenue} rooms revenue today`);
  },

  showRoomServicesRevenue(revenue) {
    $('.room-service-revenue').text(`$${revenue} room services revenue today`);
  },

  showTotalRevenue(revenue) {
    $('.total-revenue').text(`$${revenue} total revenue today`);
  },

  // Orders/RoomServices
  showAllOrdersList(listOfOrders) {
    $('.all-orders-today-list').text(`${listOfOrders}`);
  }
};

export default domUpdates;
