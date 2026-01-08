/* =========================
   RECIPE DATA
========================= */

const recipes = [
  {
    id: 1,
    title: "Creamy Pasta",
    description: "A rich and creamy pasta made with garlic and cheese.",
    image: "assets/images/pasta.png",
    time: "30 mins",
    ingredients: [
      "200g pasta",
      "1 cup fresh cream",
      "2 cloves garlic",
      "1 tbsp butter",
      "Salt to taste"
    ],
    steps: [
      "Boil the pasta in salted water until al dente.",
      "Heat butter in a pan and sauté garlic.",
      "Add cream and simmer for 2–3 minutes.",
      "Mix in cooked pasta and season with salt.",
      "Serve hot with grated cheese."
    ]
  },
  {
    id: 2,
    title: "Veg Sandwich",
    description: "A quick and healthy vegetable sandwich.",
    image: "assets/images/sandwich.png",
    time: "15 mins",
    ingredients: [
      "Bread slices",
      "Tomato",
      "Cucumber",
      "Butter",
      "Salt & pepper"
    ],
    steps: [
      "Slice vegetables thinly.",
      "Butter the bread slices.",
      "Layer vegetables on bread.",
      "Season with salt and pepper.",
      "Serve fresh or toasted."
    ]
  },
  {
    id: 3,
    title: "Pancakes",
    description: "Fluffy homemade pancakes perfect for breakfast.",
    image: "assets/images/pancakes.png",
    time: "20 mins",
    ingredients: [
      "1 cup flour",
      "1 cup milk",
      "1 egg",
      "1 tbsp sugar",
      "1 tsp baking powder"
    ],
    steps: [
      "Mix all ingredients in a bowl.",
      "Heat a pan and lightly grease it.",
      "Pour batter and cook until bubbles form.",
      "Flip and cook until golden.",
      "Serve with syrup."
    ]
  }
];

/* =========================
   DOM ELEMENTS (HOME PAGE)
========================= */

const recipesGrid = document.getElementById("recipes-grid");

/* =========================
   RENDER RECIPES (HOME)
========================= */

function renderRecipes() {
  // Stop if not on home page
  if (!recipesGrid) return;

  recipesGrid.innerHTML = "";

  recipes.forEach((recipe) => {
    const card = document.createElement("article");
    card.classList.add("recipe-card");

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <div class="recipe-info">
        <h2>${recipe.title}</h2>
        <p>${recipe.description}</p>
        <a href="recipe.html?id=${recipe.id}" class="btn">
          View Recipe
        </a>
      </div>
    `;

    recipesGrid.appendChild(card);
  });
}

/* =========================
   DOM ELEMENTS (DETAIL PAGE)
========================= */

const recipeTitle = document.getElementById("recipe-title");
const recipeTime = document.getElementById("recipe-time");
const recipeImg = document.getElementById("recipe-img");
const ingredientsList = document.getElementById("ingredients-list");
const stepsList = document.getElementById("steps-list");

/* =========================
   HELPER FUNCTIONS
========================= */

function getRecipeIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

/* =========================
   LOAD RECIPE DETAILS
========================= */

function loadRecipeDetails() {
  // Stop if not on recipe detail page
  if (!recipeTitle) return;

  const recipeId = getRecipeIdFromURL();

  if (!recipeId) {
    recipeTitle.textContent = "Recipe not found";
    return;
  }

  const recipe = recipes.find(
    (item) => item.id === Number(recipeId)
  );

  if (!recipe) {
    recipeTitle.textContent = "Recipe not found";
    return;
  }

  // Basic info
  recipeTitle.textContent = recipe.title;
  recipeTime.textContent = `⏱ Cooking Time: ${recipe.time}`;
  recipeImg.src = recipe.image;
  recipeImg.alt = recipe.title;

  // Ingredients
  ingredientsList.innerHTML = "";
  recipe.ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });

  // Steps
  stepsList.innerHTML = "";
  recipe.steps.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    stepsList.appendChild(li);
  });
}

/* =========================
   INITIALIZE
========================= */

renderRecipes();
loadRecipeDetails();
