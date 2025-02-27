
const messageBox = document.getElementById('message')
const filterBtns = document.querySelectorAll('.filter-btn')



const chosenBtn = () => {
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const message = document.createElement('p')

      switch (btn.id) {
        case 'vegan':
          message.textContent = 'Wow you environmentalist you!'
          toggleActive(btn)
          break
        case 'vegetarian':
          message.textContent = 'So you dont eat meat?'
          toggleActive(btn)
          break
        case 'glutenfree':
          message.textContent = 'Bet you know what a REAL tummy ache feels like'
          toggleActive(btn)
          break
        case 'dairyfree':
          message.textContent = 'Oh so you are farting a lot?'
          toggleActive(btn)
          break
        default:
          message.textContent = 'You are a special snowflake'

          break
      }

      messageBox.appendChild(message)


    });
  })
}

const toggleActive = (btn) => {
  const allBtn = document.getElementById('all')

  if (btn.classList.contains('active') && btn.id !== 'all') {
    btn.classList.remove('active')
    allBtn.classList.remove('active')
     
  } else {
    btn.classList.add('active')

  }
}


chosenBtn()


// checkClickedButton()


