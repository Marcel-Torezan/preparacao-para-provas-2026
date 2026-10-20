/* ============ BANCO DE QUESTÕES ============
 Cada acesso sorteia e embaralha as questões deste banco (45 por área; se houver menos, usa todas).
 Para adicionar questões, basta colar novas linhas q(...) na área certa:
 q(area, enunciado, [5 alternativas], índice_correto (0=A), origem, comentário)
 Evite alternativas do tipo "todas as anteriores", pois as alternativas também são embaralhadas. */
const ESTRUTURA={
 "dia1": {
  "nome": "1º Dia",
  "tempo": 330,
  "redacao": true,
  "areas": [
   {
    "id": "lin",
    "nome": "Linguagens, Códigos e suas Tecnologias",
    "total": 45
   },
   {
    "id": "hum",
    "nome": "Ciências Humanas e suas Tecnologias",
    "total": 45
   }
  ]
 },
 "dia2": {
  "nome": "2º Dia",
  "tempo": 300,
  "areas": [
   {
    "id": "nat",
    "nome": "Ciências da Natureza e suas Tecnologias",
    "total": 45
   },
   {
    "id": "mat",
    "nome": "Matemática e suas Tecnologias",
    "total": 45
   }
  ]
 }
};
const TEMAS=[
 "Desafios para o uso ético da inteligência artificial na educação brasileira.",
 "Caminhos para combater a desinformação nas redes sociais no Brasil.",
 "Estratégias para enfrentar os efeitos das mudanças climáticas nas cidades brasileiras."
];
const EST="Estilo ENEM",ATU="Atualidade 2026";
const q=(area,t,a,c,o,e)=>({area,t,a,c,o,e});
const BANCO=[

/* ---- LINGUAGENS ---- */
 q("lin","“Nas redes, a pressa de opinar substitui a vontade de compreender.” O trecho critica:",["o excesso de imagens nos perfis","a troca da reflexão pelo julgamento imediato nas interações digitais","a falta de acesso à internet","o uso de linguagem formal na web","a censura de opiniões online"],1,ATU,"A crítica recai sobre a rapidez do julgamento em detrimento da compreensão."),
 q("lin","Em “O tempo é um rio que leva nossos sonhos”, há a figura de linguagem:",["metonímia","ironia","metáfora","antítese","eufemismo"],2,EST,"Comparação implícita entre tempo e rio."),
 q("lin","A Semana de Arte Moderna de 1922 representou:",["a continuidade do academicismo","a ruptura com padrões artísticos tradicionais","o retorno ao Barroco","o fim da literatura brasileira","a adoção do Parnasianismo"],1,EST,"Marco do Modernismo brasileiro."),
 q("lin","“However, the results were different.” A palavra “however” indica:",["adição","causa","contraste","tempo","condição"],2,EST,"“However” equivale a “porém”."),
 q("lin","Um texto com lista de ingredientes e modo de preparo pertence ao gênero:",["notícia","instrucional","editorial","poema","crônica"],1,EST,"Orienta uma ação passo a passo."),
 q("lin","A gíria usada em conversa informal deve ser vista como:",["erro grave","sinal de ignorância","variação adequada ao contexto","ameaça à língua","linguagem proibida"],2,EST,"Variação linguística é adequação, não erro."),
 q("lin","Uma paródia estabelece com o texto original uma relação de:",["tradução","intertextualidade","plágio obrigatório","resumo","indiferença"],1,EST,"Dialoga com outro texto para recriá-lo."),
 q("lin","“Compre agora! Não perca!” predomina a função:",["poética","metalinguística","referencial","apelativa","fática"],3,EST,"Busca convencer o receptor."),

/* ---- CIÊNCIAS HUMANAS ---- */
 q("hum","Uma consequência social da Revolução Industrial foi:",["o fim da urbanização","a formação do proletariado urbano e o crescimento das cidades","a extinção do comércio","o fortalecimento do feudalismo","o isolamento das fábricas no campo"],1,EST,"A industrialização atraiu trabalhadores às cidades."),
 q("hum","A realização da COP30 em Belém (2025) evidencia:",["o desinteresse global pela Amazônia","a centralidade da floresta nos debates sobre o aquecimento global","o fim das negociações climáticas","a irrelevância dos povos indígenas","o domínio exclusivo da indústria nas decisões"],1,ATU,"A Amazônia é peça-chave na regulação climática."),
 q("hum","A CLT, criada em 1943, está associada a:",["a Proclamação da República","a ampliação de direitos trabalhistas na Era Vargas","o fim da escravidão","o Regime Militar","o Plano Real"],1,EST,"Consolidou leis do trabalho no governo Vargas."),
 q("hum","A expansão da fronteira agrícola na Amazônia está ligada a:",["o aumento do desmatamento","a diminuição do agronegócio","a redução das queimadas","a criação de desertos naturais","o fim da pecuária"],0,ATU,"Pecuária e monocultura pressionam a floresta."),
 q("hum","O Iluminismo contribuiu para:",["a defesa do absolutismo","a crítica ao poder absoluto e a valorização da razão","o fortalecimento da Inquisição","o fim da ciência moderna","a expansão do feudalismo"],1,EST,"Base ideológica de revoluções liberais."),
 q("hum","A automação impulsionada por inteligência artificial tende a:",["eliminar a necessidade de educação","exigir requalificação profissional","encerrar o comércio","acabar com a tecnologia","reduzir o uso de dados"],1,ATU,"Novas funções exigem novas competências."),
 q("hum","Após a Lei Áurea (1888), um desafio persistente foi:",["a plena inclusão social da população negra","o fim da desigualdade","a extinção do racismo","a distribuição ampla de terras","a criação imediata de direitos"],0,EST,"Faltaram políticas de inserção."),
 q("hum","A globalização caracteriza-se pela:",["redução do fluxo de informações","intensificação de fluxos de capitais, mercadorias e informações","extinção de fronteiras políticas","interrupção do comércio","fim das desigualdades"],1,EST,"Interconexão econômica e cultural."),

/* ---- CIÊNCIAS DA NATUREZA ---- */
 q("nat","O gás absorvido pelas plantas durante a fotossíntese é:",["oxigênio","nitrogênio","hidrogênio","gás carbônico","metano"],3,EST,"As plantas fixam CO₂ para produzir glicose."),
 q("nat","Um carro percorre 150 km em 2 h. Sua velocidade média é:",["50 km/h","65 km/h","75 km/h","80 km/h","100 km/h"],2,EST,"150 ÷ 2 = 75 km/h."),
 q("nat","Gás de efeito estufa associado à pecuária:",["hélio","argônio","metano","neônio","oxigênio"],2,ATU,"A digestão de ruminantes emite metano."),
 q("nat","Uma solução com pH 3 é:",["básica","neutra","ácida","inerte","salina obrigatoriamente"],2,EST,"pH menor que 7 é ácido."),
 q("nat","No cruzamento Aa × Aa, a probabilidade de descendente aa é:",["0%","25%","50%","75%","100%"],1,EST,"Proporção 1 AA : 2 Aa : 1 aa."),
 q("nat","Uma fonte de energia renovável é:",["carvão mineral","petróleo","gás natural","energia solar","xisto"],3,EST,"O Sol é fonte inesgotável em escala humana."),
 q("nat","Em uma cadeia alimentar, os produtores são:",["os decompositores","os herbívoros","os organismos autótrofos","os carnívoros","os parasitas"],2,EST,"Produzem matéria orgânica por fotossíntese."),
 q("nat","Em um resistor de 4 Ω submetido a 12 V, a corrente é:",["1 A","2 A","3 A","4 A","48 A"],2,EST,"i = V/R = 12/4 = 3 A."),

/* ---- MATEMÁTICA ---- */
 q("mat","Um produto de R$ 250,00 recebe 20% de desconto. O preço final é:",["R$ 150,00","R$ 180,00","R$ 200,00","R$ 220,00","R$ 230,00"],2,EST,"250 − 50 = 200."),
 q("mat","Ao lançar um dado comum, a probabilidade de sair número par é:",["1/6","1/3","1/2","2/3","5/6"],2,EST,"3 resultados pares em 6."),
 q("mat","3 pedreiros constroem um muro em 12 dias. Com 6 pedreiros, no mesmo ritmo, serão:",["3 dias","4 dias","6 dias","8 dias","24 dias"],2,EST,"Grandezas inversamente proporcionais."),
 q("mat","A média aritmética de 6, 8 e 10 é:",["6","7","8","9","10"],2,EST,"24 ÷ 3 = 8."),
 q("mat","A área de um retângulo de 8 m × 5 m é:",["13 m²","26 m²","35 m²","40 m²","80 m²"],3,EST,"8 × 5 = 40."),
 q("mat","R$ 1.000 a juros simples de 2% ao mês durante 3 meses resultam em montante de:",["R$ 1.020","R$ 1.040","R$ 1.060","R$ 1.080","R$ 1.120"],2,EST,"J = 1000×0,02×3 = 60."),
 q("mat","Se 2x + 6 = 20, então x vale:",["5","6","7","8","14"],2,EST,"2x = 14 → x = 7."),
 q("mat","Um aumento de 10% sobre R$ 80,00 resulta em:",["R$ 82,00","R$ 84,00","R$ 86,00","R$ 88,00","R$ 90,00"],3,EST,"80 + 8 = 88."),
];

/* ---- QUESTÕES ESCRITAS (lote 2) ---- */
BANCO.push(
 q("hum","A Proclamação da República no Brasil ocorreu em:",["1889","1822","1888","1930","1964"],0,EST,"15 de novembro de 1889."),
 q("hum","A divisão do poder em Executivo, Legislativo e Judiciário foi teorizada por:",["Montesquieu","Hobbes","Marx","Maquiavel","Comte"],0,EST,"Em “O Espírito das Leis”."),
 q("hum","A Guerra Fria opôs principalmente:",["Estados Unidos e União Soviética","França e Alemanha","China e Japão","Brasil e Argentina","Reino Unido e Espanha"],0,EST,"Disputa bipolar capitalismo × socialismo."),
 q("hum","A colonização do Brasil baseou-se, em grande parte, na mão de obra de:",["africanos escravizados","imigrantes japoneses","operários assalariados","servos europeus","artesãos livres"],0,EST,"Tráfico atlântico de escravizados."),
 q("hum","A urbanização acelerada e sem planejamento tende a gerar:",["déficit de moradia e problemas de mobilidade","redução da população urbana","abundância de áreas verdes","fim do trânsito","queda da demanda por serviços"],0,EST,"Cidades crescem mais que a infraestrutura."),
 q("hum","Os povos indígenas contribuem para a preservação ambiental principalmente por:",["manejo tradicional sustentável dos territórios","abandono das florestas","uso intensivo de agrotóxicos","expansão de monoculturas","exploração mineral em larga escala"],0,ATU,"Terras indígenas mantêm a cobertura florestal."),
 q("lin","O uso de “tu” e “você” em diferentes regiões do país exemplifica variação:",["regional","histórica","técnica","literária","jurídica"],0,EST,"Variação diatópica."),
 q("lin","Em “Ela comprou pães, frutas e leite.”, as vírgulas servem para:",["separar elementos de uma enumeração","indicar pergunta","marcar fala de personagem","isolar oração subordinada","indicar ironia"],0,EST,"Enumeração de itens."),
 q("lin","Um poema que explora sons, ritmo e imagens tem predominância da função:",["poética","referencial","fática","conativa","metalinguística"],0,EST,"Foco na forma da mensagem."),
 q("lin","Em “Chovia a cântaros”, há exemplo de:",["hipérbole","pleonasmo","eufemismo","antítese","paradoxo"],0,EST,"Exagero expressivo."),
 q("lin","A norma-padrão é:",["a variedade prestigiada, exigida em contextos formais","a única forma correta de falar","a língua dos antigos romanos","uma gíria regional","uma linguagem exclusiva da internet"],0,EST,"Uma variedade entre outras, adequada a certos contextos."),
 q("lin","A charge é um gênero que costuma:",["criticar fatos atuais com humor e imagem","instruir o preparo de receitas","narrar longas histórias","descrever leis","registrar dados científicos"],0,EST,"Crítica social por meio do humor gráfico.")
);

/* ---- QUESTÕES GERADAS (variações numéricas) ---- */
const R$=v=>"R$ "+v.toLocaleString("pt-BR",{minimumFractionDigits:2}),N=u=>v=>v.toLocaleString("pt-BR")+u;
function gera(area,t,r,f,e){
  const s=Math.max(1,Math.round(r*0.1)),d=[];
  for(const x of [r+s,r-s,r+2*s,r-2*s,r+3*s,r*2]){const y=+x.toFixed(2);if(y>0&&y!==r&&!d.includes(y))d.push(y);if(d.length===4)break}
  BANCO.push(q(area,t,[r,...d].map(f),0,EST,e));
}
for(const p of [10,20,25,30])for(const v of [200,500])
  gera("mat",`Um produto de ${R$(v)} recebe ${p}% de desconto. O preço final é:`,v*(1-p/100),R$,`Desconto de ${R$(v*p/100)}.`);
for(const [a,b,c] of [[4,6,8],[5,7,9],[10,12,14],[3,9,6],[2,8,11],[7,7,10]])
  gera("mat",`A média aritmética de ${a}, ${b} e ${c} é:`,+((a+b+c)/3).toFixed(2),N(""),"Soma dividida por 3.");
for(const [a,b] of [[6,4],[9,5],[12,7],[15,8],[10,10],[14,3]])
  gera("mat",`A área de um retângulo de ${a} m por ${b} m é:`,a*b,N(" m²"),"Base × altura.");
for(const c of [500,1000,2000])for(const i of [2,5])
  gera("mat",`Um capital de ${R$(c)} a juros simples de ${i}% ao mês, por 3 meses, gera montante de:`,c*(1+i*3/100),R$,"M = C(1 + i·n).");
for(const [a,x,b] of [[2,3,4],[3,4,5],[2,7,6],[4,2,8],[5,3,5],[3,6,2],[2,9,4],[4,5,10]])
  gera("mat",`Se ${a}x + ${b} = ${a*x+b}, o valor de x é:`,x,N(""),"Isole x.");
for(const [n,d,m] of [[4,12,6],[3,10,5],[5,20,10],[6,18,9]])
  gera("mat",`${n} operários fazem uma obra em ${d} dias. Com ${m} operários, no mesmo ritmo, serão necessários:`,n*d/m,N(" dias"),"Grandezas inversamente proporcionais.");
for(const l of [5,8,12,15])
  gera("mat",`O perímetro de um quadrado de lado ${l} cm é:`,4*l,N(" cm"),"4 × lado.");
for(const [b,p] of [[80,10],[120,15],[250,20]])
  gera("mat",`Um valor de ${R$(b)} sofre aumento de ${p}%. O novo valor é:`,b*(1+p/100),R$,"Acréscimo percentual.");
for(const [d,t] of [[120,2],[180,3],[240,4],[300,5],[90,1.5],[150,2.5]])
  gera("nat",`Um veículo percorre ${d} km em ${t.toLocaleString("pt-BR")} h. Sua velocidade média é:`,d/t,N(" km/h"),"Distância ÷ tempo.");
for(const [v,r] of [[12,4],[24,6],[30,5],[20,4],[36,9]])
  gera("nat",`Um resistor de ${r} Ω é submetido a ${v} V. A corrente elétrica é:`,v/r,N(" A"),"Lei de Ohm: i = V/R.");
for(const [m,v] of [[120,40],[500,100],[240,60],[800,200]])
  gera("nat",`Um objeto de ${m} g ocupa ${v} cm³. Sua densidade é:`,m/v,N(" g/cm³"),"d = m/V.");
