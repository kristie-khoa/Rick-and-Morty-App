import React, { useState, useEffect } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TargetLocation.css";
import useToggle from "../helpers/useToggle";
import useDidMountEffect from "../helpers/useDidMountEffect";
import { getArrayRange } from "../helpers/helpers";

function TargetLocation() {
  //all locations, axios.get in Root
  const { locations } = useOutletContext();
  //param , location and pageNum used to render correct location and page
  const { locationId, pageNum } = useParams();
  const [residents, setResidents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const maxCardsPerPage = 5;
  const [numPageButtons, setNumPageButtons] = useState(null);

  const targetLocation = locations[locationId - 1];

  //do not getResidents() if location has no residents
  // getResidents() will update residents' state, else manually setResidents() state, so it will trigger rerender with Residents
  useEffect(() => {
    if (targetLocation.residents.length > 0) {
      getResidents();
    } else {
      setResidents(null);
    }
  }, []);

  //after residents are loaded, and set to state, set IsLoaded to true. Main content will only load if isLoaded === true
  useDidMountEffect(() => {
    setIsLoaded(true);
    if (residents && residents.length > maxCardsPerPage) {
      generatePageButtons();
    }
  }, [residents, pageNum]);

  //will create page Navigation buttons, each routing to the next page results
  const generatePageButtons = () => {
    let numButtons = Math.ceil(residents.length / maxCardsPerPage);
    // let pageButtonsTemp = getArrayRange(1, numButtons, 1).map((num, index) => (
    //   <Link to={`${num}`} key={num}>
    //     <div className={pageNum == num ? "selected" : "not-selected"}>
    //       {index + 1}
    //     </div>
    //   </Link>
    // ));
    // setPageButtons(pageButtonsTemp);
    setNumPageButtons(numButtons);
  };

  //not used to render residents. pass all residents to ResidentCardPage.jsx where they will display cards based on pageNum
  const getResidents = async () => {
    const residentIds = targetLocation.residents.map((residentUrl) => {
      return Number(residentUrl.slice(residentUrl.lastIndexOf("/") + 1));
    });
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${residentIds}`
    );
    setResidents([...[response.data]].flat());
  };

  return (
    <>
      {isLoaded ? (
        <div className="target-location">
          <Link to="/Rick-and-Morty-App/">
            <button className="back-button">Let's go home!</button>
          </Link>
          <h2 className="welcome-title">Welcome to {targetLocation.name}!</h2>
          <div className="location-stats">
            <h3>ID: {targetLocation.id}</h3>
            <h3>Type: {targetLocation.type}</h3>
            <h3>Dimension: {targetLocation.dimension}</h3>
          </div>
          <div className="resident-cards-section">
            <h2>Meet the residents!</h2>
            <Outlet
              context={{ residents, maxCardsPerPage, pageNum }}
              key={pageNum}
            />
          </div>
          <div className="nav-button-container">
            <div className="page-nav-buttons">
              {pageNum > 1 && (
                <Link to={`${Number(pageNum) - 1}`}>
                  <button className="page-prev-button">{`<`}</button>
                </Link>
              )}
              {/* <div className="page-buttons">{pageButtons}</div> */}
              {numPageButtons > 1 && (
                <div className="curr-page">{`pg ${pageNum} of ${numPageButtons}`}</div>
              )}

              {pageNum < numPageButtons && (
                <Link to={`${Number(pageNum) + 1}`}>
                  <button className="page-next-button">{`>`}</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
}

export default TargetLocation;
