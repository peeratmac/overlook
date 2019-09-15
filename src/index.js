import $ from 'jquery';
import './css/base.scss';

import Hotel from '../src/Hotel';
import Booking from '../src/Booking';
import domUpdates from './domUpdates';

// Main tab is the default tab
$('.tabs-stage div').hide();
$('.tabs-stage div:first').show();
$('.tabs-navigation li:first').addClass('tab-active');

// Change tab class and display content
$('.tabs-navigation a').on('click', function(event) {
  event.preventDefault();
  $('.tabs-navigation li').removeClass('tab-active');
  $(this)
    .parent()
    .addClass('tab-active');
  $('.tabs-stage div').hide();
  $($(this).attr('href')).show();
});

// * Start of fetch
let users = fetch(
  'https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users'
)
  .then(data => data.json())
  .then(data => (users = data.users))
  .catch(error => console.log('Unable to fetch data', error));

setTimeout(() => console.log(users), 2000);

let rooms = fetch(
  'https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms'
)
  .then(data => data.json())
  .then(data => (rooms = data.rooms))
  .catch(err => console.log('Unable to fetch data', err));

setTimeout(() => console.log(rooms), 3000);

let bookings = fetch(
  'https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings'
)
  .then(data => data.json())
  .then(data => (bookings = data.bookings))
  .catch(err => console.log('Unable to fetch data', err));

setTimeout(() => console.log(bookings), 3000);

let roomServices = fetch(
  'https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices'
)
  .then(data => data.json())
  .then(data => (roomServices = data.roomServices))
  .catch(err => console.log('Unable to fetch data', err));

setTimeout(() => console.log(roomServices), 3000);

let dataFromFetch = { users: {}, rooms: {}, bookings: {}, roomServices: {} };

Promise.all([users, rooms, bookings, roomServices]).then(function(data) {
  dataFromFetch['users'] = data[0];
  dataFromFetch['rooms'] = data[1];
  dataFromFetch['bookings'] = data[2];
  dataFromFetch['roomServices'] = data[3];
  return dataFromFetch;
});

// * End of fetch

// Todo: here here //

let hotel;
setTimeout(() => {
  hotel = new Hotel(
    dataFromFetch.users,
    dataFromFetch.rooms,
    dataFromFetch.bookings,
    dataFromFetch.roomServices
  );

  let todayDate = hotel.getTodayDate();
  domUpdates.showDate(todayDate);
  hotel.mainHotelHandler();
  hotel.mainPageDomUpdates();
  hotel.ordersPageDomUpdates();
  hotel.roomsPageDomUpdates();
  domUpdates.showCurrentUser(dataFromFetch.users[0].name);
}, 3000);

$('.orders-date-search-button').on('click', () => {
  let searchedDate = $('.orders-date-input').val();
  domUpdates.updateSelectedDateText(searchedDate);
  let result = hotel.bookingMagic.findRoomServicesOrderMap(searchedDate);
  domUpdates.showAllOrdersListForDate(result);
  let revenueResult = hotel.bookingMagic.calculateNightlyRoomServiceRevenue(
    searchedDate
  );
  domUpdates.showRoomServicesRevenueOnOrdersPageForDate(revenueResult);
});

$('.customer-tab-search-customer').on('click', () => {
  let searchedCustomer = $('.customer-tab-input').val();
  domUpdates.displayCustomerName(searchedCustomer);
  // Todo: need to build this function out more -> after search, info on other tabs need to change based on currently selected customer
  let orderHistoryList = hotel.lookUpCustomerMeals(searchedCustomer);
  domUpdates.showOrderHistoryList(orderHistoryList);
  let orderHistoryTotal = hotel.lookUpCustomerTotalMeals(searchedCustomer);
  domUpdates.showOrderHistoryTotal(orderHistoryTotal);
});

$('.find-room-button').on('click', () => {
  domUpdates.appendEmptyRoomList();
  let selectedOption = $('.select-option option:selected').text();
  console.log(selectedOption);
  let searchedDate = $('.rooms-date-input').val();
  hotel.bookingMagic.listOfAvailableRoomsWithType(searchedDate, selectedOption);
});
