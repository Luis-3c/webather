import React from 'react';
import Wicon from '../Wicon/Wicon';
import './CityCard.css';

const CityCard = (props) => {

	function truncate(n) {
		return n.toString().substring(0, 2);
	}

	return (
		<div className="card cityCard">
			<div className="card-body">
				<div className="row title"
                style={{textAlign: 'center'}}>
					<div className="col-sm-12">
						<div className="card-title"><h6>{props.city}</h6></div>
					</div>
				</div>
				<div className="row cont">
					<div className="col-sm-8" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0'
                    }}>
						<Wicon width="60%" height="60%" url={`https://www.metaweather.com/static/img/weather/${props.wicon}.svg`}></Wicon>
                    </div>
					<div className="col-sm-4" style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        padding: 0
                    }}><h1>{truncate(props.temp)}°</h1></div>
				</div>
			</div>
		</div>
	);
};

export default CityCard;
