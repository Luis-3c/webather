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

	useEffect(() => {
		async function fetchData(){
			setLoading(true);
			let coords = await getPosition();
			coords = coords.coords.latitude + ',' + coords.coords.longitude;
			Wservice.getCityData(woeid == undefined ? coords : woeid)
				.then((res) => {
					console.log('res: ', res.data)
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
		}
		fetchData();
		},
		[woeid, setSearchesList]
	);

	const getBackground = (city) =>{
		let url = '';
		switch (city) {
			case 'Paris-France':
				url = process.env.PUBLIC_URL + "/img/IMG_20230207_092338.jpg";
				break;
			case 'Brussels-Belgium':
				url = process.env.PUBLIC_URL + "/img/IMG_20230208_190324.jpg";
			default:
				break;
		}
		return {
			backgroundImage: `linear-gradient(rgba(74, 172, 135, 0.747), rgb(31, 117, 71)), url(${url})`
		}
	}

	const getPosition = () => {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject)
		})
	}


	return (
		<div
			className="row"
			style={{
				display: 'flex',
				justifyContent: 'center'
			}}
		>
				{loading ? (
					<div className=" col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 weatherInfo">
						<div className="loader-cont">
							<Loader/>
						</div>
					</div>
				) : (
					data.map((d) => {
						return (
							<div className='col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 weatherContainer'>
							<div className="weatherInfo" style={getBackground(d.location.name + '-' + d.location.country)}>
								<h4>{d.location.name + ', ' + d.location.country}</h4>
								<section className="temp">
									<section className="number">
										{Truncate(d.current.temp_c)}°
									</section>
									<section className="wicon">
										<Wicon
											width="100%"
											height="60%"
											url={d.current.condition.icon}
										/>
									</section>
								</section>
								<div className="row wdesc">
									<div className="col-sm-12">{d.current.condition.text}</div>
								</div>
								<div className="row today mt-3">
									<div className="col-4 col-sm-2">
										max: {Truncate(d.forecast.forecastday[0].day.maxtemp_c)}°
									</div>
									<div className="col-4 col-sm-2">
										min: {Truncate(d.forecast.forecastday[0].day.mintemp_c)}°
									</div>
								</div>
								<div className="row wdetail mt-3 ml-0 mr-0">
									<div className="col-4 borderRight">
										<p>Predictability</p>
										<p>{d.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
									</div>
									<div className="col-4 borderRight">
										<p>Wind</p>
										<p>{Truncate(d.current.wind_kph)} km/h</p>
									</div>
									<div className="col-4">
										<p>Humidity</p>
										<p>{d.current.humidity}%</p>
									</div>
								</div>
								<br />
								{/* <NextDays data={d.consolidated_weather[1]} />
								<NextDays data={d.consolidated_weather[2]} />
								<NextDays data={d.consolidated_weather[3]} />
								<NextDays data={d.consolidated_weather[4]} />
								<NextDays data={d.consolidated_weather[5]} /> */}
							</div>
								<div>
									<p></p>
								</div>
							</div>
						);
					})
				)}
			</div>
	);
};

export default WeatherInfo;
