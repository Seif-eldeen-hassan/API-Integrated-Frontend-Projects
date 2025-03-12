let advice_num = document.querySelector(".advice_num")
let advice = document.querySelector(".advice")
let button = document.querySelector(".button")

async function set_quote(){
    const response = await fetch(`https://api.adviceslip.com/advice?nocache=${new Date().getTime()}`);
    const data = await response.json();
    advice_num.innerText = `ADVICE #${data.slip.id}`;
    advice.innerText = data.slip.advice;

}

set_quote()

button.addEventListener("click",set_quote)