import React, { useEffect, useState } from "react";
import Container from "../../Utils/Container/Container";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import "./LocationCard.scss";
import { instance } from "../../Api/instance";

const LocationCard = () => {
  const [getData, setGetData] = useState([]);
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState([]);

  const api = "https://rickandmortyapi.com/api/location";

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
      setResults(a);
    })();
  }, [api]);

  const handleFilter = (e) => {
    instance.get(`/location/?name=${e.target.value}`).then((res) => {
      setFilter(res.data.results);
    });
  };
  console.log(filter);

  return (
    <section>
      <Container>
        <div className="filter">
          <h2 className="filter__title" style={{ fontSize: "2rem" }}>
            Pick Location
          </h2>
          <select
            className="filter__select"
            onChange={handleFilter}
            style={{
              fontSize: "1.25rem",
              padding: "0.5rem 2.5rem",
              borderRadius: "0.5rem",
            }}>
            <option className="filter__option">Choose...</option>
            {filter.map((item) => {
              return <option value={item.name}>{item.name}</option>;
            })}
          </select>
        </div>
        <div className="location">
          {getData.map((item) => {
            return (
              <div className="location__titles" key={item.id}>
                <h1 className="location__title">
                  Location:<span className="location__span"> {item.name}</span>
                </h1>
                <h3 className="location__dimension">
                  Dimension:
                  <span className="location__span"> {item.dimension}</span>
                </h3>
                <h4 className="location__type">
                  Type:<span className="location__span"> {item.type}</span>
                </h4>
              </div>
            );
          })}
          <div className="location__wrap">
            {results.map((item) => {
              return (
                <div className="location__card" key={item.id}>
                  <img className="location__img" src={item.image} alt="Image" />
                  <div className="location__texts">
                    <h2 className="location__name">{item.name}</h2>
                    <div className="location__box">
                      <span className="location__text">Gender:</span>
                      <strong className="location__gender">
                        {item.gender}
                      </strong>
                    </div>
                    <div className="location__box">
                      <span className="location__text">Status:</span>
                      <button className="location__status">
                        {item.status}
                      </button>
                    </div>
                    <div className="location__box">
                      <span className="location__text">Location: </span>
                      <small className="location__loc-name">
                        {item.location.name}
                      </small>
                    </div>
                    <div className="location__btns">
                      <button className="location__more-btn">
                        <Link to={`/singlecard/${item.id}`}>More</Link>
                      </button>
                      <button className="location__like-btn">
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

export default LocationCard;
