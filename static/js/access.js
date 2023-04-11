document.querySelector('#entrar').addEventListener('click', function(event) {
    event.preventDefault();
    const newUser = document.querySelector('#name').value;
    window.location.replace('index.html');
    localStorage.setItem('newUser', newUser); // armazena o nome do usuário na localStorage
});