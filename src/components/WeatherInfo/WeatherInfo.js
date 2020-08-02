import React from 'react';
import './WeatherInfo.css';
import NextDays from '../NextDays/NextDays';
import Wicon from '../Wicon/Wicon';
import MYHook from '../../hooks/useWeatherData';
import Truncate from '../../hooks/useTruncate';

const WeatherInfo = (props) => {
	const data = MYHook(props.woeid, props.searchesList, props.setSearchesList);
	//useUpdateList(data);

	/* function useUpdateList(data) {
		useEffect(
			() => {
				console.log(data)
				if(props.searchesList.length > 1){
					if (props.searchesList.length === 4) props.searchesList.splice(0, 1);
					props.setSearchesList(...props.searchesList, data);
					console.log(data);
				}else {
					props.setSearchesList(...props.searchesList, data);
				}
					
			},
			[ data ]
		);
	} */

	return (
		<div
			className="row"
			style={{
				display: 'flex',
				justifyContent: 'center'
			}}
		>
			<div className=" col-10 col-sm-4 weatherInfo">
				{data.length <= 0 ? (
					<p>Loading...</p>
				) : (
					data.map((d) => {
						return (
							<React.Fragment key={d.woeid}>
								<h4>{d.title}</h4>
								<section className="temp">
									<section className="number">
										{Truncate(d.consolidated_weather[0].the_temp)}°
									</section>
									<section className="wicon">
										<Wicon
											width="70%"
											height="60%"
											url={`https://www.metaweather.com/static/img/weather/${d
												.consolidated_weather[0].weather_state_abbr}.svg`}
										/>
									</section>
								</section>
								<div className="row wdesc">
									<div className="col-sm-12">{d.consolidated_weather[0].weather_state_name}</div>
								</div>
								<div className="row today mt-3">
									<div className="col-3 col-sm-3">Today</div>
									<div className="col-2 col-sm-2">
										{Truncate(d.consolidated_weather[0].max_temp)}°
									</div>
									<div className="col-2 col-sm-2">
										{Truncate(d.consolidated_weather[0].min_temp)}°
									</div>
								</div>
								<div className="row wdetail mt-3">
									<div className="col-sm-4 borderRight">
										<p>Predictability</p>
										<p>{d.consolidated_weather[0].predictability} %</p>
									</div>
									<div className="col-sm-4 borderRight">
										<p>Wind</p>
										<p>{Truncate(d.consolidated_weather[0].wind_speed)} km/h</p>
									</div>
									<div className="col-sm-4">
										<p>Humidity</p>
										<p>{d.consolidated_weather[0].humidity} %</p>
									</div>
								</div>
								<br />
								<NextDays data={d.consolidated_weather[1]} />
								<NextDays data={d.consolidated_weather[2]} />
								<NextDays data={d.consolidated_weather[3]} />
								<NextDays data={d.consolidated_weather[4]} />
								<NextDays data={d.consolidated_weather[5]} />
							</React.Fragment>
						);
					})
				)}
			</div>
		</div>
	);
};

export default WeatherInfo;
