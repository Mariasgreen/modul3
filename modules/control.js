import {arr}  from '/main.js'
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


export const formModal = () =>{
    form.addEventListener('submit', e => {
        e.preventDefault();
      
      
        const formData = new FormData(e.target);
      
        const newProduct = Object.fromEntries(formData);
        newProduct.id = document.querySelector('.vendor-code__id').textContent;
      
        newProduct.discont = document.querySelector('.modal__input_discount').value;
      
      
        addProductPage(newProduct, table);
        addProductData(newProduct);
      
        numbers();
        allTotalTableSum();
      
        form.reset();
        closeModal();
      });
}



  export const tableNum = () =>{
    table.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.table__btn_del')) {
          const conectId = target.closest('tr').dataset.id;
          const conectIndex = arr.findIndex(item => item.id == conectId);
          arr.splice(conectIndex, 1);
          target.closest('.row').remove();
          console.log(arr);
          numbers(arr);
          allTotalTableSum();
        }
    
      });
  }



   
 export const openWindow = ()=>{
    table.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('.table__btn_pic')) {
        const a = target.closest('.table__btn_pic').dataset.pic;
        const w = screen.width / 2 - 400
        const h = screen.height / 2 - 300
         window.open(a , '_blank',`width=800,height=600,left=${w},top=${h}`);
        
  
      }
  
    });
  }


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