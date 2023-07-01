export const pic = () => {
    const fileInput = document.querySelector('.modal__file_two');

const discountSection = document.querySelector('.modal__label_discount_two');

const previewContainer = document.createElement('div');
previewContainer.classList.add('image-preview-container');
discountSection.after(previewContainer);

const imagePreview = document.createElement('img');
imagePreview.classList.add('modal_spacer');
previewContainer.appendChild(imagePreview);

const mesContainer = document.createElement('div');
mesContainer.classList.add('mes-container');
previewContainer.appendChild(mesContainer);

const mes = document.createElement('p');
mes.textContent = 'Изображение не должно превышать размер 1 Мб';
mes.style.color = 'red';


fileInput.addEventListener('change', () => {

    if (fileInput.files.length > 0) {
        console.log(1)
      const selectedFile = fileInput.files[0];
       const fileSizeInMb = selectedFile.size / (1024 * 1024);
       if (fileSizeInMb > 1) {
         mesContainer.appendChild(mes);
       } else {
         const src = URL.createObjectURL(selectedFile);
         
         imagePreview.style.display = 'block';
         imagePreview.src = src;
        
       }
     }
   
   })
}


