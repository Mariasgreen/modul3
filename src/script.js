/* eslint-disable max-len */


import {getStorage} from './script/serviceStorage';


import * as render from './script/render';

import {formControl,  deleteControl, modalControl, hoverRow}  from './script/control';


import './scss/index.scss';

document.addEventListener('DOMContentLoaded', () => {
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const data = getStorage('phonebook');

    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      bthDel,
    } = render.renderPhoneBook(app, title);

    const { closeModal } = modalControl(btnAdd, formOverlay);
    const allRow = render.renderContacts(list, data);
    hoverRow(allRow, logo);

    deleteControl(bthDel, list);
    formControl(form, list, closeModal);
  };

  window.phoneBookInit = init;

  phoneBookInit('#app', 'Maria');
});