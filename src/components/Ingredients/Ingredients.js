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

const httpReducer = (httpState, action) => {
  switch(action.type) {
    case "SEND":
      return {loading: true, error: null}
    case "RESPONSE":
      return {...httpState, loading: false }
    case "ERROR":
      return {loading: false, error: action.errorData}
    case "CLEAR":
      return {...httpState, error: null}
    default:
      throw new Error('Do not go here!');
  }
};

function Ingredients() {

  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);

  //const [isLoading, setIsLoading] = useState(false);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null})

  const onLoadIngredientHandler = useCallback(filteredIngredients => {
    // setingredientList(filteredIngredients);
    dispatch({type: 'SET', ingredients: filteredIngredients});
  }, []);

  const ingredientListHandler = async (ingredient) => {

    // setIsLoading(true);
    dispatchHttp({type: 'SEND'});

    const response = await fetch('https://ingredient-2bd0a-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(ingredient)
    });

    if(response.ok) {
      // setIsLoading(false);
      dispatchHttp({type: 'RESPONSE'});

      // setingredientList((prevState) => [...prevState, {
      //   id: Math.random().toString(),
      //   ...ingredient
      // }]);
      dispatch({type: 'ADD', ingredients: {id: Math.random().toString(), ...ingredient}});
    }

  };

  const onRemoveHandler = async (ingredientId) => {
    dispatchHttp({type: 'SEND'});

    const response = await fetch(`https://ingredient-2bd0a-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    });

    if(response.ok) {
      dispatchHttp({type: 'RESPONSE'});

      // setingredientList((prevIngredients) => prevIngredients.filter(ingredient => ingredientId !== ingredient.id));
      dispatch({type: 'DELETE', id: ingredientId});

    }

  };

  return (
    <div className="App">
      <IngredientForm ingredientList={ingredientListHandler} loading={httpState.loading}/>

      <IngredientList ingredients={userIngredients} onRemoveItem={onRemoveHandler}/>

      <section>
        <Search onLoadIngredient={onLoadIngredientHandler}/>
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
