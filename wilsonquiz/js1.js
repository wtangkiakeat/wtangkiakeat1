const question = [
    {
        question:"which is the food wilson like the most now?",
        answer:[
            {text:"chocolate",correct :false},
            {text:"ice cream",correct :false},
            {text:"fried chicken",correct :false},
            {text:"sa bao yi mian",correct :true}
        ]
    },
    {
        question:"what is wilson thinking now? ",
        answer:[
            {text:"marry eeyuecheng",correct :false},
            {text:"幻想eeyuecheng",correct :true},
            {text:"sleep",correct :false},
            {text:"play video games",correct :false}
        ]
    },
    {
        question:"which part of eeyuecheng wilson now like the most?",
        answer:[
            {text:"breast",correct :false},
            {text:"eye",correct :false},
            {text:"nose",correct :true},
            {text:"ass",correct :false}
        ]
    },
    {
    question: 'which person wilson<span class="tiny-word">no</span>love?',
    answer:[
        {text:"eeyuecheng", correct:false},
        {text:"俞悅澄", correct:false},
        {text:"yc", correct:false},
        {text:"lisa", correct:true}
    ]
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next");
const feedbackElement = document.getElementById("feedback");
const home = document.getElementById("home");
const quiz = document.querySelector(".quiz");
const startButton = document.getElementById("start-btn");

let currentQuestioni = 0;
let score = 0;

startButton.addEventListener("click", () => {
    home.style.display = "none";
    quiz.style.display = "block";
    startQuiz();
});

function startQuiz(){
    currentQuestioni =0;
    score =0;
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    answerButtons.classList.remove("bonus-options");
    let currentQuestion = question[currentQuestioni];
    let questionNo = currentQuestioni + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer=> {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);

    })
}

function resetState(){
    nextButton.style.display = "none";
    feedbackElement.innerHTML = "";

    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    const photoNumber = currentQuestioni * 2 + (isCorrect ? 1 : 2);
    const photoText = isCorrect 
        ? "Correct! You know her well 💖" 
        : "Wrong answer! ,Wilson is angry";

    feedbackElement.innerHTML = `
        <div class="feedback-box">
            <p>${photoText}</p>
            <img src="photo${photoNumber}.jpg" class="feedback-img">
        </div>
    `;

    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestioni++;
    if (currentQuestioni < question.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();

    answerButtons.classList.add("bonus-options");

    questionElement.innerHTML = `
        <div class="score-page">
            <h2>You scored ${score} out of ${question.length}!</h2>
            <p>Do you want to do the bonus question? 👀</p>
            <img src="photo9.jpg" class="score-img">
        </div>
    `;

    nextButton.style.display = "none";

    const bonusChoices = [
        {text: "Yes 💖", correct: true},
        {text: "No", correct: false},
        {text: "Maybe", correct: false},
        {text: "I don't want", correct: false}
    ];

    bonusChoices.forEach(choice => {
        const button = document.createElement("button");
        button.innerHTML = choice.text;
        button.classList.add("btn");

        if (!choice.correct) {
            button.classList.add("small-run-btn");
        }

        answerButtons.appendChild(button);

        button.addEventListener("click", () => {
            if (choice.correct) {
                showBonusQuestion();
            } else {
                runAway(button);
            }
        });
    });
}


function runAway(button){
    const x = Math.floor(Math.random() * 250) - 100;
    const y = Math.floor(Math.random() * 160) - 60;

    button.style.transform = `translate(${x}px, ${y}px)`;
    button.innerHTML = "😡😠🤬";
}

function showBonusQuestion(){
    resetState();
    answerButtons.classList.remove("bonus-options");

    questionElement.innerHTML = `
        <div class="score-page">
            <h2>Bonus Question 💖</h2>
            <p>Who will you married?</p>
        </div>
    `;

    const bonusAnswers = [
        {text: "wonwoo", correct: false},
        {text: "Wilson tang kia keat", correct: true},
        {text: "all members of seventeen", correct: false},
        {text: "hassan", correct: false}
    ];

    bonusAnswers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");

    if (!answer.correct) {
        button.classList.add("small-run-btn");
    }

    answerButtons.appendChild(button);

    button.addEventListener("click", () => {
        if (answer.correct) {
            showFinalLovePage();
        } else {
            button.classList.add("incorrect");
            runAway(button);
        }
    });
});
}

function showFinalLovePage(){
    resetState();

    questionElement.innerHTML = `
        <div class="score-page">
            <h2>Correct 💖</h2>
            <p>Hehe, I knew it .Love u too</p>
            <img src="photo9.jpg" class="score-img">
        </div>
    `;

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


nextButton.addEventListener("click", () => {
    if (currentQuestioni < question.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});
