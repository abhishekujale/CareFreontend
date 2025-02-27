"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    role: "patient", // Default to patient
  });

  const [successMessage, setSuccessMessage] = useState(""); // For showing success message

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/Signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);
  
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          role: formData.role
        }));
  
        // Show success message
        setSuccessMessage("Signup successful!");
  
        // Wait for 3 seconds then redirect
        setTimeout(() => {
          setSuccessMessage("");
          router.push('/');
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
        alert('Signup failed: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please try again later.');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E3F2FD] relative">
      {/* Success Message Card */}
      {successMessage && (
        <div className="absolute top-5 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg">
          {successMessage}
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#0277BD]">
          Hospital Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:ring-[#81D4FA]"
            />
          </div>

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

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="1234567890"
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

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:ring-[#81D4FA]"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0288D1] text-white py-3 rounded-md hover:bg-[#0277BD] transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/Signin")}
              className="text-[#0288D1] font-medium hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
