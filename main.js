

const par = document.createElement('p');
par.style.height = '50px';
const input = document.createElement('input');
let texting

document.body.append(par, input);





input.addEventListener('keypress', () => {
    clearTimeout(texting);
    texting = setTimeout(() => {
      par.textContent = input.value;
    }, 3000);
});