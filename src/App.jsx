import React from "react";
import { useGlobalContext } from "./Context/Context";
import Loading from "./Components/Loading/Loading";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Location from "./Pages/Location/Location";
import Episode from "./Pages/Episode/Episode";
import SingleCard from "./Pages/SingleCard/SingleCard";
import SearchCharacterCard from "./Pages/SearchCard/SearchCharacterCard";
import SearchLocationCard from "./Pages/SearchCard/SearchLocationCard";
import SearchEpisodeCard from "./Pages/SearchCard/SearchEpisodeCard";
import "./App.scss";

function App() {
  const { loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location" element={<Location />} />
        <Route path="/episode" element={<Episode />} />
        <Route path="/singlecard/:id" element={<SingleCard />} />
        <Route path="/search/:searchname" element={<SearchCharacterCard />} />
        <Route path="/searchloc/:searchname" element={<SearchLocationCard />} />
        <Route
          path="/searchepisode/:searchname"
          element={<SearchEpisodeCard />}
        />
      </Routes>
    </div>
  );
}

export default App;
