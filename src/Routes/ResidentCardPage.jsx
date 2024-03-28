import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./ResidentCardPage.css";
import { useParams } from "react-router-dom";
import { getArrayRange } from "../helpers/helpers";

function ResidentCardPage() {
  const { residents, maxCardsPerPage, pageNum } = useOutletContext();
  const [residentCards, setResidentCards] = useState(null);

  useEffect(() => {
    residents && getResidentCards();
    console.log(pageNum);
  }, [pageNum]);

  const getResidentCards = () => {
    let currentResidentCardIndices = [];
    for (let i = 0; i < maxCardsPerPage; i++) {
      currentResidentCardIndices.push(i + maxCardsPerPage * (pageNum - 1));
    }
    let resCardsTemp = currentResidentCardIndices.map((cardIndex, index) => {
      if (cardIndex <= residents.length - 1) {
        return (
          <div className="resident-card" key={residents[cardIndex].id}>
            <div className="resident-img-container">
              <img className="resident-img" src={residents[cardIndex].image} />
            </div>
            <div className="resident-stats">
              <h4>{residents[cardIndex].name}</h4>
              <h5>{residents[cardIndex].status}</h5>
              <h5>Species: {residents[cardIndex].species}</h5>
              <h5>Type: {residents[cardIndex].type}</h5>
            </div>
          </div>
        );
      }
    });

    setResidentCards(resCardsTemp);
  };

  return (
    <>
      {residentCards ? (
        <div className="resident-cards">{residentCards}</div>
      ) : (
        <h4 className="no-residents-cards">
          Huh... No one's here... Let's get outta here...
        </h4>
      )}{" "}
    </>
  );
}

export default ResidentCardPage;
