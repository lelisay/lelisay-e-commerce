"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background dark:bg-secondary">
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col gap-5 w-full max-w-md p-8 bg-card dark:bg-slate-900 shadow-lg rounded-lg transform transition-all duration-300 hover:scale-105 dark:text-slate-400"
      >
        <h1 className="text-3xl font-bold text-foreground text-center mb-4  dark:text-slate-400">
          Create New User
        </h1>

        <label htmlFor="name" className="text-muted-foreground font-semibold">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          required={true}
          value={formData.name}
          className="p-3 border border-border rounded-md bg-background dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-muted-foreground transition duration-300 ease-in-out"
          placeholder="Enter your full name"
        />

        <label htmlFor="email" className="text-muted-foreground font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          required={true}
          value={formData.email}
          className="p-3 border border-border rounded-md bg-background dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-muted-foreground transition duration-300 ease-in-out"
          placeholder="Enter your email address"
        />

        <label htmlFor="password" className="text-muted-foreground font-semibold">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          required={true}
          value={formData.password}
          className="p-3 border border-border rounded-md bg-background dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-muted-foreground transition duration-300 ease-in-out"
          placeholder="Create a password"
        />

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-primary text-primary-foreground rounded-md hover:bg-opacity-90 hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out dark:bg-slate-400"
        >
          Create User
        </button>
      </form>
      {errorMessage && (
        <p className="mt-4 text-destructive animate-pulse">{errorMessage}</p>
      )}
    </div>
  );
};

export default UserForm;
