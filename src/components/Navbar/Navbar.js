import React from 'react';
import SearchResults from '../SearchResults/SearchResults';
import Wservice from '../../Services/WeatherService';
import './Navbar.css';
import { useState, useRef } from 'react';
import Loader from '../Loader/Loader';

const Navbar = () => {
	const [searchText, setSearchText] = useState('');
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const searchInProgress = useRef(false);
	const showList = useRef();
	//const [searchInProgress, setsearchInProgress] = useState(false);

	// se dispara la búsqueda
	const handleChange = (e) => {
		setSearchText(e.target.value);
		if (searchText.length >= 3) {
			if(!searchInProgress.current){
				searchInProgress.current = true;
			}else{
				searchInProgress.current = false;
			}
			searchTimeOut();
		}
	}

	const searchTimeOut = () => {
		setTimeout(() => {
			if(searchInProgress.current){
				search();				
			}else searchInProgress.current = true;
		}, 2000)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
	}

	const search = () => {
		if (!loading) {
			setLoading(true);
			Wservice.search(searchText)
				.then((res) => {
					setResults(res.data);
					setLoading(false);
					searchInProgress.current = false;
					console.log(res.data);
					setTimeout(() => {
						showList.current.click()
					}, 3000);
				})
				.catch((e) => {
					console.log(e);
					searchInProgress.current = false;
					setLoading(false);
				});
		}
	}
	
	return (
		<nav className="navbar justify-content-between">
			<section className='navbar-content row'>
				<div className='col-4 logo'>Webather</div>
				<div className='col-8'>
					<form className="form-inline" onSubmit={handleSubmit}>
						<input
							className="form-control "
							name="searchText"
							placeholder="Search"
							aria-label="Search"
							onChange={handleChange}
							autoComplete='off'
							disabled={loading}
							list='autocomplete-list'
							ref={showList}
						/>
						<button className="btn" type="submit">
							<i className="fa fa-search" aria-hidden="true"></i>
						</button>
						{loading && <Loader />}
						{/* {results.length > 0 && <SearchResults results={results} setResults={setResults} />} */}
						<datalist id="autocomplete-list">
							{results.map((r) => (
							<option key={1} value={r.name} />
							))}
						</datalist>
					</form>
				</div>
			</section>
		</nav>
	);
};

export default Navbar;