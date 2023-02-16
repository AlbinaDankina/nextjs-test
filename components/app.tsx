import { Provider } from 'react-redux';
import { store } from '../store/index';
import { Users } from './users';

export const App = () => (
    <Provider store={store}> 
      <Users />
    </Provider>
  )
