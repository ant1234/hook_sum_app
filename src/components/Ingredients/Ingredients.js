import React, { useEffect, useState, useCallback, useReducer } from 'react';
import IngredientForm from './IngredientForm';

import Search from './Search';
import IngredientList from './IngredientList';

const ingredientReducer = (currentIngredients, action) => {
  switch(action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [currentIngredients, action.ingredients];
    case "DELETE":
      return currentIngredients.filter(ingredient => ingredient.id !== action.id);
    default: 
      throw new Error("Should not go there!");
  }
};

function Ingredients() {

  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);

  const [isLoading, setIsLoading] = useState(false);

  const onLoadIngredientHandler = useCallback(filteredIngredients => {
    // setingredientList(filteredIngredients);
    dispatch({type: 'SET', ingredients: filteredIngredients});
  }, []);

  const ingredientListHandler = async (ingredient) => {

    setIsLoading(true);

    const response = await fetch('https://ingredient-2bd0a-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(ingredient)
    });

    if(response.ok) {
      setIsLoading(false);
      // setingredientList((prevState) => [...prevState, {
      //   id: Math.random().toString(),
      //   ...ingredient
      // }]);
      dispatch({type: 'ADD', ingredients: {id: Math.random().toString(), ...ingredient}});
    }

  };

  const onRemoveHandler = async (ingredientId) => {
    setIsLoading(true);
    const response = await fetch(`https://ingredient-2bd0a-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    });

    if(response.ok) {
      setIsLoading(false);
      // setingredientList((prevIngredients) => prevIngredients.filter(ingredient => ingredientId !== ingredient.id));
      dispatch({type: 'DELETE', id: ingredientId});

    }

  };

  return (
    <div className="App">
      <IngredientForm ingredientList={ingredientListHandler} loading={isLoading}/>

      <IngredientList ingredients={userIngredients} onRemoveItem={onRemoveHandler}/>

      <section>
        <Search onLoadIngredient={onLoadIngredientHandler}/>
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
