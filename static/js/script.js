axios.defaults.headers.common['Authorization'] = 'knX7klq0NWrHzRzsc8JXodY0';

let newUser;
const agora = new Date();
const hora = agora.getHours();
const minuto = agora.getMinutes();
const segundo = agora.getSeconds();
let quem = "Todos";
let tipo = "message";
let paraQuem = true;
let atuais ;
let antigos ;
let userOnline = () => {
  setInterval(() => {
    
    setInterval(() => {
      axios.get("https://mock-api.driven.com.br/api/vm/uol/participants").then((response) => {
        const participantes = response.data;
        const listaAntes = participantes.slice();
        atuais = participantes;
        participantes.forEach((participante) => {
          // console.log(participante)
        });
        let valoresDiferentes = atuais.filter((participante) => !antigos.includes(participante));
        // console.log(antigos, atuais ,valoresDiferentes)
      })
    }, 3000)
    antigos = atuais

  },3000)
}

userOnline()

function retornaAccess(){
  window.location.replace('index.html');
}

// if (window.location.pathname === '/main.html') {
newUser = localStorage.getItem('newUser');
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
  if (event.keyCode === 13) { // clicando no enter
    const msg = input.value;
    dados = {
      from: newUser,
      to: quem,
      text: msg,
      type: tipo,
  }
  enviarMensagem(dados);
  document.querySelector('.msg-input input').value = ''
  }
});


function newPost(){
  const msg = input.value;
    dados = {
      from: newUser,
      to: quem,
      text: msg,
      type: tipo,
  }
  enviarMensagem(dados);
  document.querySelector('.msg-input input').value = ''
}


function enviarMensagem(dados) {
  axios.post("https://mock-api.driven.com.br/api/vm/uol/messages", dados).then(response => {
    buscarMensagens();
  })
  .catch(error => {
    console.error(2222, error);
    alert("Ocorreu um erro ao enviar a mensagem, tente novamente mais tarde.");
    window.location.reload();
    retornaAccess();
  });
}


function buscarMensagens() {
    const lista = document.querySelector('.msg-list');
    let contador = 0;
    setInterval(() => {
      axios.get("https://mock-api.driven.com.br/api/vm/uol/messages").then(response => {
          lista.innerHTML = ''
          response.data.forEach(mensagem => {
            console.log(mensagem.type, mensagem.time, mensagem.from, mensagem.text)
            contador ++
            if (mensagem.type === "message"){
              lista.innerHTML +=`
              <li class="msg-message" data-test="message" id="${"message"+contador.toString()}"> 
                <div class="msg-hora">(${mensagem.time})</div> 
                <div class="msg-text">${mensagem.from} para ${mensagem.to}: ${mensagem.text}</div> 
              </li>`
            }else if (mensagem.type === "status"){
              if (document.querySelector('input[name="checkStatus"]').value == '0'){
                lista.innerHTML +=`
                <li class="msg-access" data-test="message" id="${"message"+contador.toString()}"> 
                  <div class="msg-hora" >(${mensagem.time})</div> 
                  <div class="msg-text">${mensagem.from} ${mensagem.text}</div> 
                </li>
                `
              }
            }else{
                lista.innerHTML +=`
              <li class="msg-private" data-test="message" id="${"message"+contador.toString()}"> 
                <div class="msg-hora">(${mensagem.time})</div>    
                <div class="msg-text">${mensagem.from} reservadamente para ${mensagem.to}: ${mensagem.text}</div> 
              </li>
              `
            }
            lista.scrollTop = lista.scrollHeight;
          })
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
    div.insertAdjacentHTML("beforeend", `<div class="contato" id="pessoa" onclick="nome(\'pessoa\',\'Todos\')" data-participante="Todos" data-test="all"><img src="./static/img/person.svg" id="Todos"  alt="person"> Todos</div>`);
    axios.get("https://mock-api.driven.com.br/api/vm/uol/participants").then((response) => {
      const participantes = response.data;
      const listaAntes = participantes.slice();
      participantes.forEach((participante) => {
        contador++
        const divParticipante = `<div class="contato" id="${"pessoa"+contador}" onclick="nome('${"pessoa"+contador}','${participante.name}')" data-participante="${participante.name}" data-test="participant"><img src="./static/img/contato.svg" alt="contato"> ${participante.name}</div>`;
        div.insertAdjacentHTML("beforeend", divParticipante);
        nomesParticipantes.push(participante.name);
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

function toggleCadeado(cadeado) {
  paraQuem = !paraQuem;
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


function nome(id, participant) {
  quem = participant
  if (id!="pessoa"){
    let divParticipante = document.querySelector(`${'#'+id}`);
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
  if (!paraQuem){
    tipo = 'message';
    if (forWho.innerHTML === "Enviando para " + participant) {
      forWho.innerHTML = '';
    } else {
      forWho.innerHTML = "Enviando para " + participant;
    }
  }else{
    tipo = 'private_message';
    if (forWho.innerHTML === "Enviando para " + participant + " (reservadamente)") {
      forWho.innerHTML = '';
    } else {
      forWho.innerHTML = "Enviando para " + participant + " (reservadamente)";
    }
  }
  }else{
    let forWho = document.querySelector(".forWho");
    forWho.innerHTML = '';
  }
}


function conexao(){
  setInterval(() => {
    axios.post('https://mock-api.driven.com.br/api/vm/uol/status', {
      name: newUser,
    }).then(response => {
      // console.log(response.data);
    })
    .catch(error => {
      console.error(error);
      alert("Você foi desconectado");
      retornaAccess();
    });
  }, 5000);
}


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

buscaParticipantes()
conexao();
buscarMensagens();

// };


