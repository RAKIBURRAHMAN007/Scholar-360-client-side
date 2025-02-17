import React, { useState } from "react";
import { toast } from "react-toastify";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      toast.error(error);
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Mock API request to simulate email submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setEmail("");
    }, 2000);

    if (success) {
      toast.success("Thank you for subscribing");
    }
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  return (
    <div className="w-11/12 mx-auto p-6 mt-12 mb-8 bg-gray-50  shadow-lg ">
      <h2 className="text-3xl font-bold text-[#2c3792] text-center mb-6">
        Subscribe to Our Newsletter
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="p-3 w-80 rounded-md border border-gray-300 mb-4"
          required
        />
        <button
          type="submit"
          className="bg-[#2c3792] text-white px-6 py-2  rounded-lg hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default SubscribeSection;
