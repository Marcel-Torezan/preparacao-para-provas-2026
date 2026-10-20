// CONFIGURAÇÃO DA SENHA DE ACESSO
const SENHA_CORRETA = "simuladoenem26";

// BANCO DE DADOS GLOBAL COM 720 QUESTÕES (360 PARA CADA DIA)
let BANCO_COMPLETO_720 = { 1: [], 2: [] };
let questoesSimuladoAtual = [];
const respostasUsuario = {};
let diaAtual = 1;
let questaoAtual = 1;
let intervaloTimer = null;
let tempoEmSegundos = 0;

// VALIDAÇÃO DE LOGIN E GERAÇÃO DAS QUESTÕES
document.addEventListener("DOMContentLoaded", () => {
  const logado = localStorage.getItem("usuario_logado");
  const overlay = document.getElementById("loginOverlay");

  if (logado === "true" && overlay) {
    overlay.style.display = "none";
  }

  gerarTodasAs720Questoes();
});

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

// ALGORITMO GERADOR DAS 720 QUESTÕES (360/DIA) NO PADRÃO ENEM
function gerarTodasAs720Questoes() {
  BANCO_COMPLETO_720[1] = [];
  BANCO_COMPLETO_720[2] = [];

  const temasD1 = [
    { mat: "Linguagens, Códigos e suas Tecnologias", assunto: "Análise de Coesão e Coerência Textual" },
    { mat: "Ciências Humanas e suas Tecnologias", assunto: "Processos Históricos e Geopolítica Contemporânea" },
    { mat: "Linguagens, Códigos e suas Tecnologias", assunto: "Variação Linguística e Funções da Linguagem" },
    { mat: "Ciências Humanas e suas Tecnologias", assunto: "Urbanização, Espaço Geográfico e Sociedade" }
  ];

  const temasD2 = [
    { mat: "Ciências da Natureza e suas Tecnologias", assunto: "Transformações de Energia e Leis da Física" },
    { mat: "Matemática e suas Tecnologias", assunto: "Modelagem Algébrica e Funções do 1º e 2º Grau" },
    { mat: "Ciências da Natureza e suas Tecnologias", assunto: "Reações Químicas, Equilíbrio e Biologia Celular" },
    { mat: "Matemática e suas Tecnologias", assunto: "Análise Combinatória, Probabilidade e Geometria" }
  ];

  // Gera 360 questões para o 1º Dia
  for (let i = 1; i <= 360; i++) {
    const t = temasD1[(i - 1) % temasD1.length];
    BANCO_COMPLETO_720[1].push({
      id: i,
      dia: 1,
      materia: t.mat,
      enunciado: `(ENEM 2026 - Questão #${i}) [${t.assunto}] No contexto dos estudos aplicados sobre ${t.assunto.toLowerCase()}, considere a análise das relações sociais, discursivas e teóricas do item ${i}. Com base nos fundamentos da matriz do ENEM, assinale a opção correta:`,
      alternativas: [
        `Articulação conceitual coerente e interpretação lógica direta dos dados do item ${i}`,
        `Conclusão equivocada decorrente de leitura inconsistente das premissas`,
        `Extrapolação interpretativa não suportada pelo texto base da questão`,
        `Incompatibilidade entre a hipótese apresentada e a regra geral da disciplina`,
        `Ausência de correlação fundamentada entre as variáveis analisadas`
      ],
      correta: 0
    });
  }

  // Gera 360 questões para o 2º Dia
  for (let i = 1; i <= 360; i++) {
    const t = temasD2[(i - 1) % temasD2.length];
    BANCO_COMPLETO_720[2].push({
      id: i + 360,
      dia: 2,
      materia: t.mat,
      enunciado: `(ENEM 2026 - Questão #${i}) [${t.assunto}] Em um experimento e modelo matemático/científico relativo a ${t.assunto.toLowerCase()}, avalia-se o comportamento das variáveis sob a condição ${i}. Determine a alternativa válida:`,
      alternativas: [
        `Aplicação direta dos princípios científicos e resolução analítica correta para o problema ${i}`,
        `Erro de cálculo decorrente da substituição incorreta das variáveis formais`,
        `Generalização indevida dos dados sem observância das condições de equilíbrio`,
        `Dedução incompatível com as leis de conservação e equações de referência`,
        `Interpretação nula devido à falha no dimensionamento das grandezas`
      ],
      correta: 0
    });
  }

  console.log("Banco com 720 questões (360/dia) gerado com sucesso!");
}

// MONTA E SORTEIA O SIMULADO DE 90 QUESTÕES PARA O DIA ESCOLHIDO
function montarSimulado(dia) {
  questoesSimuladoAtual = [];
  const copiaBanco = [...BANCO_COMPLETO_720[dia]];

  // Embaralha o banco de 360 questões daquele dia
  copiaBanco.sort(() => Math.random() - 0.5);

  // Seleciona 90 questões para a prova
  const selecionadas = copiaBanco.slice(0, 90);

  selecionadas.forEach((q, idx) => {
    questoesSimuladoAtual.push({
      numero: idx + 1,
      materia: q.materia,
      enunciado: q.enunciado,
      alternativas: q.alternativas,
      correta: q.correta
    });
  });
}

// INICIAR A PROVA
function iniciarProva(dia) {
  diaAtual = dia;
  for (let k in respostasUsuario) delete respostasUsuario[k];

  montarSimulado(dia);

  document.getElementById("telaInicial").style.display = "none";
  document.getElementById("telaResultado").style.display = "none";
  document.getElementById("telaProva").style.display = "block";
  document.getElementById("timer").style.display = "block";

  tempoEmSegundos = dia === 1 ? (5 * 3600 + 30 * 60) : (5 * 3600);
  iniciarCronometro();

  inicializarPainelGabarito();
  carregarQuestao(1);
}

function iniciarCronometro() {
  if (intervaloTimer) clearInterval(intervaloTimer);

  intervaloTimer = setInterval(() => {
    if (tempoEmSegundos <= 0) {
      clearInterval(intervaloTimer);
      alert("Tempo esgotado! O simulado será finalizado.");
      finalizarSimulado();
      return;
    }
    tempoEmSegundos--;

    let h = Math.floor(tempoEmSegundos / 3600);
    let m = Math.floor((tempoEmSegundos % 3600) / 60);
    let s = tempoEmSegundos % 60;

    let formatado = 
      String(h).padStart(2, '0') + ":" + 
      String(m).padStart(2, '0') + ":" + 
      String(s).padStart(2, '0');

    const elTimer = document.getElementById("tempoRestante");
    if (elTimer) elTimer.innerText = formatado;
  }, 1000);
}

function voltarTelaInicial() {
  if (intervaloTimer) clearInterval(intervaloTimer);
  document.getElementById("telaProva").style.display = "none";
  document.getElementById("telaResultado").style.display = "none";
  document.getElementById("telaInicial").style.display = "block";
  document.getElementById("timer").style.display = "none";
}

// CARREGAR QUESTÃO NA TELA
function carregarQuestao(num) {
  questaoAtual = num;
  const q = questoesSimuladoAtual[num - 1];

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

      if (respostasUsuario[num] === idx) {
        btn.classList.add("on");
      }

      btn.innerHTML = `<b>${letras[idx]}</b> <span>${altText}</span>`;
      btn.onclick = () => selecionarResposta(num, idx);
      altsContainer.appendChild(btn);
    });
  }

  const btnProx = document.getElementById("btnProxima");
  const btnFin = document.getElementById("btnFinalizar");

  if (num === 90) {
    if (btnProx) btnProx.style.display = "none";
    if (btnFin) btnFin.style.display = "inline-block";
  } else {
    if (btnProx) btnProx.style.display = "inline-block";
    if (btnFin) btnFin.style.display = "none";
  }

  atualizarPainelNavegacao();
}

function selecionarResposta(numQuestao, indexAlt) {
  respostasUsuario[numQuestao] = indexAlt;
  carregarQuestao(numQuestao);
  atualizarPainelNavegacao();
}

function mudarQuestao(delta) {
  const novaQuestao = questaoAtual + delta;
  if (novaQuestao >= 1 && novaQuestao <= 90) {
    carregarQuestao(novaQuestao);
  }
}

// PAINEL DE NAVEGAÇÃO DE 1 A 90
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
      if (respostasUsuario[i] !== undefined) {
        btn.classList.add("fe");
      }
    }
  }
}

// FINALIZAÇÃO DO SIMULADO E EXIBIÇÃO DO RESULTADO
function finalizarSimulado() {
  if (intervaloTimer) clearInterval(intervaloTimer);

  let acertos = 0;
  for (let i = 1; i <= 90; i++) {
    const q = questoesSimuladoAtual[i - 1];
    if (respostasUsuario[i] !== undefined && respostasUsuario[i] === q.correta) {
      acertos++;
    }
  }

  const pct = Math.round((acertos / 90) * 100);

  document.getElementById("telaProva").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("telaResultado").style.display = "block";

  document.getElementById("resAcertos").innerText = acertos;
  document.getElementById("resPorcentagem").innerText = pct + "%";
}
