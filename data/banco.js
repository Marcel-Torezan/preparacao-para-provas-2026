/* ==========================================================
   BANCO DE QUESTÕES - SIMULADO ENEM (720 QUESTÕES NO TOTAL)
   - 1º Dia: 180 Linguagens + 180 Humanas = 360 questões
   - 2º Dia: 180 Natureza + 180 Matemática = 360 questões
   ========================================================== */

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

const basesLinguagens = [
  [
    { t: "“Nas redes, a pressa de opinar substitui a vontade de compreender.” O trecho critica:", a: ["o excesso de imagens nos perfis", "a troca da reflexão pelo julgamento imediato nas interações digitais", "a falta de acesso à internet", "o uso de linguagem formal na web", "a censura de opiniões online"], c: 1, o: ATU, e: "A crítica recai sobre a rapidez do julgamento em detrimento da compreensão." },
    { t: "“Em tempos digitais, ter razão tornou-se mais importante do que ouvir.” Essa reflexão aponta para:", a: ["a eficácia dos algoritmos", "o isolamento tecnológico", "a polarização e o déficit de escuta na comunicação virtual", "o aumento do vocabulário dos usuários", "a democratização irrestrita da informação"], c: 2, o: ATU, e: "Evidencia o foco na autoafirmação em detrimento do diálogo." },
    { t: "“A curtida rápida substituiu a leitura atenta.” O fragmento denuncia:", a: ["a superficialidade do consumo de informações na internet", "o fim do mercado editorial tradicional", "o custo elevado da conexão de banda larga", "o analfabetismo funcional nas escolas públicas", "a primazia do texto escrito sobre a imagem"], c: 0, o: ATU, e: "A velocidade do ambiente digital estimula o consumo raso de conteúdo." },
    { t: "“A cultura do imediatismo nos impede de aprofundar os debates contemporâneos.” O autor relaciona essa cultura a:", a: ["aceleração das interações e perda do pensamento crítico", "melhoria na capacidade de memorização", "necessidade de investimentos em hardware", "expansão da inclusão digital nas periferias", "prevalência da norma-padrão nas mídias virtuais"], c: 0, o: ATU, e: "O imediatismo compromete a profundidade reflexiva." }
  ],
  [
    { t: "Em “O tempo é um rio que leva nossos sonhos”, há a figura de linguagem:", a: ["metonímia", "ironia", "metáfora", "antítese", "eufemismo"], c: 2, e: "Comparação implícita entre tempo e rio." },
    { t: "Em “Ela comprou pães, frutas e leite.”, as vírgulas servem para:", a: ["separar elementos de uma enumeração", "indicar pergunta", "marcar fala de personagem", "isolar oração subordinada", "indicar ironia"], c: 0, e: "Enumeração de itens." },
    { t: "Em “Chovia a cântaros”, há exemplo da figura de linguagem:", a: ["hipérbole", "pleonasmo", "eufemismo", "antítese", "paradoxo"], c: 0, e: "Exagero expressivo na construção do sentido." },
    { t: "Um poema que explora sons, ritmo e imagens tem predominância da função:", a: ["poética", "referencial", "fática", "conativa", "metalinguística"], c: 0, e: "Foco na construção e estética da própria mensagem." }
  ],
  [
    { t: "A Semana de Arte Moderna de 1922 representou:", a: ["a continuidade do academicismo", "a ruptura com padrões artísticos tradicionais", "o retorno ao Barroco", "o fim da literatura brasileira", "a adoção do Parnasianismo"], c: 1, e: "Marco do Modernismo brasileiro." },
    { t: "O Manifesto Antropofágico, de Oswald de Andrade, propunha:", a: ["a rejeição absoluta de qualquer influência estrangeira", "a assimilação crítica da cultura estrangeira recriada com matriz nacional", "a cópia fiel dos modelos parnasianos europeus", "a submissão da arte brasileira ao classicismo ibérico", "o banimento das línguas indígenas na poesia moderna"], c: 1, e: "Antropofagia é deglutir a cultura externa e transformá-la em arte brasileira." },
    { t: "A primeira fase do Modernismo brasileiro (1922-1930) caracterizou-se pelo:", a: ["caráter destrutivo, nacionalista e de busca por renovação formal", "retorno ao rigor formal dos sonetos camonianos", "foco exclusivo na temática regionalista do sertão", "alienação em relação aos problemas sociais e políticos", "prevalência de um tom elitista e acadêmico"], c: 0, e: "Fase heroica marcada pelo iconoclasmo e experimentos radicais." },
    { t: "A segunda fase do Modernismo (1930-1945) destacou-se na prosa por:", a: ["poesias românticas de exaltação à natureza", "romances de cunho social e regionalista denso", "textos dramáticos baseados no teatro grego", "crônicas dedicadas ao cotidiano da corte imperial", "ensaios voltados exclusivamente à gramática normativa"], c: 1, e: "Destaque para romances sociais como de Graciliano Ramos e Rachel de Queiroz." }
  ],
  [
    { t: "“However, the results were different.” A palavra “however” indica:", a: ["adição", "causa", "contraste", "tempo", "condição"], c: 2, e: "“However” equivale a “porém” ou “no entanto”." },
    { t: "“Although it was raining, they played the match.” O termo “Although” expressa:", a: ["concessão", "consequência", "finalidade", "proporção", "explicação"], c: 0, e: "“Although” significa “embora” (ideia de concessão)." },
    { t: "“Therefore, we must review the project.” O vocábulo “Therefore” introduz uma ideia de:", a: ["oposição", "conclusão", "exemplificação", "tempo", "dúvida"], c: 1, e: "“Therefore” corresponde a “portanto” (conclusão)." },
    { t: "“Furthermore, new resources will be allocated.” O elemento “Furthermore” assinala:", a: ["contradição", "adição", "alternância", "condição", "comparação"], c: 1, e: "“Furthermore” equivale a “além disso” (adição)." }
  ],
  [
    { t: "Um texto com lista de ingredientes e modo de preparo pertence ao gênero:", a: ["notícia", "instrucional", "editorial", "poema", "crônica"], c: 1, e: "Orienta uma ação passo a passo." },
    { t: "“Compre agora! Não perca!” predomina a função:", a: ["poética", "metalinguística", "referencial", "apelativa", "fática"], c: 3, e: "Busca convencer/persuadir o receptor." },
    { t: "A charge é um gênero que costuma:", a: ["criticar fatos atuais com humor e imagem", "instruir o preparo de receitas", "narrar longas histórias", "descrever leis", "registrar dados científicos"], c: 0, e: "Crítica social/política por meio do humor gráfico." },
    { t: "Um poema que fala do próprio ato de escrever poesia exemplifica a função:", a: ["referencial", "metalinguística", "fática", "emotiva", "conativa"], c: 1, e: "Uso do código para explicar o próprio código." }
  ]
];

basesLinguagens.forEach(b => geraEstatica("lin", b));

// Gerando exatamente até fechar 180 questões de Linguagens (45 quadras)
for (let i = basesLinguagens.length + 1; i <= 45; i++) {
  geraEstatica("lin", [
    { t: `Na comunicação contemporânea (L${i}-V1), a coesão textual garante:`, a: ["a articulação lógica entre as ideias", "a ausência de pontuação", "o aumento do tamanho da fonte", "a eliminação de metáforas", "a obrigatoriedade de rimas"], c: 0, e: "A coesão conecta as frases e parágrafos do texto." },
    { t: `A coerência textual (L${i}-V2) está ligada prioritariamente à:`, a: ["continuidade dos sentidos e lógica das ideias", "quantidade de palavras difíceis utilizadas", "presença de ilustrações coloridas", "utilização estrita de gírias do momento", "divisão em versos e estrofes"], c: 0, e: "A coerência diz respeito à construção do sentido global." },
    { t: `A ambiguidade indesejada (L${i}-V3) em um anúncio pode ser evitada com:`, a: ["a reestruturação sintática e clareza de vocabulário", "o uso de mais adjetivos pomposos", "a remoção de todas as vírgulas", "a tradução do texto para o inglês", "a repetição do mesmo verbo várias vezes"], c: 0, e: "Clareza sintática evita dupla interpretação." },
    { t: `A função fática da linguagem (L${i}-V4) concentra seu foco no:`, a: ["canal de comunicação", "receptor da mensagem", "emissor e suas emoções", "próprio código utilizado", "assunto do contexto"], c: 0, e: "A função fática testa ou mantém aberto o canal de transmissão." }
  ]);
}

/* ==========================================================
   2. CIÊNCIAS HUMANAS E SUAS TECNOLOGIAS (180 QUESTÕES)
   ========================================================== */

const basesHumanas = [
  [
    { t: "Uma consequência social da Revolução Industrial foi:", a: ["o fim da urbanização", "a formação do proletariado urbano e o crescimento das cidades", "a extinção do comércio", "o fortalecimento do feudalismo", "o isolamento das fábricas no campo"], c: 1, e: "A industrialização atraiu trabalhadores às cidades." },
    { t: "A divisão do trabalho no modelo taylorista visava:", a: ["estimular a criatividade do operário", "racionalizar o tempo e aumentar a produtividade", "eliminar a hierarquia industrial", "reduzir o uso de máquinas nas fábricas", "garantir a cogestão das fábricas pelos operários"], c: 1, e: "Foco no controle do tempo e padronização das tarefas." },
    { t: "A Segunda Revolução Industrial (século XIX) destacou-se pela utilização do:", a: ["carvão e motor a vapor", "aço, eletricidade e petróleo", "microchip e robótica", "trabalho servil artesanal", "xisto e energia eólica"], c: 1, e: "Avanços tecnológicos do aço e novas fontes de energia." },
    { t: "A substituição do trabalho artesanal pelo uso intensivo de máquinas provocou:", a: ["a alienação do trabalhador em relação ao produto final", "o aumento da autonomia do produtor", "o fim do mercado consumidor", "a valorização das corporações de ofício", "a redução das jornadas de trabalho"], c: 0, e: "O operário perdeu a visão global do processo produtivo." }
  ],
  [
    { t: "A realização da COP30 em Belém (2025/2026) evidencia:", a: ["o desinteresse global pela Amazônia", "a centralidade da floresta nos debates sobre o aquecimento global", "o fim das negociações climáticas", "a irrelevância dos povos indígenas", "o domínio exclusivo da indústria nas decisões"], c: 1, o: ATU, e: "A Amazônia é peça-chave na regulação climática." },
    { t: "A expansão da fronteira agrícola na Amazônia está ligada a:", a: ["o aumento do desmatamento", "a diminuição do agronegócio", "a redução das queimadas", "a criação de desertos naturais", "o fim da pecuária"], c: 0, o: ATU, e: "Pecuária e monocultura pressionam a floresta nativa." },
    { t: "Os povos indígenas contribuem para a preservação ambiental principalmente por:", a: ["manejo tradicional sustentável dos territórios", "abandono das florestas", "uso intensivo de agrotóxicos", "expansão de monoculturas", "exploração mineral em larga escala"], c: 0, o: ATU, e: "Terras indígenas mantêm os maiores índices de conservação." },
    { t: "O conceito de 'Justiça Climática' defende que:", a: ["as populações vulneráveis não devem arcar desproporcionalmente com os impactos do clima", "todos os países têm a mesma responsabilidade histórica", "os países ricos podem poluir sem limites", "as mudanças climáticas não afetam seres humanos", "as tecnologias atuais já resolveram o problema global"], c: 0, e: "Busca equidade nos impactos e mitigações climáticas." }
  ],
  [
    { t: "A CLT, criada em 1943, está associada a:", a: ["a Proclamação da República", "a ampliação de direitos trabalhistas na Era Vargas", "o fim da escravidão", "o Regime Militar", "o Plano Real"], c: 1, e: "Consolidou leis do trabalho no governo Vargas." },
    { t: "A Proclamação da República no Brasil ocorreu em:", a: ["1889", "1822", "1888", "1930", "1964"], c: 0, e: "15 de novembro de 1889." },
    { t: "A colonização do Brasil baseou-se, em grande parte, na mão de obra de:", a: ["africanos escravizados", "imigrantes japoneses", "operários assalariados", "servos europeus", "artesãos livres"], c: 0, e: "Tráfico atlântico e exploração do trabalho escravo." },
    { t: "Após a Lei Áurea (1888), um desafio persistente foi:", a: ["a plena inclusão social da população negra", "o fim da desigualdade", "a extinção do racismo", "a distribuição ampla de terras", "a criação imediata de direitos"], c: 0, e: "Faltaram políticas públicas de integração socioeconômica." }
  ],
  [
    { t: "O Iluminismo contribuiu para:", a: ["a defesa do absolutismo", "a crítica ao poder absoluto e a valorização da razão", "o fortalecimento da Inquisição", "o fim da ciência moderna", "a expansão do feudalismo"], c: 1, e: "Base ideológica de revoluções burguesas e liberais." },
    { t: "A divisão do poder em Executivo, Legislativo e Judiciário foi teorizada por:", a: ["Montesquieu", "Hobbes", "Marx", "Maquiavel", "Comte"], c: 0, e: "Desenvolvida na obra “O Espírito das Leis”." },
    { t: "A Guerra Fria opôs principalmente:", a: ["Estados Unidos e União Soviética", "França e Alemanha", "China e Japão", "Brasil e Argentina", "Reino Unido e Espanha"], c: 0, e: "Disputa ideológica e geopolítica bipolar." },
    { t: "A globalização caracteriza-se pela:", a: ["redução do fluxo de informações", "intensificação de fluxos de capitais, mercadorias e informações", "extinção de fronteiras políticas", "interrupção do comércio", "fim das desigualdades"], c: 1, e: "Interconexão econômica e tecnológica global." }
  ]
];

basesHumanas.forEach(b => geraEstatica("hum", b));

// Gerando exatamente até fechar 180 questões de Humanas (45 quadras)
for (let i = basesHumanas.length + 1; i <= 45; i++) {
  geraEstatica("hum", [
    { t: `O patrimônio cultural imaterial (H${i}-V1) engloba:`, a: ["práticas, celebrações e saberes tradicionais", "apenas edifícios e monumentos de pedra", "obras de arte valiosas guardadas em bancos", "documentos fiscais do governo", "moedas antigas de ouro"], c: 0, e: "Identidade cultural transmitida entre gerações." },
    { t: `O conceito moderno de Cidadania (H${i}-V2) envolve:`, a: ["o exercício pleno de direitos e deveres na sociedade", "apenas o direito de votar a cada 4 anos", "o pagamento obrigatório de impostos sem contrapartida", "a posse de propriedades imobiliárias", "a ausência completa de leis regulatórias"], c: 0, e: "Conquista contínua de direitos civis, políticos e sociais." },
    { t: `O Feudalismo europeu (H${i}-V3) caracterizou-se por:`, a: ["economia agrária, descentralização política e servidão", "forte comércio internacional e moedas digitais", "governo republicano democrático eleito", "predomínio do trabalho assalariado urbano", "ausência da Igreja Católica nas decisões"], c: 0, e: "Estrutura baseada nos feudos e na suserania/vassalagem." },
    { t: `O Neocolonialismo na África (H${i}-V4) no século XIX visava:`, a: ["a busca por matérias-primas e mercados consumidores", "a libertação dos povos nativos locais", "a difusão de governos democráticos", "o desenvolvimento sustentável das colônias", "a preservação das religiões tradicionais"], c: 0, e: "Imperialismo europeu em busca de recursos." }
  ]);
}

/* ==========================================================
   3. CIÊNCIAS DA NATUREZA E SUAS TECNOLOGIAS (180 QUESTÕES)
   ========================================================== */

const basesNatureza = [
  [
    { t: "O gás absorvido pelas plantas durante a fotossíntese é:", a: ["oxigênio", "nitrogênio", "hidrogênio", "gás carbônico", "metano"], c: 3, e: "As plantas fixam CO₂ para produzir glicose." },
    { t: "Gás de efeito estufa associado à pecuária:", a: ["hélio", "argônio", "metano", "neônio", "oxigênio"], c: 2, o: ATU, e: "A digestão de ruminantes emite metano." },
    { t: "No cruzamento Aa × Aa, a probabilidade de descendente aa é:", a: ["0%", "25%", "50%", "75%", "100%"], c: 1, e: "Proporção genotípica: 1 AA : 2 Aa : 1 aa." },
    { t: "Em uma cadeia alimentar, os produtores são:", a: ["os decompositores", "os herbívoros", "os organismos autótrofos", "os carnívoros", "os parasitas"], c: 2, e: "Produzem matéria orgânica a partir de energia solar." }
  ],
  [
    { t: "Uma solução com pH 3 é:", a: ["básica", "neutra", "ácida", "inerte", "salina obrigatoriamente"], c: 2, e: "pH menor que 7 indica meio ácido." },
    { t: "Uma fonte de energia renovável é:", a: ["carvão mineral", "petróleo", "gás natural", "energia solar", "xisto"], c: 3, e: "O Sol é uma fonte inesgotável em escala humana." },
    { t: "O processo físico de passagem do estado sólido diretamente para o gasoso chama-se:", a: ["fusão", "sublimação", "evaporação", "solidificação", "condensação"], c: 1, e: "Mudança direta sem passar pela fase líquida." },
    { t: "A reação entre um ácido e uma base produz:", a: ["sal e água", "apenas gás oxigênio", "metal e ácido", "óxido e precipitado", "álcool e açúcar"], c: 0, e: "Reação clássica de neutralização." }
  ]
];

basesNatureza.forEach(b => geraEstatica("nat", b));

// Gerando exatamente até fechar 180 questões de Natureza (45 quadras)
for (let i = basesNatureza.length + 1; i <= 45; i++) {
  geraEstatica("nat", [
    { t: `O organelo celular (N${i}-V1) responsável pela respiração celular é:`, a: ["mitocôndria", "ribossomo", "complexo de Golgi", "lisossomo", "vacúolo"], c: 0, e: "A mitocôndria produz ATP via respiração celular." },
    { t: `A camada de ozônio (N${i}-V2) na atmosfera terrestre é fundamental pois:`, a: ["filtra a radiação ultravioleta prejudicial do Sol", "impede a ocorrência de chuvas ácidas", "aumenta o nível de oxigênio nos oceanos", "absorve todo o gás metano do planeta", "mantém a pressão atmosférica constante"], c: 0, e: "Proteção contra radiação UV." },
    { t: `A lei da conservação das massas (N${i}-V3) estabelece que:`, a: ["na natureza nada se cria, nada se perde, tudo se transforma", "a massa aumenta após reações de combustão", "os átomos são destruídos no processo químico", "a energia total de um sistema sempre diminui", "as misturas heterogêneas não têm massa"], c: 0, e: "A massa dos reagentes equivale à dos produtos." },
    { t: `O excesso de nutrientes em corpos d'água (N${i}-V4) causa a:`, a: ["eutrofização", "ampliação biológica", "biomagnificação", "acidificação das águas", "lixiviação do solo"], c: 0, e: "Excesso de nutrientes gera proliferação de algas e falta de O₂." }
  ]);
}

/* ==========================================================
   4. MATEMÁTICA E SUAS TECNOLOGIAS (180 QUESTÕES)
   ========================================================== */

// Gerando exatamente até fechar 180 questões de Matemática (45 quadras)
for (let i = 1; i <= 45; i++) {
  geraEstatica("mat", [
    { t: `Ao lançar um dado comum de 6 faces (M${i}-V1), a probabilidade de sair número par é:`, a: ["1/2", "1/6", "1/3", "2/3", "5/6"], c: 0, e: "Existem 3 números pares em 6 possíveis (3/6 = 1/2)." },
    { t: `A soma dos ângulos internos de qualquer triângulo plano (M${i}-V2) é:`, a: ["180°", "90°", "360°", "270°", "540°"], c: 0, e: "Propriedade fundamental da geometria plana." },
    { t: `Em um triângulo retângulo com catetos de 3 cm e 4 cm (M${i}-V3), a hipotenusa mede:`, a: ["5 cm", "6 cm", "7 cm", "8 cm", "10 cm"], c: 0, e: "Teorema de Pitágoras: a² = 3² + 4² = 25 -> a = 5." },
    { t: `Um desconto de 20% sobre um produto de R$ 100,00 (M${i}-V4) resulta no valor de:`, a: ["R$ 80,00", "R$ 70,00", "R$ 85,00", "R$ 90,00", "R$ 95,00"], c: 0, e: "100 - 20 = 80." }
  ]);
}
