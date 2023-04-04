import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import CartoonCard from '../../Components/CartoonCard/CartoonCard';
import SearchCharacter from '../../Components/Search/SearchCharacter';

const Home = () => {
    return (
        <div>
            <Navbar/>
            <SearchCharacter/>
            <CartoonCard/>
        </div>
    );
}

export default Home;