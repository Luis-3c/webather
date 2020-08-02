import React from 'react';
import Wicon from '../Wicon/Wicon';
import moment from 'moment';
import Truncate from '../../hooks/useTruncate';

const NextDays = (props) => {
	return (
		<div className="row nextDays mt-2" style={{ textAlign: 'center' }}>
			<div className="col-sm-4">{moment(props.data.applicable_date).format('dddd')}</div>
			<div className="col-sm-4">
				<Wicon
					width="6vh"
					height="6vh"
					url={`https://www.metaweather.com/static/img/weather/${props.data.weather_state_abbr}.svg`}
				/>
			</div>
			<div className="col-sm-2">{Truncate(props.data.max_temp)}°</div>
			<div className="col-sm-1">{Truncate(props.data.min_temp)}°</div>
		</div>
	);
};

export default NextDays;
