const filterButtons = document.querySelectorAll('.filter-checkbox')
const sortButtons = document.querySelectorAll('.sort-radio')
const lazyButton = document.getElementById('lazy')
const allCheckbox = document.getElementById('all');
//Arrays to use in the Filter function 
let activeFilters = []
//With dots so recipes array doesn't get modified 
let workingArray = exampleResponse.recipes
console.log(workingArray)
const BASE_URL = "https://api.spoonacular.com/recipes/random"
const API_KEY = "f0139a3417dd49cb861c8c92b5ee8a47"
const URL = `${BASE_URL}/?apiKey=${API_KEY}&number=20`



const fetchData = async () => {
  try {
    const response = await fetch(URL)

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`)
    }

    const data = await response.json()
    console.log('data', data)

    const validRecipes = data.recipes.filter(recipe => {
      return recipe.cuisines.length > 0 && recipe.image && recipe.title
    })

    console.log(validRecipes)

    //render valid recipies in the DOM
    //renderRecipes(validRecipes)

  } catch (error) {
    console.error('error:', error.message)
  }
}

// fetchData()



// Function that renders through the ingredients array and creates a listelement for every ingredient for better readability
const renderIngredients = () {

}

// const renderIngredients = (ingredients) => {
//   return `<ul>
//   ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}</ul>`
// }

//En function som kollar om nått är true


//Function that creates the recipe cards when the page loads
const recipeContainer = document.getElementById('recipe-container')


//Fixa ingridienser 
const loadRecipes = (array) => {
  console.log('loadRecipes kör')
  recipeContainer.innerHTML = ''
  array.forEach((recipe) => {
    recipeContainer.innerHTML += `<article class="recipe-card">
    <img src="${recipe.image}" alt="${recipe.title}">
    <h3>${recipe.title}</h3>
    <div class="border-top-bottom">
    <p><strong>Diet: </strong>${recipe.ana}</p>
    <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
    </div>
    <p><strong>Ingredients</strong></p>
    </article>`
  })
}

//Här börjar allt från att sidan laddas 
loadRecipes(workingArray)

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

/*Update filter:
-Tar in en knapp 
-kollar id
- om id finns lägg till i activfilters array
- om inte, ta bort

*/

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
      workingArray = workingArray.filter(recipe => activeFilters.every(filter => recipe[filter] === true)
      )

    } else {
      workingArray = exampleResponse.recipes
    }
    loadRecipes(workingArray)
  } else {
    //resets everything when "all" is clicked
    activeFilters = []
    loadRecipes(recipes)
  }
}

//Test nya funktioner





//Slut Test nya funktioner


















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

const randomRecipe = () => {
  const randomIndex = Math.floor(Math.random() * workingArray.length)
  workingArray = [workingArray[randomIndex]]
  loadRecipes(workingArray)
  workingArray = exampleResponse.recipes
}



//Eventlistener on classnames to see which one was clikced. Return the id of the clicked button

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    updateButtons(button.id)
    updateFilters(button)
  })
})


sortButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.id === 'ascending') {
      sortAscending(workingArray)
    } else {
      sortDescending(workingArray)
    }
  })
})

lazyButton.addEventListener('click', randomRecipe)


//Saker att ändra!! 
/*
1. Visst behöver jag aldrig skriva ut function(recipes) eftersom workingArray alltid är en kopia när den inte är filtrerad? 
2. ändra namn på allCheckbox och använd den överallt där det behöver*/ 