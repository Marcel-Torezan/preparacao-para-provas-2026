// CONFIGURAÇÃO DA SENHA DE ACESSO
const SENHA_CORRETA = "simuladoenem26";

// EXECUÇÃO INICIAL
document.addEventListener("DOMContentLoaded", () => {
  const logado = localStorage.getItem("usuario_logado");
  const overlay = document.getElementById("loginOverlay");

  if (logado === "true" && overlay) {
    overlay.style.display = "none";
  }

  carregarBancoDeQuestoes();
});

// VALIDAÇÃO DE LOGIN
function validarLogin(e) {
  e.preventDefault();
  const senhaInput = document.getElementById("senhaInput").value;
  const erroMsg = document.getElementById("erroMsg");
  const overlay = document.getElementById("loginOverlay");

  if (senhaInput === SENHA_CORRETA) {
    localStorage.setItem("usuario_logado", "true");
    if (overlay) overlay.style.display = "none";
    if (erroMsg) erroMsg.innerText = "";
  } else {
    if (erroMsg) erroMsg.innerText = "Senha incorreta! Tente novamente.";
  }
}

// ESTADO GLOBAL
let diaAtual = 1;
let questaoAtual = 1;
const respostasUsuario = {};
let bancoQuestoes = { 1: [], 2: [] };

// CARREGAMENTO DOS ARQUIVOS JSON
async function carregarBancoDeQuestoes() {
  try {
    const [res1, res2] = await Promise.all([
      fetch('data/dia1.json').catch(() => null),
      fetch('data/dia2.json').catch(() => null)
    ]);

    if (res1 && res1.ok) bancoQuestoes[1] = await res1.json();
    if (res2 && res2.ok) bancoQuestoes[2] = await res2.json();
  } catch (err) {
    console.warn("Carregando gerador auxiliar para questões pendentes...", err);
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

// BUSCAR OU GERAR QUESTÃO INDIVIDUAL
function obterQuestao(dia, num) {
  const listaDia = bancoQuestoes[dia] || [];
  let q = listaDia.find(item => item.numero === num) || listaDia[num - 1];

  if (!q) {
    // Gerador de suporte para garantir que todas as 90 questões funcionem
    const materiasD1 = ["Linguagens, Códigos e suas Tecnologias", "Ciências Humanas e suas Tecnologias"];
    const materiasD2 = ["Ciências da Natureza e suas Tecnologias", "Matemática e suas Tecnologias"];
    const mat = dia === 1 ? materiasD1[(num - 1) % 2] : materiasD2[(num - 1) % 2];

    q = {
      numero: num,
      materia: mat,
      enunciado: `(ENEM 2026 - Questão ${num}) Analise o conceito referente a ${mat}. Com base nos conhecimentos da disciplina, assinale a alternativa correta:`,
      alternativas: [
        `Compreensão direta e aplicação dos conceitos fundamentais da disciplina`,
        `Interpretação errônea baseada em premissas incorretas`,
        `Generalização indevida dos dados apresentados no texto`,
        `Ausência de correlação lógica entre as variáveis analisadas`,
        `Dedução incompatível com o modelo teórico vigente`
      ]
    };
  }
  return q;
}

// RENDERIZAR QUESTÃO NA TELA
function carregarQuestao(num) {
  questaoAtual = num;
  const q = obterQuestao(diaAtual, num);

  const tagMat = document.getElementById("tagMateria");
  const numEl = document.getElementById("numQuestao");
  const enunEl = document.getElementById("enunciadoQuestao");

  if (tagMat) tagMat.innerText = q.materia;
  if (numEl) numEl.innerText = `Questão ${num}`;
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
