const alertaErro = document.querySelector('.mostrar');
const username = document.querySelector('#user');
const senha = document.querySelector('#senha');
const formLogin = document.querySelector('#form');



//formulario login
formLogin.addEventListener('submit', (e)=>{
    e.preventDefault();
    data={
        nome:username.value,
        senha:senha.value
     }
     console.log(data);

})


