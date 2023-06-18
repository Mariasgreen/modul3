
import {loadGoods}  from './render.js'





  const setDiscount = (discount) => (discount ? (100 - discount) / 100 : 1);
  
  const getTotal = (price, count, discount) => price * count * setDiscount(discount);
  
  const getTotalTableSum = async () => {
    const data = await loadGoods();
    const totalSum = data.reduce(
      (acc, { count, price, discount }) =>
        acc + (price * count) * setDiscount(discount),
      0
    );
    return totalSum.toFixed(2);
  };
  
  const allTotalTableSum = async () => {
    const totalPriceElement = document.querySelector('.cms__total-price');
    const totalSum = await getTotalTableSum();
    totalPriceElement.textContent = totalSum;
  };


  export{ setDiscount, getTotal, allTotalTableSum}