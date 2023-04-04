import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import EpisodeCard from '../../Components/EpisodeCard/EpisodeCard';
import SearchEpisode from '../../Components/Search/SearchEpisode';

const Episode = () => {
    return (
        <div>
            <Navbar/>
            <SearchEpisode/>
            <EpisodeCard/>
        </div>
    );
}

export default Episode;