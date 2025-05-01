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

const CreateKitten = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [kittenForm, setKittenForm] = useState({
    name: "",
    age: 0,
    softness: 0,
    cuteness: "",
  });

  const { kittens, selectedKitten, setSelectedKitten, setKittens } =
    useKittenContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`http://localhost:3000/kittens`, {
      method: "POST",
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
        return res.json();
      })
      .then((data) => {
        console.log("Kitten created:", data);
        setKittens([...kittens, data]);
        navigate("/test");
      })
      .catch((err) => {
        console.error("error created kittens");
      });
  };

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
            type="number"
            name="softness"
            value={kittenForm.softness}
            onChange={handleChange}
          />
        </label>

        <label>
          {" "}
          Cuteness:
          <input
            type="text"
            name="cuteness"
            value={kittenForm.cuteness}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create Kitten</button>
      </form>
    </>
  );
};

export default CreateKitten;
