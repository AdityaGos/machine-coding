import logo from './logo.svg';
import './App.css';
import { StarRating } from './components/star-rating/StarRating';
import { use, useState } from 'react';
import TrafficLight from './components/TrafficLight/TrafficLight';

function App() {
  const [rating,setRating] = useState(-1)
  function onChange(rating){
    setRating(rating)
  }
  return (
    <div className="App">
      {/* <StarRating value={rating} numberOfStar={5} onChange={onChange} /> */}
      <TrafficLight />
      {/* <h2>{rating === -1 ? "No rating selected" : `Selected rating: ${rating}`}</h2> */}
    </div>
  );
}

export default App;
