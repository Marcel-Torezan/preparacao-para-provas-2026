/* ESTRUTURA OFICIAL DO ENEM: não altere os totais. */
const ESTRUTURA={
 dia1:{nome:"1º Dia",tempo:330,redacao:true,areas:[{id:"lin",nome:"Linguagens, Códigos e suas Tecnologias",total:45},{id:"hum",nome:"Ciências Humanas e suas Tecnologias",total:45}]},
 dia2:{nome:"2º Dia",tempo:300,areas:[{id:"nat",nome:"Ciências da Natureza e suas Tecnologias",total:45},{id:"mat",nome:"Matemática e suas Tecnologias",total:45}]}
};
const TEMA="Desafios para o uso ético da inteligência artificial na educação brasileira. Redija um texto dissertativo-argumentativo apresentando uma proposta de intervenção que respeite os direitos humanos.";
const EST="Estilo ENEM",ATU="Atualidade 2026";
/* Modelo: q(area, enunciado, [5 alternativas], índice_correto(0=A), origem, comentário) */
const q=(area,t,a,c,o,e)=>({area,t,a,c,o,e});

const PROVAS={
azul:{nome:"Caderno Azul",cor:"#2563eb",desc:"Versão 1 do simulado.",q:[
 q("lin","“Nas redes, a pressa de opinar substitui a vontade de compreender.” O trecho critica:",["o excesso de imagens nos perfis","a troca da reflexão pelo julgamento imediato nas interações digitais","a falta de acesso à internet","o uso de linguagem formal na web","a censura de opiniões online"],1,ATU,"A crítica recai sobre a rapidez do julgamento em detrimento da compreensão."),
 q("lin","Em “O tempo é um rio que leva nossos sonhos”, há a figura de linguagem:",["metonímia","ironia","metáfora","antítese","eufemismo"],2,EST,"Comparação implícita entre tempo e rio."),
 q("hum","Uma consequência social da Revolução Industrial foi:",["o fim da urbanização","a formação do proletariado urbano e o crescimento das cidades","a extinção do comércio","o fortalecimento do feudalismo","o isolamento das fábricas no campo"],1,EST,"A industrialização atraiu trabalhadores às cidades."),
 q("hum","A realização da COP30 em Belém (2025) evidencia:",["o desinteresse global pela Amazônia","a centralidade da floresta nos debates sobre o aquecimento global","o fim das negociações climáticas","a irrelevância dos povos indígenas","o domínio exclusivo da indústria nas decisões"],1,ATU,"A Amazônia é peça-chave na regulação climática."),
 q("nat","O gás absorvido pelas plantas durante a fotossíntese é:",["oxigênio","nitrogênio","hidrogênio","gás carbônico","metano"],3,EST,"As plantas fixam CO₂ para produzir glicose."),
 q("nat","Um carro percorre 150 km em 2 h. Sua velocidade média é:",["50 km/h","65 km/h","75 km/h","80 km/h","100 km/h"],2,EST,"150 ÷ 2 = 75 km/h."),
 q("mat","Um produto de R$ 250,00 recebe 20% de desconto. O preço final é:",["R$ 150,00","R$ 180,00","R$ 200,00","R$ 220,00","R$ 230,00"],2,EST,"250 − 50 = 200."),
 q("mat","Ao lançar um dado comum, a probabilidade de sair número par é:",["1/6","1/3","1/2","2/3","5/6"],2,EST,"3 resultados pares em 6.")
]},
amarelo:{nome:"Caderno Amarelo",cor:"#eab308",desc:"Versão 2 do simulado.",q:[
 q("lin","A Semana de Arte Moderna de 1922 representou:",["a continuidade do academicismo","a ruptura com padrões artísticos tradicionais","o retorno ao Barroco","o fim da literatura brasileira","a adoção do Parnasianismo"],1,EST,"Marco do Modernismo brasileiro."),
 q("lin","“However, the results were different.” A palavra “however” indica:",["adição","causa","contraste","tempo","condição"],2,EST,"“However” equivale a “porém”."),
 q("hum","A CLT, criada em 1943, está associada a:",["a Proclamação da República","a ampliação de direitos trabalhistas na Era Vargas","o fim da escravidão","o Regime Militar","o Plano Real"],1,EST,"Consolidou leis do trabalho no governo Vargas."),
 q("hum","A expansão da fronteira agrícola na Amazônia está ligada a:",["o aumento do desmatamento","a diminuição do agronegócio","a redução das queimadas","a criação de desertos naturais","o fim da pecuária"],0,ATU,"Pecuária e monocultura pressionam a floresta."),
 q("nat","Gás de efeito estufa associado à pecuária:",["hélio","argônio","metano","neônio","oxigênio"],2,ATU,"A digestão de ruminantes emite metano."),
 q("nat","Uma solução com pH 3 é:",["básica","neutra","ácida","inerte","salina obrigatoriamente"],2,EST,"pH menor que 7 é ácido."),
 q("mat","3 pedreiros constroem um muro em 12 dias. Com 6 pedreiros, no mesmo ritmo, serão:",["3 dias","4 dias","6 dias","8 dias","24 dias"],2,EST,"Grandezas inversamente proporcionais."),
 q("mat","A média aritmética de 6, 8 e 10 é:",["6","7","8","9","10"],2,EST,"24 ÷ 3 = 8.")
]},
branco:{nome:"Caderno Branco",cor:"#94a3b8",desc:"Versão 3 do simulado.",q:[
 q("lin","Um texto com lista de ingredientes e modo de preparo pertence ao gênero:",["notícia","instrucional","editorial","poema","crônica"],1,EST,"Orienta uma ação passo a passo."),
 q("lin","A gíria usada em conversa informal deve ser vista como:",["erro grave","sinal de ignorância","variação adequada ao contexto","ameaça à língua","linguagem proibida"],2,EST,"Variação linguística é adequação, não erro."),
 q("hum","O Iluminismo contribuiu para:",["a defesa do absolutismo","a crítica ao poder absoluto e a valorização da razão","o fortalecimento da Inquisição","o fim da ciência moderna","a expansão do feudalismo"],1,EST,"Base ideológica de revoluções liberais."),
 q("hum","A automação impulsionada por inteligência artificial tende a:",["eliminar a necessidade de educação","exigir requalificação profissional","encerrar o comércio","acabar com a tecnologia","reduzir o uso de dados"],1,ATU,"Novas funções exigem novas competências."),
 q("nat","No cruzamento Aa × Aa, a probabilidade de descendente aa é:",["0%","25%","50%","75%","100%"],1,EST,"Proporção 1 AA : 2 Aa : 1 aa."),
 q("nat","Uma fonte de energia renovável é:",["carvão mineral","petróleo","gás natural","energia solar","xisto"],3,EST,"O Sol é fonte inesgotável em escala humana."),
 q("mat","A área de um retângulo de 8 m × 5 m é:",["13 m²","26 m²","35 m²","40 m²","80 m²"],3,EST,"8 × 5 = 40."),
 q("mat","R$ 1.000 a juros simples de 2% ao mês durante 3 meses resultam em montante de:",["R$ 1.020","R$ 1.040","R$ 1.060","R$ 1.080","R$ 1.120"],2,EST,"J = 1000×0,02×3 = 60.")
]},
rosa:{nome:"Caderno Rosa",cor:"#ec4899",desc:"Versão 4 do simulado.",q:[
 q("lin","Uma paródia estabelece com o texto original uma relação de:",["tradução","intertextualidade","plágio obrigatório","resumo","indiferença"],1,EST,"Dialoga com outro texto para recriá-lo."),
 q("lin","“Compre agora! Não perca!” predomina a função:",["poética","metalinguística","referencial","apelativa","fática"],3,EST,"Busca convencer o receptor."),
 q("hum","Após a Lei Áurea (1888), um desafio persistente foi:",["a plena inclusão social da população negra","o fim da desigualdade","a extinção do racismo","a distribuição ampla de terras","a criação imediata de direitos"],0,EST,"Faltaram políticas de inserção."),
 q("hum","A globalização caracteriza-se pela:",["redução do fluxo de informações","intensificação de fluxos de capitais, mercadorias e informações","extinção de fronteiras políticas","interrupção do comércio","fim das desigualdades"],1,EST,"Interconexão econômica e cultural."),
 q("nat","Em uma cadeia alimentar, os produtores são:",["os decompositores","os herbívoros","os organismos autótrofos","os carnívoros","os parasitas"],2,EST,"Produzem matéria orgânica por fotossíntese."),
 q("nat","Em um resistor de 4 Ω submetido a 12 V, a corrente é:",["1 A","2 A","3 A","4 A","48 A"],2,EST,"i = V/R = 12/4 = 3 A."),
 q("mat","Se 2x + 6 = 20, então x vale:",["5","6","7","8","14"],2,EST,"2x = 14 → x = 7."),
 q("mat","Um aumento de 10% sobre R$ 80,00 resulta em:",["R$ 82,00","R$ 84,00","R$ 86,00","R$ 88,00","R$ 90,00"],3,EST,"80 + 8 = 88.")
]}
};
