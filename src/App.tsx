import { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Header, Breadcrumbs } from './shared';
import { AppRouter } from './routes';
import { store } from './store';
import './styles/index.scss';

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='wrapper'>
          <Header />
          <Breadcrumbs />
          <AppRouter />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
