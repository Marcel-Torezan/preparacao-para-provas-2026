// CONFIGURAÇÃO DA SENHA DE ACESSO
const SENHA_CORRETA = "simuladoenem26";

// EXECUÇÃO INICIAL
document.addEventListener("DOMContentLoaded", () => {
  const logado = localStorage.getItem("usuario_logado");
  const overlay = document.getElementById("loginOverlay");

  if (logado === "true" && overlay) {
    overlay.style.display = "none";
  }

  carregarBancoQuestoes();
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

// ESTADO DA APLICAÇÃO
let diaAtual = 1;
let questaoAtual = 1;
const respostasUsuario = {};
let bancoQuestoes = { 1: [], 2: [] };

// CARREGAMENTO DAS 720 QUESTÕES DOS ARQUIVOS JSON
async function carregarBancoQuestoes() {
  try {
    const [resDia1, resDia2] = await Promise.all([
      fetch('data/dia1.json').catch(() => null),
      fetch('data/dia2.json').catch(() => null)
    ]);

    if (resDia1 && resDia1.ok) {
      bancoQuestoes[1] = await resDia1.json();
    }
    if (resDia2 && resDia2.ok) {
      bancoQuestoes[2] = await resDia2.json();
    }
  } catch (err) {
    console.warn("Carregando estrutura padrão de questões...", err);
  }
}

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

// EXIBIÇÃO DA QUESTÃO
function carregarQuestao(num) {
  questaoAtual = num;
  const listaDia = bancoQuestoes[diaAtual] || [];
  
  // Busca no banco ou gera fallback caso não esteja carregado
  const q = listaDia.find(item => item.numero === num) || listaDia[num - 1] || {
    numero: num,
    materia: diaAtual === 1 ? "Linguagens / Ciências Humanas" : "Ciências da Natureza / Matemática",
    enunciado: `Questão ${num} do ${diaAtual}º Dia...`,
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
  
  if (tagMat) tagMat.innerText = q.materia || (diaAtual === 1 ? "1º Dia - ENEM" : "2º Dia - ENEM");
  if (numEl) numEl.innerText = `Questão ${q.numero || num}`;
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
