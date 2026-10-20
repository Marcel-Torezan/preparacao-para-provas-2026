// CONFIGURAÇÃO DA SENHA DE ACESSO
const SENHA_CORRETA = "simuladoenem26";

// EXECUÇÃO INICIAL AO CARREGAR A PÁGINA
document.addEventListener("DOMContentLoaded", () => {
  const logado = localStorage.getItem("usuario_logado");
  const overlay = document.getElementById("loginOverlay");

  if (logado === "true" && overlay) {
    overlay.style.display = "none";
  }

  inicializarPainelGabarito();
  carregarQuestao(1);
});

// FUNÇÃO DE VALIDAÇÃO DE SENHA
function validarLogin(e) {
  e.preventDefault();
  const senhaInput = document.getElementById("senhaInput").value;
  const erroMsg = document.getElementById("erroMsg");
  const overlay = document.getElementById("loginOverlay");

  if (senhaInput === SENHA_CORRETA) {
    localStorage.setItem("usuario_logado", "true");
    if (overlay) {
      overlay.style.display = "none";
    }
    if (erroMsg) {
      erroMsg.innerText = "";
    }
  } else {
    if (erroMsg) {
      erroMsg.innerText = "Senha incorreta! Tente novamente.";
    }
  }
}

// QUESTÕES DE EXEMPLO
const questoes = [
  {
    numero: 1,
    materia: "Linguagens, Códigos e suas Tecnologias",
    estilo: "Estilo ENEM",
    enunciado: "Na comunicação contemporânea, a coesão textual garante:",
    alternativas: [
      "o aumento do tamanho da fonte",
      "a obrigatoriedade de rimas",
      "a eliminação de metáforas",
      "a articulação lógica entre as ideias",
      "a ausência de pontuação"
    ],
    correta: 3
  }
];

let questaoAtual = 1;
const respostasUsuario = {};

// CARREGAR A QUESTÃO NA TELA
function carregarQuestao(num) {
  questaoAtual = num;
  const q = questoes.find(item => item.numero === num) || {
    numero: num,
    enunciado: `Enunciado da questão ${num}...`,
    alternativas: [
      `Alternativa A da questão ${num}`,
      `Alternativa B da questão ${num}`,
      `Alternativa C da questão ${num}`,
      `Alternativa D da questão ${num}`,
      `Alternativa E da questão ${num}`
    ],
    correta: 0
  };

  const numEl = document.getElementById("numQuestao");
  const enunEl = document.getElementById("enunciadoQuestao");
  
  if (numEl) numEl.innerText = `Questão ${q.numero}`;
  if (enunEl) enunEl.innerText = q.enunciado;

  const altsContainer = document.getElementById("alternativasContainer");
  if (altsContainer) {
    altsContainer.innerHTML = "";
    const letras = ["A", "B", "C", "D", "E"];

    q.alternativas.forEach((altText, idx) => {
      const btn = document.createElement("button");
      btn.className = "alt-btn";
      
      if (respostasUsuario[num] === idx) {
        btn.classList.add("on");
      }

      btn.innerHTML = `<b>${letras[idx]}</b> <span>${altText}</span>`;
      btn.onclick = () => selecionarResposta(num, idx);
      altsContainer.appendChild(btn);
    });
  }

  atualizarPainelNavegacao();
}

// SELECIONAR ALTERNATIVA
function selecionarResposta(numQuestao, indexAlt) {
  respostasUsuario[numQuestao] = indexAlt;
  carregarQuestao(numQuestao);
  atualizarPainelNavegacao();
}

// NAVEGAÇÃO DE QUESTÕES
function mudarQuestao(delta) {
  const novaQuestao = questaoAtual + delta;
  if (novaQuestao >= 1 && novaQuestao <= 90) {
    carregarQuestao(novaQuestao);
  }
}

// GERAR CARTÃO-RESPOSTA NUMÉRICO
function inicializarPainelGabarito() {
  const painel = document.getElementById("painelGabarito");
  if (!painel) return;

  painel.innerHTML = "";
  for (let i = 1; i <= 90; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.id = `btn-painel-${i}`;
    btn.onclick = () => carregarQuestao(i);
    painel.appendChild(btn);
  }
}

// ATUALIZAR BOTAO SELECIONADO NO PAINEL
function atualizarPainelNavegacao() {
  for (let i = 1; i <= 90; i++) {
    const btn = document.getElementById(`btn-painel-${i}`);
    if (btn) {
      btn.className = "";
      if (i === questaoAtual) {
        btn.classList.add("at");
      }
      if (respostasUsuario[i] !== undefined) {
        btn.classList.add("fe");
      }
    }
  }
}
