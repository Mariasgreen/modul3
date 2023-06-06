/* eslint-disable max-len */
// import './modules/xhr.js';
import loadCSS from './load.js';
import sent from './xhr.js';


const form = document.querySelector('.reservation__form');
const price = form.querySelector('.reservation__price');

const openModal = async (data) => {
  await loadCSS('css/modal.css');

  const modalWindow = document.createElement('div');
  modalWindow.classList.add('overlay', 'overlay_confirm');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const title = document.createElement('h2');
  title.classList.add('modal__title');
  title.textContent = `Подтверждение заявки`;


  const Text1 = document.createElement('p');
  Text1.classList.add('modal__text');
  Text1.textContent = `Бронирование путешествия в Индию на ${data.people} человек`;

  const Text2 = document.createElement('p');
  Text2.classList.add('modal__text');
  Text2.textContent = `В даты: ${data.date}`;

  const Text3 = document.createElement('p');
  Text3.classList.add('modal__text');
  Text3.textContent = `Стоимость тура: ${price.textContent}`;


  const modalButton = document.createElement('div');
  modalButton.classList.add('modal__button');

  const modalBtnConfirm = document.createElement('button');
  modalBtnConfirm.classList.add('modal__btn', 'modal__btn_confirm');
  modalBtnConfirm.innerText = 'Подтверждаю';

  const modalBtnEdit = document.createElement('button');
  modalBtnEdit.classList.add('modal__btn', 'modal__btn_edit');
  modalBtnEdit.innerText = 'Изменить данные';


  modalBtnConfirm.addEventListener('click', async () => {
    const form = document.querySelector('.reservation__form');
    try {
      await sent(data);
      const formElements = form.elements;
      for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
      }
      modalWindow.remove();
      form.innerHTML =
        '<p>Ваше бронирование успешно отправлено. Мы свяжемся с Вами в скором времени!</p>';
    } catch {
      form.innerHTML =
        '<p>Что-то пошло не так. Пожалуйста, повторите попытку позже.</p>';
    }
  });


  modalBtnEdit.addEventListener('click', () => {
    modalWindow.remove();
  });


  modalButton.append(modalBtnConfirm);
  modalButton.append(modalBtnEdit);

  modal.append(title);
  modal.append(Text1);
  modal.append(Text2);
  modal.append(Text3);
  modal.append(modalButton);

  modalWindow.append(modal);

  document.body.append(modalWindow);
};


export default openModal;

