import { el, mount } from 'redom';
import CreditCardInputMask from "credit-card-input-mask";


const body = el("body");

const divWrapper = el("div.wrapper");

const divCard = el("div.card");

const pSecure = el("p.secure", "Secure Checkout");

const divCreditCard = el("div.credit-card");

const spanCardNumber = el("span.card__number", "xxxx xxxx xxxx xxxx");

const divCardPersonal = el("div.card__personal");

const spanCardName = el("span.card__name", "John Doe");

const spanCardDate = el("span.card__date", "MM/YY");

const form = el("form#form.form", { action: "#" });

const divInputWrapHolder = el("div.form__input-wrap.form__input-wrap_holder");

const labelHolder = el("label.form__label.form__holder-label", "Card Holder");

const inputHolder = el("input.input.input__holder", { type: "text" });
let regex = /[0-9]/g; // регулярка только цифры
inputHolder.oninput = function(){
    this.value = this.value.replace(regex, '');
  }

const divInputWrapNumber = el("div.form__input-wrap.form__input-wrap_number");

const labelNumber = el("label.form__label.form__number-label", "Card Number");

const inputNumber = el("input.input.input__number", { id: "cardNumber"});



  
const divInputWrapDate = el("div.form__input-wrap.form__input-wrap_date");

const labelDate = el("label.form__label.form__date-label", "Card Expiry");

const inputDate = el("input.input.input__date", {
    type: "text",
    inputmode: "numeric",
    pattern: "\\d{2}/\\d{2}",
    placeholder: "mm/yy",
    maxlength: "5"
  });

const divInputWrapCVV = el("div.form__input-wrap.form__input-wrap_cvv");

const labelCVV = el("label.form__label.form__cvv-label", "CVV");

const inputCVV = el("input.input.input__cvv", { 
type: "text",
inputmode: "numeric",
pattern: "\\d{1,3}",
maxlength: "3"});

const button = el("button.form__button", "CHECK OUT");

const capitalizeCardHolder = (event) => {
    const input = event.target;
    let inputValue = input.value;
   
  
    // Capitalize the first letter of each word
    inputValue = inputValue.replace(/\b\w/g, (match) => match.toUpperCase());
  
    // Update the input value with the capitalized value
    input.value = inputValue;
  }


const dateFormat = (event) => {
    const input = event.target;
    const inputValue = input.value;
  
    // Remove any non-numeric characters from the input
    const numericValue = inputValue.replace(/\D/g, "");
  
    // Format the numeric value as "mm/yy" using a regular expression
    const formattedValue = numericValue.replace(/(\d{2})(\d{0,2})/, "$1/$2");
  
    // Set the input value to the formatted value
    input.value = formattedValue;
  };

  function initializeCreditCardInput() {
    const formattedCreditCardInput = new CreditCardInputMask({
      element: document.querySelector("#cardNumber"),
      pattern: "{{9999}} {{9999}} {{9999}} {{9999}}",
    });
  }
  

  
const updateCardInfo = () =>{
 
    const cardHolder = inputHolder.value;
    const cardNumber = inputNumber.value;
    const cardDate = inputDate.value;
     
 


    spanCardNumber.textContent = cardNumber ? cardNumber  : "xxxx-xxxx-xxxx-xxxx";
    spanCardName.textContent = cardHolder ? cardHolder : "John Doe";
    spanCardDate.textContent = cardDate ? cardDate : "MM/YY";
  }
  
  
inputHolder.addEventListener("input", updateCardInfo);
inputHolder.addEventListener("input", capitalizeCardHolder);


inputNumber.addEventListener("input", initializeCreditCardInput);
inputNumber.addEventListener("input", updateCardInfo); 

inputDate.addEventListener("input", updateCardInfo);
inputDate.addEventListener("input", dateFormat);




divCard.appendChild(pSecure);

divCardPersonal.appendChild(spanCardName);
divCardPersonal.appendChild(spanCardDate);

divCreditCard.appendChild(spanCardNumber);
divCreditCard.appendChild(divCardPersonal);

form.appendChild(divInputWrapHolder);
form.appendChild(divInputWrapNumber);
form.appendChild(divInputWrapDate);
form.appendChild(divInputWrapCVV);
form.appendChild(button);

divInputWrapHolder.appendChild(labelHolder);
divInputWrapHolder.appendChild(inputHolder);

divInputWrapNumber.appendChild(labelNumber);
divInputWrapNumber.appendChild(inputNumber);

divInputWrapDate.appendChild(labelDate);
divInputWrapDate.appendChild(inputDate);



divInputWrapCVV.appendChild(labelCVV);
divInputWrapCVV.appendChild(inputCVV);

divCard.appendChild(divCreditCard);
divCard.appendChild(form);

divWrapper.appendChild(divCard);




mount(body, divWrapper);


mount(document.documentElement, body);

