import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const SearchResults = (props) => {

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    console.log("You clicked outside of me!");
                    props.setResults([]);
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
	return (
		<div className="searchResults">
			<div className="results" ref={wrapperRef}>
                {props.results.map((r)=>{
                    return(
                    <Link to={`/city/${r.woeid}`} key={r.title} style={{
                        textDecoration: 'none'
                    }}>
                        <p onClick={()=>props.setResults([])}>{r.title}</p>
                    </Link>
                    );
                })}
            </div>
		</div>
	);
};

export default SearchResults;
