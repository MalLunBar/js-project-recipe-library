
const messageBox = document.getElementById('message')
const filterButtons = document.querySelectorAll('.filter-checkbox')
const sortButtons = document.querySelectorAll('.sort-radio')


const printMessage = (param) => {
  let button = param.id
  console.log(button)
  switch (button) {
    case 'all':
      messageBox.innerHTML = 'Youre hungry for everything!'
      break
    case 'vegan':
      messageBox.innerHTML = 'Wow you really care about the enviroment, nice!'
      break
    case 'vegetarian':
      messageBox.innerHTML = 'Cool bro, you like to eat healthy!'
      break
    case 'glutenfree':
      messageBox.innerHTML = 'So I guess you REALLY know what tummy aches feel like!'
      break
    case 'dairyfree':
      messageBox.innerHTML = 'You must be a cat person!'
      break
    case '15':
      messageBox.innerHTML = 'Oh so youre in a hurry?!'
      break
    case '30':
      messageBox.innerHTML = 'Youre just like everyone else!'
      break
    case '60':
      messageBox.innerHTML = 'Hope youre not too hungry already!'
      break
    case '>60':
      messageBox.innerHTML = 'Wow, you really like to take your time!'
      break
    default:
      messageBox.innerHTML = 'Please make your choice!'
  }
}

sortButtons.forEach((button) => {
  button.addEventListener('click', (event) => {

    printMessage(button)
  })
})

filterButtons.forEach((button) => {
  button.addEventListener('click', (event) => {

    printMessage(button)
  })
})




