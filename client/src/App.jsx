import { 
	BrowserRouter, 
	Route, 
	Switch
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReactDOM from 'react-dom'

import LandingPage from './views/Landing/Landing'
import HomePage from './views/Home/Home'
import CreatePage from './views/Create/Create'
import DetailsPage from './views/Details/Details'
import ErrorPage from './views/Error/Error'


import Loading from './components/Loading/Loading'
import Sidebar from './components/Sidebar/Sidebar'
import Hero from './components/Hero/Hero'
import Footer from './components/Footer/Footer'
import Popup from './components/Popup/Popup'


const AlertServerError = props => {

	const server_error = useSelector(state => state.server_error)

	const handleClick = () => { 
		props.handleClick()
	}

	return ReactDOM.createPortal(
		<>
			{ server_error ? 
				(<div onClick={ handleClick } className="alert-server-error">
					Se ha producido un error en la conexión al servidor, por favor contacta con el equipo de soporte... ehhh? como que no hay equipo de soporte? noooooo!!!!
				</div>) : 
				null},
		</>,
		document.body
	)
}



function App() {

	const page_loading = useSelector(state => state.loading)
	
	
  return (
		<BrowserRouter>
			{ page_loading ? (<Loading />) : null}
			<div className="main-wrapper">
				<Sidebar/>

				<div className="main-content">
					<Hero/>
					<Switch>
						<Route exact path='/' component={ LandingPage } />
						<Route exact path='/home' component={ HomePage } />
						<Route exact path='/create' component={ CreatePage } />
						<Route exact path='/details/:id' component={ DetailsPage } />
						<Route path='*' component={ ErrorPage } />
					</Switch>

					<Footer />
				</div>
			</div>

			<Popup />
			<AlertServerError />
		</BrowserRouter>
  );
}

export default App
