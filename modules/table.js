import create from './const.js';
const {table} = create;
import {toBase}  from './picture.js'

import {fetchCategories}  from './category.js'

import{  getTotal, allTotalTableSum} from './summs.js';


const addProductData = async (product) => {
  try {
    const response = await fetch('http://localhost:3000/api/goods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      
      const data = await response.json();
      console.log(data);

      addProductPage(product, table);
      numbers();
      await allTotalTableSum();
    } else if (response.status === 422 || response.status === 404 || response.status >= 500) {
     
      const errorData = await response.json();
      const errorMessage = errorData.message; 
      console.log(errorMessage); 
    } else {
      
      throw new Error('Something went wrong...');
    }
  } catch (error) {
    console.error('Error:', error);
    displayErrorMessageModal('Something went wrong...'); 
  }
};






const addProductPage = async (product, table) => {
  try {
    const response = await fetch('http://localhost:3000/api/goods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
  
      const newProduct = await response.json();
      const newRow = createRow(newProduct);
      table.appendChild(newRow);
      

      numbers();
      await allTotalTableSum();
    } else {
     
      console.log('Error adding product');
    }
  } catch (error) {
 
    console.log('Error:', error);
  }
};

  
  const numbers = () => {
    const numTd = table.querySelectorAll('.table__cell-num');
  
    let n = 1;
    numTd.forEach((i) => {
      i.textContent = n++;
    });
  };
 




  



  const createRow = ({id, title, price, category, count, units, discount,image, description}) => {
    const tr = document.createElement('tr');
    tr.classList.add('row');
    tr.setAttribute('data-id', id);
  
  
    const tdNumber = document.createElement('td');
    tdNumber.classList.add('table__cell', 'table__cell-num');
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
    const total = getTotal(count, price, discount).toFixed(2);
    tdTotal.textContent = total;
  
  
    const tdImages = document.createElement('td');
  
    tdImages.classList.add('table__cell', 'table__cell_btn-wrapper');
    
    const button1 = document.createElement('button');
    button1.classList.add('table__btn', 'table__btn_pic');

    
    const button2 = document.createElement('button');
    button2.classList.add('table__btn', 'table__btn_edit');

   

    button2.addEventListener('click', () => {
      openEditModal({id, title, price, category, count, units, discount,description,image});
    });
  
    const button3 = document.createElement('button');
    button3.classList.add('table__btn', 'table__btn_del');
   
  

    tdImages.append(button1, button2, button3);
  
  
    tr.append(tdNumber, tdTitle, tdCategory, tdUnit, tdCount, tdPrice, tdTotal, tdImages);
    return tr;
  };
  

  
  
const openEditModal = ({ id, title, price, category, count, units, discount ,description,image }) => {
  fetchCategories(); 

  const modalContainer = document.createElement('div');
  modalContainer.classList.add('overlay', 'active');

  modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
      closeModal();
    }
  });

  const modalContent = document.createElement('div');
  modalContent.classList.add('overlay__modal', 'modal');

  

  const modalTop = document.createElement('div');
  modalTop.classList.add('modal_top');

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal__title');
  modalTitle.textContent = 'Изменить';

 
  const vendorCode = document.createElement('div');
  vendorCode.classList.add('modal__vendor-code', 'vendor-code');

  const vendorCodeWrapper = document.createElement('p');
  vendorCodeWrapper.classList.add('vendor-code__wrapper');
  vendorCodeWrapper.textContent = 'id:';

  const vendorCodeId = document.createElement('span');
  vendorCodeId.classList.add('vendor-code__id');
  vendorCodeId.textContent = id;

  vendorCodeWrapper.appendChild(vendorCodeId);
  vendorCode.appendChild(vendorCodeWrapper);
  modalTop.appendChild(modalTitle);
  modalTop.appendChild(vendorCode);

  const form = document.createElement('form');
  form.classList.add('modal__form');



  const fieldset = document.createElement('fieldset');
  fieldset.classList.add('modal__fieldset');

  const nameLabel = document.createElement('label');
  nameLabel.classList.add('modal__label', 'modal__label_name');
  nameLabel.setAttribute('for', 'name');
  const nameText = document.createElement('span');
  nameText.classList.add('modal__text');
  nameText.textContent = 'Наименование';
  const nameInput = document.createElement('input');
  nameInput.classList.add('modal__input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('name', 'title');
  nameInput.setAttribute('id', 'name');
  nameInput.value = title;

  nameLabel.appendChild(nameText);
  nameLabel.appendChild(nameInput);

  const categoryLabel = document.createElement('label');
  categoryLabel.classList.add('modal__label', 'modal__label_category');
  categoryLabel.setAttribute('for', 'category');
  const categoryText = document.createElement('span');
  categoryText.classList.add('modal__text');
  categoryText.textContent = 'Категория';
  const categoryInput = document.createElement('input');
  categoryInput.classList.add('modal__input');
  categoryInput.setAttribute('type', 'text');
  categoryInput.setAttribute('name', 'categoryId');
  categoryInput.setAttribute('id', 'categoryId');
  categoryInput.setAttribute('list', 'category-list-id');
  categoryInput.value = category;

 
  categoryLabel.appendChild(categoryText);
  categoryLabel.appendChild(categoryInput);

  const descriptionLabel = document.createElement('label');
  descriptionLabel.classList.add('modal__label', 'modal__label_description');
  descriptionLabel.setAttribute('for', 'description');
  const descriptionText = document.createElement('span');
  descriptionText.classList.add('modal__text');
  descriptionText.textContent = 'Описание';

  const descriptionTextarea = document.createElement('textarea');
  descriptionTextarea.classList.add('modal__input', 'modal__input_textarea');
  descriptionTextarea.setAttribute('name', 'description');
  descriptionTextarea.setAttribute('id', 'description');
  descriptionTextarea.value = description;

  descriptionLabel.appendChild(descriptionText);
  descriptionLabel.appendChild(descriptionTextarea);

  const unitsLabel = document.createElement('label');
  unitsLabel.classList.add('modal__label', 'modal__label_units');
  unitsLabel.setAttribute('for', 'units');
  const unitsText = document.createElement('span');
  unitsText.classList.add('modal__text');
  unitsText.textContent = 'Единицы измерения';
  const unitsInput = document.createElement('input');
  unitsInput.classList.add('modal__input');
  unitsInput.setAttribute('type', 'text');
  unitsInput.setAttribute('name', 'units');
  unitsInput.setAttribute('id', 'units');
  unitsInput.value = units;

  unitsLabel.appendChild(unitsText);
  unitsLabel.appendChild(unitsInput);

  const discountLabel = document.createElement('div');
  discountLabel.classList.add('modal__label', 'modal__label_discount_two');
  const discountText = document.createElement('label');
  discountText.classList.add('modal__text');
  discountText.setAttribute('for', 'discount');
  discountText.textContent = 'Дисконт';
 

  const checkboxWrapper = document.createElement('div');
  checkboxWrapper.classList.add('modal__checkbox-wrapper');


  const discountCheckbox = document.createElement('input');
  discountCheckbox.classList.add('modal__checkbox');
  discountCheckbox.setAttribute('type', 'checkbox');
  discountCheckbox.setAttribute('name', 'discount');
  discountCheckbox.setAttribute('id', 'discount');
  discountCheckbox.checked = true; 
  discountCheckbox.addEventListener('change', () => {
    discountInput.disabled = !discountCheckbox.checked;
    if (!discountCheckbox.checked) {
      discountInput.value = ''; 
    }
  });
  
  const discountInput = document.createElement('input');
  discountInput.classList.add('modal__input', 'modal__input_discount');
  discountInput.setAttribute('type', 'number');
  discountInput.setAttribute('name', 'discount_count');
  discountInput.value = discount !== undefined && discount !== null ? String(discount) : '';




  discountLabel.appendChild(discountText);
  checkboxWrapper.appendChild(discountCheckbox);
  checkboxWrapper.appendChild(discountInput);
  discountLabel.appendChild(checkboxWrapper);

  const countLabel = document.createElement('label');
  countLabel.classList.add('modal__label', 'modal__label_count');
  countLabel.setAttribute('for', 'count');
  const countText = document.createElement('span');
  countText.classList.add('modal__text');
  countText.textContent = 'Количество';
  const countInput = document.createElement('input');
  countInput.classList.add('modal__input');
  countInput.setAttribute('type', 'number');
  countInput.setAttribute('name', 'count');
  countInput.setAttribute('id', 'count');
  countInput.value = count;

  countLabel.appendChild(countText);
  countLabel.appendChild(countInput);

  const priceLabel = document.createElement('label');
  priceLabel.classList.add('modal__label', 'modal__label_price');
  priceLabel.setAttribute('for', 'price');
  const priceText = document.createElement('span');
  priceText.classList.add('modal__text');
  priceText.textContent = 'Цена';
  const priceInput = document.createElement('input');
  priceInput.classList.add('modal__input');
  priceInput.setAttribute('type', 'number');
  priceInput.setAttribute('name', 'price');
  priceInput.setAttribute('id', 'price');
  priceInput.value = price;

  priceLabel.appendChild(priceText);
  priceLabel.appendChild(priceInput);

  const fileLabel = document.createElement('label');
  fileLabel.setAttribute('tabindex', '0');
  fileLabel.setAttribute('for', 'image');
  fileLabel.classList.add('modal__label', 'modal__label_file');
  fileLabel.textContent = 'Добавить изображение';

  const fileInput = document.createElement('input');
  fileInput.classList.add('modal__file_two', 'visually-hidden');
  fileInput.setAttribute('tabindex', '-1');
  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute('name', 'image');
  fileInput.setAttribute('id', 'image');



// ...

fileInput.addEventListener('change', () => {
  const spacerContainer = document.createElement('div');
  spacerContainer.classList.add('spacer-container');
  discountLabel.after(spacerContainer);

  const spacer = document.createElement('img');
  spacer.classList.add('modal__spacer');
  spacerContainer.appendChild(spacer);

  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message-container');
  spacerContainer.appendChild(messageContainer);

  const message = document.createElement('p');
  message.textContent = 'Изображение не должно превышать размер 1 Мб';
  message.style.color = 'red';


    if (fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      const fileSizeInMb = selectedFile.size / (1024 * 1024);
      if (fileSizeInMb > 1) {
        messageContainer.appendChild(message);
      } else {
        const src = URL.createObjectURL(selectedFile);
        
        spacer.style.display = 'block';
        spacer.src = src;
      console.log(selectedFile)
      }
    }

});



  fieldset.appendChild(nameLabel);
  fieldset.appendChild(categoryLabel);
  fieldset.appendChild(descriptionLabel);
  fieldset.appendChild(unitsLabel);
  fieldset.appendChild(discountLabel);
  fieldset.appendChild(countLabel);
  fieldset.appendChild(priceLabel);
  fieldset.appendChild(fileLabel);
  fieldset.appendChild(fileInput);

  const footer = document.createElement('div');
  footer.classList.add('modal__footer');

  const totalPriceLabel = document.createElement('label');
  totalPriceLabel.classList.add('modal__total');
  totalPriceLabel.textContent = 'Итоговая стоимость: ';

  const totalPriceOutput = document.createElement('output');
  totalPriceOutput.classList.add('modal__total-price');
  totalPriceOutput.setAttribute('name', 'total');
  totalPriceOutput.textContent = `$${getTotal(price, count, discount).toFixed(2)}`;
  totalPriceLabel.appendChild(totalPriceOutput);

  const submitButton = document.createElement('button');
  submitButton.classList.add('modal__submit');
  submitButton.setAttribute('type', 'submit');
  submitButton.textContent = 'Сохранить изменения';


  const closeModal = () => {
    modalContainer.classList.remove('active');
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const updatedData = {
      id,
      title: nameInput.value,
      price: parseFloat(priceInput.value), 
      category: categoryInput.value,
      count: parseInt(countInput.value), 
      units: unitsInput.value,
      discount: discountInput.checked ? parseFloat(formData.get('discount_count')) : null, 
      description: formData.get('description'),
     
    };
    
 
    saveChanges(id, updatedData);
    closeModal();
   
    await allTotalTableSum();
  });


  

  const closeButton = document.createElement('button');
  closeButton.classList.add('modal__close');
  closeButton.innerHTML = `
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>
  `;
  
  closeButton.addEventListener('click', closeModal);

  footer.appendChild(totalPriceLabel);
  footer.appendChild(submitButton);

  form.appendChild(fieldset);
  form.appendChild(footer);

  modalContent.appendChild(closeButton);
  modalContent.appendChild(modalTop);
  modalContent.appendChild(form);

  modalContainer.appendChild(modalContent);
  document.body.appendChild(modalContainer);
};




const saveChanges = async(id, updatedData) => {
  fetch(`http://localhost:3000/api/goods/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  })
    .then((response) => {
      if (response.ok) {
        console.log('Changes saved successfully');

        updateRow(id, updatedData);
        numbers();
      } else {
        console.error('Error saving changes:', response.statusText);
      }
    })
    .catch((error) => {
      console.error('Error saving changes:', error);
    });
    
    const imageFile = await toBase(updatedData.image);
    if (imageFile) {
      // Upload the image file and get the URL
      const imageURL = await uploadImage(imageFile);
      // Set the image URL in the updatedData object
      updatedData.image = `http://localhost:3000/${imageURL}`;
    }

};

const updateRow = (id, updatedData) => {
  const existingRow = document.querySelector(`tr[data-id="${id}"]`);
  if (existingRow) {
    const cellId = existingRow.querySelector('.table__cell-id');
    const cellName = existingRow.querySelector('.table__cell_name');
    const cellCategory = existingRow.querySelector('.table__cell_category');
    const cellUnits = existingRow.querySelector('.table__cell_units');
    const cellCount = existingRow.querySelector('.table__cell_count');
    const cellPrice = existingRow.querySelector('.table__cell_price');
    const cellTotal = existingRow.querySelector('.table__total');

    if (cellId) cellId.textContent = 'ID: ' + updatedData.id;
    if (cellName) cellName.textContent = updatedData.title;
    if (cellCategory) cellCategory.textContent = updatedData.category;
    if (cellUnits) cellUnits.textContent = updatedData.units;
    if (cellCount) cellCount.textContent = updatedData.count;
    if (cellPrice) cellPrice.textContent = updatedData.price;

    const total = getTotal(updatedData.count, updatedData.price, updatedData.discount).toFixed(2);
    if (cellTotal) cellTotal.textContent = total;
  } else {
    console.error(`Row with data-id "${id}" not found`);
  }
};
  



const displayErrorMessageModal = (message) => {
  
  const errorModal = document.createElement('div');
  errorModal.classList.add('modal');
  errorModal.setAttribute('id', 'errorModal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close');
  closeBtn.textContent = '×';

  const errorTitle = document.createElement('h2');
  errorTitle.textContent = 'Error';

  const errorMessage = document.createElement('p');
  errorMessage.textContent = message;

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(errorTitle);
  modalContent.appendChild(errorMessage);

  errorModal.appendChild(modalContent);

  document.body.appendChild(errorModal);

  errorModal.style.display = 'block';

 
  closeBtn.addEventListener('click', () => {
    errorModal.style.display = 'none';
  });
};

  export{addProductData, numbers, createRow, addProductPage}