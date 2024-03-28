import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import useDidMountEffect from "../helpers/useDidMountEffect";
import { getArrayRange } from "../helpers/helpers";
import titleImg from "/RickAndMortyTitle.png";

function Root() {
  const [locations, setLocations] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadLocations();
  }, []);

  useDidMountEffect(() => {
    setIsLoaded(true);
  }, [locations]);

  const loadLocations = async () => {
    const locationIds = getArrayRange(1, 126, 1);
    const response = await axios.get(
      `https://rickandmortyapi.com/api/location/${locationIds}`
    );
    const result = await response.data;
    setLocations([...locations, ...result]);
  };

  return (
    <>
      {isLoaded ? (
        <div className="root">
          <h1>
            <img src={titleImg} />
          </h1>
          <div className="main-content">
            <Outlet context={{ locations }} />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Root;
