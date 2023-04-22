const btn = document.querySelector('.panel__add-goods');
const table = document.querySelector('.table__body');
const modal = document.querySelector('.overlay');
const checkbox = document.querySelector('.modal__checkbox');
const discont = document.querySelector('.modal__input_discount');
const formelems = document.querySelectorAll('.modal__input');
const form = document.querySelector('.modal__form');
const price = document.querySelector('#price');
const count = document.querySelector('#count');
const span = document.querySelector('.vendor-code__id');
const overlay = document.querySelector('.overlay');


export default {
    btn,
    table,
    modal,
    checkbox,
    discont,
    formelems,
    form,
    price,
    count,
    span,
    overlay
}