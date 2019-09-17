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
    $('.occupancy-percentage').append(
      `<span class="main-tab-span"><span class="main-tab-numbers">${Math.floor(
        percent
      )}%</span> occupancy right now</span>`
    );
  },

  showRoomsAvailable(rooms) {
    $('.total-rooms-available').append(
      `<span class="main-tab-span"><span class="main-tab-numbers">${rooms}</span> rooms avaialble</span>`
    );
  },

  showRoomsRevenue(revenue) {
    $('.room-revenue').append(
      `<span class="main-tab-span"><span class="main-tab-numbers">$${Math.floor(
        revenue
      )}</span> rooms revenue today</span>`
    );
  },

  showRoomServicesRevenue(revenue) {
    $('.room-service-revenue').append(
      `<span class="main-tab-span"><span class="main-tab-numbers">$${Math.floor(
        revenue
      )}</span> room services revenue today</span>`
    );
  },

  showTotalRevenue(revenue) {
    $('.total-revenue').append(
      `<span class="main-tab-span"><span class="main-tab-numbers">$${Math.floor(
        revenue
      )}</span> total revenue today</span>`
    );
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
    let content = $(
      `<div class="room-list-div"><p>Type: ${roomType}</p><p>Bidet: ${bidet}</p><p>Bed Size: ${bedSize}</p> <p>Number of Beds: ${numBeds}</p><h4>Nightly Price: ${costPerNight}</h4><button class="book-button book-room-button-${roomNumber}" data-room="${roomNumber}">Book</button></div>`
    );

    $('.append-room-list').append(content);
  },

  appendEmptyRoomList() {
    $('.append-room-list').text(`No Rooms Available Today`);
  },

  emptyOutRoomSearch() {
    $('.append-room-list').empty();
  },

  showRoomBookingHistory(info) {
    $('.customer-rooms-history-list').text(info);
  },

  showRoomBookingHistoryX(date, room) {
    let info = `<p class="customer-rooms-history-list-p">Date: ${date}, Room: ${room}</p>`;
    $('.customer-rooms-history-list').append(info);
  },

  displayRoomSearchedDate(searchedDate) {
    $('.room-order-date').text(searchedDate);
  },

  updateNewlyBookedRoomAndDate(date, roomNumber) {
    $('.newly-booked-list').append(
      `<p class="newly-booked-display"> Date: ${date} Room: ${roomNumber}</p>`
    );
  },

  displayMatchingNames(names) {
    $('.search-result').empty();
    $('.search-result').append(
      names.map(
        name =>
          `<div class="name-list-display name-${name.id}" data-id="${name.id}" data-name="${name.name}">${name.name}</div>`
      )
    );
  },

  updateCustomerSpan(searchedName) {
    $('.customer-span').text(searchedName);
  },

  addClassToActivateAddCustomerButton() {
    $('.customer-tab-add-customer').addClass(
      'customer-tab-add-customer-enabled '
    );
  },

  removeClassFromAddCustomerButton() {
    $('.customer-tab-add-customer').removeClass(
      'customer-tab-add-customer-enabled '
    );
  },

  toggleLiveSearchSelected(id) {
    $(`.name-${id}`).toggleClass('live-search-selected');
  },

  displayFoodMenu(food, price) {
    let foodItems = $(
      `<p class="food-menu-p">${food}, $${price}<button class="order-food-button" data-food="${food}" data-price="${price}">Order</button></p>`
    );
    $('.new-orders-list').append(foodItems);
  },

  updateNewlyFoodOrders(food, price) {
    $('.newly-food-orders').append(
      `<p class="newly-food-orders-display">Food: ${food}  Price: ${price}</p>`
    );
  },

  clearNewlyBookedListAndFoodOrders() {
    $('.newly-food-orders').empty();
    $('.newly-booked-list').empty();
    $('.customer-rooms-history-list').empty();
    $('.order-history-list').empty();
    $('.lifetime-order-spending').empty();
  },

  appendSuggestionToAddCustomer() {
    $('.search-list-empty').append(
      `<h3>Results Not Found, Please Search or Add New Customer</h3>`
    );
  },

  emptySuggestionToAddCustomer() {
    $('.search-list-empty').empty();
  }
};

export default domUpdates;
