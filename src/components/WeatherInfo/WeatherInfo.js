import React, { useEffect, useState } from 'react';
import './WeatherInfo.css';
import NextDays from '../NextDays/NextDays';
import Wicon from '../Wicon/Wicon';
import Truncate from '../../hooks/useTruncate';
import Wservice from '../../Services/WeatherService';
import Loader from '../Loader/Loader';


const WeatherInfo = ({woeid, setSearchesList}) => {
	const [ data, setData ] = useState([]);
	const [ loading, setLoading] = useState(false);
	
	useEffect(
		() => {
			setLoading(true);
			Wservice.getCityData(woeid)
				.then((res) => {
					setData([ res.data ]);
					setSearchesList(prevData => {
						if(prevData.length === 4 ) prevData.splice(0,1);
						return [...prevData, res.data];
					});
					setLoading(false);
				})
				.catch((e) => {
					console.log(e);
					setLoading(false);
				});
		},
		[woeid, setSearchesList]
	);

	return (
		<div
			className="row"
			style={{
				display: 'flex',
				justifyContent: 'center'
			}}
		>
			<div className=" col-10 col-sm-4 weatherInfo">
				{loading ? (
					<div className="loader-cont">
						<Loader/>
					</div>
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
