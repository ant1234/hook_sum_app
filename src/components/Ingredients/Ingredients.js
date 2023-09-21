import React, { useEffect, useState } from 'react';
import IngredientForm from './IngredientForm';

import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {

  const [ingredientList, setingredientList] = useState([]);

  useEffect(() => {
      fetch('https://ingredient-2bd0a-default-rtdb.firebaseio.com/ingredients.json')
        .then(response => response.json())
        .then(responseData => {
        const loadedIngredients = [];
        for(const key in responseData) {

          console.log(responseData[key]);

          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        setingredientList(loadedIngredients);
      });
            
  }, []);


  const ingredientListHandler = async (ingredient) => {

    const response = await fetch('https://ingredient-2bd0a-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(ingredient)
    });

    if(response.ok) {
      setingredientList((prevState) => [...prevState, {
        id: Math.random().toString(),
        ...ingredient
      }]);
    }

  };

  const onRemoveHandler = (ingredientId) => {
      setingredientList((prevIngredients) => prevIngredients.filter(ingredient => ingredientId !== ingredient.id));
  };

  return (
    <div className="App">
      <IngredientForm ingredientList={ingredientListHandler}/>

      <IngredientList ingredients={ingredientList} onRemoveItem={onRemoveHandler}/>

      <section>
        <Search />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
