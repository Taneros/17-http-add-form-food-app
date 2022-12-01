import classes from './AvailableMeals.module.css';

import react, {useEffect, useState} from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([
    {
      id: '',
      description: '',
      name: '',
      price: 0,
    },
  ]);

  useEffect(() => {
    // !! Gotcha: don't put async in the useEfffect callback, rather create sync fn inside callback
    const fetchMealsData = async () => {
      try {
        const response = await fetch(
          `https://http-add-form-food-store-default-rtdb.europe-west1.firebasedatabase.app/meals.json`,
        );
        const data = await response.json();

        console.log(`data`, data);

        const fetchMealsData = [];

        for (let [key, val] of Object.entries(data)) {
          const parseData = {id: key};
          for (let [keyInVal, value] of Object.entries(val)) {
            parseData[keyInVal] = value;
          }
          fetchMealsData.push(parseData);
        }
        console.log(`fetchMealsData`, fetchMealsData);

        setMeals(fetchMealsData);
      } catch (error) {
        debugger;
        console.error(error, 'Fetching Data Failed!');
      }
    };

    fetchMealsData();
    return () => {};
  }, []);

  if (!meals.length) return null;

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
