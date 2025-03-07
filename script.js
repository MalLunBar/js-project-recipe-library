
const messageBox = document.getElementById('message')
const filterButtons = document.querySelectorAll('.filter-checkbox')
const sortButtons = document.querySelectorAll('.sort-radio')
let workingArray = []

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
    <p><strong>Diet: </strong> ${recipe.diets}</p>
    <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
    </div>
    <p><strong>Ingredients</strong> ${renderIngredients(recipe.ingredients)}</p>
    </article>`
  })
}


//Takes in a value that is that we get from the eventlisteners on the buttons
const filterRecipes = (diets) => {
  const filteredArray = recipes.filter(recipe => diets.some(diet => recipe.diets.includes(diet))
  )

  loadRecipes(filteredArray)
  console.log(filteredArray)
}


// Handle added button logic
const buttonMagic = (id) => {
  if (id === 'all') {
    // If "All" is clicked, uncheck all other checkboxes
    filterButtons.forEach(btn => {
      if (btn.id !== 'all') {
        btn.checked = false
      }
    })
  } else {// any other button was clicked
    // Check if any (non-all) boxes are checked
    const anyChecked = Array.from(filterButtons).some(btn => btn.checked && btn.id !== 'all')

    if (anyChecked) {
      allCheckbox.checked = false

    } else { // no filters active, check the "all-box"
      allCheckbox.checked = true
    }
  }
  // Ensure that "All" is checked if nothing else is 
  const anyCheckedNew = Array.from(filterButtons).some(btn => btn.checked)
  if (!anyCheckedNew) {
    allCheckbox.checked = true
  }
}

loadRecipes(recipes)

//Eventlistener on classnames to see which one was clikced. Return the id of the clicked button

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    buttonMagic(button.id)

    if (button.id !== "all") {
      // add checked filter options to list 
      if (button.checked && !workingArray.includes(button.id)) {
        workingArray.push(button.id)
      }
      // remove unchecked options from list
      else if (!button.checked && workingArray.includes(button.id)) {
        workingArray = workingArray.filter((btn) => btn !== button.id)
      }

      if (workingArray.length > 0) {
        const filterActive = true
        filterRecipes(workingArray)
      }
      else {
        loadRecipes(recipes)
      }
    } else {
      // empty selection list when filters are cleared ("All" is clicked)
      workingArray = []
      loadRecipes(recipes)
    }
  })
})



// 4. function with ternery operator that checks sorts through the recipes based on the sort-buttons


//Fråga om hur logiken funkar för att inte låta All-knabben bli unckecked när inget annat är checked. 

