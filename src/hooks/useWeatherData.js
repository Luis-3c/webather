import {useState, useEffect} from 'react';
import Wservice from '../Services/WeatherService';

//Hook para obetener la data de la ciudad seleccionada y agregarla a la lista
export default function useCityData(woeid, searchesList, setSearchesList){ 
    const [ data, setData ] = useState([]);

    useEffect(
		() => {
			Wservice.getCityData(woeid)
				.then((res) => {
					setData([ res.data ]);
					if (searchesList.length === 4) searchesList.splice(0, 1);
					setSearchesList([...searchesList, res.data])
				})
				.catch((e) => {
					console.log(e);
				});
		},
		[ woeid ]
    );
    
    return data;
}