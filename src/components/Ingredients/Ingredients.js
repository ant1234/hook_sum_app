import React, { useState } from 'react';
import IngredientForm from './IngredientForm';

import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {

  const [ingredientList, setingredientList] = useState([]);

  const ingredientListHandler = ingredient => {
    setingredientList((prevState) => [...prevState, {
      id: Math.random().toString(),
      ...ingredient
    }]);
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
