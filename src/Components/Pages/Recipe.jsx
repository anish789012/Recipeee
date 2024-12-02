import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import RecipeModal from "./RecipeModal";

const Recipe = () => {
  const [showAddMod, setAddMod] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showRecipeList, setShowRecipeList] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(savedRecipes);
  }, []);

  const handleSaveRecipe = (newRecipe) => {
    let updatedRecipes;
    if (editingRecipe) {
      updatedRecipes = recipes.map((recipe) =>
        recipe.id === editingRecipe.id ? newRecipe : recipe
      );
      setSelectedRecipe(newRecipe);
    } else {
      newRecipe.id = Date.now();
      updatedRecipes = [...recipes, newRecipe];
    }
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setAddMod(false);
    setEditingRecipe(null);
    setShowRecipeList(true);
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setAddMod(true);
  };

  const handleDeleteRecipe = (recipeToDelete) => {
    const updatedRecipes = recipes.filter(
      (recipe) => recipe.id !== recipeToDelete.id
    );
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setSelectedRecipe(null);
  };

  return (
    <div className="container">
      <div className="contain">
        <div className="head">
          <h3>Recipe Lists</h3>
          <div className="button">
            <button onClick={() => setAddMod(true)}>
              <i className="fa-solid fa-plus" />
            </button>
          </div>
        </div>
        <hr />

        {showRecipeList ? (
          <div className="recipe-list">
            {recipes.map((recipe, index) => (
              <div
                key={index}
                className="recipe-item"
                onClick={() => handleSelectRecipe(recipe)}
              >
                <h5>{recipe.name}</h5>
                <hr />
              </div>
            ))}
          </div>
        ) : (
          <div className="addrecipe">
            <img src="/list.png" alt="image" />
            <button onClick={() => setAddMod(true)}>Add Recipe</button>
          </div>
        )}
      </div>

      <div className="contain1">
        {!selectedRecipe ? (
          <div className="burger">
            <img src="/burger1.png" alt="burger" />
            <h4>Select for recipe details!</h4>
          </div>
        ) : (
          <div className="recipe-details">
            <div className="recipe-actions">
              <h4>{selectedRecipe.name}</h4>
              <div className="recipe-editdelete">
                <button
                  className="btn"
                  onClick={() => handleEditRecipe(selectedRecipe)}
                >
                  <i className="fa-solid fa-pen" />
                </button>
                <button
                  className="btn"
                  onClick={() => handleDeleteRecipe(selectedRecipe)}
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
            </div>
            <hr />
            <h5>Ingredients:</h5>
            <p>{selectedRecipe.ingredients}</p>
            <h5>Description:</h5>
            <p>{selectedRecipe.description}</p>
          </div>
        )}
      </div>

      <RecipeModal
        show={showAddMod}
        onClose={() => setAddMod(false)}
        onSave={handleSaveRecipe}
        currentRecipe={editingRecipe}
        isEdit={Boolean(editingRecipe)}
      />
    </div>
  );
};

export default Recipe;
