import React, { useState } from 'react';
import './Search.scss';
import Container from '../../Utils/Container/Container';
import { Link, useNavigate } from 'react-router-dom';
import { instance } from '../../Api/instance';

const SearchCharacter = () => {

    const [searchName, setSearchName] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearch(e.target.value)
        if(e.target.value.length > 2){
            instance.get(`/character/?name=${e.target.value}`)
                .then((res) => {
                    setSearchName(res.data.results)
                })
        }
        else{
            setSearchName([])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        return navigate(`/search/${search}`)
    }

    return (
        <Container>
            <form className='search' onSubmit={handleSubmit}>
                <h2 className='search__title'>Character</h2>
                <input className='search__input' type="text" placeholder='Search...' onChange={handleSearch} />
                    {
                        searchName.length > 3 ? 
                            <div className='search__suggestions'>
                                {
                                    searchName.map(searchItem => 
                                        <Link to={`/singlecard/${searchItem.id}`} key={searchItem.id} className='search__result-item'>
                                            <p className='search__name'>{searchItem.name}</p>
                                        </Link>)
                                }
                            </div> : <></>
                    }
            </form>
        </Container>
    );
}

export default SearchCharacter;