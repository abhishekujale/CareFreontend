"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Signin = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/Signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Successfully signed in!");
        setErrorMessage(null);

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);

        // Redirect after showing success message
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        setErrorMessage(result.message || "Sign in failed");
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error("Signin error:", error);
      setErrorMessage("Something went wrong. Please try again.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E3F2FD]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#0277BD]">
          Hospital Sign In
        </h2>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-400 rounded">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:ring-[#81D4FA]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:ring-[#81D4FA]"
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-[#0288D1] text-white py-3 rounded-md hover:bg-[#0277BD] transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Don't have an account? */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/Signup")}
              className="text-[#0288D1] font-medium hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
