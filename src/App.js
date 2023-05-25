import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
function App() {
	return (
		<div>
			<BrowserRouter>
			<Navbar />
				<Switch>
					<Route exact path="/" component={Banner} />
					<Route exact path="/city/:woeid" component={Banner} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
