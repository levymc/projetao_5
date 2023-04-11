// const url = "https://mock-api.driven.com.br/api/v6/uol/participants"
const form = document.querySelector('form');

const nomeDigitado = document.querySelector('#name').value;
const dados = {
  name: nomeDigitado,
};
const dadosJSON = JSON.stringify(dados);

const url = 'https://mock-api.driven.com.br/api/v6/uol/status';

fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: dadosJSON
  })
  .then(response => response.json())    
  .then(data => console.log(data))
  .catch(error => console.error(error));
  

  