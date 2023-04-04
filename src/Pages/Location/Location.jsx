import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import LocationCard from '../../Components/LocationCard/LocationCard';
import SearchLocation from '../../Components/Search/SearchLocation';

const Location = () => {
    return (
        <div>
            <Navbar/>
            <SearchLocation/>
            <LocationCard/>
        </div>
    );
}

export default Location;