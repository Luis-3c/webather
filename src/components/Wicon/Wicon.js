import React from 'react';

const Wicon = (props) => {
    return (
        <img style={{
            width: `${props.width}`,
            height: `${props.height}`
        }} src={props.url} alt=""/>
    );
};

export default Wicon;