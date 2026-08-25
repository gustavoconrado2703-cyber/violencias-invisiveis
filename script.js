const questions = [
  {
    q: "Uma pessoa exige a senha do parceiro e fica irritada quando ele se recusa a entregar.",
    options: ["É apenas demonstração de confiança", "Pode ser uma forma de controle", "Só é violência se houver agressão física"],
    correct: 1,
    explanation: "Exigir acesso a contas ou senhas pode fazer parte de um padrão de controle. O contexto e a dinâmica da relação são importantes."
  },
  {
    q: "Um colega é constantemente humilhado diante da equipe e ouve que é incapaz de fazer o trabalho.",
    options: ["É sempre uma brincadeira", "Pode caracterizar assédio moral", "Não é violência porque não há contato físico"],
    correct: 1,
    explanation: "Humilhações e constrangimentos repetidos em relações de trabalho ou estudo podem configurar assédio moral, conforme o contexto."
  },
  {
    q: "Alguém publica uma foto íntima de outra pessoa sem autorização.",
    options: ["É uma questão privada sem consequências", "Pode ser violência e violação de direitos", "Só é errado se a vítima pedir para apagar"],
    correct: 1,
    explanation: "A exposição não consentida de conteúdo íntimo é uma grave violação de privacidade e pode ter consequências legais."
  },
  {
    q: "Uma pessoa diz repetidamente: 'você está exagerando, isso nunca aconteceu', para fazer a outra duvidar da própria percepção.",
    options: ["Pode ser uma forma de manipulação psicológica", "É sempre uma discussão normal", "Não tem relação com violência"],
    correct: 0,
    explanation: "Invalidar sistematicamente a percepção ou memória de alguém pode integrar uma dinâmica de manipulação psicológica."
  }
];

let current = 0, score = 0, answered = false;
const qEl = document.getElementById("question");
const aEl = document.getElementById("answers");
const fEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progressBar");
const count = document.getElementById("questionCount");
const result = document.getElementById("quizResult");

function renderQuestion() {
  answered = false;
  const item = questions[current];
  qEl.textContent = item.q;
  count.textContent = `Situação ${current + 1} de ${questions.length}`;
  progress.style.width = `${(current / questions.length) * 100}%`;
  aEl.innerHTML = "";
  fEl.classList.add("hidden");
  nextBtn.classList.add("hidden");
  item.options.forEach((text, i) => {
    const b = document.createElement("button");
    b.className = "answer";
    b.textContent = text;
    b.onclick = () => choose(i, b);
    aEl.appendChild(b);
  });
}
function choose(i, button) {
  if (answered) return;
  answered = true;
  const item = questions[current];
  [...aEl.children].forEach((b, idx) => {
    b.disabled = true;
    if (idx === item.correct) b.classList.add("correct");
  });
  if (i === item.correct) {
    score++;
    button.classList.add("correct");
    fEl.textContent = "✓ Boa leitura. " + item.explanation;
  } else {
    button.classList.add("wrong");
    fEl.textContent = "Atenção. " + item.explanation;
  }
  fEl.classList.remove("hidden");
  nextBtn.textContent = current === questions.length - 1 ? "Ver resultado" : "Próxima situação";
  nextBtn.classList.remove("hidden");
}
nextBtn.onclick = () => {
  current++;
  if (current < questions.length) renderQuestion();
  else {
    qEl.textContent = "Experiência concluída.";
    aEl.innerHTML = "";
    fEl.classList.add("hidden");
    nextBtn.classList.add("hidden");
    progress.style.width = "100%";
    count.textContent = "";
    result.innerHTML = `Você identificou corretamente <strong>${score} de ${questions.length}</strong> situações. O objetivo não é acertar tudo — é aprender a observar comportamentos que muitas vezes são normalizados.`;
    result.classList.remove("hidden");
  }
};
renderQuestion();

document.querySelectorAll(".phrase").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("phraseExplain").textContent = btn.dataset.text;
  });
});

let responses = 0, yes = 0;
document.getElementById("saveSurvey").onclick = () => {
  responses++;
  if (document.getElementById("survey1").value === "Sim") yes++;
  document.getElementById("responses").textContent = responses;
  document.getElementById("yesRate").textContent = Math.round(yes / responses * 100) + "%";
  document.getElementById("surveyMessage").textContent = "Resposta registrada nesta sessão. Para um projeto real, conecte este formulário a uma planilha ou banco de dados.";
};

document.querySelector(".menu").onclick = () => document.querySelector("nav").classList.toggle("open");
document.querySelectorAll("nav a").forEach(a => a.onclick = () => document.querySelector("nav").classList.remove("open"));
