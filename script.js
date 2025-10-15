const questions = [
  { q: "Favorit färg", options: ["Röd","Orange","Gul","Grön","Blå","Lila","Rosa","Vit","Svart"] },
  { q: "Favorit djur", options: ["Katt","Hund","Häst","Fisk","Fågel","Bläckfisk"] },
  { q: "Favorit blomma", options: ["Solros","Tulpaner","Vallmo","Dont forget me","Ros","Blåsippor"] },
  { q: "Favorit mat", options: ["Steak","Pommes","Köttbullar","Pasta"] },
  { q: "Favorit dricka", options: ["Schoklad","Kaffe","Milkshake","Jordgubbmjölk","Vin","Öl"] },
  { q: "Favorit instrument", options: ["Fiol","Saxofon","Piano","Gitarr","Trummor","Triangel"] },
  { q: "Favorit sweet", options: ["Glass","Schoklad","Kanelbullar","Kokos bollar","Godis","Gott och blandat","Kladdkaka"] }
];

let answers = {};
let idx = 0;

const quizEl = document.getElementById('quiz');
const resultEl = document.getElementById('result');

function renderQuestion() {
  const q = questions[idx];
  quizEl.innerHTML = `
    <div class="question">${q.q}</div>
    <div class="options">
      ${q.options.map(o=>`<button class="btn option" data-val="${o}">${o}</button>`).join('')}
    </div>
    <div class="progress small">Fråga ${idx+1} av ${questions.length}</div>
  `;
  document.querySelectorAll('.option').forEach(btn=>btn.addEventListener('click', onAnswer));
}

function onAnswer(e) {
  const val = e.currentTarget.dataset.val;
  answers[questions[idx].q] = val;
  idx++;
  if (idx < questions.length) {
    renderQuestion();
    window.scrollTo({top:0,behavior:'smooth'});
  } else {
    showResult();
  }
}

function colorFromName(name) {
  const m = {
    'röd':'#ef4444','orange':'#fb923c','gul':'#f59e0b','grön':'#10b981',
    'blå':'#3b82f6','lila':'#8b5cf6','rosa':'#ec4899','vit':'#ffffff','svart':'#111827',
    'Röd':'#ef4444','Orange':'#fb923c','Gul':'#f59e0b','Grön':'#10b981',
    'Blå':'#3b82f6','Lila':'#8b5cf6','Rosa':'#ec4899','Vit':'#ffffff','Svart':'#111827'
  };
  return m[name] || name.toLowerCase() || '#ffffff';
}

function showResult() {
  quizEl.classList.add('hidden');
  resultEl.classList.remove('hidden');
  const color = colorFromName(answers['Favorit färg']);
  const animal = answers['Favorit djur'] || 'vän';
  const drink = answers['Favorit dricka'] || 'dryck';
  const sweet = answers['Favorit sweet'] || 'gott';
  const quote = `För ${animal}-älskaren som aldrig säger nej till ${drink} och ${sweet}!`;

  resultEl.innerHTML = `
    <div class="mug-preview" id="mug-area">
      <div id="mug" class="mug" style="background:${color}; color:${(color==='white' || color==='#ffffff')? '#111827':'white'}">
        DIN MUGG
      </div>
      <div class="quote">${quote}</div>
      <div class="actions">
        <button id="downloadBtn" class="btn primary">Ladda ner mugg som bild</button>
        <button id="restartBtn" class="btn">Gör om quizet</button>
      </div>
      <div class="footer-note small">Tips: klicka på "Ladda ner" för att spara din mugg som PNG.</div>
    </div>
  `;

  document.getElementById('downloadBtn').addEventListener('click', async ()=>{
    const mugArea = document.getElementById('mug-area');
    const canvas = await html2canvas(mugArea, {backgroundColor: null, scale:2});
    const link = document.createElement('a');
    link.download = 'min_unika_mugg.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  document.getElementById('restartBtn').addEventListener('click', ()=>{
    answers = {}; idx = 0; quizEl.classList.remove('hidden'); resultEl.classList.add('hidden'); renderQuestion();
  });

  window.scrollTo({top:0,behavior:'smooth'});
}

renderQuestion();
