import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { FiHeart } from "react-icons/fi";
import "./SearchCard.scss";

const SearchLocationCard = () => {
  const { searchname } = useParams();
  const [getData, setGetData] = useState([]);
  const [resultSearch, setResultSearch] = useState([]);

  const api = `https://rickandmortyapi.com/api/location/?name=${searchname}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      setGetData(data.results);

      let a = await Promise.all(
        data.results[0].residents.map(async (item) => {
          const res = await fetch(item);
          return await res.json();
        })
      );
      setResultSearch(a);
    })();
  }, [api]);

  return (
    <>
      <Navbar />
      <div className="searchpro">
        {resultSearch.map((cartoon) => (
          <article className="searchpro__item" key={cartoon.id}>
            <Link to={`/singlecard/${cartoon.id}`}>
              <img className="searchpro__img" src={cartoon.image} alt="Image" />
            </Link>
            <div className="searchpro__texts">
              <h3 className="searchpro__name">{cartoon.name}</h3>
              <div className="searchpro__box">
                <span className="searchpro__text">Gender:</span>
                <strong className="searchpro__gender">{cartoon.gender}</strong>
              </div>
              <div className="searchpro__box">
                <span className="searchpro__text">Status:</span>
                <button className="searchpro__status">{cartoon.status}</button>
              </div>
              <div className="searchpro__box">
                <span className="searchpro__text">Location:</span>
                <small className="searchpro__loc">{cartoon.location.name}</small>
              </div>
              <div className="searchpro__btns">
                <button className="searchpro__more-btn">
                  <Link to={`/singlecard/${cartoon.id}`}>More</Link>
                </button>
                <button className="searchpro__like-btn">
                  <FiHeart />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default SearchLocationCard;
