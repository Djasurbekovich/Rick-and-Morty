import React, { useEffect, useState } from "react";
import "./SingleCard.scss";
import { Link, useParams } from "react-router-dom";
import { instance } from "../../Api/instance";
import Navbar from "../../Components/Navbar/Navbar";
import Container from "../../Utils/Container/Container";
import { FiHeart } from "react-icons/fi";

const SingleCard = () => {
  const { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    instance.get(`/character/${id}`).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <div className="single__wrap">
          <img className="single__img" src={data.image} alt="Image" />
          <div className="single__texts">
            <h3 className="single__name">{data.name}</h3>
            <div className="single__box">
              <span className="single__text">Gender:</span>
              <strong className="single__gender">{data.gender}</strong>
            </div>
            <div className="single__box">
              <span className="single__text">Status:</span>
              <button className="single__status">{data.status}</button>
            </div>
            <div className="single__btns">
              <button className="single__back-btn">
                <Link to="/">Back</Link>
              </button>
              <button className="single__like-btn">
                <FiHeart />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleCard;