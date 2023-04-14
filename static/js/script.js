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
      console.log("ROberval pererei")
      // newPost(1);
    }
  }
});


if (window.location.pathname === '/main.html') {

  const checkbox = document.querySelector('input[name="checkStatus"]');
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      this.value = '1';
    } else {
      this.value = '';
    }
  });

  const input = document.querySelector(".msg-input input");
  input.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      const msg = input.value;
      dados = {
        from: newUser,
        to: "Todos",
        text: msg,
        type: 'message',
    }
    enviarMensagem(dados);
    document.querySelector('.msg-input input').value = ''
    }
  });

  function newPost(){
    const msg = input.value;
      dados = {
        from: newUser,
        to: "Todos",
        text: msg,
        type: 'message',
    }
    enviarMensagem(dados);
    document.querySelector('.msg-input input').value = ''
    }
  

  // function newPost(type){ // dados = {from:, to:, text:,}
  //     let classe;
  //     let frase;
  //     let quem;
  //     let dados = {};
      
  //     const msg = input.value;
      
  //     if (type == 1){
  //         classe = 'msg-access';
  //         frase = `<div class="msg-text" data-test="message">${newUser} entra na sala...</div>`;

  //     } else if (type == 2){
  //         classe = 'msg-private';
  //         frase = `<div class="msg-text" data-test="message">${newUser} reservadamente para Maria: ${msg}</div>`;
  //         dados = {
  //             from: newUser,
  //             to: "Levy",
  //             text: frase,
  //             type: 'private-message',
  //             time: `${hora}:${minuto}:${segundo}`
  //         }
  //         enviarMensagem(dados);
  //     } else{
  //         classe = 'msg-message';
  //         frase = `<div class="msg-text" data-test="message">${newUser} para Todos: ${msg}</div>`;
  //         dados = {
  //             from: newUser,
  //             to: "Todos",
  //             text: msg,
  //             type: 'message',
  //         }
  //         enviarMensagem(dados);
  //         document.querySelector('.msg-input input').value = ''
  //     }
      
      // const lista = document.querySelector('.msg-list');
      // const html = `
      // <li class="${classe}">
      //     <div class="msg-hora" data-test="message">(${hora}:${minuto}:${segundo})</div>
      //     ${frase}
      // </li>
      // `;
      // lista.innerHTML += html
  // };


  function enviarMensagem(dados) {
    axios.post("https://mock-api.driven.com.br/api/vm/uol/messages", dados).then(response => {
      console.log(response.data);
      buscarMensagens();
    })
    .catch(error => {
      console.error(2222, error);
      alert("Ocorreu um erro ao enviar a mensagem, tente novamente mais tarde.");
      retornaAccess();
    });
  }

  function buscarMensagens() {
      setInterval(() => {
        axios.get("https://mock-api.driven.com.br/api/vm/uol/messages").then(response => {
            const lista = document.querySelector('.msg-list');
            lista.innerHTML = ''
            for (i in response.data){
              if (response.data[i].type === "message"){
                lista.innerHTML +=`
                <li class="msg-message"> 
                  <div class="msg-hora" data-test="message">(${response.data[i].time})</div> 
                  <div class="msg-text" data-test="message">${response.data[i].from} para Todos: ${response.data[i].text}</div> 
                </li>`
              }else if (response.data[i].type === "status"){
                if (document.querySelector('input[name="checkStatus"]').value == '1'){
                  lista.innerHTML +=`
                  <li class="msg-access"> 
                    <div class="msg-hora" data-test="message">(${response.data[i].time})</div> 
                    <div class="msg-text" data-test="message">${response.data[i].from} entra na sala...</div> 
                  </li>
                  `
                }
              }else{
                lista.innerHTML +=`
                <li class="msg-private"> 
                  <div class="msg-hora" data-test="message">(${response.data[i].time})</div>    
                  <div class="msg-text" data-test="message">${response.data[i].from} para ${response.data[i].to}: ${response.data[i].text}}</div> 
                </li>
                `
              }
              
            }
              // console.log(response.data);
              })
          .catch(error => {
            console.error(999,error);
            alert("Ocorreu um erro ao buscar mensagens, recarregue a página ou tente novamente mais tarde.");
            window.location.reload();
          });
      }, 3000);
  }  

  function buscaParticipantes() {
    let nomesParticipantes = ["Todos"]; // array para armazenar os nomes dos participantes
    setInterval(() => {
      const div = document.querySelector(".lista-contatos");
      // div.innerHTML = '<div class="contato"><img src="./static/img/person.svg" alt="person"> Todos</div>';
      axios
        .get("https://mock-api.driven.com.br/api/vm/uol/participants")
        .then((response) => {
          console.log(response.data);
          const participantes = response.data;
          participantes.forEach((participante) => {
            const nomeParticipante = participante.name;
            // verifica se o nome do participante já está na lista
            if (!nomesParticipantes.includes(nomeParticipante)) {
              const divParticipante = `<div class="contato"><img src="./static/img/contato.svg" alt="contato"> ${nomeParticipante}</div>`;
              div.innerHTML += divParticipante;
              nomesParticipantes.push(nomeParticipante); // adiciona o nome do participante ao array
            }
          });
          // itera sobre todos os elementos da lista e verifica se o nome do contato está presente
          const contatos = div.querySelectorAll(".contato");
          contatos.forEach((contato) => {
            const nomeContato = contato.innerText.split(" ")[1]; // extrai o nome do contato do texto
            if (nomeContato !== "Todos" && !nomesParticipantes.includes(nomeContato)) {
              contato.remove(); // remove o contato da lista
            }
          });
          return participantes;
        })
        .catch((error) => {
          console.log(error);
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
        alert("Você foi desconectado");
        retornaAccess();
      });
    }, 5000);
  }

  buscaParticipantes()
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
