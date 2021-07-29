let consular = 0;
let sentinel = 0;
let guardian = 0;
let q = 0;
let quizAnswers = document.querySelectorAll('.quizAnswer');
let responseTracker;
let textField = document.getElementById('text');
let banner = document.getElementById('banner');
let quizQuestion = document.getElementById('quizQuestion');
let body = document.querySelector('body');
let loop = 0;
let questions = [
    {
        question: "A woman and her small child are beset by a desperate-looking group of thugs. They are menacing her with weapons and she screams to you for help. What do you do?",
        choices: {
            0: {
                letter: "A", 
                answer: "Help them flee.",
                class: "Sentinel"
            },
            1: {
                letter: "B",
                answer: "Attack the thugs.",
                class: "Guardian"
            },
            2: {
                letter: "C",
                answer: "Stop the thugs and find out why they are attacking her.",
                class: "Consular"
            }
        }
    },
    {
        question: "You are in combat with a Dark Jedi allied with the Sith. There is a pause in the combat. What do you do?",
        choices: {
            0: {
                letter: "A",
                answer: "Attack him again.",
                class: "Guardian"
            },
            1: {
                letter: "B",
                answer: "Find out why he turned to the dark side and try to turn him.",
                class: "Consular"
            },
            2: {
                letter: "C",
                answer: "Try to see a weakness in his technique.",
                class: "Sentinel"
            }
        }
    },
    {
        question: "There is a locked door and your goal lies on the other side. What do you do?",
        choices: {
            0: {
                letter: "A",
                answer: "Try to pick the lock.",
                class: "Sentinel"
            },
            1: {
                letter: "B",
                answer: "Smash the door down.",
                class: "Guardian"
            },
            2: {letter: "C",
                answer: "Knock.",
                class: "Consular"
            }
        }
    },
    {
        question: "You are the head of an Enclave on a contested world. The Dark Jedi infiltrated and are causing unrest across the planet. What do you do?",
        choices: {
            0: {
                letter: "A",
                answer: "Hunt them down.",
                class: "Guardian"
            },
            1: {
                letter: "B",
                answer: "Coordinate with the planetary government to identify the infiltrators.",
                class: "Consular"
            },
            2: {
                letter: "C",
                answer: "Try to lure them out into a trap.",
                class: "Sentinel"
            }
        }
    },
    {
        question: "Which color do you like better?",
        choices: {
            0: {
                answer: "Blue",
                class: "Guardian"
            },
            1: {
                answer: "Green",
                class: "Consular"
            },
            2: {
                answer: "Yellow",
                class: "Sentinel"
            }
        }
    }
];
let classes = [
    {
        class: "Guardian",
        color: "blue",
        description: "Guardians often concentrate on martial training and usually engage in combat more than any other Jedi, though they are no less skilled at diplomacy. Like all Jedi, they are keepers of the peace. Guardians have traditionally wielded blue lightsabers, though this isn’t a set rule. In the past, once a Guardian attained the rank of Jedi Master, they were given the honorific title of Warrior Master.",
        background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(0,37,255,1) 50%, rgba(255,255,255,1) 100%)",
    },
    {
        class: "Consular",
        color: "green",
        description: "Consulars are the primary scholars and diplomats and seers of the Order, often becoming instructors. Jedi Consulars generally achieve their goals through words or the Force, and rarely by the lightsaber. Traditionally, they wielded a green lightsaber, but, like all Jedi, they were free to choose their own color for the blade. In the past, once a Consular attained the rank of Jedi Master, they were given the honorific title of Sage Master.",
        background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(2,176,0,1) 50%, rgba(255,255,255,1) 100%)",
    },
    {
        class: "Sentinel",
        color: "yellow",
        description: "The Jedi Sentinel seeks a balance between the two extremes of the Jedi; the Jedi Consulars and the Jedi Guardians. They have adequate combat skills and somewhat extensive knowledge of the Force. The traditional lightsaber color of a Sentinel was yellow, but like the above types, this was not a requirement. While the Sentinel doesn’t have the strengths of the Consular in the Force, or the skill of a Guardian in battle, they also don’t have the weaknesses of those types. Since Sentinels are open to wide range of skills, and are generally well-rounded, many Jedi end up falling into this classification.",
        background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(247,255,0,1) 50%, rgba(255,255,255,1) 100%)",
    }
];

//when quiz is started, add .invisible class to start and banner
document.getElementById('start').addEventListener('click', function() {
    quizQuestion.classList.remove('invisible');
    document.getElementsByClassName('answers')[0].classList.remove('invisible');
    document.getElementById('left').style.width = "50%";
    document.getElementById('right').style.width = "50%";
    document.getElementById('foreground').classList.add('invisible');
    document.getElementById('left').style.backgroundImage = "url(https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2270&q=80)";
    loadQuestion(q);
});

//make the buttons appear based on the number of responses, rather than just filling in innerHTML
function loadQuestion() {
    quizQuestion.innerHTML = questions[q].question;

    for (let j = 0; j < Object.keys(questions[q].choices).length; j++) {
        let newButton = document.createElement('div');
        newButton.classList.add('quizButton');
        newButton.addEventListener('click', ()=> buttonClicked(j));
        
        let newLetter = document.createElement('p');
        newLetter.classList.add('letter');
        newLetter.innerHTML = questions[q].choices[j].letter;
        
        let newAnswer = document.createElement('p');
        newAnswer.classList.add('quizAnswer');
        newAnswer.innerHTML = questions[q].choices[j].answer;

        newButton.appendChild(newLetter);
        newButton.appendChild(newAnswer);
        document.getElementsByClassName('answers')[0].appendChild(newButton);
    }
}

function buttonClicked(i) {        
    q++;
    responseTracker = i;
    addPoints();
    
    //remove buttons from dom
    let quizButtons = document.querySelectorAll('.quizButton');

    let buttonsLength = quizButtons.length;
    for (let m = 0; m <quizButtons.length; m++) {
        quizButtons[m].remove();
    }

    //end quiz after final question is answered, or go to tiebreaker if 2 classes are equal
    if (q < questions.length-1) {
        loadQuestion();
    }
    else if (guardian > consular && guardian > sentinel) {
        endQuiz(classes[0]);
    }
    else if (consular > guardian && consular > sentinel) {
        endQuiz(classes[1]);
    }
    else if (sentinel > guardian && sentinel > consular) {
        endQuiz(classes[2]);
    }
    else if (guardian == consular) {
        tieBreaker(0, 1);
    }
    else if (consular == sentinel) {
        tieBreaker(1, 2);
    }
    else {
        tieBreaker(0, 2);
    }
}

//track which class answers algin with
function addPoints()
{
    if(questions[q-1].choices[responseTracker].class == "Guardian") {
        guardian++;
    }
    else if(questions[q-1].choices[responseTracker].class == "Consular") {
        consular++;
    }
    else {
        sentinel++;
    }
}

function tieBreaker(classA, classB) {
    quizQuestion.innerHTML = questions[q].question;
    
    //create tiebreaker option 1
    let newButtonA = document.createElement('div');
    newButtonA.classList.add('quizButton');
    newButtonA.addEventListener('click', ()=> buttonClicked(classA));
    
    let newLetterA = document.createElement('p');
    newLetterA.classList.add('letter');
    newLetterA.innerHTML = "A";
    
    let newAnswerA = document.createElement('p');
    newAnswerA.classList.add('quizAnswer');
    newAnswerA.innerHTML = questions[q].choices[classA].answer;

    newButtonA.appendChild(newLetterA);
    newButtonA.appendChild(newAnswerA);
    document.getElementsByClassName('answers')[0].appendChild(newButtonA);

    //create tiebreaker option 2
    let newButtonB = document.createElement('div');
    newButtonB.classList.add('quizButton');
    newButtonB.addEventListener('click', ()=> buttonClicked(classB));
    
    let newLetterB = document.createElement('p');
    newLetterB.classList.add('letter');
    newLetterB.innerHTML = "B";
    
    let newAnswerB = document.createElement('p');
    newAnswerB.classList.add('quizAnswer');
    newAnswerB.innerHTML = questions[q].choices[classB].answer;

    newButtonB.appendChild(newLetterB);
    newButtonB.appendChild(newAnswerB);
    document.getElementsByClassName('answers')[0].appendChild(newButtonB);
}

function endQuiz(jediClass) {    
    document.querySelector('#left').style.width = '100%';
    document.querySelector('#right').style.width = '0%';
    document.getElementById('left').style.backgroundImage = "none";
    document.getElementById('right').style.backgroundImage = "none";
    document.getElementsByClassName('answers')[0].style.display = "none";
    body.style.backgroundImage = "none";

    body.style.background = jediClass.background;
    textField.innerHTML = jediClass.description;
    banner.innerHTML = "You are a Jedi " + jediClass.class + "!";

    quizQuestion.classList.add('invisible');
    document.getElementById('foreground').classList.remove('invisible');
    document.getElementById('start').style.display = "none";
    document.getElementById('retake').classList.remove('invisible');

    //adjust color visibility for yellow background
    if (jediClass == classes[2]) {
        document.getElementById('name').style.filter = "invert(0)";
        banner.style.color = "black";
        textField.style.color = "black";
    }
};

function restartQuiz() {
    consular = 0;
    sentinel = 0;
    guardian = 0;
    q = 0;
    loop++;

    //set colors to default
    document.getElementById('name').style.filter = "";
    banner.style.color = "";
    textField.style.color = "";

    quizQuestion.classList.remove('invisible');
    document.getElementsByClassName('answers')[0].classList.remove('invisible');
    document.getElementById('left').style.width = "50%";
    document.getElementById('right').style.width = "50%";
    document.getElementById('foreground').classList.add('invisible');
    document.getElementById('left').style.backgroundImage = "url(https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2270&q=80)";
    document.getElementsByClassName('answers')[0].style.display = "";
    loadQuestion(q);
}

document.getElementById('retake').addEventListener('click', ()=> restartQuiz());
