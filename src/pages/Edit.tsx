import React from "react";
import { useEffect, useState } from "react";

import { useKittenContext } from "../context/KittenContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type Kitten = {
  id: number;
  name: string;
  age: number;
  softness: number;
  cuteness: string;
};

const Edit = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { kittens, selectedKitten, setSelectedKitten, setKittens } =
    useKittenContext();
  const [loading, setLoading] = useState(true);

  const [kittenForm, setKittenForm] = useState({
    name: "",
    age: 0,
    softness: 0,
    cuteness: "",
  });

  useEffect(() => {
    if (selectedKitten) {
      setKittenForm({
        name: selectedKitten.name,
        age: selectedKitten.age,
        softness: selectedKitten.softness,
        cuteness: selectedKitten.cuteness,
      });
    }
  }, [selectedKitten]);

  useEffect(() => {
    if (!selectedKitten && id) {
      fetch(`http://localhost:3000/kittens/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setSelectedKitten(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("failed to load kitten", err);
        });
    } else {
      setLoading(false);
    }
  }, [id, selectedKitten]);

  if (loading) return <h2>Loading kitten...</h2>;

  if (!selectedKitten) return <h2>Loading kitten...</h2>;

  const { name, age, softness, cuteness } = selectedKitten;

  console.log("selected", selectedKitten);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...kittenForm };

    if (name === "age" || name === "softness") {
      updatedForm[name as "age" | "softness"] = Number(value);
    } else {
      updatedForm[name as "name" | "cuteness"] = value;
    }

    setKittenForm(updatedForm);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`http://localhost:3000/kittens/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        kitten: kittenForm,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update");
        return res.json();
      })
      .then((updatedKitten) => {
        setSelectedKitten(updatedKitten);

        setKittens((prevKittens) => {
          return [
            ...prevKittens.filter((k) => k.id !== updatedKitten.id),
            updatedKitten,
          ];
        });
      })
      .catch((err) => {
        console.error("Backend update failed:", err);
      });
    navigate("/test");
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          {" "}
          Name:
          <input
            type="text"
            name="name"
            value={kittenForm.name}
            onChange={handleChange}
          />
        </label>

        <label>
          {" "}
          Age:
          <input
            type="number"
            name="age"
            value={kittenForm.age}
            onChange={handleChange}
          />
        </label>

        <label>
          {" "}
          Softness:
          <input
            type="text"
            name="softness"
            value={kittenForm.softness}
            onChange={handleChange}
          />
        </label>

        <label>
          {" "}
          Cutness:
          <input
            type="text"
            name="cuteness"
            value={kittenForm.cuteness}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Kitten</button>
      </form>
    </>
  );
};

export default Edit;
