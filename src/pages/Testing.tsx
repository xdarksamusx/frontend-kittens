import React from "react";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useKittenContext } from "../context/KittenContext";

type Kitten = {
  id: number;
  name: string;
  age: number;
  cuteness: string;
  softness: number;
};

const Testing = () => {
  const [data, setData] = useState<Kitten[]>([]);
  const { kittens, setKittens, setSelectedKitten, selectedKitten } =
    useKittenContext();
  const navigate = useNavigate();

  const handleDeleteKitten = (id: number) => {
    fetch(`http://localhost:3000/kittens/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        const updatedKittens = kittens.filter((kitten) => kitten.id !== id);
        setKittens(updatedKittens);
      })

      .catch((err) => {
        console.error("Backend deletion failed:", err);
      });
  };

  useEffect(() => {
    if (kittens.length === 0) {
      fetch(`http://localhost:3000/kittens`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched kittens from backend:", data);
          setKittens(data);
        })
        .catch((err) => {
          console.error("Failed to fetch kittens:", err);
        });
    }
  }, []);

  return (
    <>
      <h1>Testing page</h1>
      <ul>
        {kittens.map((kitty) => (
          <li key={kitty.id}>
            <Link
              to={`/kitten/${kitty.id}`}
              onClick={() => setSelectedKitten(kitty)}
            >
              {kitty.name}
            </Link>
            <button onClick={() => handleDeleteKitten(kitty.id)}>
              Delete{" "}
            </button>{" "}
            <Link to={`/kitten/${kitty.id}/edit`}> Edit </Link>{" "}
          </li>
        ))}
      </ul>
      <Link to="/kitten/create"> Create a kitten </Link>
    </>
  );
};

export default Testing;
