import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { instance } from "../../Api/instance";
import Navbar from "../../Components/Navbar/Navbar";
import { FiHeart } from "react-icons/fi";
import "./SearchCard.scss";

const SearchCharacterCard = () => {
  const { searchname } = useParams();
  const [resultSearch, setResultSearch] = useState([]);

  useEffect(() => {
    instance.get(`/character/?name=${searchname}`).then((res) => {
      setResultSearch(res.data.results);
    });
  }, []);

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

export default SearchCharacterCard;
