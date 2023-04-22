import create from './const.js';
const {table} = create;
import {arr}  from '/main.js'

import{  getTotal} from './summs.js';

const addProductData = (product) => {
    arr.push(product);
  };
  
  
  const numbers = () => {
    const numTd = table.querySelectorAll('.table__cell-num');
  
    let n = 1;
    numTd.forEach((i) => {
      i.textContent = n++;
    });
  };
  
  
  const createRow = ({id, title, price, category, count, units, discont}) => {
    const tr = document.createElement('tr');
    tr.classList.add('row');
    tr.setAttribute('data-id', id);
  
  
    const tdnumber = document.createElement('td');
    tdnumber.classList.add('table__cell', 'table__cell-num');
    const idSpan = document.createElement('span');
    const tdTitle = document.createElement('td');
  
    tdTitle.classList.add('table__cell', 'table__cell_left', 'table__cell_name');
  
    idSpan.classList.add('table__cell-id');
    idSpan.textContent = 'ID: ' + id;
    tdTitle.textContent = title;
  
  
    tdTitle.prepend(idSpan);
  
  
    const tdCategory = document.createElement('td');
    tdCategory.classList.add('table__cell', 'table__cell_left');
    tdCategory.textContent = category;
  
    const tdUnit = document.createElement('td');
    tdUnit.classList.add('table__cell');
    tdUnit.textContent = units;
  
  
    const tdCount = document.createElement('td');
    tdCount.classList.add('table__cell');
    tdCount.textContent = count;
  
  
    const tdPrice = document.createElement('td');
    tdPrice.classList.add('table__cell');
    tdPrice.textContent = price;
  
  
    const tdTotal = document.createElement('td');
    tdTotal.classList.add('table__cell', 'table__total');
    const total = getTotal(count, price, discont).toFixed(2);
    tdTotal.textContent = total;
  
  
    const tdImages = document.createElement('td');
  
    tdImages.classList.add('table__cell', 'table__cell_btn-wrapper');
    const button1 = document.createElement('button');
    button1.classList.add('table__btn', 'table__btn_pic');
    let url = "./img/pic.jpg"
    button1.dataset.pic = url;

    const button2 = document.createElement('button');
    button2.classList.add('table__btn', 'table__btn_edit');
    const button3 = document.createElement('button');
    button3.classList.add('table__btn', 'table__btn_del');
    tdImages.append(button1, button2, button3);
  
  
    tr.append(tdnumber, tdTitle, tdCategory, tdUnit, tdCount, tdPrice, tdTotal, tdImages);
    return tr;
  };
  
  const addProductPage = (product, table) => {
    table.append(createRow(product));
  };
  


  
  export{addProductData, numbers, createRow, addProductPage}