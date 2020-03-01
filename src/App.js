import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ErrorBoundary from 'react-error-boundary';
import Home from './pages/Home';
import ResultView from './pages/ResultView';
import NotFound from './pages/NotFound';
import useDevice from './hooks/useDevice';

const ErrorFallbackComponent = ({ error }) => <div>{error.message}</div>;

function App() {
  useDevice();
  return (
    <ErrorBoundary ErrorFallbackComponent={ErrorFallbackComponent}>
      <BrowserRouter>
        <Switch>
          <Route path="/transport/flights/" component={ResultView} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
