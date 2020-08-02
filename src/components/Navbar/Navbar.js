import React from 'react';
import SearchResults from '../SearchResults/SearchResults';
import Wservice from '../../Services/WeatherService';
import './Navbar.css';
import { useState } from 'react';
import Loader from '../Loader/Loader';

const Navbar = () => {
	const [ searchText, setSearchText ] = useState('');
	const [ results, setResults ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	// se dispara la búsqueda 
	function handleChange(e) {
		setSearchText(e.target.value);
		if (searchText.length >= 3) {
			setTimeout(() => {
				search();
			}, 2000);
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
	}
	function search() {
		if (!loading) {
			setLoading(true);
			Wservice.search(searchText)
				.then((res) => {
					setResults(res.data);
					setLoading(false);
					console.log(res.data);
				})
				.catch((e) => {
					console.log(e);
					setLoading(false);
				});
		}
	}
	return (
		<nav className="navbar justify-content-between">
			<label className="navbar-brand" style={{
				marginLeft: '17%'
			}}>Webather</label>
			<form className="form-inline ml-auto" onSubmit={handleSubmit} style={{
				marginRight: '15%'
			}}>
				<input
					className="form-control "
					name="searchText"
					type="search"
					placeholder="Search"
					aria-label="Search"
					onChange={handleChange}
				/>
				<button className="btn my-2 my-sm-0 mr-3" type="submit">
                <i className="fa fa-search" aria-hidden="true"></i>
				</button>
				{loading && <Loader />}
                {results.length > 0 && <SearchResults results={results} setResults={setResults} />}
			</form>
		</nav>
	);
};

export default Navbar;
