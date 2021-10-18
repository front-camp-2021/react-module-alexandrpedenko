import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory, MemoryHistory } from 'history';
import { render, RenderResult } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { store } from './store';

type RenderWithRouter = (
  renderComponent: () => React.ReactNode,
  route?: string
) => RenderResult & { history: MemoryHistory };

type RenderWithStore = (renderComponent: () => ReactElement) => RenderResult;

declare global {
  namespace NodeJS {
    interface Global {
      renderWithRouter: RenderWithRouter;
      renderWithStore: RenderWithStore;
    }
  }

  namespace globalThis {
    const renderWithRouter: RenderWithRouter;
    const renderWithStore: RenderWithStore;
  }
}

global.renderWithStore = (renderComponent) => {
  return {
    ...render(<Provider store={store}>{renderComponent()}</Provider>),
  };
};

global.renderWithRouter = (renderComponent, route) => {
  const history = createMemoryHistory();
  if (route) {
    history.push(route);
  }
  return {
    ...render(<Router history={history}>{renderComponent()}</Router>),
    history,
  };
};
