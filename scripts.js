const nome = document.querySelector('#nome');
const msg = document.querySelector('#mensagem');
const senha = document.querySelector('#senha');
const confirm = document.querySelector('#senha2');
const prosseguir = document.querySelector('#Prosseguir');
const redefinirSenhaBtn = document.querySelector('#redefinirSenha');

let tentativas = 0; 
let correto = 'ana';
let senha1 = '123';

function dizerOi() {
    if (nome.value === '' && senha.value === '' && confirm.value === '') {
        msg.innerHTML = `Preencha os espaços!!! >:(`;
    } else if (nome.value === '') {
        msg.innerHTML = `Boa tentativa, mas você precisa colocar o email! >:(`;
    } else if (nome.value !== correto) {
        msg.innerHTML = `Email incorreto! Quem é você? >:(`;
    } else if (senha.value === '') {
        msg.innerHTML = `Boa tentativa, mas você precisa colocar a senha! >:P`;
    } else if (confirm.value === '') {
        msg.innerHTML = `Tem que confirmar a senha! >:/`;
    } else if (confirm.value === senha1 && confirm.value === senha.value) {
        msg.innerHTML = `Bem vinda! :)`;

        setTimeout(() => {
            window.location.href = 'inicial.html';
        }, 1000);
    } else {
        tentativas++; 
        msg.innerHTML = `Nuh uh! Senha errada! Tentativa ${tentativas} :/`;

        if (tentativas >= 3) {
            msg.innerHTML = `Você errou 3 vezes! Deseja redefinir sua senha?`;
            redefinirSenhaBtn.style.display = 'block'; 
        }
    }
}

function redefinirSenha() {
    let novaSenha = prompt('Digite sua nova senha:');
    let confirmarNovaSenha = prompt('Confirme sua nova senha:');

    if (novaSenha && novaSenha === confirmarNovaSenha) {
        senha1 = novaSenha; 
        tentativas = 0;     
        msg.innerHTML = `Senha redefinida com sucesso! Agora você pode tentar novamente :)`;
        redefinirSenhaBtn.style.display = 'none'; 
    } else {
        msg.innerHTML = `As senhas não coincidem. Tente redefinir novamente.`;
    }
}

function cpf() {
    let novaSenha = prompt('Digite sua nova senha:');
    let confirmarNovaSenha = prompt('Confirme sua nova senha:');

    if (novaSenha && novaSenha === confirmarNovaSenha) {
        senha1 = novaSenha; 
        tentativas = 0;     
        msg.innerHTML = `Senha redefinida com sucesso! Agora você pode tentar novamente :)`;
        redefinirSenhaBtn.style.display = 'none'; 
    } else {
        msg.innerHTML = `As senhas não coincidem. Tente redefinir novamente.`;
    }
}

function cnpj() {
    const validacpf = (cpf) => {
        cpf = cpf.replace(/\D/g, '')

        if(cpf.lenght !== 11){
            msg.innerHTML = `O CPF precisa ter 11 dígitos`
            return
        }
    }
}
