
const messageBox = document.getElementById('message')
const filterButtons = document.querySelectorAll('.filter-checkbox')
const sortButtons = document.querySelectorAll('.sort-radio')
let activeFilters = []
let workingArray = [...recipes]


//Test
const allCheckbox = document.getElementById('all');


// Function that renders through the ingredients array and creates a listelement for every ingredient for better readability
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
    <p><strong>Diet: </strong> ${recipe.diets.join(" ")}</p>
    <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
    </div>
    <p><strong>Ingredients</strong> ${renderIngredients(recipe.ingredients)}</p>
    </article>`
  })
}



// Handles the button logic, which one should be checked depending on what else is checked
const updateButtons = (id) => {
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


//Eventlistener on classnames to see which one was clikced. Return the id of the clicked button

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    updateButtons(button.id)
    updateFilters(button)
  })
})

const updateFilters = (button) => {
  if (button.id !== 'all') {
    if (button.checked) {
      if (!activeFilters.includes(button.id)) {
        activeFilters.push(button.id)
      }
    } else {
      activeFilters = activeFilters.filter(filter => filter !== button.id)
    }
    //Om det finns nått i activeFilter betyder det att det är nått filter i listan som vi behöver filtrera på 
    if (activeFilters.length > 0) {
      workingArray = recipes.filter(recipe => activeFilters.every(filter => recipe.diets.includes(filter)))
    } else {
      workingArray = [...recipes]
    }
    loadRecipes(workingArray)
  } else {
    //resets everything when "all" is clicked
    activeFilters = []
    loadRecipes(recipes)
  }
}

const sortAscending = (array) => {
  array.sort((a, b) => (
    a.readyInMinutes > b.readyInMinutes ? 1 : b.readyInMinutes > a.readyInMinutes ? -1 : 0
  ))
  loadRecipes(array)
}


const sortDescending = (array) => {
  array.sort((a, b) => (
    b.readyInMinutes > a.readyInMinutes ? 1 : a.readyInMinutes > b.readyInMinutes ? -1 : 0
  ))
  loadRecipes(array)

}


sortButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.id === 'ascending') {
      if (allCheckbox.checked) {
        sortAscending(recipes)

      } else {
        sortAscending(workingArray)

      }
    } else {
      if (allCheckbox.checked) {
        sortDescending(recipes)

      } else {
        sortDescending(workingArray)

      }


    }

  })
})

const randomRecipe = (array) => {

}

//Här börjar allt från att sidan laddas 
loadRecipes(recipes)



// const getRandomBreakfast = () => {
//   // We want to get a random breakfast
//   const randomIndex = Math.floor(Math.random() * breakfasts.length);
//   answer.innerHTML = breakfasts[randomIndex];
// };