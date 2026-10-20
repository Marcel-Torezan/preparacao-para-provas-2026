// CONFIGURAÇÃO DA SENHA DE ACESSO
const SENHA_CORRETA = "simuladoenem26";

// EXECUÇÃO INICIAL
document.addEventListener("DOMContentLoaded", () => {
  const logado = localStorage.getItem("usuario_logado");
  const overlay = document.getElementById("loginOverlay");

  if (logado === "true" && overlay) {
    overlay.style.display = "none";
  }
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

// LÓGICA DA PROVA
let diaAtual = 1;
let questaoAtual = 1;
const respostasUsuario = {};

function iniciarProva(dia) {
  diaAtual = dia;
  document.getElementById("telaInicial").style.display = "none";
  document.getElementById("telaProva").style.display = "block";
  document.getElementById("timer").style.display = "block";
  
  inicializarPainelGabarito();
  carregarQuestao(1);
}

function voltarTelaInicial() {
  document.getElementById("telaProva").style.display = "none";
  document.getElementById("telaInicial").style.display = "block";
  document.getElementById("timer").style.display = "none";
}

// BANCO DE DADOS DE EXEMPLO DE QUESTÕES
const bancoQuestoes = {
  1: [
    {
      numero: 1,
      materia: "Linguagens, Códigos e suas Tecnologias",
      enunciado: "Na comunicação contemporânea, a coesão textual garante:",
      alternativas: [
        "o aumento do tamanho da fonte",
        "a obrigatoriedade de rimas",
        "a eliminação de metáforas",
        "a articulação lógica entre as ideias",
        "a ausência de pontuação"
      ]
    }
  ],
  2: [
    {
      numero: 1,
      materia: "Ciências da Natureza e suas Tecnologias",
      enunciado: "No estudo das transformações de energia, um sistema isolado mantém constante sua:",
      alternativas: [
        "energia total",
        "temperatura absoluta",
        "pressão atmosférica",
        "massa molar de reagentes",
        "velocidade média"
      ]
    }
  ]
};

function carregarQuestao(num) {
  questaoAtual = num;
  const listaDia = bancoQuestoes[diaAtual] || [];
  const q = listaDia.find(item => item.numero === num) || {
    numero: num,
    materia: diaAtual === 1 ? "Linguagens / Ciências Humanas" : "Ciências da Natureza / Matemática",
    enunciado: `Enunciado da questão ${num} do ${diaAtual}º Dia...`,
    alternativas: [
      `Alternativa A da questão ${num}`,
      `Alternativa B da questão ${num}`,
      `Alternativa C da questão ${num}`,
      `Alternativa D da questão ${num}`,
      `Alternativa E da questão ${num}`
    ]
  };

  const tagMat = document.getElementById("tagMateria");
  const numEl = document.getElementById("numQuestao");
  const enunEl = document.getElementById("enunciadoQuestao");
  
  if (tagMat) tagMat.innerText = q.materia;
  if (numEl) numEl.innerText = `Questão ${q.numero}`;
  if (enunEl) enunEl.innerText = q.enunciado;

  const altsContainer = document.getElementById("alternativasContainer");
  if (altsContainer) {
    altsContainer.innerHTML = "";
    const letras = ["A", "B", "C", "D", "E"];

    q.alternativas.forEach((altText, idx) => {
      const btn = document.createElement("button");
      btn.className = "alt-btn";
      
      const chaveResposta = `${diaAtual}_${num}`;
      if (respostasUsuario[chaveResposta] === idx) {
        btn.classList.add("on");
      }

      btn.innerHTML = `<b>${letras[idx]}</b> <span>${altText}</span>`;
      btn.onclick = () => selecionarResposta(num, idx);
      altsContainer.appendChild(btn);
    });
  }

  atualizarPainelNavegacao();
}

function selecionarResposta(numQuestao, indexAlt) {
  const chaveResposta = `${diaAtual}_${numQuestao}`;
  respostasUsuario[chaveResposta] = indexAlt;
  carregarQuestao(numQuestao);
  atualizarPainelNavegacao();
}

function mudarQuestao(delta) {
  const novaQuestao = questaoAtual + delta;
  if (novaQuestao >= 1 && novaQuestao <= 90) {
    carregarQuestao(novaQuestao);
  }
}

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

function atualizarPainelNavegacao() {
  for (let i = 1; i <= 90; i++) {
    const btn = document.getElementById(`btn-painel-${i}`);
    if (btn) {
      btn.className = "";
      if (i === questaoAtual) {
        btn.classList.add("at");
      }
      const chaveResposta = `${diaAtual}_${i}`;
      if (respostasUsuario[chaveResposta] !== undefined) {
        btn.classList.add("fe");
      }
    }
  }
}
