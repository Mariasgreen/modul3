import {loadGoods}  from './render.js'

import create from './const.js';
const { btn,
  table,
  modal,
  form,
  price,
  count,
  discont,
  formelems,
  checkbox,
  } = create;

import {closeModal,  openModal}  from './modal.js'
import {getTotal, allTotalTableSum}  from './summs.js'
import{addProductData, numbers,  addProductPage} from './table.js';
import {toBase}  from './picture.js'

export const formModal = () =>{
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
      
      
        const formData = new FormData(e.target);
      
        const newProduct = Object.fromEntries(formData);

        newProduct.image = await toBase(newProduct.image);
        
        newProduct.id = document.querySelector('.vendor-code__id').textContent;
      
        newProduct.discont = document.querySelector('.modal__input_discount').value;
      
        addProductData(newProduct);
   
      
        numbers();
  await allTotalTableSum();
      
        form.reset();
        closeModal();
      });
}

const openConfirmationModal = async (id, target) => {
 
  const modal = document.createElement('div');
  modal.classList.add('overlay', 'active');


  const modalContent = document.createElement('div');
  modalContent.classList.add('overlay__modal', 'modal');

  const message = document.createElement('p');
  message.textContent = 'Are you sure you want to delete this product?';

  const confirmButton = document.createElement('button');
  confirmButton.textContent = 'Confirm';
  confirmButton.addEventListener('click', async () => {
    try {
      await fetch(`http://localhost:3000/api/goods/${id}`, {
        method: 'DELETE',
      });

      const data = await loadGoods();
      const connectIndex = data.findIndex((item) => item.id == id);
      data.splice(connectIndex, 1);

      target.closest('.row').remove();
      console.log(data);
      numbers(data);
      await allTotalTableSum();
    } catch (error) {
      console.error('Failed to delete the product:', error);
    }

    modal.remove();
  });

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', () => {
    modal.remove();
  });

  modalContent.appendChild(modal);
  modal.appendChild(message);
  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);

 
  document.body.appendChild(modal);
};

export const tableNum = () => {
  table.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.table__btn_del')) {
      const connectId = target.closest('tr').dataset.id;
      openConfirmationModal(connectId, target);
    }
  });
};
/*
const openImage = async (image, target) => {
  const modal = document.createElement('div');
  modal.classList.add('overlay', 'active');

  const modalContent = document.createElement('div');
  modalContent.classList.add('overlay__modal', 'modal');

  const closeButton = document.createElement('button');
  closeButton.classList.add('modal__close');
  closeButton.innerHTML = `
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>
  `;

  closeButton.addEventListener('click', closeModal);

  const response = await fetch(`http://localhost:3000/api/goods/${image}`, {
    method: 'GET'
  });

  if (response.ok) {
    const photoUrl = await response.text(); // Assuming the response is a URL string
    const img = document.createElement('img');
    img.src = photoUrl;

    modalContent.appendChild(img);
    modalContent.appendChild(closeButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  }
};
*/

export const openWindow = () => {
  table.addEventListener('click', async (e) => {
    const target = e.target;
    if (target.closest('.table__btn_pic')) {
      const row = target.closest('tr');
      const id = row.dataset.id;

      try {
        const response = await fetch(`http://localhost:3000/api/goods/${id}`);
        if (!response.ok) {
          throw new Error('Image not found');
        }

        const data = await response.json();
        console.log(data);

        const pictureUrl = `http://localhost:3000/${data.image}`;

        const w = screen.width / 2 - 400;
        const h = screen.height / 2 - 300;
        window.open(pictureUrl, '_blank', `width=800,height=600,left=${w},top=${h}`);
      } catch (error) {
        console.error(error);
        window.alert(error.message); // Display the error message in a window alert
      }
    }
  });
};



/*
export const openWindow = () => {
  table.addEventListener('click', async (e) => {
    const target = e.target;
    if (target.closest('.table__btn_pic')) {
      const image = target.closest('.table__btn_pic').dataset.pic;
      const w = screen.width / 2 - 400;
      const h = screen.height / 2 - 300;
      window.open(image, '_blank', `width=800,height=600,left=${w},top=${h}`);

      const modal = document.createElement('div');
      modal.classList.add('overlay', 'active');

      const modalContent = document.createElement('div');
      modalContent.classList.add('overlay__modal', 'modal');

      const closeButton = document.createElement('button');
      closeButton.classList.add('modal__close');
      closeButton.innerHTML = `
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>
      `;

      closeButton.addEventListener('click', () => {
        modal.remove();
      });

      const response = await fetch(`http://localhost:3000/api/goods/${image}`, {
        method: 'GET'
      });

      if (response.ok) {
        const photoUrl = await response.json();
        const img = document.createElement('img');
        img.src = photoUrl;

        modalContent.appendChild(img);
        modalContent.appendChild(closeButton);

        modal.appendChild(modalContent);
        document.body.appendChild(modal);
      }
    }
  });
};


*/






  export const modalBtn = () =>{
    btn.addEventListener('click', () => {
        openModal();
      });
  }
 
  



  export const modalModal = () =>{
    modal.addEventListener('click', (e) => {
        const target = e.target;
        if (target === modal || target.closest('.modal__close')) {
          closeModal();
        }
      });
  }
 
export const totalModal = () =>{
  formelems.forEach(elem => {
    const modalTotal = document.querySelector('.modal__total-price');
    modalTotal.textContent = '0.00';
    elem.addEventListener('blur', () => {
      modalTotal.value = getTotal(price.value, count.value, discont.value).toFixed(2);
    });
  });
}
 
  
  export const reqModal = () =>{
    formelems.forEach((formelem) => {
      formelem.required = true;
    });
  }
  

  export const checkboxModal = () => {
    checkbox.onclick = function() {
      const isCheck = checkbox.checked;
      if (isCheck) {
        discont.disabled = false;
      } else {
        discont.value = '';
        discont.disabled = true;
      }
    };
  }