const url = "https://mock-api.driven.com.br/api/v6/uol/participants"
// const url = 'https://mock-api.driven.com.br/api/v6/uol/status';
// const url = 'http://mock-api.driven.com.br/api/v6/uol/messages'

const form = document.querySelector('form');

document.querySelector('#submit-button').addEventListener('click', function(event) {
    event.preventDefault();
    const nomeDigitado = document.querySelector('#name').value;
    const dados = {
        name: nomeDigitado,
    };
    console.log(dados);
    fetch(url, {
        method: 'POST',
        body: dados
    })
    .then(response => response.json())    
    .then(data => console.log(data))
    .catch(error => console.error(error));
});



  

  