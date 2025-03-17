const filterButtons = document.querySelectorAll('.filter-checkbox')
const sortButtons = document.querySelectorAll('.sort-radio')
const lazyButton = document.getElementById('lazy')
const allButton = document.getElementById('all');
//Arrays to use in the Filter function 
let activeFilters = []
//With dots so recipes array doesn't get modified 
let allRecipes = []
let workingArray = []
const BASE_URL = "https://api.spoonacular.com/recipes/random"
const API_KEY = "f0139a3417dd49cb861c8c92b5ee8a47"
const URL = `${BASE_URL}/?apiKey=${API_KEY}&number=50`



const fetchData = async () => {
  try {
    const storedRecipes = localStorage.getItem("recipes")


    if (storedRecipes) {
      console.log("using cached recipes...")
      allRecipes = JSON.parse(storedRecipes)
    } else {
      console.log("Fetching new recipes...")
      const response = await fetch(URL)

      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`)
      }

      const data = await response.json()
      console.log('data', data)

      allRecipes = data.recipes.filter(recipe => {
        return recipe.cuisines.length > 0 && recipe.image && recipe.title
      })

      localStorage.setItem("recipes", JSON.stringify(allRecipes))
    }

    workingArray = [...allRecipes]
    //render valid recipes in the DOM 
    loadRecipes(workingArray)

  } catch (error) {
    console.error('error:', error.message)
    recipeContainer.innerHTML = "<p>Failed to load recipes. Please try again.</p>"
  }
}





// Function that renders through the ingredients array and creates a list-element for every ingredient for better readability

const renderIngredients = (array) => {
  return `<ul>
    ${array
      .map(ingredient => {
        const amount = ingredient.measures?.metric?.amount ? Math.ceil(ingredient.measures.metric.amount) : "?";
        const unit = ingredient.measures?.metric?.unitShort || "";
        return `<li>${amount} ${unit} ${ingredient.name}</li>`;
      })
      .join('')}
  </ul>`;
};

const renderDiets = (recipe) => {
  const dietLabels = [
    { key: "vegetarian", label: "Vegetarian" },
    { key: "vegan", label: "Vegan" },
    { key: "glutenFree", label: "Gluten-Free" },
    { key: "dairyFree", label: "Dairy-Free" },
  ];

  const stringArray = dietLabels
    .filter(({ key }) => recipe[key])  // Keep only the ones that are true
    .map(({ label }) => label);        // Extract their labels

  return stringArray.length ? stringArray.join(", ") : "No special diet";
};



const recipeContainer = document.getElementById('recipe-container')


//Fixa ingridienser 
const loadRecipes = (array) => {
  recipeContainer.innerHTML = ''
  array.forEach((recipe) => {
    recipeContainer.innerHTML += `
    <article class="recipe-card">

    <div class="testcont"><button class="btn"><i class="fa-solid fa-heart"></i></button></div>
    
    <img src="${recipe.image}" alt="${recipe.title}">
    <h3>${recipe.title}</h3>
    <div class="border-top-bottom">
    <p><strong>Diet: </strong> ${renderDiets(recipe)}</p>
    <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
    </div>
    <p><strong>Ingredients: </strong>${renderIngredients(recipe.extendedIngredients)}</p>
    </article>`


  })
}

//Här börjar allt från att sidan laddas 
fetchData()




// Handles the button logic, which one should be checked depending on what else is checked
const updateButtons = (id) => {
  if (id === 'all' || id === 'lazy') {
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
      allButton.checked = false

    } else { // no filters active, check the "all-box"
      allButton.checked = true
    }
  }
  // Ensure that "All" is checked if nothing else is 
  const anyCheckedNew = Array.from(filterButtons).some(btn => btn.checked)
  if (!anyCheckedNew) {
    allButton.checked = true
  }
}


const updateFilters = (button) => {
  if (button.id === 'all') {
    // Reset everything when "all" is clicked
    activeFilters = [];
    workingArray = [...allRecipes];
  } else {
    if (button.checked) {
      if (!activeFilters.includes(button.id)) {
        activeFilters.push(button.id);
      }
    } else {
      activeFilters = activeFilters.filter(filter => filter !== button.id);
    }

    // If there are active filters, apply filtering; otherwise, reset workingArray
    workingArray = activeFilters.length > 0
      ? workingArray.filter(recipe => activeFilters.every(filter => recipe[filter] === true))
      : [...allRecipes];
  }

  loadRecipes(workingArray);
};




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
  workingArray = [...allRecipes]

}



//Eventlistener on classnames to see which one was clikced. Return the id of the clicked button

let heart = document.getElementById("btns")

const toggleHeart = () => {
  if (heart.style.color === "red") {
    heart.style.color = "lightgray"
  } else {
    heart.style.color = "red"
  }
}

heart.addEventListener('click', toggleHeart)

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

lazyButton.addEventListener('click', () => {
  updateButtons(lazyButton.id)
  randomRecipe()
})


