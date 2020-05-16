document.addEventListener('DOMContentLoaded', function(){
  const btnOpenModal = document.getElementById('btnOpenModal'),
        modalBlock = document.getElementById('modalBlock'),
        closeModal = document.getElementById('closeModal'),
        questionTitle = document.getElementById('question'),
        formAnswers = document.getElementById('formAnswers'),
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

  btnOpenModal.addEventListener('click', ()=>{
    modalBlock.classList.add('d-block');
    playTest();
  })

  closeModal.addEventListener('click', ()=>{
    modalBlock.classList.remove('d-block');
  })

  const playTest = ()=>{
    const renderQuestions = ()=>{
      questionTitle.textContent = 'first question';

      formAnswers.innerHTML = `
      <div class="answers-item d-flex flex-column">
        <input type="radio" id="answerItem1" name="answer" class="d-none">
        <label for="answerItem1" class="d-flex flex-column justify-content-between">
          <img class="answerImg" src="${res[0].img}" alt="burger">
          <span>${res[0].name}</span>
        </label>
      </div>
      `;

    }
    renderQuestions();
  }
})