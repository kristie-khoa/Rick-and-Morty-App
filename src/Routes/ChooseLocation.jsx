import React, { useState, useEffect, useRef } from "react";
import { useOutletContext, Link } from "react-router-dom";
import "./ChooseLocation.css";
import useToggle from "../helpers/useToggle";
import portalImg from "/portalImg.png";

function ChooseLocation() {
  const { locations } = useOutletContext();
  const [showOptions, toggleShowOptions] = useToggle(false);
  let randomId = Math.floor(Math.random() * 126) + 1;
  const [numLocationButtons, setNumLocationButtons] = useState(32);

  const locationButtons = locations.map((location, index) => {
    if (index <= numLocationButtons) {
      return (
        <Link to={`/Rick-and-Morty-App/${location.id}/1`} key={location.id}>
          <button>{location.name}</button>
        </Link>
      );
    }
  });

  return (
    <section className="choose-location-container">
      <h2>What universe would you like to travel to?</h2>
      <div className="selector-buttons-container">
        <button
          className={`button-one ${showOptions && "highlight-button"}`}
          onClick={() => {
            toggleShowOptions();
          }}
        >
          Let me pick!
        </button>
        <Link to={`/Rick-and-Morty-App/${randomId}/1`}>
          <button className="button-one">Surprise me!</button>
        </Link>
      </div>
      {showOptions && (
        <div id="locations-container" className="border-one">
          <div className="location-buttons ">
            {locationButtons}
            {numLocationButtons < 126 && (
              <button
                className="highlight-button"
                onClick={() => {
                  setNumLocationButtons(numLocationButtons + 32);
                }}
              >
                Show More (+)
              </button>
            )}
          </div>
        </div>
      )}

      <img id="portal-img" src={portalImg} />
    </section>
  );
}

export default ChooseLocation;
