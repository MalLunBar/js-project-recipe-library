
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
    <p><strong>Diet: </strong> ${recipe.diets}</p>
    <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
    </div>
    <p><strong>Ingredients</strong> ${renderIngredients(recipe.ingredients)}</p>
    </article>`
  })
}


//Takes in a value that is that we get from the eventlisteners on the buttons



// Handles the button logic, which one should be checked depending on what else is checked
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

let activeFilters = []
let workingArray = [...recipes]

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    buttonMagic(button.id)

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
  })
})









const sortAscending = (array) => {
  array.forEach((item) => {

  })
  console.log("ascending klickad")
  //gör en kopia på working arrayen ['vegan', 'vegetarian' osv] 
  // for each item i arrayen 
  // skapa variabel för 
  // om objeket.diets === 'vegan' {sort på objektet }

}

const sortDecending = () => {
  
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
        sortDecending(recipes)
        
      } else {
        sortDecending(workingArray)
        
      }


    }

  })
})







// 4. function with ternery operator that checks sorts through the recipes based on the sort-buttons

//function med evenlistener på knapparna
//om man clickar på ascending kör sortArray(knappens id)?



// VIKTIGT - borde använda mig av en array av object alltid istället för id/diets?


