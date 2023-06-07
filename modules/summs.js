import {arr}  from '/main.js'





  const setDiscount = (discont) => (discont ? (100 - discont) / 100 : 1);
  
  const getTotal = (price, count, discont) => price * count * setDiscount(discont);
  
  const getTotalTableSum = (arr = []) => arr.reduce(
    (acc, {count, price, discont}) =>
      acc + (price * count) * setDiscount(discont), 0);
  
  
  const allTotalTableSum = () => {
    document.querySelector('.cms__total-price').textContent = getTotalTableSum(arr).toFixed(2);
  };



  export{ setDiscount, getTotal, allTotalTableSum}