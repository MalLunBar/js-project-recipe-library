
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
console.log(typeof(recipes[0]))

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
        console.log('typ av workingarray-item ' + typeof (workingArray[0]))
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


const sortAscending = (array) => {
  array.forEach((item) => {
    return console.log("hej")
  })
  console.log("ascending klickad")
  //gör en kopia på working arrayen ['vegan', 'vegetarian' osv] 
  // for each item i arrayen 
  // skapa variabel för 
  // om objeket.diets === 'vegan' {sort på objektet }

}

const sortDecending = () => {
  console.log("decending klickad")
}

sortButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.id === 'ascending') {
      if (allCheckbox.checked) {
        sortAscending(recipes)
        console.log("skriver ut ascending på recipes")
      } else {
        sortAscending(workingArray)
        console.log("skriver ut ascending workingarray")
      }
    } else {
      if (allCheckbox.checked) {
        sortDecending(recipes)
        console.log("skriver ut descending på recipes")
      } else {
        sortDecending(workingArray)
        console.log("skriver ut descending workingarray")
      }


    }

  })
})







// 4. function with ternery operator that checks sorts through the recipes based on the sort-buttons

//function med evenlistener på knapparna
//om man clickar på ascending kör sortArray(knappens id)?



// VIKTIGT - borde använda mig av en array av object alltid istället för id/diets?


