document.querySelector('#entrar').addEventListener('click', function(event) {
    event.preventDefault();
    const newUser = document.querySelector('#name').value;
    let dados = {
        name: newUser,
      };
    axios.post("https://mock-api.driven.com.br/api/vm/uol/participants", dados).then(response => {
        console.log(response.data);
        window.location.replace('main.html');
        localStorage.setItem('newUser', newUser); // armazena o nome do usuário na localStorage
    })
    .catch(error => {
        console.error(2222, error);
    });
});
