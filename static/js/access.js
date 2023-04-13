document.querySelector('#entrar').addEventListener('click', function(event) {
    event.preventDefault();
    const newUser = document.querySelector('#name').value;
    let dados = {
        name: newUser,
      };
    axios.post("https://mock-api.driven.com.br/api/vm/uol/participants", dados).then(response => {
        if(response.status == 200){
            window.location.replace('main.html');
            localStorage.setItem('newUser', newUser); // armazena o nome do usuário na localStorage
        }
    })
    .catch(error => {
        console.error(error);
        alert("Nome digitado já em uso, escolha outro.");
    });
});
