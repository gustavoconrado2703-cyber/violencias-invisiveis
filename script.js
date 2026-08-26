const scenarios=[
{q:"Em um relacionamento, uma pessoa começa a exigir a senha do celular. Quando o parceiro recusa, ela diz: “Se você não tem nada a esconder, não deveria ter problema.”",opts:["É apenas uma prova de confiança.","É um possível sinal de controle.","Só seria violência se houvesse agressão física."],correct:1,exp:"Privacidade e autonomia continuam existindo em um relacionamento. A exigência acompanhada de pressão pode fazer parte de um padrão de controle."},
{q:"Um grupo de amigos sempre faz piadas sobre a aparência de uma colega. Ela já disse que não gosta, mas eles respondem: “Você não sabe brincar.”",opts:["Continua sendo apenas brincadeira.","O desconforto dela é irrelevante se os outros rirem.","Pode ser uma forma de humilhação e precisa ter seus limites respeitados."],correct:2,exp:"Uma brincadeira não deve ser usada para justificar humilhação. O contexto, a repetição e o fato de a pessoa ter demonstrado desconforto importam."},
{q:"Uma pessoa monitora a localização do parceiro o tempo todo e fica irritada quando ele demora a responder.",opts:["Pode ser um sinal de controle, especialmente se houver pressão ou medo.","É sempre uma demonstração saudável de carinho.","Não há problema se a pessoa diz que faz por amor."],correct:0,exp:"Cuidado e comunicação são diferentes de vigilância e cobrança. É importante observar se existe autonomia ou pressão."},
{q:"No trabalho, um colega é constantemente exposto ao ridículo diante da equipe e chamado de incompetente por um superior.",opts:["Pode configurar assédio moral, dependendo do contexto e da recorrência.","É normal porque chefes podem falar como quiserem.","Não pode ser violência porque não existe agressão física."],correct:0,exp:"Humilhações e constrangimentos repetidos em relações de trabalho podem caracterizar assédio moral, conforme o contexto."},
{q:"Depois de uma discussão, alguém ameaça divulgar conversas íntimas para impedir que a outra pessoa termine o relacionamento.",opts:["É apenas uma discussão de casal.","É um comportamento de controle e ameaça que merece atenção e apoio.","É aceitável se a pessoa estiver com raiva."],correct:1,exp:"Ameaças e exposição de intimidade podem ser usadas para controlar alguém e violar sua privacidade."},
{q:"Um amigo conta que está sofrendo controle e humilhações em casa. Você não sabe exatamente o que fazer.",opts:["Dizer que ele deve resolver sozinho.","Culpar a pessoa por continuar na situação.","Escutar sem julgar e ajudar a buscar apoio seguro e adequado."],correct:2,exp:"Acolher sem culpabilizar e ajudar a pessoa a encontrar apoio pode ser mais útil do que pressioná-la ou julgá-la."}
];
let sIndex=0,sScore=0,sAnswered=false;
const q=document.querySelector("#scenarioText"),opts=document.querySelector("#scenarioOptions"),fb=document.querySelector("#scenarioFeedback"),next=document.querySelector("#scenarioNext"),bar=document.querySelector("#scenarioBar"),num=document.querySelector("#scenarioNum"),res=document.querySelector("#scenarioResult");
function renderScenario(){const s=scenarios[sIndex];sAnswered=false;q.textContent=s.q;num.textContent=String(sIndex+1).padStart(2,"0")+" / "+String(scenarios.length).padStart(2,"0");bar.style.width=(sIndex/scenarios.length*100)+"%";opts.innerHTML="";fb.classList.add("hidden");next.classList.add("hidden");s.opts.forEach((t,i)=>{const b=document.createElement("button");b.className="option";b.textContent=t;b.onclick=()=>answerScenario(i,b);opts.appendChild(b)})}
function answerScenario(i,b){if(sAnswered)return;sAnswered=true;const s=scenarios[sIndex];[...opts.children].forEach((x,j)=>{x.disabled=true;if(j===s.correct)x.classList.add("good")});if(i===s.correct){sScore++;b.classList.add("good")}else b.classList.add("bad");fb.textContent=(i===s.correct?"✓ Boa leitura. ":"Atenção. ")+s.exp;fb.classList.remove("hidden");next.textContent=sIndex===scenarios.length-1?"Ver meu resultado":"Próxima situação →";next.classList.remove("hidden")}
next.onclick=()=>{sIndex++;if(sIndex<scenarios.length)renderScenario();else{q.textContent="Experiência concluída.";opts.innerHTML="";fb.classList.add("hidden");next.classList.add("hidden");bar.style.width="100%";res.innerHTML=`Você identificou corretamente <strong>${sScore} de ${scenarios.length}</strong> situações. Mais importante que a pontuação é sair daqui olhando para comportamentos que antes poderiam parecer normais.`;res.classList.remove("hidden")}};
renderScenario();

const mapTexts={
psico:"Pode envolver humilhação, manipulação, ameaças, isolamento, desvalorização e comportamentos que provoquem medo ou sofrimento.",
digital:"Pode envolver perseguição, exposição não consentida, invasão de privacidade, ameaças e controle por meios digitais.",
moral:"Pode envolver ofensas, calúnias, difamações ou outras condutas que atinjam a honra e a reputação.",
patrimonial:"Pode envolver retenção, destruição ou controle de dinheiro, bens, documentos e recursos.",
social:"Pode aparecer quando alguém tenta sistematicamente afastar outra pessoa de amigos, familiares ou redes de apoio.",
assedio:"Constrangimentos e humilhações recorrentes em relações de trabalho ou estudo podem ser sinais de assédio moral."
};
document.querySelectorAll(".map-card").forEach(b=>b.onclick=()=>{document.querySelectorAll(".map-card").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelector("#mapExplain").textContent=mapTexts[b.dataset.map]});

document.querySelectorAll(".beliefs button").forEach(b=>b.onclick=()=>document.querySelector("#beliefExplain").textContent=b.dataset.belief);
document.querySelectorAll(".phrase").forEach(b=>b.onclick=()=>document.querySelector("#phraseAnswer").textContent=b.dataset.answer);

let responses=0,psych=0,joke=0;
document.querySelector("#surveyForm").onsubmit=e=>{e.preventDefault();const fd=new FormData(e.target);responses++;if(fd.get("q1")==="Sim")psych++;if(fd.get("q3")==="Sim")joke++;document.querySelector("#sessionResponses").textContent=responses;document.querySelector("#yesPsych").textContent=Math.round(psych/responses*100)+"%";document.querySelector("#yesJoke").textContent=Math.round(joke/responses*100)+"%";document.querySelector("#surveyMsg").textContent="Sua resposta foi registrada nesta sessão. Para uma coleta oficial, conecte esta área a um formulário/banco de dados."};

const progress=document.querySelector("#progress");window.addEventListener("scroll",()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(scrollY/h*100)+"%"});
document.querySelector(".nav-toggle").onclick=()=>document.querySelector("#navLinks").classList.toggle("open");
document.querySelectorAll("#navLinks a").forEach(a=>a.onclick=()=>document.querySelector("#navLinks").classList.remove("open"));
