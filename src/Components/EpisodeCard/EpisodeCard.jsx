import React, { useEffect, useState } from "react";
import Container from "../../Utils/Container/Container";
import { instance } from "../../Api/instance";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import "./EpisodeCard.scss";

const EpisodeCard = () => {
  const [getData, setGetData] = useState([]);
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState([]);

  const api = "https://rickandmortyapi.com/api/episode";

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      setGetData(data.results);

      let a = await Promise.all(
        data.results[0].characters.map(async (item) => {
          const res = await fetch(item);
          return await res.json();
        })
      );
      setResults(a);
    })();
  }, [api]);

  const handleFilter = (e) => {
    instance.get(`/episode/?name=${e.target.value}`).then((res) => {
      setFilter(res.data.results);
    });
  };
  console.log(filter);

  return (
    <section>
      <Container>
        <div className="episode__filter">
          <h2 className="episode__f-title">Pick Episode</h2>
          <div className="episode__f-box">
            <select className="episode__f-select" onChange={handleFilter}>
              <option className="episode__f-option">Choose...</option>
              <option className="episode__f-option">Pilot</option>
              {filter.map((item) => {
                return <option value={item.name}>{item.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="episode">
          {/* {getData.map((item) => {
            return (
              <div className="episode__titles" key={item.id}>
                <h1 className="episode__title">
                  Location:
                  <span className="episode__span"> {item.name}</span>
                </h1>
                <h3 className="episode__date">
                  Air Date:
                  <span className="episode__span"> {item.air_date}</span>
                </h3>
              </div>
            );
          })} */}
          <div className="episode__titles">
            <h1 className="episode__title">
              Location:
              <span className="episode__span"> Pilot </span>
            </h1>
            <h3 className="episode__date">
              Air Date:
              <span className="episode__span"> December 2, 2013 </span>
            </h3>
          </div>
          <div className="episode__wrap">
            {results.map((item) => {
              return (
                <div className="episode__card" key={item.id}>
                  <img className="episode__img" src={item.image} alt="Image" />
                  <div className="episode__texts">
                    <h2 className="episode__name">{item.name}</h2>
                    <div className="episode__box">
                      <span className="episode__text">Gender:</span>
                      <strong className="episode__gender">{item.gender}</strong>
                    </div>
                    <div className="episode__box">
                      <span className="episode__text">Status:</span>
                      <button className="episode__status">{item.status}</button>
                    </div>
                    <div className="episode__box">
                      <span className="episode__text">Location:</span>
                      <small className="episode__loc-name">
                        {item.location.name}
                      </small>
                    </div>
                    <div className="episode__btns">
                      <button className="episode__more-btn">
                        <Link to={`/singlecard/${item.id}`}>More</Link>
                      </button>
                      <button className="episode__like-btn">
                        <FiHeart />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default EpisodeCard;
