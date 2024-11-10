// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux-toolkit/store'; // Import your store
import BikeShop from './BikeShop';


const App = () => {
  return (
    <Provider store={store}>
      <BikeShop />
    </Provider>
  );
};

export default App;