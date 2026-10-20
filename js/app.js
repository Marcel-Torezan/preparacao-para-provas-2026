// CONFIGURAÇÃO DA SENHA
const SENHA_CORRETA = "simuladoenem26";

// BANCO BASE DE QUESTÕES PARA SORTEIO E EMBARALHAMENTO
const BASE_QUESTOES = {
  linguagens: [
    {
      enunciado: "(ENEM) A respeito da coesão e coerência textual na construção dos discursos contemporâneos, a articulação entre as ideias garante:",
      alternativas: ["a progressão temática e a clareza do texto", "a obrigatoriedade do uso de rimas ricas", "a eliminação completa de figuras de linguagem", "a ausência total de pontuação formal", "o aumento da fonte visual do texto"],
      correta: 0
    },
    {
      enunciado: "(ENEM) No contexto da variação linguística, a norma-padrão da língua portuguesa deve ser compreendida como:",
      alternativas: ["a única forma correta de expressão oral e escrita", "um modelo de referência flexível adequado a situações formais", "uma imposição sem utilidade social ou acadêmica", "uma regra imutável desde a época do trovadorismo", "um dialeto falado exclusivamente na região Sudeste"],
      correta: 1
    },
    {
      enunciado: "(ENEM) O Barroco brasileiro teve na figura de Gregório de Matos um de seus principais representantes. Sua poesia caracteriza-se pelo:",
      alternativas: ["culto à natureza e equilíbrio neoclássico", "dualismo entre o sagrado e o profano com tom crítico", "nacionalismo ufanista e valorização do indígena", "linguagem simples e ausência de metáforas", "foco exclusivo em temas científicos e positivistas"],
      correta: 1
    },
    {
      enunciado: "(ENEM) As funções da linguagem desempenham papéis específicos na comunicação. A função referencial tem como foco principal:",
      alternativas: ["a expressão das emoções do emissor", "o próprio código ou linguagem utilizada", "a informação objetiva sobre o contexto ou realidade", "o contato e teste do canal de comunicação", "a persuasão direta do leitor ou ouvinte"],
      correta: 2
    }
  ],
  humanas: [
    {
      enunciado: "(ENEM) O processo de urbanização brasileiro na segunda metade do século XX foi marcado por um intenso fluxo migratório campo-cidade. Esse fenômeno resultou em:",
      alternativas: ["crescimento ordenado e planejado das periferias", "processo de metropolização e segregação socioespacial", "redução da demanda por serviços públicos básicos", "desconcentração industrial imediata no Sudeste", "igualdade de acesso às oportunidades de emprego"],
      correta: 1
    },
    {
      enunciado: "(ENEM) A Revolução Industrial transformou as relações de trabalho no século XIX. Uma de suas principais consequências sociais foi:",
      alternativas: ["o fortalecimento das corporações de ofício medievais", "a formação da classe operária e a precarização do trabalho", "o fim do êxodo rural na Europa ocidental", "a abolição imediata da propriedade privada", "a igualdade salarial entre homens e mulheres"],
      correta: 1
    },
    {
      enunciado: "(ENEM) O conceito de 'Cidadania' na Grécia Antiga, especificamente em Atenas, difere do conceito moderno por ser:",
      alternativas: ["universal e inclusivo para toda a população", "restrito aos homens livres, adultos e nascidos na polis", "estendido automaticamente a mulheres e escravizados", "baseado na igualdade econômica absoluta", "controlado exclusivamente pelo imperador"],
      correta: 1
    },
    {
      enunciado: "(ENEM) Durante o período do Estado Novo (1937-1945), Getúlio Vargas promovera a modernização das leis trabalhistas brasileiras por meio da:",
      alternativas: ["Criação da CLT e regulamentação do salário mínimo", "Privatização total das indústrias de base", "Abertura irrestrita ao capital estrangeiro na agricultura", "Extinção dos sindicatos de trabalhadores", "Descentralização do poder executivo federal"],
      correta: 0
    }
  ],
  natureza: [
    {
      enunciado: "(ENEM) Um circuito elétrico residencial possui aparelhos ligados em paralelo. A principal vantagem dessa disposição em relação ao circuito em série é que:",
      alternativas: ["a corrente elétrica é idêntica em todos os aparelhos", "a diferença de potencial (voltagem) é a mesma em cada aparelho", "a resistência equivalente do circuito aumenta", "a interrupção em um aparelho desliga todos os outros", "o consumo de energia total é reduzido à metade"],
      correta: 1
    },
    {
      enunciado: "(ENEM) No processo de fotossíntese realizado pelas plantas, a molécula responsável pela absorção da luz solar é a:",
      alternativas: ["hemoglobina", "clorofila", "glicose", "insulina", "queratina"],
      correta: 1
    },
    {
      enunciado: "(ENEM) A Primeira Lei de Newton, também conhecida como Princípio da Inércia, afirma que um corpo em repouso ou em movimento retilíneo uniforme tende a manter seu estado a menos que:",
      alternativas: ["sua massa seja alterada", "uma força resultante externa atue sobre ele", "sua temperatura aumente consideravelmente", "sua velocidade atinja a velocidade da luz", "ele entre em um campo magnético nulo"],
      correta: 1
    },
    {
      enunciado: "(ENEM) O pH de uma solução neutra a 25°C é igual a 7. Uma solução com pH igual a 3 é classificada como:",
      alternativas: ["fortemente básica", "neutra", "ácida", "alcalina", "isenta de íons H+"],
      correta: 2
    }
  ],
  matematica: [
    {
      enunciado: "(ENEM) Um comerciante aplica um desconto de 20% em um produto e, em seguida, um novo desconto de 10% sobre o valor já com desconto. O desconto percentual único equivalente é de:",
      alternativas: ["30%", "28%", "25%", "18%", "15%"],
      correta: 1
    },
    {
      enunciado: "(ENEM) A probabilidade de obter um número par ao lançar um dado comum de 6 faces não viciado é:",
      alternativas: ["1/6", "1/3", "1/2", "2/3", "5/6"],
      correta: 2
    },
    {
      enunciado: "(ENEM) Uma função do 1º grau é dada por f(x) = 3x - 6. O ponto onde o gráfico dessa função corta o eixo x é:",
      alternativas: ["(0, 2)", "(2, 0)", "(-2, 0)", "(0, -6)", "(3, 0)"],
      correta: 1
    },
    {
      enunciado: "(ENEM) A área de um triângulo retângulo que possui base medindo 8 cm e altura medindo 6 cm é de:",
      alternativas: ["48 cm²", "24 cm²", "14 cm²", "12 cm²", "36 cm²"],
      correta: 1
    }
  ]
};

// ESTADO GLOBAL DA PROVA
let diaAtual = 1;
let questaoAtual = 1;
let questoesGeradasSimulado = [];
const respostasUsuario = {};
let intervaloTimer = null;
let tempoEmSegundos = 0;

// VALIDAÇÃO DE LOGIN E INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
  const logado = localStorage.getItem("usuario_logado");
  const overlay = document.getElementById("loginOverlay");

  if (logado === "true" && overlay) {
    overlay.style.display = "none";
  }
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

// GERADOR DINÂMICO DE 90 QUESTÕES POR DIA
function gerarSimulado90Questoes(dia) {
  questoesGeradasSimulado = [];
  const idSimulado = Math.floor(Math.random() * 900000) + 100000;

  for (let i = 1; i <= 90; i++) {
    let materiaNome = "";
    let listaBase = [];

    if (dia === 1) {
      if (i <= 45) {
        materiaNome = "Linguagens, Códigos e suas Tecnologias";
        listaBase = BASE_QUESTOES.linguagens;
      } else {
        materiaNome = "Ciências Humanas e suas Tecnologias";
        listaBase = BASE_QUESTOES.humanas;
      }
    } else {
      if (i <= 45) {
        materiaNome = "Ciências da Natureza e suas Tecnologias";
        listaBase = BASE_QUESTOES.natureza;
      } else {
        materiaNome = "Matemática e suas Tecnologias";
        listaBase = BASE_QUESTOES.matematica;
      }
    }

    let base = listaBase[(i - 1) % listaBase.length];
    
    let enunciadoFinal = `[Simulado #${idSimulado} · Q${i}] ${base.enunciado}`;
    let alternativasFinal = [...base.alternativas];
    
    if (i > listaBase.length) {
      enunciadoFinal = `(ENEM 2026 - Simulado #${idSimulado} · Questão ${i}) [${materiaNome}] Com base nos parâmetros e diretrizes do exame nacional para a matéria de ${materiaNome}, analise o problema proposto para o item ${i}:`;
      alternativasFinal = [
        `Conclusão lógica embasada diretamente nos princípios da disciplina para a questão ${i}`,
        `Interpretação incorreta devido à leitura equivocada das variáveis apresentadas`,
        `Extrapolação teórica sem fundamento direto na situação analisada`,
        `Incompatibilidade analítica entre a hipótese inicial e os resultados obtidos`,
        `Ausência de correlação direta entre os parâmetros avaliados no contexto`
      ];
    }

    questoesGeradasSimulado.push({
      numero: i,
      materia: materiaNome,
      enunciado: enunciadoFinal,
      alternativas: alternativasFinal,
      correta: base.correta || 0
    });
  }
}

// INICIAR O SIMULADO
function iniciarProva(dia) {
  diaAtual = dia;
  // Limpa respostas anteriores
  for (let member in respostasUsuario) delete respostasUsuario[member];

  // Gera novo simulado com 90 questões
  gerarSimulado90Questoes(dia);

  document.getElementById("telaInicial").style.display = "none";
  document.getElementById("telaResultado").style.display = "none";
  document.getElementById("telaProva").style.display = "block";
  document.getElementById("timer").style.display = "block";

  // Tempo de prova: 5h30 para Dia 1 e 5h00 para Dia 2
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
      alert("Tempo esgotado! O simulado será encerrado.");
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

// EXIBIR A QUESTÃO SELECIONADA
function carregarQuestao(num) {
  questaoAtual = num;
  const q = questoesGeradasSimulado[num - 1];

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

  // BOTÕES ANTERIOR, PRÓXIMA E FINALIZAR
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

// PAINEL NUMÉRICO DE 1 A 90
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

// FINALIZAR SIMULADO E EXIBIR ACERTOS
function finalizarSimulado() {
  if (intervaloTimer) clearInterval(intervaloTimer);

  let acertos = 0;
  for (let i = 1; i <= 90; i++) {
    const q = questoesGeradasSimulado[i - 1];
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
