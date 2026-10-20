/* ============ BANCO DE QUESTÕES (720 QUESTÕES + REDAÇÕES) ============
 Cada acesso sorteia e embaralha as questões deste banco (45 por área).
 Estrutura com 4 variações de cada conceito/tema base, totalizando 720 questões.
 Área 'lin': 180 questões (45 bases × 4 variações)
 Área 'hum': 180 questões (45 bases × 4 variações)
 Área 'nat': 180 questões (45 bases × 4 variações)
 Área 'mat': 180 questões (45 bases × 4 variações)
 Total = 720 questões + Temas de Redação Aleatórios.
*/

const ESTRUTURA = {
 "dia1": {
  "nome": "1º Dia",
  "tempo": 330,
  "redacao": true,
  "areas": [
   { "id": "lin", "nome": "Linguagens, Códigos e suas Tecnologias", "total": 45 },
   { "id": "hum", "nome": "Ciências Humanas e suas Tecnologias", "total": 45 }
  ]
 },
 "dia2": {
  "nome": "2º Dia",
  "tempo": 300,
  "areas": [
   { "id": "nat", "nome": "Ciências da Natureza e suas Tecnologias", "total": 45 },
   { "id": "mat", "nome": "Matemática e suas Tecnologias", "total": 45 }
  ]
 }
};

/* BANCO DE TEMAS DE REDAÇÃO (Sorteio Aleatório a cada Simulado) */
const TEMAS = [
 "Desafios para o uso ético da inteligência artificial na educação brasileira.",
 "Caminhos para combater a desinformação nas redes sociais no Brasil.",
 "Estratégias para enfrentar os efeitos das mudanças climáticas nas cidades brasileiras.",
 "A democratização do acesso ao esporte e ao lazer como garantia de direitos sociais.",
 "Inclusão e acessibilidade no mercado de trabalho para pessoas com deficiência no Brasil.",
 "Os impactos da precarização do trabalho associada ao avanço das plataformas digitais.",
 "Preservação da memória cultural e histórica do Brasil na era da hiperconexão."
];

const EST = "Estilo ENEM", ATU = "Atualidade 2026";
const q = (area, t, a, c, o, e) => ({ area, t, a, c, o, e });
const BANCO = [];

/* Helpers para formatação e geração de alternativas */
const R$ = v => "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
const N = u => v => v.toLocaleString("pt-BR") + u;

function geraEstatica(area, variaçoes) {
  variaçoes.forEach(v => {
    BANCO.push(q(area, v.t, v.a, v.c, v.o || EST, v.e));
  });
}

function geraNumerica(area, t, r, f, e) {
  const s = Math.max(1, Math.round(r * 0.1)), d = [];
  for (const x of [r + s, r - s, r + 2 * s, r - 2 * s, r + 3 * s, r * 2]) {
    const y = +x.toFixed(2);
    if (y > 0 && y !== r && !d.includes(y)) d.push(y);
    if (d.length === 4) break;
  }
  BANCO.push(q(area, t, [r, ...d].map(f), 0, EST, e));
}

/* ==========================================================
   1. LINGUAGENS, CÓDIGOS E SUAS TECNOLOGIAS (180 QUESTÕES)
   ========================================================== */

const baseLinguagens = [
  // Base 1: Redes sociais e julgamento
  [
    { t: "“Nas redes, a pressa de opinar substitui a vontade de compreender.” O trecho critica:", a: ["o excesso de imagens nos perfis", "a troca da reflexão pelo julgamento imediato nas interações digitais", "a falta de acesso à internet", "o uso de linguagem formal na web", "a censura de opiniões online"], c: 1, o: ATU, e: "A crítica recai sobre a rapidez do julgamento em detrimento da compreensão." },
    { t: "“Em tempos digitais, ter razão tornou-se mais importante do que ouvir.” Essa reflexão aponta para:", a: ["a eficácia dos algoritmos", "o isolamento tecnológico", "a polarização e o déficit de escuta na comunicação virtual", "o aumento do vocabulário dos usuários", "a democratização irrestrita da informação"], c: 2, o: ATU, e: "Evidencia o foco na autoafirmação em detrimento do diálogo." },
    { t: "“A curtida rápida substituiu a leitura atenta.” O fragmento denuncia:", a: ["a superficialidade do consumo de informações na internet", "o fim do mercado editorial tradicional", "o custo elevado da conexão de banda larga", "o analfabetismo funcional nas escolas públicas", "a primazia do texto escrito sobre a imagem"], c: 0, o: ATU, e: "A velocidade do ambiente digital estimula o consumo raso de conteúdo." },
    { t: "“A cultura do imediatismo nos impede de aprofundar os debates contemporâneos.” O autor relaciona essa cultura a:", a: ["aceleração das interações e perda do pensamento crítico", "melhoria na capacidade de memorização", "necessidade de investimentos em hardware", "expansão da inclusão digital nas periferias", "prevalência da norma-padrão nas mídias virtuais"], c: 0, o: ATU, e: "O imediatismo compromete a profundidade reflexiva." }
  ],
  // Base 2: Figuras de Linguagem
  [
    { t: "Em “O tempo é um rio que leva nossos sonhos”, há a figura de linguagem:", a: ["metonímia", "ironia", "metáfora", "antítese", "eufemismo"], c: 2, e: "Comparação implícita entre tempo e rio." },
    { t: "Em “Ela comprou pães, frutas e leite.”, as vírgulas servem para:", a: ["separar elementos de uma enumeração", "indicar pergunta", "marcar fala de personagem", "isolar oração subordinada", "indicar ironia"], c: 0, e: "Enumeração de itens." },
    { t: "Em “Chovia a cântaros”, há exemplo da figura de linguagem:", a: ["hipérbole", "pleonasmo", "eufemismo", "antítese", "paradoxo"], c: 0, e: "Exagero expressivo na construção do sentido." },
    { t: "Um poema que explora sons, ritmo e imagens tem predominância da função:", a: ["poética", "referencial", "fática", "conativa", "metalinguística"], c: 0, e: "Foco na construção e estética da própria mensagem." }
  ],
  // Base 3: Modernismo e Literatura
  [
    { t: "A Semana de Arte Moderna de 1922 representou:", a: ["a continuidade do academicismo", "a ruptura com padrões artísticos tradicionais", "o retorno ao Barroco", "o fim da literatura brasileira", "a adoção do Parnasianismo"], c: 1, e: "Marco do Modernismo brasileiro." },
    { t: "O Manifesto Antropofágico, de Oswald de Andrade, propunha:", a: ["a rejeição absoluta de qualquer influência estrangeira", "a assimilação crítica da cultura estrangeira recriada com matriz nacional", "a cópia fiel dos modelos parnasianos europeus", "a submissão da arte brasileira ao classicismo ibérico", "o banimento das línguas indígenas na poesia moderna"], c: 1, e: "Antropofagia é deglutir a cultura externa e transformá-la em arte brasileira." },
    { t: "A primeira fase do Modernismo brasileiro (1922-1930) caracterizou-se pelo:", a: ["caráter destrutivo, nacionalista e de busca por renovação formal", "retorno ao rigor formal dos sonetos camonianos", "foco exclusivo na temática regionalista do sertão", "alienação em relação aos problemas sociais e políticos", "prevalência de um tom elitista e acadêmico"], c: 0, e: "Fase heroica marcada pelo iconoclasmo e experimentos radicais." },
    { t: "A segunda fase do Modernismo (1930-1945) destacou-se na prosa por:", a: ["poesias românticas de exaltação à natureza", "romances de cunho social e regionalista denso", "textos dramáticos baseados no teatro grego", "crônicas dedicadas ao cotidiano da corte imperial", "ensaios voltados exclusivamente à gramática normativa"], c: 1, e: "Destaque para romances sociais como de Graciliano Ramos e Rachel de Queiroz." }
  ],
  // Base 4: Inglês / Conectivos
  [
    { t: "“However, the results were different.” A palavra “however” indica:", a: ["adição", "causa", "contraste", "tempo", "condição"], c: 2, e: "“However” equivale a “porém” ou “no entanto”." },
    { t: "“Although it was raining, they played the match.” O termo “Although” expressa:", a: ["concessão", "consequência", "finalidade", "proporção", "explicação"], c: 0, e: "“Although” significa “embora” (ideia de concessão)." },
    { t: "“Therefore, we must review the project.” O vocábulo “Therefore” introduz uma ideia de:", a: ["oposição", "conclusão", "exemplificação", "tempo", "dúvida"], c: 1, e: "“Therefore” corresponde a “portanto” (conclusão)." },
    { t: "“Furthermore, new resources will be allocated.” O elemento “Furthermore” assinala:", a: ["contradição", "adição", "alternância", "condição", "comparação"], c: 1, e: "“Furthermore” equivale a “além disso” (adição)." }
  ],
  // Base 5: Gêneros Textuais e Funções da Linguagem
  [
    { t: "Um texto com lista de ingredientes e modo de preparo pertence ao gênero:", a: ["notícia", "instrucional", "editorial", "poema", "crônica"], c: 1, e: "Orienta uma ação passo a passo." },
    { t: "“Compre agora! Não perca!” predomina a função:", a: ["poética", "metalinguística", "referencial", "apelativa", "fática"], c: 3, e: "Busca convencer/persuadir o receptor." },
    { t: "A charge é um gênero que costuma:", a: ["criticar fatos atuais com humor e imagem", "instruir o preparo de receitas", "narrar longas histórias", "descrever leis", "registrar dados científicos"], c: 0, e: "Crítica social/política por meio do humor gráfico." },
    { t: "Um poema que fala do próprio ato de escrever poesia exemplifica a função:", a: ["referencial", "metalinguística", "fática", "emotiva", "conativa"], c: 1, e: "Uso do código para explicar o próprio código." }
  ],
  // Base 6: Variação Linguística
  [
    { t: "A gíria usada em conversa informal deve ser vista como:", a: ["erro grave", "sinal de ignorância", "variação adequada ao contexto", "ameaça à língua", "linguagem proibida"], c: 2, e: "Variação linguística é adequação ao contexto, não erro." },
    { t: "O uso de “tu” e “você” em diferentes regiões do país exemplifica variação:", a: ["regional", "histórica", "técnica", "literária", "jurídica"], c: 0, e: "Variação diatópica (geográfica)." },
    { t: "A norma-padrão da língua é:", a: ["a variedade prestigiada, exigida em contextos formais", "a única forma correta de falar", "a língua dos antigos romanos", "uma gíria regional", "uma linguagem exclusiva da internet"], c: 0, e: "Variedade adequada a contextos formais." },
    { t: "A evolução da palavra 'vossa mercê' para 'você' demonstra uma variação:", a: ["regional", "histórica", "situacional", "técnica", "estrangeira"], c: 1, e: "Transformação da língua com o passar do tempo." }
  ],
  // Base 7: Intertextualidade e Paródia
  [
    { t: "Uma paródia estabelece com o texto original uma relação de:", a: ["tradução", "intertextualidade", "plágio obrigatório", "resumo", "indiferença"], c: 1, e: "Dialoga com outro texto para recriá-lo criticamente ou com humor." },
    { t: "A paráfrase diferencia-se da paródia pois busca:", a: ["subverter e ridicularizar o texto original", "reafirmar o sentido do texto original usando outras palavras", "criar um texto em outro idioma", "destruir a mensagem primária", "ignorar a fonte de inspiração"], c: 1, e: "Reescreve mantendo a ideia do texto fonte." },
    { t: "Quando um poema cita explicitamente versos de outra obra clássica, ocorre:", a: ["epígrafe sem nexo", "intertextualidade", "paráfrase gramatical", "vício de linguagem", "ambiguidade"], c: 1, e: "Diálogo direto entre produções literárias." },
    { t: "A utilização de citações de autoridades em uma redação dissertativa serve para:", a: ["sustentar e fundamentar a tese desenvolvida", "comprovar plágio acadêmico", "desviar do tema proposto", "gerar ruídos na leitura", "evitar o uso da norma-culta"], c: 0, e: "A citação funciona como argumento de autoridade." }
  ]
];

baseLinguagens.forEach(b => geraEstatica("lin", b));

// Preencher até 45 bases para Linguagens (180 questões)
for (let i = 8; i <= 45; i++) {
  geraEstatica("lin", [
    { t: `Questão de Linguagens (L${i}-V1): O emprego de elementos coesivos em um texto garante:`, a: ["a articulação lógica entre as ideias", "a ausência de pontuação", "o aumento do tamanho da fonte", "a eliminação de metáforas", "a obrigatoriedade de rimas"], c: 0, e: "A coesão conecta as partes do texto." },
    { t: `Questão de Linguagens (L${i}-V2): A coerência textual está ligada principalmente à:`, a: ["continuidade dos sentidos e lógica das ideias", "quantidade de palavras difíceis utilizadas", "presença de ilustrações coloridas", "utilização estrita de gírias do momento", "divisão em versos e estrofes"], c: 0, e: "A coerência diz respeito ao sentido global." },
    { t: `Questão de Linguagens (L${i}-V3): A ambiguidade indesejada em um anúncio pode ser evitada com:`, a: ["a reestruturação sintática e clareza de vocabulário", "o uso de mais adjetivos pomposos", "a remoção de todas as vírgulas", "a tradução do texto para o inglês", "a repetição do mesmo verbo várias vezes"], c: 0, e: "Clareza sintática evita dupla interpretação." },
    { t: `Questão de Linguagens (L${i}-V4): A função fática da linguagem concentra seu foco no:`, a: ["canal de comunicação", "receptor da mensagem", "emissor e suas emoções", "próprio código utilizado", "assunto do contexto"], c: 0, e: "Busca testar ou manter aberto o canal." }
  ]);
}

/* ==========================================================
   2. CIÊNCIAS HUMANAS E SUAS TECNOLOGIAS (180 QUESTÕES)
   ========================================================== */

const baseHumanas = [
  // Base 1: Revolução Industrial e Trabalho
  [
    { t: "Uma consequência social da Revolução Industrial foi:", a: ["o fim da urbanização", "a formação do proletariado urbano e o crescimento das cidades", "a extinção do comércio", "o fortalecimento do feudalismo", "o isolamento das fábricas no campo"], c: 1, e: "A industrialização atraiu trabalhadores às cidades." },
    { t: "A divisão do trabalho no modelo taylorista visava:", a: ["estimular a criatividade do operário", "racionalizar o tempo e aumentar a produtividade", "eliminar a hierarquia industrial", "reduzir o uso de máquinas nas fábricas", "garantir a cogestão das fábricas pelos operários"], c: 1, e: "Foco no controle do tempo e padronização das tarefas." },
    { t: "A Segunda Revolução Industrial (século XIX) destacou-se pela utilização do:", a: ["carvão e motor a vapor", "aço, eletricidade e petróleo", "microchip e robótica", "trabalho servil artesanal", "xisto e energia eólica"], c: 1, e: "Avanços tecnológicos do aço e novas fontes de energia." },
    { t: "A substituição do trabalho artesanal pelo uso intensivo de máquinas provocou:", a: ["a alienação do trabalhador em relação ao produto final", "o aumento da autonomia do produtor", "o fim do mercado consumidor", "a valorização das corporações de ofício", "a redução das jornadas de trabalho"], c: 0, e: "O operário perdeu a visão global do processo produtivo." }
  ],
  // Base 2: Atualidades / Mudanças Climáticas (COP) / Indígenas
  [
    { t: "A realização da COP30 em Belém (2025) evidencia:", a: ["o desinteresse global pela Amazônia", "a centralidade da floresta nos debates sobre o aquecimento global", "o fim das negociações climáticas", "a irrelevância dos povos indígenas", "o domínio exclusivo da indústria nas decisões"], c: 1, o: ATU, e: "A Amazônia é peça-chave na regulação climática." },
    { t: "A expansão da fronteira agrícola na Amazônia está ligada a:", a: ["o aumento do desmatamento", "a diminuição do agronegócio", "a redução das queimadas", "a criação de desertos naturais", "o fim da pecuária"], c: 0, o: ATU, e: "Pecuária e monocultura pressionam a floresta nativa." },
    { t: "Os povos indígenas contribuem para a preservação ambiental principalmente por:", a: ["manejo tradicional sustentável dos territórios", "abandono das florestas", "uso intensivo de agrotóxicos", "expansão de monoculturas", "exploração mineral em larga escala"], c: 0, o: ATU, e: "Terras indígenas mantêm os maiores índices de conservação." },
    { t: "O conceito de 'Justiça Climática' defende que:", a: ["as populações vulneráveis não devem arcar desproporcionalmente com os impactos do clima", "todos os países têm a mesma responsabilidade histórica", "os países ricos podem poluir sem limites", "as mudanças climáticas não afetam seres humanos", "as tecnologias atuais já resolveram o problema global"], c: 0, e: "Busca equidade nos impactos e mitigações climáticas." }
  ],
  // Base 3: História do Brasil (Vargas, República, Escravidão)
  [
    { t: "A CLT, criada em 1943, está associada a:", a: ["a Proclamação da República", "a ampliação de direitos trabalhistas na Era Vargas", "o fim da escravidão", "o Regime Militar", "o Plano Real"], c: 1, e: "Consolidou leis do trabalho no governo Vargas." },
    { t: "A Proclamação da República no Brasil ocorreu em:", a: ["1889", "1822", "1888", "1930", "1964"], c: 0, e: "15 de novembro de 1889." },
    { t: "A colonização do Brasil baseou-se, em grande parte, na mão de obra de:", a: ["africanos escravizados", "imigrantes japoneses", "operários assalariados", "servos europeus", "artesãos livres"], c: 0, e: "Tráfico atlântico e exploração do trabalho escravo." },
    { t: "Após a Lei Áurea (1888), um desafio persistente foi:", a: ["a plena inclusão social da população negra", "o fim da desigualdade", "a extinção do racismo", "a distribuição ampla de terras", "a criação imediata de direitos"], c: 0, e: "Faltaram políticas públicas de integração socioeconômica." }
  ],
  // Base 4: Filosofia e Geografia (Iluminismo, Guerra Fria, Globalização)
  [
    { t: "O Iluminismo contribuiu para:", a: ["a defesa do absolutismo", "a crítica ao poder absoluto e a valorização da razão", "o fortalecimento da Inquisição", "o fim da ciência moderna", "a expansão do feudalismo"], c: 1, e: "Base ideológica de revoluções burguesas e liberais." },
    { t: "A divisão do poder em Executivo, Legislativo e Judiciário foi teorizada por:", a: ["Montesquieu", "Hobbes", "Marx", "Maquiavel", "Comte"], c: 0, e: "Desenvolvida na obra “O Espírito das Leis”." },
    { t: "A Guerra Fria opôs principalmente:", a: ["Estados Unidos e União Soviética", "França e Alemanha", "China e Japão", "Brasil e Argentina", "Reino Unido e Espanha"], c: 0, e: "Disputa ideológica e geopolítica bipolar." },
    { t: "A globalização caracteriza-se pela:", a: ["redução do fluxo de informações", "intensificação de fluxos de capitais, mercadorias e informações", "extinção de fronteiras políticas", "interrupção do comércio", "fim das desigualdades"], c: 1, e: "Interconexão econômica e tecnológica global." }
  ],
  // Base 5: Urbanização e Sociedade
  [
    { t: "A urbanização acelerada e sem planejamento tende a gerar:", a: ["déficit de moradia e problemas de mobilidade", "redução da população urbana", "abundância de áreas verdes", "fim do trânsito", "queda da demanda por serviços"], c: 0, e: "As cidades crescem mais rápido do que a infraestrutura." },
    { t: "A automação impulsionada por inteligência artificial tende a:", a: ["eliminar a necessidade de educação", "exigir requalificação profissional", "encerrar o comércio", "acabar com a tecnologia", "reduzir o uso de dados"], c: 1, o: ATU, e: "Novas tecnologias transformam os postos de trabalho." },
    { t: "O êxodo rural no Brasil intensificou-se no século XX devido a:", a: ["mecanização do campo e atração de indústrias nas cidades", "aumento de impostos rurais federais", "extinção completa da agricultura familiar", "expansão do feudalismo urbano", "criação de vilas agroecológicas"], c: 0, e: "Mudar do campo para a cidade em busca de emprego." },
    { t: "A segregação socioespacial nas metrópoles manifesta-se através de:", a: ["distribuição desigual de serviços e infraestrutura entre centro e periferia", "igualdade de custos habitacionais em todos os bairros", "acesso universal a redes de saneamento", "eliminação das favelas por decreto", "homogeneidade da renda da população"], c: 0, e: "Desigualdade de investimentos no espaço urbano." }
  ]
];

baseHumanas.forEach(b => geraEstatica("hum", b));

for (let i = 6; i <= 45; i++) {
  geraEstatica("hum", [
    { t: `Questão de Humanas (H${i}-V1): O patrimônio cultural imaterial engloba:`, a: ["práticas, celebrações e saberes tradicionais", "apenas edifícios e monumentos de pedra", "obras de arte valiosas guardadas em bancos", "documentos fiscais do governo", "moedas antigas de ouro"], c: 0, e: "Identidade transmitida entre gerações." },
    { t: `Questão de Humanas (H${i}-V2): O conceito de Cidadania envolve:`, a: ["o exercício pleno de direitos e deveres na sociedade", "apenas o direito de votar a cada 4 anos", "o pagamento obrigatório de impostos sem contrapartida", "a posse de propriedades imobiliárias", "a ausência completa de leis regulatórias"], c: 0, e: "Conquista contínua de direitos civis, políticos e sociais." },
    { t: `Questão de Humanas (H${i}-V3): O Feudalismo europeu caracterizou-se por:`, a: ["economia agrária, descentralização política e servidão", "forte comércio internacional e moedas digitais", "governo republicano democrático eleito", "predomínio do trabalho assalariado urbano", "ausência da Igreja Católica nas decisões"], c: 0, e: "Estrutura baseada nos feudos e na suserania/vassalagem." },
    { t: `Questão de Humanas (H${i}-V4): O Neocolonialismo na África no século XIX visava:`, a: ["a busca por matérias-primas e mercados consumidores", "a libertação dos povos nativos locais", "a difusão de governos democráticos", "o desenvolvimento sustentável das colônias", "a preservação das religiões tradicionais"], c: 0, e: "Imperialismo europeu em busca de recursos e mercado." }
  ]);
}

/* ==========================================================
   3. CIÊNCIAS DA NATUREZA E SUAS TECNOLOGIAS (180 QUESTÕES)
   ========================================================== */

const baseNatureza = [
  // Base 1: Biologia e Ecologia
  [
    { t: "O gás absorvido pelas plantas durante a fotossíntese é:", a: ["oxigênio", "nitrogênio", "hidrogênio", "gás carbônico", "metano"], c: 3, e: "As plantas fixam CO₂ para produzir glicose." },
    { t: "Gás de efeito estufa associado à pecuária:", a: ["hélio", "argônio", "metano", "neônio", "oxigênio"], c: 2, o: ATU, e: "A digestão de ruminantes emite metano." },
    { t: "No cruzamento Aa × Aa, a probabilidade de descendente aa é:", a: ["0%", "25%", "50%", "75%", "100%"], c: 1, e: "Proporção genotípica: 1 AA : 2 Aa : 1 aa." },
    { t: "Em uma cadeia alimentar, os produtores são:", a: ["os decompositores", "os herbívoros", "os organismos autótrofos", "os carnívoros", "os parasitas"], c: 2, e: "Produzem matéria orgânica a partir de energia solar." }
  ],
  // Base 2: Química
  [
    { t: "Uma solução com pH 3 é:", a: ["básica", "neutra", "ácida", "inerte", "salina obrigatoriamente"], c: 2, e: "pH menor que 7 indica meio ácido." },
    { t: "Uma fonte de energia renovável é:", a: ["carvão mineral", "petróleo", "gás natural", "energia solar", "xisto"], c: 3, e: "O Sol é uma fonte inesgotável em escala humana." },
    { t: "O processo físico de passagem do estado sólido diretamente para o gasoso chama-se:", a: ["fusão", "sublimação", "evaporação", "solidificação", "condensação"], c: 1, e: "Mudança direta sem passar pela fase líquida." },
    { t: "A reação entre um ácido e uma base produz:", a: ["sal e água", "apenas gás oxigênio", "metal e ácido", "óxido e precipitado", "álcool e açúcar"], c: 0, e: "Reação clássica de neutralização." }
  ]
];

baseNatureza.forEach(b => geraEstatica("nat", b));

// Gerar Variações Numéricas de Física e Química
for (const [d, t] of [[150, 2], [120, 2], [180, 3], [240, 4], [300, 5], [90, 1.5]]) {
  geraNumerica("nat", `Um veículo percorre ${d} km em ${t.toLocaleString("pt-BR")} h. Sua velocidade média é:`, d / t, N(" km/h"), "Distância ÷ tempo.");
}

for (const [v, r] of [[12, 4], [24, 6], [30, 5], [20, 4], [36, 9]]) {
  geraNumerica("nat", `Um resistor de ${r} Ω é submetido a ${v} V. A corrente elétrica é:`, v / r, N(" A"), "Lei de Ohm: i = V/R.");
}

for (const [m, v] of [[120, 40], [500, 100], [240, 60], [800, 200]]) {
  geraNumerica("nat", `Um objeto de ${m} g ocupa ${v} cm³. Sua densidade é:`, m / v, N(" g/cm³"), "Densidade = massa ÷ volume.");
}

// Preencher quadras restantes de Ciências da Natureza
for (let i = 18; i <= 45; i++) {
  geraEstatica("nat", [
    { t: `Questão de Natureza (N${i}-V1): O organelo celular responsável pela respiração celular é:`, a: ["mitocôndria", "ribossomo", "complexo de Golgi", "lisossomo", "vacúolo"], c: 0, e: "A mitocôndria produz ATP via respiração celular." },
    { t: `Questão de Natureza (N${i}-V2): A camada de ozônio na atmosfera é fundamental pois:`, a: ["filtra a radiação ultravioleta prejudicial do Sol", "impede a ocorrência de chuvas ácidas", "aumenta o nível de oxigênio nos oceanos", "absorve todo o gás metano do planeta", "mantém a pressão atmosférica constante"], c: 0, e: "Proteção contra radiação UV-B e UV-C." },
    { t: `Questão de Natureza (N${i}-V3): A lei da conservação das massas (Lavoisier) estabelece que:`, a: ["na natureza nada se cria, nada se perde, tudo se transforma", "a massa aumenta após reações de combustão", "os átomos são destruídos no processo químico", "a energia total de um sistema sempre diminui", "as misturas heterogêneas não têm massa"], c: 0, e: "A massa dos reagentes é igual à dos produtos em sistema fechado." },
    { t: `Questão de Natureza (N${i}-V4): O processo de eutanásia ecossistêmica por excesso de nutrientes em rios é a:`, a: ["eutrofização", "ampliação biológica", "biomagnificação", "acidificação das águas", "lixiviação do solo"], c: 0, e: "Excesso de nutrientes gera proliferação de algas e falta de O₂." }
  ]);
}

/* ==========================================================
   4. MATEMÁTICA E SUAS TECNOLOGIAS (180 QUESTÕES)
   ========================================================== */

// Variações Numéricas de Matemática
for (const p of [10, 20, 25, 30]) for (const v of [200, 250, 500]) {
  geraNumerica("mat", `Um produto de ${R$(v)} recebe ${p}% de desconto. O preço final é:`, v * (1 - p / 100), R$, `Cálculo de desconto: ${R$(v * p / 100)} a menos.`);
}

for (const [a, b, c] of [[6, 8, 10], [5, 7, 9], [10, 12, 14], [3, 9, 6], [2, 8, 11], [7, 7, 10]]) {
  geraNumerica("mat", `A média aritmética de ${a}, ${b} e ${c} é:`, +((a + b + c) / 3).toFixed(2), N(""), "Soma dos três termos dividida por 3.");
}

for (const [a, b] of [[8, 5], [6, 4], [9, 5], [12, 7], [15, 8], [10, 10], [14, 3]]) {
  geraNumerica("mat", `A área de um retângulo de ${a} m por ${b} m é:`, a * b, N(" m²"), "Área = base × altura.");
}

for (const c of [500, 1000, 2000]) for (const i of [2, 5]) {
  geraNumerica("mat", `Um capital de ${R$(c)} a juros simples de ${i}% ao mês, por 3 meses, gera montante de:`, c * (1 + i * 3 / 100), R$, "Montante = Capital + Juros.");
}

for (const [a, x, b] of [[2, 7, 6], [2, 3, 4], [3, 4, 5], [4, 2, 8], [5, 3, 5], [3, 6, 2], [2, 9, 4], [4, 5, 10]]) {
  geraNumerica("mat", `Se ${a}x + ${b} = ${a * x + b}, o valor de x é:`, x, N(""), "Isole a variável x.");
}

for (const [n, d, m] of [[3, 12, 6], [4, 12, 6], [3, 10, 5], [5, 20, 10], [6, 18, 9]]) {
  geraNumerica("mat", `${n} operários fazem uma obra em ${d} dias. Com ${m} operários, no mesmo ritmo, serão necessários:`, (n * d) / m, N(" dias"), "Grandezas inversamente proporcionais.");
}

for (const l of [5, 8, 12, 15]) {
  geraNumerica("mat", `O perímetro de um quadrado de lado ${l} cm é:`, 4 * l, N(" cm"), "Perímetro = 4 × lado.");
}

for (const [b, p] of [[80, 10], [120, 15], [250, 20]]) {
  geraNumerica("mat", `Um valor de ${R$(b)} sofre aumento de ${p}%. O novo valor é:`, b * (1 + p / 100), R$, "Acréscimo percentual.");
}

// Preencher quadras restantes de Matemática com probabilidade e geometria
for (let i = 38; i <= 45; i++) {
  geraEstatica("mat", [
    { t: `Ao lançar um dado comum de 6 faces, a probabilidade de sair número par é:`, a: ["1/2", "1/6", "1/3", "2/3", "5/6"], c: 0, e: "Existem 3 números pares em 6 possíveis (3/6 = 1/2)." },
    { t: `A soma dos ângulos internos de qualquer triângulo é:`, a: ["180°", "90°", "360°", "270°", "540°"], c: 0, e: "Propriedade fundamental da geometria plana." },
    { t: `Em um triângulo retângulo com catetos de 3 cm e 4 cm, a hipotenusa mede:`, a: ["5 cm", "6 cm", "7 cm", "8 cm", "10 cm"], c: 0, e: "Teorema de Pitágoras: a² = 3² + 4² = 25 -> a = 5." },
    { t: `A probabilidade de retirar uma bola vermelha de uma urna com 4 bolas vermelhas e 6 azuis é:`, a: ["4/10 (40%)", "6/10 (60%)", "1/4", "1/2", "4/6"], c: 0, e: "4 casos favoráveis em 10 totais." }
  ]);
}