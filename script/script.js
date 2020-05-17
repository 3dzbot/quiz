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
        res = [
          {
            img: './image/burger.png',
            name: 'Стандарт'
          },
          {
            img: './image/burgerBlack.png',
            name: 'Черный'
          }  
        ];

        const questions = [
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
      
      // const obj = {}
      
      // const getData = () => {
      //     formAnswers.textContent = 'LOAD';
      
      //     setTimeout(() => {
      //         fetch('http://localhost:81/Quiz__intens/db.json')
      //             .then(res => res.json())
      //             .then(obj => playTest(obj.questions))
      //     }, 2000);
      // }
      
      // const obj = {};
      
      // const inputs = [...formAnswers.elements]
      //     .filter(elem => elem.checked)
      
      // inputs.forEach((elem, index) => {
      //     obj[`${index}_${questions[numberQuestion].question}`] = elem.value;
      // })
      // finalAnswers.push(obj)
      



  btnOpenModal.addEventListener('click', ()=>{
    modalBlock.classList.add('d-block');
    playTest();
  })

  burgerBtn.style.display = 'none';  

  burgerBtn.addEventListener('click', ()=>{
    burgerBtn.classList.toggle('active');
    modalBlock.classList.add('d-block');
    playTest();
  })

  let clientWidth = document.documentElement.clientWidth;

  if(clientWidth <= 768) {
    burgerBtn.style.display = 'flex';  
  } else {
    burgerBtn.style.display = 'none';
  }

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

  const playTest = ()=>{
    let numberQuestion = 0; 

    const renderAnswers = function(index){
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answers-item', 'd-flex', 'flex-column');
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
          <label for="${answer.title}" class="d-flex flex-column  justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title}</span>
          </label>
        `;
        formAnswers.appendChild(answerItem);
        if(numberQuestion <=0){
          prevButton.style.display = 'none';
        } else if (numberQuestion >= questions.length-1){
          nextButton.style.display = 'none';
        } else {
          prevButton.style.display = '';
          nextButton.style.display = '';
        }
      })
    };

    const renderQuestions = (indexQuestion)=>{
      formAnswers.innerHTML = '';
      questionTitle.textContent = `${questions[indexQuestion].question}`;
      renderAnswers(indexQuestion);
    }
    renderQuestions(numberQuestion);

    nextButton.addEventListener('click', ()=>{
      numberQuestion++;
      renderQuestions(numberQuestion);
    })

    prevButton.addEventListener('click', ()=>{
      numberQuestion--;
      renderQuestions(numberQuestion);
    })
  }
})