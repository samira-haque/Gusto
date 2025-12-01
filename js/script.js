// Heat & Flavor Profile Explorer Data
const sauces = [
    { name: "Mango Habanero", heat: 3, flavor: "Sweet", description: "A tropical delight with a fiery kick." },
    { name: "Smoked Chipotle", heat: 2, flavor: "Smoky", description: "Rich, earthy, and perfect for BBQ." },
    { name: "Ghost Pepper Blast", heat: 5, flavor: "Spicy", description: "Not for the faint of heart. Pure heat." },
    { name: "Garlic Jalapeno", heat: 1, flavor: "Savory", description: "Mild, tangy, and great on everything." }
];

// Quiz Data
const quizQuestions = [
    {
        question: "How much heat can you handle?",
        options: ["Mild tingle", "Sweat on the brow", "Call the fire department"]
    },
    {
        question: "Pick a flavor profile:",
        options: ["Sweet & Fruity", "Smoky & Earthy", "Tangy & Sour"]
    }
];

// Initialize Explorer
function initExplorer() {
    const container = document.getElementById('flavor-explorer');
    if (!container) return;

    let html = '<div class="d-flex justify-content-center gap-2 mb-3">';
    ['Sweet', 'Smoky', 'Spicy', 'Savory'].forEach(flavor => {
        html += `<button class="btn btn-sm btn-outline-warning" onclick="filterSauces('${flavor}')">${flavor}</button>`;
    });
    html += '</div><div id="sauce-results" class="text-center">Select a flavor to explore.</div>';

    container.innerHTML = html;
}

function filterSauces(flavor) {
    const results = document.getElementById('sauce-results');
    const filtered = sauces.filter(s => s.flavor === flavor);

    if (filtered.length > 0) {
        results.innerHTML = filtered.map(s => `
            <div class="card bg-transparent border-warning mb-2 text-white">
                <div class="card-body">
                    <h5 class="card-title text-warning">${s.name}</h5>
                    <p class="card-text">${s.description}</p>
                    <small>Heat Level: ${'🌶️'.repeat(s.heat)}</small>
                </div>
            </div>
        `).join('');
    } else {
        results.innerHTML = '<p>No sauces found for this profile.</p>';
    }
}

// Quiz Logic
let currentQuestion = 0;
let answers = [];

function startQuiz() {
    const container = document.getElementById('sauce-quiz');
    showQuestion(container);
}

function showQuestion(container) {
    if (currentQuestion < quizQuestions.length) {
        const q = quizQuestions[currentQuestion];
        let html = `<h4 class="mb-3 text-center">${q.question}</h4><div class="d-grid gap-2">`;
        q.options.forEach((opt, idx) => {
            html += `<button class="btn btn-outline-light" onclick="handleAnswer(${idx})">${opt}</button>`;
        });
        html += '</div>';
        container.innerHTML = html;
    } else {
        showResult(container);
    }
}

function handleAnswer(index) {
    answers.push(index);
    currentQuestion++;
    const container = document.getElementById('sauce-quiz');
    showQuestion(container);
}

function showResult(container) {
    // Simple logic for demo purposes
    let resultSauce = sauces[0];
    if (answers[0] === 2) resultSauce = sauces[2]; // High heat
    else if (answers[1] === 1) resultSauce = sauces[1]; // Smoky

    container.innerHTML = `
        <div class="text-center">
            <h3 class="text-warning mb-3">Your Perfect Match!</h3>
            <div class="card bg-transparent border-light text-white">
                <div class="card-body">
                    <h4 class="card-title">${resultSauce.name}</h4>
                    <p class="card-text">${resultSauce.description}</p>
                    <button class="btn btn-warning mt-3" onclick="location.reload()">Retake Quiz</button>
                </div>
            </div>
        </div>
    `;
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
    initExplorer();
});
