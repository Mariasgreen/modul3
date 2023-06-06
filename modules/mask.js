import openModal from './modal.js';


const validation = new window.JustValidate('.reservation__form');


validation
    .addField('#reservation__name', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'too short',

      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'too long',
      },
      {rule: 'required',
        value: 30,
        errorMessage: 'write your name',
      },
    ])
    .addField('#reservation__phone', [
      {rule: 'required',
        errorMessage: 'write your phone',
      },
      {
        validator() {
          const telInput = document.querySelector('#reservation__phone');
          const phone = telInput.inputmask.unmaskedvalue();
          return !!(Number(phone) && phone.length === 10);
        },
        errorMessage: 'wrong number',
      },

    ])
    .addField('select[name="people"]', [
      {rule: 'required',
        errorMessage: 'Please select the number of people',
      },
    ])

    .addField('select[name="dates"]', [
      {rule: 'required',
        errorMessage: 'Please select a date',
      },
    ])

    .onSuccess(e => {
      const form = document.querySelector('.reservation__form');
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


      openModal(data);
    });


export default validation;


