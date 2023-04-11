const url = "https://mock-api.driven.com.br/api/v6/uol/participants"
// const url = 'https://mock-api.driven.com.br/api/v6/uol/status';
// const url = 'http://mock-api.driven.com.br/api/v6/uol/messages'

// const form = document.querySelector('form');

window.addEventListener('load', function() {
    const newUser = localStorage.getItem('newUser');
    if (newUser) {
        novoAcesso(newUser);
    }
});

function novoAcesso(newUser){
    console.log(11111, newUser)
    const lista = document.querySelector('.msg-list');
    console.log(lista);

    const agora = new Date();
    const hora = agora.getHours();
    const minuto = agora.getMinutes();
    const segundo = agora.getSeconds();

    const html = `
    <li class="msg-access">
        <div class="msg-hora">(${hora}:${minuto}:${segundo})</div>
        <div class="msg-text">${newUser.value} entra na sala...</div>
    </li>
    `;

    lista.insertAdjacentHTML('beforeend', html)

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



  

  