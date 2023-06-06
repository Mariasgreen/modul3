/* eslint-disable max-len */
const loadTrips = async (cb) => {
  const result = await fetch('date.json');
  const data = await result.json();
  return data;
};

const form = document.querySelector('.reservation__form');
const dateSelect = form.querySelectorAll('select[name = "dates"]');
const countSelect = form.querySelectorAll('select[name = "people"]');
const textData = form.querySelector('.reservation__data');
const textPrice = form.querySelector('.reservation__price');

const tour = document.querySelector('.tour__form');
const dateSel = tour.querySelectorAll('select[name = "dates"]');
const countSel = tour.querySelectorAll('select[name = "people"]');



const dateOptions = async (select) => {
  const data = await loadTrips();
  const options = data.map(item => {
    const option = document.createElement('option');
    option.value = item.date;
    option.textContent = option.value;

    return option;
  });

  select.append(...options);
};


const countOptions = async (select, num) => {
  select.innerHTML = '';
  const option = document.createElement('option');
  select.append(option);
  const data = await loadTrips();


  data.forEach(item => {
    if (dateSelect[num].value === item.date) {
      for (let i = item['min-people']; i <= item['max-people']; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = option.value;

        countSelect[num].append(option);
      }
    }
  });
};



const count = async (index) => {
  const data = await loadTrips();
  const selectedDate = dateSelect[index].value;
  const selectedCount = countSelect[index].value;

  data.forEach(item => {
    if (item.date === selectedDate && item['min-people'] <= selectedCount && item['max-people'] >= selectedCount) {
      const totalPrice = item.price * selectedCount;
      textData.textContent = `${selectedDate}, ${selectedCount} человек`;
      textPrice.textContent = ` ${totalPrice} ₽ `;
    }
  });
};


dateSelect.forEach((item, index) => {
  dateOptions(item);
  item.addEventListener('input', () => {
    countOptions(countSelect[index], index);
  });
});


countSelect.forEach((item, index) => {
  item.addEventListener('input', () => {
    count(index);
  });
});


const countOpts = async (select, num) => {
  select.innerHTML = '';
  const option = document.createElement('option');
  select.append(option);
  const data = await loadTrips();


  data.forEach(item => {
    if (dateSel[num].value === item.date) {
      for (let i = item['min-people']; i <= item['max-people']; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = option.value;

        countSel[num].append(option);
      }
    }
  });
};



dateSel.forEach((item, index) => {
  dateOptions(item);
  item.addEventListener('input', () => {
    countOpts(countSel[index], index);
  });
});


/*
countSel.forEach((item, index) => {
  item.addEventListener('input', () => {
    count(index);
  });
});
*/