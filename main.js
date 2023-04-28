
const div = document.createElement('div');
document.body.append(div);

const input = document.createElement('input');
input.setAttribute('type', 'text');
const par = document.createElement("p");

const text = () =>{
    const text = input.value;
    par.innerHTML = text;
}



input.addEventListener("keyup", (e)=>{
    e.preventDefault();
    setTimeout(text, 300);
  });



div.append(input, par)