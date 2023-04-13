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

function retornaAccess(){
  window.location.replace('index.html');
}

// window.onload = function() {
//   // Seu código aqui
// }


window.addEventListener('load', function() {
  if (window.location.pathname === '/main.html') {
    newUser = localStorage.getItem('newUser');
    if (newUser) {
        newPost(1);
    }
  }
});


if (window.location.pathname === '/main.html') {
  const input = document.querySelector(".msg-input input");
  input.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      newPost(3);
    }
  });

  function newPost(type){
      let classe;
      let frase;
      let quem;
      let dados = {};
      
      const msg = input.value;
      
      if (type == 1){
          classe = 'msg-access';
          frase = `<div class="msg-text" data-test="message">${newUser} entra na sala...</div>`;
          // dados = {
          //     name: newUser,
          //   };
          //   entraSala(dados);
      } else if (type == 2){
          classe = 'msg-private';
          frase = `<div class="msg-text" data-test="message">${newUser} reservadamente para Maria: ${msg}</div>`;
          dados = {
              from: newUser,
              to: "Nome do Destinatario",
              text: frase,
              type: 'private-message',
              time: `${hora}:${minuto}:${segundo}`
          }
      } else{
          classe = 'msg-message';
          frase = `<div class="msg-text" data-test="message">${newUser} para Todos: ${msg}</div>`;
          dados = {
              from: newUser,
              to: "Nome do Destinatario",
              text: msg,
              type: 'message',
          }
          enviarMensagem(dados);
          document.querySelector('.msg-input input').value = ''
      }
      
      const lista = document.querySelector('.msg-list');
      const html = `
      <li class="${classe}">
          <div class="msg-hora" data-test="message">(${hora}:${minuto}:${segundo})</div>
          ${frase}
      </li>
      `;
      lista.innerHTML += html
  };


  function enviarMensagem(dados) {
      axios.post("https://mock-api.driven.com.br/api/vm/uol/messages", dados).then(response => {
        console.log(response.data);
        buscarMensagens();
      })
      .catch(error => {
        console.error(2222, error);
        alert("Ocorreu um erro ao enviar a mensagem, tente novamente mais tarde.");
      });
    }

  function buscarMensagens() {
      setInterval(() => {
        axios.get("https://mock-api.driven.com.br/api/vm/uol/messages").then(response => {
            const lista = document.querySelector('.msg-list');
            lista.innerHTML = ''
            for (i in response.data){
              lista.innerHTML +=`
              <li class="msg-message"> 
                <div class="msg-hora" data-test="message">(${response.data[i].time})</div> 
                <div class="msg-text" data-test="message">${response.data[i].from}: ${response.data[i].text}</div> 
              </li>`
            }
              // console.log(response.data);
              })
          .catch(error => {
            console.error(999,error);
            alert("Ocorreu um erro ao buscar mensagens, recarregue a página ou tente novamente mais tarde.");
          });
      }, 3000);
  }  
    
  function conexao(){
    setInterval(() => {
      axios.post('https://mock-api.driven.com.br/api/vm/uol/status', {
        name: newUser,
      }).then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);

      });
    }, 5000);
  }

  conexao();
  buscarMensagens();

  function abrirSidebar(){
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const html = document.querySelector('html');
    
    // personBtn.addEventListener('click', () => {
    sidebar.style.right = '0';
    overlay.style.display = 'block';
  }



  // Para esconder a sidebar novamente quando o usuário clicar em outro lugar da página
  window.addEventListener('click', (e) => {
    const sidebar = document.querySelector('.sidebar');
    const personBtn = document.querySelector('.person img');
    const overlay = document.querySelector('.overlay');
    if (!sidebar.contains(e.target) && e.target !== personBtn) {
      sidebar.style.right = '-100%';
      overlay.style.display = 'none';
    }
  });

};
