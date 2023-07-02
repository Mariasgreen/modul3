import {fetchCategories}  from './category.js'
import{  getTotal, allTotalTableSum} from './summs.js';
import{ toBase} from './picture.js';
import{ numbers} from './table.js';

export const openEditModal = async ({ id, title, price, category, count, units, discount ,description,image }) => {
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
  
    const modalform = document.createElement('form');
    modalform.classList.add('modal__form');
  
  
  
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
    fileLabel.setAttribute('for', 'image2');

    fileLabel.classList.add('modal__label', 'modal__label_file');
    fileLabel.textContent = 'Добавить изображение';
  
    const fileInput = document.createElement('input');
    fileInput.classList.add('modal__file_two', 'visually-hidden');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('id', 'image2');

    const spacerContainer = document.createElement('div');
    spacerContainer.classList.add('spacer-container');
 
  
    
   
    fieldset.appendChild(nameLabel);
    fieldset.appendChild(categoryLabel);
    fieldset.appendChild(descriptionLabel);
    fieldset.appendChild(unitsLabel);
    fieldset.appendChild(discountLabel);
    fieldset.appendChild(countLabel);
    fieldset.appendChild(priceLabel);
    fieldset.appendChild(fileLabel);
    fieldset.appendChild(fileInput);
    fieldset.appendChild(document.createElement('br'));
    fieldset.appendChild(spacerContainer);
  
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



    const modalImage = document.createElement('img');
    modalImage.classList.add('modal__image');
    spacerContainer.appendChild(modalImage);


    const modalPic = async ()=> {
      try {
        const response = await fetch(`http://localhost:3000/api/goods/${id}`);
        if (!response.ok) {
          throw new Error('Image not found');
        }
    
        const data = await response.json();
        console.log(data);
    
        const pictureUrl = `http://localhost:3000/${data.image}`;
    
        
        modalImage.setAttribute('src', pictureUrl);
        modalImage.setAttribute('alt', 'Product Image');
       
   
      } catch (error) {
        console.error('Error retrieving image:', error);
      }
    }
  
   const closeModal = () => {
      modalContainer.classList.remove('active');
    };
  
   
    modalform.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const formData = new FormData(modalform);
      const product = Object.fromEntries(formData);
      
      const updatedData = {
        /*
        id,
        title: nameInput.value,
        price: parseFloat(priceInput.value), 
        category: categoryInput.value,
        count: parseInt(countInput.value), 
        units: unitsInput.value,
        discount: discountInput.checked ? parseFloat(formData.get('discount_count')) : null, 
        description: formData.get('description'),*/
        id,
        title: product.title,
        category: product.category,
        description: product.description,
        units: product.units,
        count: Number(product.count),
        price: Number(product.price),
        discount: product.discontValue ? Number(product.discontValue) : false,
        image: fileInput.files[0] ? await toBase(fileInput.files[0]) : null,
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
  
    modalform.appendChild(fieldset);
    modalform.appendChild(footer);
  
    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalTop);
    modalContent.appendChild(modalform);

 
   modalPic()
      modalContainer.appendChild(modalContent);
      document.body.appendChild(modalContainer);
  
    }
   
 
  
  
  
export const saveChanges = async (id, updatedData) => {

 fetch(`http://localhost:3000/api/goods/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
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
  };
  
  
  
 export const updateRow = (id, updatedData) => {
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
    



  