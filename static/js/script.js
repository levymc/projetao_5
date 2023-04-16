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
                <li class="msg-message" data-test="message"> 
                  <div class="msg-hora">(${response.data[i].time})</div> 
                  <div class="msg-text">${response.data[i].from} para Todos: ${response.data[i].text}</div> 
                </li>`
              }else if (response.data[i].type === "status"){
                if (document.querySelector('input[name="checkStatus"]').value == '1'){
                  lista.innerHTML +=`
                  <li class="msg-access" data-test="message"> 
                    <div class="msg-hora" >(${response.data[i].time})</div> 
                    <div class="msg-text">${response.data[i].from} entra na sala...</div> 
                  </li>
                  `
                }
              }else{
                lista.innerHTML +=`
                <li class="msg-private" data-test="message"> 
                  <div class="msg-hora">(${response.data[i].time})</div>    
                  <div class="msg-text">${response.data[i].from} para ${response.data[i].to}: ${response.data[i].text}}</div> 
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
    let contador = 0;
    
    setInterval(() => {
      let nomesParticipantes = ["Todos"]; // array para armazenar os nomes dos participantes
      const div = document.querySelector(".lista-contatos");
      div.innerHTML = ''; 
      div.insertAdjacentHTML("beforeend", `<div class="contato" onclick="nome(\'Todos\')" data-participante="Todos" data-test="all"><img src="./static/img/person.svg" id="Todos"  alt="person"> Todos</div>`);
      axios.get("https://mock-api.driven.com.br/api/vm/uol/participants").then((response) => {
        console.log(response.data);
        const participantes = response.data;
        participantes.forEach((participante) => {
          contador++
          const divParticipante = `<div class="contato" id="${"pessoa"+contador}" onclick="nome('${"pessoa"+contador}','${participante.name}')" data-participante="${participante.name}" data-test="participant"><img src="./static/img/contato.svg" alt="contato"> ${participante.name}</div>`;
          div.insertAdjacentHTML("beforeend", divParticipante);
          nomesParticipantes.push(participante.name);
          // const divContato = document.querySelector(`#${participante.name}`);
          // adicionando o evento de clique
          // divContato.addEventListener('click', () => {
            // console.log(participante.name);
          // });
          // console.log(nomesParticipantes)
        });
        // itera sobre todos os elementos da lista e verifica se o nome do contato está presente
        const contatos = div.querySelectorAll(".contato");
        contatos.forEach((contato) => {
          const nomeContato = contato.getAttribute("data-participante");
          if (nomeContato !== "Todos" && !nomesParticipantes.includes(nomeContato)) {
            contato.remove(); // remove o contato da lista
          }
        });
        return participantes;
      })
      .catch((error) => {
        console.log(error);
      });
    }, 10000);
  }
  
  
  function nome(id, participant) {
    let divParticipante = document.querySelector(`${'#'+id}`);
    console.log(divParticipante)
    const checkmarkIcon = divParticipante.querySelector('[name="checkmark-outline"]');
    if (checkmarkIcon && checkmarkIcon.parentElement === divParticipante) {
      checkmarkIcon.remove();
    } else {
      // Desmarca o participante anteriormente selecionado, se houver
      const previouslySelectedParticipant = document.querySelector('.contato ion-icon');
      if (previouslySelectedParticipant) {
        previouslySelectedParticipant.remove();
      }
      divParticipante.insertAdjacentHTML('beforeend', '<ion-icon name="checkmark-outline"></ion-icon>');
    }
    let forWho = document.querySelector(".forWho");
    if (forWho.innerHTML === "Enviando para " + participant + " (reservadamente)") {
      forWho.innerHTML = '';
    } else {
      forWho.innerHTML = "Enviando para " + participant + " (reservadamente)";
    }
  }
  
  function toggleCadeado(cadeado) {
    const checkmarkIcon = cadeado.querySelector('[name="checkmark-outline"]');
    if (checkmarkIcon && checkmarkIcon.parentElement === cadeado) {
      checkmarkIcon.remove();
    } else {
      // Desmarca o participante anteriormente selecionado, se houver
      const previouslySelectedCadeado = document.querySelector('.cadeado ion-icon');
      if (previouslySelectedCadeado) {
        previouslySelectedCadeado.remove();
      }
      cadeado.insertAdjacentHTML('beforeend', '<ion-icon name="checkmark-outline"></ion-icon>');
    }
  }
  
  const publicoCadeado = document.querySelector('.cadeado.publico');
  toggleCadeado(publicoCadeado); // adiciona o ícone na div .publica
  publicoCadeado.addEventListener('click', () => toggleCadeado(publicoCadeado));
  
  const reservadoCadeado = document.querySelector('.cadeado.reservado');
  reservadoCadeado.addEventListener('click', () => toggleCadeado(reservadoCadeado));  
  

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
