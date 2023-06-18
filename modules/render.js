


import create from './const.js';
const {table} = create;

import{numbers, createRow} from './table.js';
import{allTotalTableSum} from './summs.js';

export const loadGoods = async () => {
  const response = await fetch('http://localhost:3000/api/goods');
  const data = await response.json();
  console.log(data);
  return data;
};

export const renderGoods = async () => {
  const data = await loadGoods();
  
  data.forEach((product) => {
    const { id, title, price, category, count, units, discount, description,image } = product;
    const row = createRow({ id, title, price, category, count, units, discount, description,image });
    table.appendChild(row);
  });

  numbers();
  await allTotalTableSum();
};

  