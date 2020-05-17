document.addEventListener('DOMContentLoaded', function(){
  const btnOpenModal = document.getElementById('btnOpenModal'),
        modalBlock = document.getElementById('modalBlock'),
        modalWrap = document.querySelector('.modal'),
        closeModal = document.getElementById('closeModal'),
        questionTitle = document.getElementById('question'),
        formAnswers = document.getElementById('formAnswers'),
        burgerBtn = document.getElementById('burger'),
        prevButton = document.getElementById('prev'),
        nextButton = document.getElementById('next'),
        sendButton = document.getElementById('send'),
        modalDialog = document.querySelector('.modal-dialog'),
        questions = [
          {
              question: "Какого цвета бургер?",
              answers: [
                  {
                      title: 'Стандарт',
                      url: './image/burger.png'
                  },
                  {
                      title: 'Черный',
                      url: './image/burgerBlack.png'
                  }
              ],
              type: 'radio'
          },
          {
              question: "Из какого мяса котлета?",
              answers: [
                  {
                      title: 'Курица',
                      url: './image/chickenMeat.png'
                  },
                  {
                      title: 'Говядина',
                      url: './image/beefMeat.png'
                  },
                  {
                      title: 'Свинина',
                      url: './image/porkMeat.png'
                  }
              ],
              type: 'radio'
          },
          {
              question: "Дополнительные ингредиенты?",
              answers: [
                  {
                      title: 'Помидор',
                      url: './image/tomato.png'
                  },
                  {
                      title: 'Огурец',
                      url: './image/cucumber.png'
                  },
                  {
                      title: 'Салат',
                      url: './image/salad.png'
                  },
                  {
                      title: 'Лук',
                      url: './image/onion.png'
                  }
              ],
              type: 'checkbox'
          },
          {
              question: "Добавить соус?",
              answers: [
                  {
                      title: 'Чесночный',
                      url: './image/sauce1.png'
                  },
                  {
                      title: 'Томатный',
                      url: './image/sauce2.png'
                  },
                  {
                      title: 'Горчичный',
                      url: './image/sauce3.png'
                  }
              ],
              type: 'radio'
          }
      ];

      let clientWidth = document.documentElement.clientWidth;
      
      burgerBtn.style.display = 'none';  

      if(clientWidth <= 768) {
        burgerBtn.style.display = 'flex';  
      } else {
        burgerBtn.style.display = 'none';
      }

    const playTest = ()=>{

    let numberQuestion = 0; 
    const finalAnswers = [];

    const renderAnswers = function(index){
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
          <label for="${answer.title}" class="d-flex flex-column  justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title}</span>
          </label>
        `;
        formAnswers.appendChild(answerItem);
      })
    };

    const renderQuestions = (indexQuestion)=>{
      formAnswers.innerHTML = '';

      if(numberQuestion >= 0 && numberQuestion <= questions.length - 1){
        questionTitle.textContent = `${questions[indexQuestion].question}`;
        renderAnswers(indexQuestion);
        sendButton.classList.add('d-none');
        nextButton.classList.remove('d-none');
        prevButton.classList.remove('d-none');
      }
      if(numberQuestion === questions.length){
        formAnswers.textContent = 'Спасибо.'
        nextButton.classList.add('d-none');
        prevButton.classList.add('d-none');
        sendButton.classList.remove('d-none');

        formAnswers.innerHTML = `
        <div class="form-group">
          <label for="numberPhone">Enter your phone</label>
          <input type="number" class="form-control" id="numberPhone">
        </div>
        `;
      } else if (numberQuestion <= 0){
        prevButton.classList.add('d-none');
      } else if (numberQuestion === questions.length + 1){
        formAnswers.textContent = 'Спасибо за пройденный тест!';
        setTimeout(()=>{
          modalBlock.classList.remove('d-block');
        }, 1000);
      }
    }
    renderQuestions(numberQuestion);

    const checkAnswer = function(){
      const obj = {};
      
      const inputs = [...formAnswers.elements].filter((input) =>input.checked || input.id === 'numberPhone');
      inputs.forEach((input, index) => {
        if(numberQuestion >= 0 && numberQuestion <= questions.length - 1){
          obj[`${index+1}. ${questions[numberQuestion].question}`] = input.value;
        } else if (numberQuestion === questions.length){
          obj['Номер телефона'] = input.value;
        }
      })
      
      finalAnswers.push(obj);
     };

    nextButton.addEventListener('click', ()=>{
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    })

    prevButton.addEventListener('click', ()=>{
      numberQuestion--;
      renderQuestions(numberQuestion);
    })

    sendButton.addEventListener('click', ()=>{
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
      console.log(finalAnswers);
    })
  }

  btnOpenModal.addEventListener('click', ()=>{
    modalBlock.classList.add('d-block');
    interval = requestAnimationFrame(animateModal);
    playTest();
  })

  burgerBtn.addEventListener('click', ()=>{
    burgerBtn.classList.toggle('active');
    modalBlock.classList.add('d-block');
    interval = requestAnimationFrame(animateModal);
    playTest();
  })

  modalWrap.addEventListener('click', function(e){
    let target = e.target;
    if(!target.closest('.modal-dialog')){
      modalBlock.classList.remove('d-block');
      burgerBtn.classList.remove('active');
    }
  })

  window.addEventListener('resize', function(){
    clientWidth = document.documentElement.clientWidth;

    if(clientWidth <= 768) {
      burgerBtn.style.display = 'flex';  
    } else {
      burgerBtn.style.display = 'none';      
    }
  })

  closeModal.addEventListener('click', ()=>{
    modalBlock.classList.remove('d-block');
    burgerBtn.classList.toggle('active');
  })

  let count = -100;
  let interval;

  modalDialog.style.top = count + '%';

  const animateModal = ()=>{
    modalDialog.style.top = count + '%';
    count+=3;
    interval = requestAnimationFrame(animateModal);

    if(count >=0){
      cancelAnimationFrame(interval);
      count = -100;
    }
  };
})