"use client";
import React from "react";

function SparkasseLoginRegistrationForms({ handleLogin, handleRegister }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-[400px] mb-4"
      >
        <h2 className="mb-4 text-lg font-bold text-center text-[#FF0000] font-roboto">
          Sparkasse Login
        </h2>
        <input
          type="text"
          name="username"
          placeholder="Benutzername"
          className="mb-4 p-2 w-full border rounded font-roboto"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Passwort"
          className="mb-4 p-2 w-full border rounded font-roboto"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#FF0000] text-white p-2 rounded font-roboto"
        >
          Einloggen
        </button>
      </form>
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-[400px]"
      >
        <h2 className="mb-4 text-lg font-bold text-center text-[#FF0000] font-roboto">
          Sparkasse Registrierung
        </h2>
        <input
          type="text"
          name="username"
          placeholder="Benutzername"
          className="mb-4 p-2 w-full border rounded font-roboto"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Passwort"
          className="mb-4 p-2 w-full border rounded font-roboto"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#FF0000] text-white p-2 rounded font-roboto"
        >
          Registrieren
        </button>
      </form>
    </div>
  );
}

function SparkasseLoginRegistrationFormsStory() {
  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login submitted");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Register submitted");
  };

  return (
    <div>
      <SparkasseLoginRegistrationForms
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />
    </div>
  );
}

export default SparkasseLoginRegistrationForms;