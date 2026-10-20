// CONFIGURAÇÃO DA SENHA DE ACESSO
const SENHA_CORRETA = "simuladoenem26";

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

const $=s=>document.querySelector(s),L=["A","B","C","D","E"];
let st=null,tm=null;
const tot=d=>ESTRUTURA[d].areas.reduce((s,a)=>s+a.total,0);
const doDia=(d,a)=>BANCO.filter(x=>x.area===a);
const cad=d=>ESTRUTURA[d].areas.reduce((s,a)=>s+doDia(d,a.id).length,0);
const fmt=s=>[s/3600|0,(s%3600)/60|0,s%60].map(n=>String(n).padStart(2,"0")).join(":");
const nomeArea=(d,id)=>ESTRUTURA[d].areas.find(a=>a.id===id).nome;
const emb=arr=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};

const COMPONENTE_VIDEOS = `
<section class="card" style="margin-top:20px;">
  <h2>🎥 Vídeoaulas Explicativas & Revisão ENEM</h2>
  <p class="muted">Reforce seus conhecimentos com os temas mais cobrados na prova:</p>
  <div class="video-grid">
    <div class="video-card">
      <iframe src="https://www.youtube.com/embed/7Ad9IHTXmw0" title="Aulão ENEM de Química" allowfullscreen></iframe>
      <h4>Aulão de Química - Temas Relevantes</h4>
    </div>
    <div class="video-card">
      <iframe src="https://www.youtube.com/embed/kbSV5W1fLpg" title="Aulão ENEM de Biologia" allowfullscreen></iframe>
      <h4>Aulão de Biologia - Revisão Geral</h4>
    </div>
    <div class="video-card">
      <iframe src="https://www.youtube.com/embed/mOo8kH8hFhQ" title="Aulão ENEM de Matemática" allowfullscreen></iframe>
      <h4>Aulão de Matemática - Temas Principais</h4>
    </div>
  </div>
</section>
`;

function home(){
  clearInterval(tm);st=null;$("#timer").hidden=true;
  $("#app").innerHTML=`
  <section class="card"><h2>Simulado ENEM</h2>
  <p class="muted">Uma única prova: a cada acesso, as questões são sorteadas do banco e embaralhadas, junto com a ordem das alternativas.</p></section>
  <section class="versoes">${Object.entries(ESTRUTURA).map(([k,d])=>`<article class="card ver" style="--c:var(--pri)"><h3>${d.nome}</h3>
  <ul>${d.areas.map(a=>`<li>${a.nome}: <b>${a.total}</b> questões</li>`).join("")}${d.redacao?"<li>Redação: <b>1</b> proposta</li>":""}</ul>
  <p class="muted">Duração: ${d.tempo/60\vert{}0}h${d.tempo%60?String(d.tempo%60).padStart(2,"0"):""} · Banco: ${cad(k)}/${tot(k)} questões</p>
  <button class="btn" onclick="start('${k}')">Iniciar ${d.nome}</button></article>`).join("")}</section>
  ${COMPONENTE_VIDEOS}`;
}

function start(d){
  const qs=ESTRUTURA[d].areas.flatMap(a=>emb(doDia(d,a.id)).slice(0,a.total).map(x=>{
    const ordem=emb(x.a.map((_,i)=>i));
    return {...x,a:ordem.map(i=>x.a[i]),c:ordem.indexOf(x.c)};
  }));
  if(!qs.length)return alert("O banco ainda não tem questões para este dia.");
  st={d,qs,r:{},i:0,red:"",tema:emb(TEMAS)[0],fim:Date.now()+ESTRUTURA[d].tempo*60000};
  $("#timer").hidden=false;clearInterval(tm);tm=setInterval(tick,1000);tick();draw();scrollTo(0,0);
}

function tick(){const s=Math.max(0,Math.floor((st.fim-Date.now())/1000));$("#t").textContent=fmt(s);if(!s)finish()}
function resp(k){st.r[st.i]=k;draw()}
function go(n){st.i=n;draw();scrollTo(0,0)}
function cnt(){const n=st.red.split("\n").filter(l=>l.trim()).length;$("#cnt").textContent=`${st.red.length} caracteres · ${n} parágrafos/linhas`}

function draw(){
  const {qs,i,d}=st,red=ESTRUTURA[d].redacao,total=qs.length+(red?1:0);let corpo;
  if(i<qs.length){const q=qs[i];
    corpo=`<span class="tag">${nomeArea(d,q.area)}</span><span class="tag alt">${q.o}</span><h3>Questão ${i+1}</h3><p class="enun">${q.t}</p>
    <div class="alts">${q.a.map((t,k)=>`<button class="alt-btn ${st.r[i]===k?"on":""}" onclick="resp(${k})"><b>${L[k]}</b><span>${t}</span></button>`).join("")}</div>`;
  }else corpo=`<span class="tag">Redação</span><h3>Proposta de redação</h3><p class="enun">${st.tema} Redija um texto dissertativo-argumentativo apresentando proposta de intervenção que respeite os direitos humanos.</p><textarea oninput="st.red=this.value;cnt()" placeholder="Escreva seu texto (até 30 linhas)...">${st.red}</textarea><p class="muted" id="cnt"></p>`;
  $("#app").innerHTML=`<section class="card">${corpo}
  <div class="nav"><button class="btn sec" ${i?"":"disabled"} onclick="go(${i-1})">← Anterior</button>
  ${i<total-1?`<button class="btn" onclick="go(${i+1})">Próxima →</button>`:`<button class="btn ok" onclick="if(confirm('Finalizar o simulado?'))finish()">Finalizar</button>`}</div></section>
  <section class="card"><h3>Cartão-resposta</h3><div class="painel">${Array.from({length:total},(_,n)=>`<button class="${st.r[n]!==undefined\vert{}\vert{}(n===qs.length&&st.red)?"fe":""} ${n===i?"at":""}" onclick="go(${n})">${n<qs.length?n+1:"R"}</button>`).join("")}</div></section>`;
  if(i>=qs.length)cnt();
}

function finish(){
  clearInterval(tm);$("#timer").hidden=true;const {qs,d,r}=st;
  const por=ESTRUTURA[d].areas.map(a=>{const ix=qs.map((q,n)=>q.area===a.id?n:-1).filter(n=>n>=0);return{nome:a.nome,n:ix.length,ac:ix.filter(n=>r[n]===qs[n].c).length}});
  const ac=por.reduce((s,a)=>s+a.ac,0),pct=qs.length?Math.round(ac/qs.length*100):0;
  $("#app").innerHTML=`<section class="card"><h2>Resultado · ${ESTRUTURA[d].nome}</h2>
  <div class="nota">${ac}/${qs.length} <small class="muted">(${pct}%)</small></div>
  ${por.map(a=>`<p><b>${a.nome}</b>: ${a.ac}/${a.n}</p><div class="barra"><i style="width:${a.n?a.ac/a.n*100:0}%"></i></div>`).join("")}
  ${ESTRUTURA[d].redacao?`<p class="muted">Redação: ${st.red.trim()?"texto escrito ("+st.red.length+" caracteres). Peça uma correção por competências a um professor.":"não escrita."}</p>`:""}
  <div class="nav"><button class="btn" onclick="start('${d}')">Novo sorteio</button><button class="btn sec" onclick="home()">Início</button></div></section>
  <h2>Gabarito comentado</h2>${qs.map((q,n)=>`<section class="card"><span class="tag">${nomeArea(d,q.area)}</span><h3>Questão ${n+1}${r[n]===q.c?"✅":"❌"}</h3><p class="enun">${q.t}</p>
  <div class="alts">${q.a.map((t,k)=>`<div class="alt-btn ${k===q.c?"certa":r[n]===k?"errada":""}"><b>${L[k]}</b><span>${t}</span></div>`).join("")}</div>
  ${q.e?`<p class="muted" style="margin-top:12px"><b>Comentário:</b> ${q.e}</p>`:""}</section>`).join("")}
  ${COMPONENTE_VIDEOS}`;
  scrollTo(0,0);
}
home();
