/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const list = document.getElementById('list');
const names = ['module.jsx', 'index.html', 'style.css', 'index.js', 'file.ts', 'library.css', 'my.plugin.js'];


const filter = (names) => {
  const regex = /\.(js|jsx|ts)$/i;
  return names.filter((names) => regex.test(names));
};

list.innerHTML = filter(names);


const validateEmail = (email) => {
  const regex = /^(\w+)@([a-zA-Z]{3,})\.([a-zA-Z]{2,5})$/;
  const match = email.match(regex);
  return match !== null;
};

const emails = ['info@methed.ru', 'max24@mail.com', 'java_script@google.io', 'my-mail@yandex.ru', 'tom_yam@ya.ru', 'zero@mai1.xyz'];

const emailsElement = document.getElementById('emails');

emails.forEach((email) => {
  const isValid = validateEmail(email);
  const resultText = `${email} is ${isValid ? 'valid' : 'not valid'}`;
  emailsElement.innerHTML += `<p>${resultText}</p>`;
});


const textElement = document.getElementById('text');
const text = 'Здоровый (праздничный) ужин вовсе не обязательно должен состоять из шпината, гречки и вареной куриной грудки. Самыми лучшими способами приготовления еды (по мнению моей мамы) являются следующие: варка на пару, запекание или варка в воде. Помимо стандартных мандаринов и ананасов, отличным украшением любого стола станут необычные, экзотические фрукты(например: личи, рамбутан, тамаринд). Здоровой может быть даже выпечка, если она приготовлена на пару.';

const check = (t)=> {
    const regex = /\((.*?)\)/g;
    return t.match(regex);
  }

textElement.innerHTML = check(text);



const a = 'http://site.ru';
const b = 'https://site.com';
const tagElement = document.getElementById('tags');

const tag = (string)=>{
  return string.replace(/(http|https):\/\/(\S+)/, '<a href="$1://$2">$2</a>');
}


tagElement.innerHTML = tag(a) + ' ' + tag(b);