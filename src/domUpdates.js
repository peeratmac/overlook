import $ from 'jquery';
import Hotel from './Hotel';
import Booking from './Booking';

const domUpdates = {
  showDate(date) {
    $('.header__date').text(date);
    $('.today-date').text(date);
  },

  showCurrentUser(name) {
    $('.customer-name').text(`${name}`);
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
  },

  showRoomServicesRevenueOnOrdersPage(revenue) {
    $('.order-spending').text(`Total Orders Today: $${revenue}`);
  },

  updateSelectedDateText(date) {
    $('.selected-date-orders').text(date);
  },

  showAllOrdersListForDate(listOfOrders) {
    $('.all-orders-selected-date-list').text(`${listOfOrders}`);
  },

  showRoomServicesRevenueOnOrdersPageForDate(revenue) {
    $('.order-spending-selected-date').text(`Total Orders: $${revenue}`);
  },

  displayCustomerName(name) {
    $('.customer-name').text(name);
  },

  showOrderHistoryList(listOfOrders) {
    $('.order-history-list').text(listOfOrders);
  },

  showOrderHistoryTotal(revenue) {
    $('.lifetime-order-spending').text(`Lifetime Spending: $${revenue}`);
  },

  showMostPopularDate(maxDate) {
    $('.most-popular-date').text(maxDate);
  },

  showLeastPopularDate(minDate) {
    $('.date-with-most-rooms').text(minDate);
  },

  appendRoomList(roomNumber, roomType, bidet, bedSize, numBeds, costPerNight) {
    let row1 = $(
      `<button class="book-room-button-${roomNumber}">Book</button> <h5>Type: ${roomType}</h5>`
    );
    let row2 = $(
      `<p>Bidet: ${bidet}  Bed Size: ${bedSize}  Number of Beds: ${numBeds}</p>`
    );
    let row3 = $(`<h4>Nightly Price: ${costPerNight}</h4>`);
    $('.append-room-list').append(row1, row2, row3);
  },

  appendEmptyRoomList() {
    $('.append-room-list').text(`No Rooms Available Today`);
  },

  showRoomBookingHistory(info) {
    $('.customer-rooms-history-list').text(info);
  },

  displayRoomSearchedDate(searchedDate) {
    $('.room-order-date').text(searchedDate);
  },

  displayMatchingNames(names) {
    $('.search-result').empty();
    $('.search-result').append(
      names.map(
        name =>
          `<div class="name-${name.id}" data-id="${name.id}" data-name="${name.name}">${name.name}</div>`
      )
    );
  }
};

export default domUpdates;
