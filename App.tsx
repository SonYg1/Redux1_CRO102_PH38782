import { Provider } from 'react-redux';
import { store } from './app/store';
import ExpenseListScreen from './screens/ExpenseListScreen';

const App = () => (
  <Provider store={store}>
    <ExpenseListScreen />
  </Provider>
);

export default App;
