import $ from 'jquery';
import Hotel from './Hotel';

const domUpdates = {
  showDate(date) {
    $('.header__date').text(date);
    $('.today-date').text(date);
  },

  showCurrentUser(name) {
    $('.header__customer-name').text(`Current Customer: ${name}`);
  }
};

export default domUpdates;
