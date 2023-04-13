document.querySelector('#entrar').addEventListener('click', function(event) {
    event.preventDefault();
    const newUser = document.querySelector('#name').value;
    let dados = {
        name: newUser,
      };
    axios.post("https://mock-api.driven.com.br/api/vm/uol/participants", dados).then(response => {
        console.log(response.status);
        if(response.status == 200){
            window.location.replace('main.html');
            localStorage.setItem('newUser', newUser); // armazena o nome do usuário na localStorage
        }else{
            alert("Nome digitado já em uso, escolha outro.")
        }
    })
    .catch(error => {
        console.error(2222, error);
    });
});
