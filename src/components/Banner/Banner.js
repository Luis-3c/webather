import React, { useState } from 'react';
import CityCard from '../CityCard/CityCard';
import WeatherInfo from '../WeatherInfo/WeatherInfo';
import './Banner.css';

const Banner = (props) => {
	const [ searchesList, setSearchesList ] = useState([]);

	return (
		<div className="banner">
			<div className="recentSearches">
				{/* <div className="row">
					{searchesList.map((l) => {
						return (
							<div className="col-6 col-sm-3" key={l.woeid}>
								<CityCard
									city={l.title}
									temp={l.consolidated_weather[0].the_temp}
									wicon={l.consolidated_weather[0].weather_state_abbr}
								/>
							</div>
						);
					})}
				</div> */}
			</div>
			<WeatherInfo
				woeid={props.match.params.woeid}
				setSearchesList={setSearchesList}
				searchesList={searchesList}
			/>
		</div>
	);
};

export default Banner;
