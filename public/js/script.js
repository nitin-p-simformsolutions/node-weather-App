//const fetch = require('node-fetch');
console.log('Client side javascript file loaded');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMess = document.querySelector('#error');
const respMess = document.querySelector('#response');

//errorMess.textContent = 'from javascript paragraph'
errorMess.textContent = '';
respMess.textContent = '';
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = search.value;
    errorMess.textContent = 'Loading...';

        fetch('http://localhost:3000/weather?address='+location.trim())
        .then((response)=>{
            response.json().then((data) => {
                if(data.errorMessage){
                    //console.log(data.errorMessage);
                    errorMess.textContent = data.errorMessage;
                }
                else if(data.error){
                    //console.log(data.error);
                    errorMess.textContent = data.error;
                }
                else{
                    // console.log(data.location);
                    // console.log(data.forecast);
                    errorMess.textContent = '';
                    respMess.textContent = `Location : ${data.location} and Forecast : ${data.forecast}`
                }
            })
        })
        .catch(err => console.log(err))
})
