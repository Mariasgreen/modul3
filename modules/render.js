


import create from './const.js';
const {table} = create;

import{numbers, createRow} from './table.js';
import{allTotalTableSum} from './summs.js';

export const renderGoods = (arr) => {
    const allRow = arr.map(createRow);
    table.append(...allRow);
    numbers();
    allTotalTableSum();
  };

  