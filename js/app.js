// CONFIGURAÇÃO DA SENHA DE ACESSO
const SENHA_CORRETA = "simuladoenem26";

// EXECUÇÃO INICIAL
document.addEventListener("DOMContentLoaded", () => {
  const logado = localStorage.getItem("usuario_logado");
  const overlay = document.getElementById("loginOverlay");

  if (logado === "true" && overlay) {
    overlay.style.display = "none";
  }

  gerarBancoIntegral720();
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

// ESTADO GLOBAL DA APLICAÇÃO
let diaAtual = 1;
let questaoAtual = 1;
const respostasUsuario = {};
let bancoQuestoes = [];

// GERADOR COMPLETO DAS 720 QUESTÕES (360 PARA O DIA 1 E 360 PARA O DIA 2)
function gerarBancoIntegral720() {
  bancoQuestoes = [];

  const materiasDia1 = [
    "Linguagens, Códigos e suas Tecnologias",
    "Ciências Humanas e suas Tecnologias"
  ];

  const materiasDia2 = [
    "Ciências da Natureza e suas Tecnologias",
    "Matemática e suas Tecnologias"
  ];

  // Gerar 360 questões para o 1º Dia
  for (let i = 1; i <= 360; i++) {
    const mat = materiasDia1[(i - 1) % 2];
    bancoQuestoes.push({
      numero: i,
      dia: 1,
      materia: mat,
      enunciado: `[Questão ${i} - ${mat}] Na comunicação e análise de conceitos contemporâneos (L${i}-V1), a coesão textual e a lógica dos fatos garantem:`,
      alternativas: [
        `a articulação lógica e coerência entre as ideias propostas`,
        `a obrigatoriedade de rimas e métricas fixas`,
        `o aumento desproporcional do tamanho das fontes`,
        `a eliminação completa de metáforas e figuras de linguagem`,
        `a ausência total de pontuação e estrutura sintática`
      ],
      correta: 0
    });
  }

  // Gerar 360 questões para o 2º Dia
  for (let i = 1; i <= 360; i++) {
    const mat = materiasDia2[(i - 1) % 2];
    bancoQuestoes.push({
      numero: i,
      dia: 2,
      materia: mat,
      enunciado: `[Questão ${i} - ${mat}] No estudo das transformações e modelos analíticos (N${i}-V2), um sistema isolado em equilíbrio mantém constante a sua:`,
      alternativas: [
        `conservação de energia total e invariância das grandezas`,
        `temperatura absoluta sob variação contínua de massa`,
        `pressão atmosférica sem interferência de volume`,
        `massa molar dos reagentes em ambiente aberto`,
        `velocidade escalar média independentemente das forças`
      ],
      correta: 0
    });
  }

  console.log(`Banco total de ${bancoQuestoes.length} questões carregado com sucesso.`);
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

// EXIBIR QUESTÃO SELECIONADA
function carregarQuestao(num) {
  questaoAtual = num;

  // Filtra as questões do dia atual
  let questoesDoDia = bancoQuestoes.filter(q => q.dia === diaAtual);
  let q = questoesDoDia[num - 1];

  if (!q) {
    q = {
      numero: num,
      materia: diaAtual === 1 ? "Linguagens / Humanas" : "Natureza / Matemática",
      enunciado: `Questão ${num} do ${diaAtual}º Dia...`,
      alternativas: [
        "Alternativa A",
        "Alternativa B",
        "Alternativa C",
        "Alternativa D",
        "Alternativa E"
      ]
    };
  }

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
