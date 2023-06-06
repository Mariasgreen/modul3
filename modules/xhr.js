/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

import validation from './mask.js';

const telMask = new window.Inputmask('+7 (999)-999-99-99');
const telInput = document.querySelector('#reservation__phone');

telMask.mask(telInput);

const form = document.querySelector('.reservation__form');

const sent = (data) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();

  xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      resolve();
    } else {
      reject(xhr.status);
    }
  };

  xhr.onerror = function() {
    reject(xhr.status);
  };

  xhr.send(JSON.stringify(data));
});


form.addEventListener('submit', (e) => {
  e.preventDefault();

  /*
  const date = form.querySelector('select[name="dates"]').value;
  const people = form.querySelector('select[name="people"]').value;
  const name = form.querySelector('#reservation__name').value;
  const phone = form.querySelector('#reservation__phone').value;

  const data = {
    name,
    phone,
    date,
    people,

  };

  */
  validation.validate();
});


const formFooter = document.querySelector('.footer__form');


formFooter.addEventListener('submit', e => {
  e.preventDefault();

  const email = document.querySelector('.footer__input').value;

  const request = new XMLHttpRequest();
  request.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);

  request.onload = function() {
    if ((request.status >= 200 && request.status < 300)) {
      formFooter.innerHTML = '<h2>Ваша заявка успешно отправлена</h2>&nbsp;<p>Наши менеджеры свяжутся с вами в течении 3-х рабочих дней</p>';
    } else {
      formFooter.innerHTML = '<p>Что-то пошло не так. Пожалуйста, повторите попытку позже.</p>';
    }
  };


  request.send(email);
});


export default sent;
