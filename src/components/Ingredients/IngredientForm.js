import React, { useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';

const IngredientForm = React.memo(props => {

  const [ingredientThings, setIngredientThings] = useState({title: '', amount: ''});

  const submitHandler = event => {
    event.preventDefault();


    // if(ingredientThings.title !== '' && ingredientThings.amount !== '') {
    //   setIngredientThings({title: event.title.value, amount: event.amount.value});
    // }

    // ...
    props.ingredientList({title: ingredientThings.title, amount: ingredientThings.amount});

    console.log(ingredientThings);
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={ingredientThings.title} 
                                          onChange={event => { 
                                                                  const titleVal = event.target.value;
                                                                  setIngredientThings(
                                                                    prevState => ({title: titleVal, 
                                                                                   amount: prevState.amount
                                                                                   }))}}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" onChange={event => { 
                                                                  const amountVal = event.target.value;
                                                                  setIngredientThings(prevState => ({title: prevState.title, amount: amountVal}))}}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
