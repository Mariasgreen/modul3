const file = document.querySelector('.modal__file');

const discountSection = document.querySelector('.modal__label_discount');

const spacerContainer = document.createElement('div');
spacerContainer.classList.add('spacer-container');
discountSection.after(spacerContainer);

const spacer = document.createElement('img');
spacer.classList.add('modal__spacer');
spacerContainer.appendChild(spacer);

const messageContainer = document.createElement('div');
messageContainer.classList.add('message-container');
spacerContainer.appendChild(messageContainer);

const message = document.createElement('p');
message.textContent = 'Изображение не должно превышать размер 1 Мб';
message.style.color = 'red';

export const toBase = file => new Promise((resolve, reject) =>{
  const reader = new FileReader();

  reader.addEventListener('loadend', () =>{
resolve(reader.result)
  })
  reader.addEventListener('loadend', () =>{
    reject(err)
      })
      reader.readAsDataURL(file);

}

)

file.addEventListener('change', () => {
  if (file.files.length > 0) {
    const selectedFile = file.files[0];
    const fileSizeInMb = selectedFile.size / (1024 * 1024);
    if (fileSizeInMb > 1) {
      messageContainer.appendChild(message);
    } else {
      const src = URL.createObjectURL(selectedFile);
      
      spacer.style.display = 'block';
      spacer.src = src;
    
    }
  }


  
});





export default {
  file,
  discountSection,
  spacer,
  spacerContainer,
  message,
  messageContainer,
  
};