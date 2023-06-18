
import {renderGoods}  from './modules/render.js';

import create from './modules/const.js';
const{overlay}=create;

import{formModal, tableNum,  modalBtn, modalModal, reqModal, totalModal, checkboxModal, openWindow} from './modules/control.js';

import './modules/search.js'
import './modules/picture.js';
import {fetchCategories} from './modules/category.js';


const init = () =>{
  
  overlay.classList.remove('active');

  checkboxModal()
  formModal()
  tableNum()
  modalBtn ()
  modalModal()
  reqModal()
  totalModal()
  fetchCategories();
  openWindow()

  renderGoods();
}

init()