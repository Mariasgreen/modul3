import {addContactData, removeStorage} from './serviceStorage';

import create from  './create.mjs';
const {createRow} = create;

export const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };


  export const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };
    btnAdd.addEventListener('click', openModal);

    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };

    formOverlay.addEventListener('click', (e) => {
      const target = e.target;
      if (target === formOverlay || target.classList.contains('close')) {
        closeModal();
      }
    });

    return {
      closeModal,
    };
  };
 export const deleteControl = (bthDel, list) => {
    bthDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.del-icon')) {
        target.closest('.contact').remove();
        removeStorage(target.dataset.phone);
      }
    });
  };


  export const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  };

  export const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newContact = Object.fromEntries(formData);
      addContactPage(newContact, list);
      addContactData(newContact);
      form.reset();
      closeModal();
    });
  };

