function updateScoreOnPageLoad() {
    const totalScoreElement = document.getElementById('totalScore');
    if (totalScoreElement) {
        totalScoreElement.textContent = "Score total : " + (localStorage.getItem('score') || "0") + " points";
    }
}

const allQuestions = {
    "Compréhension du Phénomène": [
        {
            question: "Quelle est la définition du harcèlement sexuel au travail?",
            answers: [
                "A) Flirter avec un collègue.",
                "B) Échanger des blagues coquines.",
                "C) Comportements non désirés à caractère sexuel causant une gêne ou une menace."
            ],
            correctIndex: 2,
            feedback: "Le harcèlement sexuel va bien au-delà du flirt ou des blagues."
        },
        {
            question: "Dans quel mouvement les victimes ont-elles partagé massivement leurs expériences sur les réseaux sociaux?",
            answers: [
                "A) #WorkSafe",
                "B) #TimeIsNow",
                "C) #MeToo"
            ],
            correctIndex: 2,
            feedback: "Le mouvement #MeToo a permis aux victimes de harcèlement et d'agression sexuelle de partager leurs expériences."
        },
        {
            question: "Comment le harcèlement sexuel est-il perçu dans différentes cultures?",
            answers: [
                "A) De manière uniforme partout.",
                "B) Différemment, avec des niveaux de tolérance variables.",
                "C) Il n'est reconnu que dans les pays occidentaux."
            ],
            correctIndex: 1,
            feedback: "Les perceptions du harcèlement sexuel varient selon les cultures et les traditions."
        }
    ],
    "Impact du Harcèlement": [
        {
            question: "Quelle est une conséquence psychologique courante du harcèlement sexuel?",
            answers: [
                "A) Augmentation de la confiance en soi.",
                "B) Trouble de stress post-traumatique.",
                "C) Indifférence émotionnelle."
            ],
            correctIndex: 1,
            feedback: "De nombreuses victimes de harcèlement sexuel développent des troubles psychologiques, dont le TSPT."
        },
        {
            question: "Comment le harcèlement sexuel peut-il affecter la réputation d'une entreprise?",
            answers: [
                "A) Il peut améliorer sa visibilité médiatique.",
                "B) Il n'a aucun impact.",
                "C) Il peut la dégrader et la discréditer auprès du public."
            ],
            correctIndex: 2,
            feedback: "Les affaires de harcèlement peuvent nuire gravement à la réputation d'une entreprise."
        },
        {
            question: "Quelle est une conséquence financière possible pour une entreprise suite à un cas de harcèlement sexuel?",
            answers: [
                "A) Augmentation des profits.",
                "B) Diminution des coûts opérationnels.",
                "C) Poursuites judiciaires et indemnisations."
            ],
            correctIndex: 2,
            feedback: "Les entreprises peuvent faire face à des poursuites coûteuses en cas de harcèlement."
        }
    ],
    "Prévention et Intervention": [
        {
            question: "Quel est un moyen efficace de prévenir le harcèlement sexuel au travail?",
            answers: [
                "A) Ignorer le problème.",
                "B) Organiser régulièrement des formations de sensibilisation.",
                "C) Promouvoir uniquement des hommes aux postes de direction."
            ],
            correctIndex: 1,
            feedback: "La formation est essentielle pour prévenir et sensibiliser au harcèlement."
        },
        {
            question: "Qui joue un rôle crucial dans la gestion des plaintes liées au harcèlement?",
            answers: [
                "A) Les clients de l'entreprise.",
                "B) Le département des Ressources Humaines.",
                "C) Les fournisseurs de l'entreprise."
            ],
            correctIndex: 1,
            feedback: "Les RH sont souvent au cœur de la gestion des plaintes et des enquêtes sur le harcèlement."
        },
        {
            question: "Quelle est la première étape après avoir reçu une plainte de harcèlement?",
            answers: [
                "A) Punir immédiatement l'accusé.",
                "B) Ignorer la plainte.",
                "C) Mener une enquête approfondie."
            ],
            correctIndex: 2,
            feedback: "Il est crucial d'enquêter de manière approfondie et impartiale sur chaque plainte."
        }
    ],
    "Acteurs et Changement": [
        {
            question: "Pourquoi les syndicats peuvent-ils être essentiels pour aborder le harcèlement au travail?",
            answers: [
                "A) Ils peuvent organiser des grèves.",
                "B) Ils peuvent représenter et protéger les droits des employés.",
                "C) Ils peuvent augmenter les salaires."
            ],
            correctIndex: 1,
            feedback: "Les syndicats jouent un rôle de défense des droits et du bien-être des travailleurs."
        },
        {
            question: "Quelle initiative peut aider à changer la culture d'une entreprise vis-à-vis du harcèlement?",
            answers: [
                "A) Ignorer le harcèlement quand il se produit.",
                "B) Adopter une politique de tolérance zéro envers le harcèlement.",
                "C) Encourager les victimes à se taire."
            ],
            correctIndex: 1,
            feedback: "Une politique claire et stricte peut aider à prévenir le harcèlement et à protéger les victimes."
        },
        {
            question: "Quelle est l'importance du mouvement #MeToo dans la prise de conscience du harcèlement?",
            answers: [
                "A) Il a minimisé le problème.",
                "B) Il n'a eu aucun impact.",
                "C) Il a amplifié les voix des victimes et attiré l'attention sur le problème."
            ],
            correctIndex: 2,
            feedback: "#MeToo a été un tournant dans la prise de conscience et la dénonciation du harcèlement."
        }
    ]
};

function getThemeStringFromNumber(number) {
    switch (number) {
        case "1":
            return "Compréhension du Phénomène";
        case "2":
            return "Impact du Harcèlement";
        case "3":
            return "Prévention et Intervention";
        case "4":
            return "Acteurs et Changement";
        default:
            return null;
    }
}


function getRandomQuestions(theme) {
    const questionsForTheme = allQuestions[theme];
    const shuffled = questionsForTheme.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10); 
}

let currentQuestionIndex = 0;
let questions = []; // Questions courantes pour le thème choisi
let themeNumber; // Ajoutez cette ligne

function displayGreeting() {
    const pseudo = localStorage.getItem('pseudo');
    const groupName = localStorage.getItem('groupName');

    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;  // Si l'élément n'existe pas, sortez de la fonction

    if (pseudo) {
        greetingElement.textContent = "Bonjour " + pseudo;
    } else if (groupName) {
        greetingElement.textContent = "Bonjour " + groupName;
    }
}

function setupUserProgress() {
    const themes = document.querySelectorAll('.theme');
    if (!themes.length) return;  // Si aucun élément .theme n'est trouvé, sortez de la fonction

    let currentLevel = parseInt(localStorage.getItem('currentLevel')) || 1;
    const score = parseInt(localStorage.getItem('score') || "0");

    for (let i = 0; i < themes.length; i++) {
        if (i + 1 <= currentLevel) {
            themes[i].classList.add('active');
            themes[i].addEventListener('click', () => {
                if (i === 0 || score >= 3 * i) { // Le premier thème est toujours accessible. Pour les autres, vérifiez le score.
                    if (i + 1 < themes.length) {
                        currentLevel = Math.max(currentLevel, i + 2);
                        localStorage.setItem('currentLevel', currentLevel);
                        themes[i + 1].classList.add('active');
                    }
                    window.location.href = `quizz.html?theme=${i+1}`;
                } else {
                    alert("Vous devez obtenir un score parfait sur le thème précédent pour débloquer ce thème!");
                }
            });
        }
    }
}




function unlockNextTheme(currentTheme) {
    const score = parseInt(localStorage.getItem('score') || "0");
    const requiredScore = (parseInt(currentTheme) - 1) * 3;
    if(score >= requiredScore) {  // Vérifiez si le score est égal ou supérieur au score requis
        const themesOrder = [1, 2, 3, 4];
        const currentIndex = themesOrder.indexOf(parseInt(currentTheme));
        if (currentIndex >= 0 && currentIndex < themesOrder.length - 1) {
            localStorage.setItem('currentLevel', (currentIndex + 2).toString());
        }
    }
}


function setupThemes() {
    const themesOrder = [1, 2, 3, 4];
    const themesElements = document.querySelectorAll('.theme');

    if (!themesElements.length) return;  // Si aucun élément .theme n'est trouvé, sortez de la fonction

    themesOrder.forEach((theme, index) => {
        const themeElement = document.querySelector(`.theme[data-level='${theme}']`);
        if (parseInt(localStorage.getItem('currentLevel')) >= theme || index === 0) {
            themeElement.classList.remove('disabled');
            themeElement.classList.add('active');
        } else {
            themeElement.classList.add('disabled');
            themeElement.classList.remove('active');
        }
    });
}
function incrementScore() {
    const pseudo = localStorage.getItem('pseudo');
    let scores = JSON.parse(localStorage.getItem('scores') || "{}");
    if (!scores[pseudo]) {
        scores[pseudo] = { "total": 0 };
    }
    scores[pseudo].total++;
    scores[pseudo][`quiz${themeNumber}`]++;
    localStorage.setItem('scores', JSON.stringify(scores));
    displayTotalScore();
}



function displayTotalScore() {
    const pseudo = localStorage.getItem('pseudo');
    let scores = JSON.parse(localStorage.getItem('scores') || "{}");
    const totalScore = scores[pseudo] ? scores[pseudo].total : 0;
    const totalScoreElement = document.getElementById('totalScore');
    if (totalScoreElement) {
        totalScoreElement.textContent = "Score total : " + totalScore + " points";
    }
}



function showModal(type) {
    let modal;
    if (type === 'solo') {
        modal = document.getElementById('soloModal');
    } else {
        modal = document.getElementById('groupModal');
    }
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeModals() {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modal => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeModals();
    }
});

document.querySelectorAll('.modal .close').forEach(closeButton => {
    closeButton.addEventListener('click', closeModals);
});

function redirectToJouer(type) {
    if (type === 'solo') {
        let pseudo = document.getElementById('pseudoSolo').value.trim();
        if (pseudo) {
            localStorage.setItem('pseudo', pseudo);
            window.location.href = 'jouer.html';
        } else {
            alert("Veuillez entrer un pseudo!");
        }
    } else {
        let groupName = document.getElementById('groupName').value.trim();
        let groupSize = document.getElementById('groupSize').value.trim();
        if (groupName && groupSize) {
            localStorage.setItem('groupName', groupName);
            window.location.href = 'jouer.html';
        } else {
            alert("Veuillez entrer le nom du groupe et le nombre de joueurs!");
        }
    }
}

function disableAllButtons() {
    const questionContainer = document.getElementById('quiz-section');
    const buttons = questionContainer.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true; // Désactiver le bouton
    });
}

function loadQuestion() {
    const questionContainer = document.getElementById('quiz-section');
    const question = questions[currentQuestionIndex];
    const pseudo = localStorage.getItem('pseudo');
    let scores = JSON.parse(localStorage.getItem('scores') || "{}");
    if (!scores[pseudo]) {
        scores[pseudo] = { "total": 0 };
    }
    scores[pseudo][`quiz${themeNumber}`] = 0;
    localStorage.setItem('scores', JSON.stringify(scores));

    // Suppression de la classe pour l'animation précédente 
    questionContainer.classList.remove('animate-slide-fade-in');

    // Réinitialisation des styles et du contenu
    questionContainer.style.display = 'block';
    const feedbacks = document.querySelectorAll('.incorrect-feedback, .correct-feedback');
    feedbacks.forEach(feedback => feedback.remove());

    let content = `<h2>${question.question}</h2>`;
    question.answers.forEach((answer, index) => {
        content += `<button onclick="checkAnswer(${index})">${answer}</button>`;
    });

    questionContainer.innerHTML = content;

    // Ajout d'une petite pause avant d'ajouter l'animation pour la prochaine question
    setTimeout(() => {
        questionContainer.classList.add('animate-slide-fade-in');
    }, 50);
}



function checkAnswer(selectedIndex) {
    const questionContainer = document.getElementById('quiz-section');
    const feedbackSection = document.getElementById('feedback-section');
    const feedbackText = document.getElementById('feedback-text');
    const question = questions[currentQuestionIndex];
    const buttons = questionContainer.querySelectorAll('button');
    const feedbackContainer = document.querySelector('.feedback-content');
    
    disableAllButtons(); // Désactiver tous les boutons après la sélection

    // Si la réponse est correcte
    if (selectedIndex === question.correctIndex) {
        incrementScore(); // Increment the score for the correct answer
        buttons[selectedIndex].classList.add('correct-answer');
        
        const correctFeedback = document.createElement('div');
        correctFeedback.classList.add('correct-feedback', 'animate-slide-fade-in');
        correctFeedback.innerHTML = `<p><span class="icon-check">✅</span>Bonne réponse!</p>`;
        feedbackContainer.insertBefore(correctFeedback, document.querySelector("#feedback-text").nextSibling);
        
        setTimeout(() => {
            feedbackSection.style.display = 'none';
            nextQuestion();
        }, 1000);
    } 
    // Si la réponse est incorrecte
    else {
        buttons[selectedIndex].classList.add('incorrect-answer');
        
        const incorrectFeedback = document.createElement('div');
        incorrectFeedback.classList.add('incorrect-feedback', 'animate-slide-fade-in');
        incorrectFeedback.innerHTML = `<p><span class="icon-cross">❌</span>${question.feedback}</p>`;
        feedbackContainer.insertBefore(incorrectFeedback, document.querySelector("#feedback-text").nextSibling);
        
        feedbackSection.style.display = 'block';
        feedbackText.textContent = "Réponse incorrecte!";
    }
}




function nextQuestion() {
    const questionContainer = document.getElementById('quiz-section');
    const feedbackSection = document.getElementById('feedback-section');

    feedbackSection.style.display = 'none';
    feedbackSection.classList.remove('animate-in');
    questionContainer.style.display = 'block';

    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        if (parseInt(localStorage.getItem('score')) === questions.length) {
            incrementScore();
        }
        alert("Quiz terminé!");
        unlockNextTheme(themeNumber); 
        window.location.href = 'jouer.html';
    }
}


window.addEventListener('DOMContentLoaded', function() {
    displayGreeting();
    updateScoreOnPageLoad();
    setupUserProgress();  // Ajoutez cette ligne
    displayTotalScore(); // Ajout de cette ligne
    themeNumber = new URLSearchParams(window.location.search).get('theme');
    console.log("Thème sélectionné:", themeNumber);
    const themeString = getThemeStringFromNumber(themeNumber);
    if (themeString && allQuestions[themeString]) {
        questions = getRandomQuestions(themeString);
        setupThemes();
        loadQuestion();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const splash = document.querySelector('.splash-screen');
    if (splash) {
        setTimeout(() => {
            splash.style.display = 'none';
        }, 3000); // 3 secondes
    }
});

