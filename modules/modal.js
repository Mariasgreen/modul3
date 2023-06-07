/* eslint-disable require-jsdoc */


import create from './const.js';

const {modal,
  discont,
  span} = create;


import picture from './picture.js';
const {
  file,

  spacer,
  spacerContainer,
  messageContainer} = picture;


const closeModal = () => {
  file.value = '';
  spacer.src = '';
  spacerContainer.style.display = 'none';
  messageContainer.style.display = 'none';


  discont.disabled = true;
  modal.classList.remove('active');
};

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const num = (span) => span.textContent = getRandom(500, 900);

const openModal = () => {
  modal.classList.add('active');
  num(span);
};


export {closeModal, getRandom, num, openModal};