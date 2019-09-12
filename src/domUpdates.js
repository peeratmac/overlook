import $ from 'jquery';
import Hotel from './Hotel';

const domUpdates = {
  showDate(date) {
    $('.header__date').text(date);
    $('.today-date').text(date);
  }
};

export default domUpdates;
