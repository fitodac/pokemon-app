import { 
	BrowserRouter, 
	Route, 
	Switch 
} from 'react-router-dom'
import LandingPage from './views/Landing/Landing'
import HomePage from './views/Home/Home'
import CreatePage from './views/Create/Create'
import DetailsPage from './views/Details/Details'
import ErrorPage from './views/Error/Error'



function App() {
  return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path='/' component={ LandingPage } />
					<Route exact path='/home' component={ HomePage } />
					<Route exact path='/create' component={ CreatePage } />
					<Route exact path='/character/:id' component={ DetailsPage } />
					<Route path='*' component={ ErrorPage } />
				</Switch>
			</div>
		</BrowserRouter>
  );
}

export default App;
