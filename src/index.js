import $ from 'jquery';
import './css/base.scss';

import Hotel from '../src/Hotel';
import Booking from '../src/Booking'
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
}).catch(err => consolelog(`Error: ${err}`))

// * End of fetch

// Todo: here here //

setTimeout(() => {
  let hotel;
  hotel = new Hotel(dataFromFetch.users, dataFromFetch.rooms, dataFromFetch.bookings, dataFromFetch.roomServices);
  let todayDate = hotel.getTodayDate();
  domUpdates.showDate(todayDate);
  hotel.mainHotelHandler();
  hotel.mainPageDomUpdates();
  domUpdates.showCurrentUser(dataFromFetch.users[5].name);
  console.log(hotel.bookingMagic);
}, 3000);