const url = "https://mock-api.driven.com.br/api/v6/uol/participants"
// const url = 'https://mock-api.driven.com.br/api/v6/uol/status';
// const url = 'http://mock-api.driven.com.br/api/v6/uol/messages'

const form = document.querySelector('form');
let newUser = '';

function novoAcesso(newUser){
    const lista = document.querySelector('.msg-list');
    console.log(newUser);

    const agora = new Date();
    const hora = agora.getHours();
    const minuto = agora.getMinutes();
    const segundo = agora.getSeconds();

    const html = `
    <li class="msg-access">
        <div class="msg-hora">(${hora}:${minuto}:${segundo})</div>
        <div class="msg-text">${newUser.name} entra na sala...</div>
    </li>
    `;

    lista.insertAdjacentHTML('beforeend', html)

};

document.querySelector('#entrar').addEventListener('click', function(event) {
    event.preventDefault();
    newUser ={
        name:document.querySelector('#name').value,
    } 
    novoAcesso(newUser);
    // console.log(newUser);
    window.location.replace('index.html');
});






// document.querySelector('NOMEDOBOTAOAQUI').addEventListener('click', function(event) {
//     event.preventDefault();
//     const nomeDigitado = document.querySelector('#name').value;
//     const dados = {
//         name: nomeDigitado,
//     };
//     console.log(dados);
//     fetch(url, {
//         method: 'POST',
//         body: dados
//     })
//     .then(response => response.json())    
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
// });



  

  