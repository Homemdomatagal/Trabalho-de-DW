const email = document.querySelector("#email");
const tipo = document.querySelector("#tipo");
const documento = document.querySelector("#documento");
const senha = document.querySelector("#senha");
const senha2 = document.querySelector("#senha2");
const msg = document.querySelector("#mensagem");
const prosseguir = document.querySelector("#prosseguir");
const redefinirSenhaBtn = document.querySelector("#redefinirSenha");

let tentativas = 0;
let senhaCorreta = "123";
let emailCorreto = "ana@email.com";

tipo.addEventListener("change", () => {
  documento.placeholder =
    tipo.value === "cpf"
      ? "Digite seu CPF (somente números)"
      : tipo.value === "cnpj"
      ? "Digite seu CNPJ (somente números)"
      : "Digite seu CPF ou CNPJ...";
});

prosseguir.addEventListener("click", () => {
  validarFormulario();
});

redefinirSenhaBtn.addEventListener("click", redefinirSenha);

function validarFormulario() {
  const emailValue = email.value.trim();
  const tipoValue = tipo.value.trim();
  const docValue = documento.value.trim();
  const senhaValue = senha.value.trim();
  const senha2Value = senha2.value.trim();

  if (!emailValue && !senhaValue && !senha2Value && !docValue) {
    return mostrarMsg("Preencha todos os campos!!! >:(");
  }

  if (emailValue === "") return mostrarMsg("Você precisa colocar o email! >:(");
  if (!checkEmail(emailValue)) return mostrarMsg("Email inválido! >:(");
  if (emailValue !== emailCorreto)
    return mostrarMsg("Email incorreto! Quem é você? >:(");

  if (tipoValue === "") return mostrarMsg("Selecione CPF ou CNPJ! >:(");
  if (docValue === "") return mostrarMsg("Digite o número do documento! >:(");

  if (tipoValue === "cpf" && !validaCPF(docValue))
    return mostrarMsg("CPF inválido! >:(");
  if (tipoValue === "cnpj" && !validaCNPJ(docValue))
    return mostrarMsg("CNPJ inválido! >:(");

  if (senhaValue === "") return mostrarMsg("Coloque a senha! >:(");
  if (senha2Value === "") return mostrarMsg("Tem que confirmar a senha! >:/");

  if (senhaValue !== senhaCorreta || senha2Value !== senhaCorreta) {
    tentativas++;
    mostrarMsg(`Nuh uh! Senha errada! Tentativa ${tentativas} :/`);
    if (tentativas >= 3) {
      mostrarMsg("Você errou 3 vezes! Deseja redefinir sua senha?");
      redefinirSenhaBtn.style.display = "inline-block";
    }
    return;
  }

  if (senhaValue === senha2Value && senhaValue === senhaCorreta) {
    mostrarMsg("Bem-vinda! :)");
    setTimeout(() => (window.location.href = "inicial.html"), 1200);
  }
}

function mostrarMsg(texto) {
  msg.innerHTML = texto;
}

function redefinirSenha() {
  let novaSenha = prompt("Digite sua nova senha:");
  let confirmarNovaSenha = prompt("Confirme sua nova senha:");

  if (novaSenha && novaSenha === confirmarNovaSenha) {
    senhaCorreta = novaSenha;
    tentativas = 0;
    msg.innerHTML = "Senha redefinida com sucesso! Agora tente novamente :)";
    redefinirSenhaBtn.style.display = "none";
  } else {
    msg.innerHTML = "As senhas não coincidem. Tente redefinir novamente.";
  }
}

// Funções auxiliares
function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function validaCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.charAt(10));
}

function validaCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, "");
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;
  tamanho++;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado == digitos.charAt(1);
}
