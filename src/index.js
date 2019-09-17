import $ from 'jquery';
import 'jquery-ui-bundle';
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

let rooms = fetch(
  'https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms'
)
  .then(data => data.json())
  .then(data => (rooms = data.rooms))
  .catch(err => console.log('Unable to fetch data', err));

let bookings = fetch(
  'https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings'
)
  .then(data => data.json())
  .then(data => (bookings = data.bookings))
  .catch(err => console.log('Unable to fetch data', err));

let roomServices = fetch(
  'https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices'
)
  .then(data => data.json())
  .then(data => (roomServices = data.roomServices))
  .catch(err => console.log('Unable to fetch data', err));

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
  hotel.grabCustomers();
  domUpdates.showCurrentUser('No Customer Selected');
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

$('.find-room-button').on('click', () => {
  domUpdates.emptyOutRoomSearch();
  let selectedOption = $('.select-option option:selected').text();
  console.log(selectedOption);
  let searchedDate = $('.rooms-date-input').val();
  if (searchedDate !== '') {
    hotel.bookingMagic.listOfAvailableRoomsWithType(
      searchedDate,
      selectedOption
    );
    domUpdates.displayRoomSearchedDate(searchedDate);
  } else {
    window.alert('Please Enter Appropriate Date Input');
    domUpdates.appendEmptyRoomList();
  }
});

function liveSearchCustomer() {
  let searchedName = $('.customer-tab-input')
    .val()
    .toLowerCase();

  let matchedNames = hotel.users.filter(user => {
    return user.name.toLowerCase().includes(searchedName);
  });

  if (searchedName.length === 0) {
    matchedNames = [];
  }

  if (matchedNames.length === 0) {
    // ? Prompt to add customer
  }

  domUpdates.displayMatchingNames(matchedNames);
}

$('.customer-tab-input').on('keyup', () => {
  liveSearchCustomer();
  let searchedCustomer = $('.customer-tab-input').val();
  if (searchedCustomer.length !== 0) {
    domUpdates.addClassToActivateAddCustomerButton();
  } else {
    domUpdates.removeClassFromAddCustomerButton();
  }
});

function addCustomer() {
  let searchedCustomer = $('.customer-tab-input').val();
  if (searchedCustomer.length !== 0) {
    domUpdates.displayCustomerName(searchedCustomer);
    domUpdates.updateCustomerSpan(searchedCustomer);
  }
}

$('.customer-tab-add-customer').on('click', addCustomer);

$('.search-result').on('click', event => {
  let searchedCustomer = $(event.target).attr('data-name');
  domUpdates.displayCustomerName(searchedCustomer);
  let orderHistoryList = hotel.lookUpCustomerMeals(searchedCustomer);
  domUpdates.showOrderHistoryList(orderHistoryList);
  let orderHistoryTotal = hotel.lookUpCustomerTotalMeals(searchedCustomer);
  domUpdates.showOrderHistoryTotal(orderHistoryTotal);
  let roomHistory = hotel.lookUpCustomerBookingHistoryMap(searchedCustomer);
  domUpdates.showRoomBookingHistory(roomHistory);
  domUpdates.updateCustomerSpan(searchedCustomer);
});

$('.append-room-list').on('click', event => {
  let targetedRoom = $(event.target).attr('data-room');
  console.log(targetedRoom);
  // Todo: Append today's date Date: and then room number Room:
  // Todo: make sure to highlight it with different styling to show user that this is the new booking!
});

// Date Picker * currently need styling

// $('.rooms-date-input')
//   .datepicker({ dateFormat: 'yy/mm/dd' })
//   .val();

// $('.orders-date-input')
//   .datepicker({ dateFormat: 'yy/mm/dd' })
//   .val();

// End of Date Picker
