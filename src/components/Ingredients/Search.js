import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const IngredientRef =  useRef();

  const { onLoadIngredient } = props;
  const [enteredFilter, setEnteredFilter] = useState('');

  
    useEffect(() => {

      const timer = setTimeout(() => {

        if(enteredFilter === IngredientRef.current.value) {

          const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
          fetch('https://ingredient-2bd0a-default-rtdb.firebaseio.com/ingredients.json' + query)
            .then(response => response.json())
            .then(responseData => {
            const loadedIngredients = [];
            for(const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            
            onLoadIngredient(loadedIngredients);
          });
        }

      }, 500);

      return () => {
        clearTimeout(timer);
      };
            
    }, [enteredFilter, onLoadIngredient, IngredientRef]);
  



  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={IngredientRef} type="text" value={enteredFilter} onChange={event => setEnteredFilter(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
