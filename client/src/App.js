import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Dashboard } from './features';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/:client" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}