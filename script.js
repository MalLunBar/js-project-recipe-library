
const messageBox = document.getElementById('message')
const filterButtons = document.querySelectorAll('.filter-checkbox')
const sortButtons = document.querySelectorAll('.sort-radio')

//Test
const allCheckbox = document.getElementById('all');


// Function that renders through the ingredients array and creates a list of ingredients
const renderIngredients = (ingredients) => {
  return `<ul>
  ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}</ul>`
}
//Function that creates the recipe cards when the page loads
const recipeContainer = document.getElementById('recipe-container')

const loadRecipes = (array) => {
  recipeContainer.innerHTML = ''
  array.forEach((recipe) => {
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

//Takes in a value that is that we get from the eventlisteners on the buttons
const filterRecipes = (value) => {
  const filteredArray = recipes.filter(recipe =>
    recipe.diets.includes(value))


  loadRecipes(filteredArray)

}


loadRecipes(recipes)

//Eventlistener on classnames to see which one was clikced. Return the id of the clicked button

// Combine the event listeners into one to avoid redundancy
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterRecipes(button.id)
    console.log(button.id)

    if (button.id === 'all') {
      // If "All" is clicked, uncheck all other checkboxes
      filterButtons.forEach(btn => {
        if (btn.id !== 'all') {
          btn.checked = false
        }
      })
    } else {
      // If any other checkbox is clicked, uncheck "All"
      allCheckbox.checked = false

      // Check if no other checkboxes are checked
      const anyChecked = Array.from(filterButtons).some(btn => btn.checked && btn.id !== 'all')

      // If none are checked, check "All" again
      if (!anyChecked) {
        allCheckbox.checked = true
      }
    }
  })
})





// 4. function with ternery operator that checks sorts through the recipes based on the sort-buttons



