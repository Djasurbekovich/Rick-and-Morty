import React, { useEffect, useState } from "react";
import Container from "../../Utils/Container/Container";
import { instance } from "../../Api/instance";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import "./LocationCard.scss";

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
        <div className="location__filter">
          <h2 className="location__f-title">
            Pick Location
          </h2>
          <select
            className="location__f-select"
            onChange={handleFilter}>
            <option className="location__f-option">Choose...</option>
            <option className="location__f-option">Earth (C-137)</option>
            {filter.map((item) => {
              return <option value={item.name}>{item.name}</option>;
            })}
          </select>
        </div>
        <div className="location">
          {/* {getData.map((item) => {
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
          })} */}
          <div className="location__titles">
            <h1 className="location__title">
              Location:<span className="location__span"> Earth (C-137) </span>
            </h1>
            <h3 className="location__dimension">
              Dimension:
              <span className="location__span"> Dimension C-137 </span>
            </h3>
            <h4 className="location__type">
              Type:<span className="location__span"> Planet </span>
            </h4>
          </div>
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
