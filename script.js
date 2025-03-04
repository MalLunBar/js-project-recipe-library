
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


// recipies part --------------------

// Function that renders through the ingredients array and creates a list of ingredients
const renderIngredients = (ingredients) => {
  return `<ul>
  ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}</ul>`
}
//Function that creates the recipe cards when the page loads
const recipeContainer = document.getElementById('recipe-container')

const loadRecipes = () => {
  recipes.forEach((recipe) => {
    recipeContainer.innerHTML += `<article class="recipe-card">
    <img src="${recipe.image}" alt="${recipe.title}">
    <h3>${recipe.title}</h3>
    <div class="border-top-bottom">
    <p><strong>Diet:</strong> ${recipe.diets}</p>
    <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
    </div>
    <p><strong>Ingredients</strong> ${renderIngredients(recipe.ingredients)}</p>
    
    </article>`

  })
}


{/* <article id="recipe-card" class="recipe-card">
<img
  src="images/focaccia.webp"
  alt="Cheat's cheesy Focaccia"
>
<h3>Cheat's cheesy Focaccia</h3>
<div class="border-top-bottom">
  <p><strong>Cuisine:</strong> Italian</p>
  <p><strong>Time:</strong> 40 minutes</p>
</div>
<p><strong>Ingredients</strong></p>
<ul>
  <li>500g pack bread mix</li>
  <li>2 tbsp. olive oil</li>
  <li>25g parmesan, grated</li>
  <li>75g dolcelatte cheese</li>
</ul>
</article> */}
loadRecipes()

// 1. Create a function that creates the recipe cards when the page loads
// 2.
// 3.
// 4.
// 5.
// 6.

