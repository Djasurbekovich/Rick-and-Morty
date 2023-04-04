import React, { useEffect, useState } from "react";
import { instance } from "../../Api/instance";
import Container from "../../Utils/Container/Container";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import "./CartoonCard.scss";

const CartoonCard = () => {
  const [getData, setGetData] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    instance.get("/character").then((res) => {
      setGetData(res.data.results);
    });
  }, []);

  const handleFilter = (e) => {
    instance.get(`/character/?status=${e.target.value}`).then((res) => {
      setFilter(res.data.results);
    });
  };
  console.log(filter);

  return (
    <section>
      <Container>
        <div className="cartoon__filter">
          <h2 className="cartoon__f-title">Filters</h2>
          <div className="cartoon__f-box">
            <select className="cartoon__f-select" onChange={handleFilter}>
              <option className="cartoon__f-option">Filter by Status</option>
              {filter.map((item) => {
                return (
                  <option className="cartoon__f-option" value={item.status}>
                    {item.status}
                  </option>
                );
              })}
              <option className="cartoon__f-option">Alive</option>
              <option className="cartoon__f-option">Dead</option>
              <option className="cartoon__f-option">Unknown</option>
            </select>
            <select className="cartoon__f-select">
              <option className="cartoon__f-option">Filter by Gender</option>
              {filter.map((item) => {
                return (
                  <option className="cartoon__f-option" value={item}>
                    {item}
                  </option>
                );
              })}
              <option className="cartoon__f-option">Male</option>
              <option className="cartoon__f-option">Female</option>
              <option className="cartoon__f-option">Unknown</option>
            </select>
          </div>
        </div>
        <div className="cartoon">
          {getData.map((item) => {
            return (
              <div className="cartoon__card" key={item.id}>
                <img className="cartoon__img" src={item.image} alt="Image" />
                <div className="cartoon__texts">
                  <h3 className="cartoon__name">{item.name}</h3>
                  <div className="cartoon__box">
                    <span className="cartoon__text">Gender:</span>
                    <strong className="cartoon__gender">{item.gender}</strong>
                  </div>
                  <div className="cartoon__box">
                    <span className="cartoon__text">Status:</span>
                    <button className="cartoon__status">{item.status}</button>
                  </div>
                  <div className="cartoon__btns">
                    <button className="cartoon__more-btn">
                      <Link to={`/singlecard/${item.id}`}>More</Link>
                    </button>
                    <button className="cartoon__like-btn">
                      <FiHeart />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default CartoonCard;
