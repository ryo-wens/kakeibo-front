import React from 'react';
import { Router } from 'react-router';
import { render } from '@testing-library/react';
import * as History from 'history';
import App from './App';

const history = History.createBrowserHistory();
test('renders learn react link', () => {
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
