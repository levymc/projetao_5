const url = "https://mock-api.driven.com.br/api/v6/uol/participants"
// const url = 'https://mock-api.driven.com.br/api/v6/uol/status';
// const url = 'http://mock-api.driven.com.br/api/v6/uol/messages'

// const form = document.querySelector('form');

axios.defaults.headers.common['Authorization'] = 'knX7klq0NWrHzRzsc8JXodY0';

let newUser;
const agora = new Date();
const hora = agora.getHours();
const minuto = agora.getMinutes();
const segundo = agora.getSeconds();

window.addEventListener('load', function() {
    newUser = localStorage.getItem('newUser');
    if (newUser) {
        novoAcesso();
    }
});

  
function newPost(type){
    let classe;
    let frase;
    let quem;
    let dados = {};
    const msg = document.querySelector(".msg-input input").value;
    
    if (type == 1){
        classe = 'msg-access';
        frase = `<div class="msg-text">${newUser} entra na sala...</div>`;
        dados = {
            name: newUser,
          }
    } else if (type == 2){
        classe = 'msg-private';
        frase = `<div class="msg-text">${newUser} reservadamente para Maria: ${msg}</div>`;
        dados = {
            from: newUser,
            to: "Nome do Destinatario",
            text: frase,
            type: 'private-message',
            time: `${hora}:${minuto}:${segundo}`
        }
    } else{
        classe = 'msg-message';
        frase = `<div class="msg-text">${newUser} para Todos: ${msg}</div>`;
        dados = {
            from: newUser,
            to: "Nome do Destinatario",
            text: frase,
            type: 'message',
            time: `${hora}:${minuto}:${segundo}`
        }
    }
    
    const lista = document.querySelector('.msg-list');
    const html = `
    <li class="${classe}">
        <div class="msg-hora">(${hora}:${minuto}:${segundo})</div>
        ${frase}
    </li>
    `;
    lista.innerHTML += html
};






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



  

  