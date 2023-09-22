import React, { useEffect, useState, useCallback } from 'react';
import IngredientForm from './IngredientForm';

import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {

  const [ingredientList, setingredientList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onLoadIngredientHandler = useCallback(filteredIngredients => {
    setingredientList(filteredIngredients);
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
      setingredientList((prevState) => [...prevState, {
        id: Math.random().toString(),
        ...ingredient
      }]);
    }

  };

  const onRemoveHandler = async (ingredientId) => {
    setIsLoading(false);
    const response = await fetch(`https://ingredient-2bd0a-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    });

    if(response.ok) {
      setIsLoading(true);
      setingredientList((prevIngredients) => prevIngredients.filter(ingredient => ingredientId !== ingredient.id));
    }

  };

  return (
    <div className="App">
      <IngredientForm ingredientList={ingredientListHandler} loading={isLoading}/>

      <IngredientList ingredients={ingredientList} onRemoveItem={onRemoveHandler}/>

      <section>
        <Search onLoadIngredient={onLoadIngredientHandler}/>
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
