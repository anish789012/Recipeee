import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

const RecipeModal = ({ show, onClose, onSave, currentRecipe, isEdit }) => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentRecipe) {
      setRecipeName(currentRecipe.name);
      setIngredients(currentRecipe.ingredients);
      setDescription(currentRecipe.description);
    } else {
      setRecipeName("");
      setIngredients("");
      setDescription("");
    }
  }, [currentRecipe]);

  useEffect(() => {
    if (!show) {
      setRecipeName("");
      setIngredients("");
      setDescription("");
      setErrors({});
    }
  }, [show]);

  const validate = () => {
    const newErrors = {};
    if (!recipeName.trim()) newErrors.recipeName = "Recipe name is required";
    if (!ingredients.trim()) newErrors.ingredients = "Ingredients are required";
    if (!description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const newRecipe = {
        ...currentRecipe,
        name: recipeName,
        ingredients,
        description,
      };
      onSave(newRecipe);
      onClose();
    }
  };

  return (
    <div>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={onClose}>
          <Modal.Title id="contained-modal-title-vcenter">
            {isEdit ? "Edit Recipe" : "Add Recipe"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container2">
            <div className="contain3">
              <label htmlFor="name" className="form-label">
                Recipe Name
              </label>
              <input
                type="text"
                id="recipeName"
                className={`form-control ${
                  errors.recipeName ? "is-invalid" : ""
                }`}
                name="name"
                placeholder="Enter the recipe name"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              />
              {errors.recipeName && (
                <div className="invalid-feedback">{errors.recipeName}</div>
              )}
            </div>
            <div className="contain4">
              <div className="inputs">
                <div className="ingredients-recipe">
                  <label htmlFor="ingredients" className="form-label">
                    Ingredients
                  </label>
                  <textarea
                    id="ingredients"
                    className={`form-control ${
                      errors.ingredients ? "is-invalid" : ""
                    }`}
                    name="ingredients"
                    rows="6"
                    placeholder="Enter each ingredient separated by asterisks (e.g., 1 tbsp sugar * 2 tbsp honey)"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                  {errors.ingredients && (
                    <div className="invalid-feedback">{errors.ingredients}</div>
                  )}
                </div>
                <div className="description-recipe">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    name="description"
                    rows="6"
                    placeholder="Enter each step separated by asterisks (e.g., Boil water * Add sugar)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isEdit ? "Edit Recipe" : "Add Recipe"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RecipeModal;
