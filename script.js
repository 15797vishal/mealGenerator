// Add your Edamam API credentials here
const appId = '70d213c1';
const appKey = '5643ea1ffd013bd3bef8e1be4f9a7e2c';

// Function to fetch recipes from Edamam API
async function fetchRecipes(query) {
    const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.hits; // Assuming you want an array of recipe hits
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

// Function to generate a meal plan based on user inputs
async function generateMealPlan() {
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const activityLevel = document.getElementById('activity-level').value;
    const numMeals = document.getElementById('meals').value;
    const dietPreference = document.getElementById('diet-preference').value;

    // You can customize this based on your specific requirements
    const breakfastRecipes = await fetchRecipes(`${dietPreference} breakfast`);
    const lunchRecipes = await fetchRecipes(`${dietPreference} lunch`);
    const dinnerRecipes = await fetchRecipes(`${dietPreference} dinner`);

    // Combine the recipes into a meal plan
    const mealPlan = {
        breakfast: getRandomRecipe(breakfastRecipes),
        lunch: getRandomRecipe(lunchRecipes),
        dinner: getRandomRecipe(dinnerRecipes),
    };

    // Display the meal plan on the page
    displayMealPlan(mealPlan);
}

// Function to get a random recipe from the list
function getRandomRecipe(recipes) {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    return recipes[randomIndex].recipe;
}

// Function to display the meal plan on the page
function displayMealPlan(mealPlan) {
    const mealPlanContainer = document.getElementById('meal-plan');
    
    for (const [meal, recipe] of Object.entries(mealPlan)) {
        const mealDiv = document.createElement('div');
        mealDiv.innerHTML = `
            <h2>${meal.toUpperCase()}</h2>
            <h3>${recipe.label}</h3>
            <p>${recipe.url}</p>
            <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient.text}</li>`).join('')}</ul>
        `;
        mealPlanContainer.appendChild(mealDiv);
    }
}
