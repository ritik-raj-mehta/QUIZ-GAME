const quesJSON = [
    {
      correctAnswer: '20',
      options: ['20', '30', '40', '50'],
      question: "Sarah is twice as old as Emma. In 5 years, Sarah will be 5 times as old as Emma was 5 years ago. How old is Sarah now?",
    },
    {
      correctAnswer: 'Pakistan',
      options: ['Pakistan', 'Thailand', 'Malaysia', 'Indonesia'],
      question: "Which of the following is the same as Nepal, Bhutan, Myanmar?",
    },
    {
      correctAnswer: 'Saturday',
      options: ['Friday', 'Saturday', 'Sunday', 'Monday'],
      question: 'If a leap year begins on a Sunday, what day of the week will December 31 be?',
    },
    {
      correctAnswer: 'A Nanny',
      options: ['A Sow', 'A Lioness', 'A Hen', 'A Nanny'],
      question: 'A female goat is known as what?',
    },
    {
      correctAnswer: 'malloc()',
      options: ['malloc()', 'free()', 'realloc()', 'calloc()'],
      question: "Which function is used to allocate dynamic memory in C?",
    },
    {
      correctAnswer: 'stdlib.h',
      options: ['memory.h', 'stdlib.h', 'string.h', 'dos.h'],
      question: "Which header file should be included to use functions like malloc() and calloc()?",
    },
    {
      correctAnswer: 'max = a>b ? a>c?a:c:b>c?b:c',
      options: ['a>b ? c=30 : c=40;', 'a>b ? c=30;', 'max = a>b ? a>c?a:c:b>c?b:c', 'return (a>b)?(a:b)'],
      question: "Which of the following is the correct usage of conditional operators used in C?",
    },
  ];
  
  let score = 0;
  let currentQuestion = 0;
  
  const questionEl = document.getElementById("question");
  const optionEl = document.getElementById("options");
  const scoreEl = document.getElementById("score");
  const nextButton = document.getElementById("next");
  const btnContainer = document.getElementById("btn");
  
  // Create and append retry button
  const retryButton = document.createElement('button');
  retryButton.textContent = "Retry";
  retryButton.id = "retry";
  retryButton.style.display = "none";
  btnContainer.appendChild(retryButton);
  
  // Display the current question
  function showQuestion() {
    optionEl.innerHTML = '';  // Clear previous options
    const { correctAnswer, options, question } = quesJSON[currentQuestion];
    questionEl.textContent = question;
  
    // Shuffle and display options
    const shuffledOptions = shuffleOptions(options);
    shuffledOptions.forEach((opt) => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      optionEl.appendChild(btn);
  
      btn.addEventListener("click", () => {
        if (opt === correctAnswer) {
          score++;
        } else {
          score -= 0.25;
        }
        scoreEl.textContent = `Score: ${score}`;
        disableButtons();
      });
    });
  }
  
  // Disable buttons after an option is clicked
  function disableButtons() {
    const buttons = optionEl.querySelectorAll("button");
    buttons.forEach((btn) => {
      btn.disabled = true;
    });
  }
  
  // Shuffle options
  function shuffleOptions(options) {
    for (let i = options.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }
  
  // "Next" button event listener
  nextButton.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quesJSON.length) {
      showQuestion();
    } else {
      questionEl.textContent = 'Quiz Completed!';
      optionEl.innerHTML = '';
      nextButton.style.display = "none";
      retryButton.style.display = "inline-block";
    }
  });
  
  // "Retry" button event listener
  retryButton.addEventListener("click", () => {
    score = 0;
    currentQuestion = 0;
    scoreEl.textContent = `Score: ${score}`;
    retryButton.style.display = "none";
    nextButton.style.display = "inline-block";
    showQuestion();
  });
  
  // Show the first question initially
  showQuestion();
  