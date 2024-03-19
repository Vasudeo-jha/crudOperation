import React, { useEffect, useState } from "react";
import Table from "./Table";

const Form = () => {
  const [updateData, setUpdateData] = useState(null);
  const [id, setId] = useState(null);
  function updatesData(id, data) {
    const singleData = data.find((item) => {
      return item._id == id;
    });
    setId(id);
    setUpdateData(singleData);
  }

  console.log(updateData);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    age: "",
  });
  useEffect(() => {
    if (updateData) {
      setFormData(updateData);
    }
  }, [updateData]);
  console.log(formData);
  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    email: "",
    age: "",
  });

  const validation = (name, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errorMessage = "";
    if (value === "") {
      errorMessage = `${name} is required`;
    } else if (name === "email" && !emailRegex.test(value)) {
      errorMessage = "invalid email format";
    } else if (name === "contact" && value.length !== 10) {
      errorMessage = "invalid mobile number";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    validation(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") {
        validation(key, "");
        isValid = false;
      }
    });

    if (isValid && id) {
      fetch(`http://localhost:5000/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        })
        .catch((error) => {
          console.error(
            "There was a problem with the update operation:",
            error
          );
        });

      // updateData(singleData);
    } else if (isValid) {
      fetch("http://localhost:5000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Created product:", data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
      setFormData({
        name: "",
        contact: "",
        email: "",
        age: "",
      });
    }
  };

  return (
    <div className=" w-screen px-2 md:px-20" id="contact">
      <p className="text-center font-semibold py-4 text-[32px] md:text-[40px] text-[#0370FF]">
        Form
      </p>

      <div className="grid xl:grid-cols-2 gap-4 xl:gap-10 mt-8  px-8 pb-8 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <span className="text-[#0370FF] text-[18px] font-semibold">
              Name<span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your name"
              className={`w-full px-2 py-3 rounded-md ${
                errors.name
                  ? "outline-red-600 border-2 border-red-600"
                  : "outline-[#0370FF]"
              }`}
              onChange={onchangeHandler}
            />
            {errors.name && (
              <span className="text-red-500 text-[12px]">{errors.name}</span>
            )}
          </div>
          <div>
            <span className="text-[#0370FF] text-[18px] font-semibold">
              Email ID<span className="text-red-500">*</span>
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              className={`w-full px-2 py-3 rounded-md ${
                errors.email
                  ? "outline-red-600 border-2 border-red-600"
                  : "outline-[#0370FF]"
              }`}
              onChange={onchangeHandler}
            />
            {errors.email && (
              <span className="text-red-500 text-[12px]">{errors.email}</span>
            )}
          </div>

          <div>
            <span className="text-[#0370FF] text-[18px] font-semibold">
              Contact No<span className="text-red-500">*</span>
            </span>
            <input
              type="number"
              name="contact"
              value={formData.contact}
              placeholder="Enter your phone number"
              className={`w-full px-2 py-3 rounded-md ${
                errors.contact
                  ? "outline-red-600 border-2 border-red-600"
                  : "outline-[#0370FF]"
              }`}
              onChange={onchangeHandler}
            />
            {errors.contact && (
              <span className="text-red-500 text-[12px]">{errors.contact}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="age"
              className="text-[#0370FF] text-[18px] font-semibold "
            >
              Age<span className="text-red-500">*</span>
            </label>
            <input
              name="age"
              value={formData.age}
              className={`w-full px-3 py-2 border-2 rounded-md ${
                errors.age
                  ? "outline-red-600 border-2 border-red-600"
                  : "outline-[#0370FF]"
              }`}
              placeholder="Enter your age"
              onChange={onchangeHandler}
            />
            {errors.age && (
              <p className="text-red-500 text-[12px]">{errors.age}</p>
            )}
          </div>

          <button
            className="text-white bg-[#0370FF] text-[20px] sm:text-[24px] font-semibold your-button inline w-[50%] px-2 py-3 cursor-pointer rounded-md"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div>
          <Table updateOneData={updatesData} />
        </div>
      </div>
    </div>
  );
};

export default Form;
