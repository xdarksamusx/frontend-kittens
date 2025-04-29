import React from "react";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useKittenContext } from "../context/KittenContext";
import { useParams } from "react-router-dom";

const Kitten = () => {
  const { kittens, selectedKitten, setSelectedKitten } = useKittenContext();
  const { name } = useParams();

  console.log("hi");
  console.log(selectedKitten);

  useEffect(() => {
    if (name && kittens.length > 0) {
      const match = kittens.find((k) => k.name === name);
    }
  }, [name, kittens]);

  if (!selectedKitten) return <p>No kitten selected</p>;

  return (
    <>
      <h1>Kitten Info</h1>
      <h2>{selectedKitten.name}</h2>
      <p>Age: {selectedKitten.age}</p>
      <p>Cuteness: {selectedKitten.cuteness}</p>
    </>
  );
};

export default Kitten;
