

import create from './const.js';

const{ modal,
    discont,
    span}=create;

  
  const closeModal = () => {
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
  
  
  
 export{closeModal, getRandom, num, openModal}