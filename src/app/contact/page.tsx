"use client";
import React from "react";
import { z } from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { getBaseUrl } from "../../utils/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required").email("Invalid email"),
  message: z.string().nonempty("Message is required"),
});

type ValidationErrors = {
  name?: string[];
  email?: string[];
  message?: string[];
};

const Contact = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setErrors({});

    const validationResult = schema.safeParse({ name, email, message });

    if (!validationResult.success) {
      const fieldErrors: ValidationErrors = {};
      validationResult.error.errors.forEach((error) => {
        if (error.path.length > 0) {
          const fieldName = error.path[0] as keyof ValidationErrors;
          if (!fieldErrors[fieldName]) {
            fieldErrors[fieldName] = [];
          }
          fieldErrors[fieldName]?.push(error.message);
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${getBaseUrl()}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        router.push("/");
      } else {
        toast.error("Error sending message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[600px] h-[100vh] max-h-[700px]  mx-auto p-4 space-y-4">
      <h1 className="text-2xl text-[goldenrod] font-bold">Contact Us</h1>
      <p className="text-gray-500">
        Our team will return your message soon as possible !
      </p>
      <div>
        <label htmlFor="name" className="block text-gray-600 ">
          Name *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-[8px] items-center  text-gray-600 p-2 border border-gray-300 rounded"
        />
        {errors.name?.map((error, index) => (
          <p key={index} className="text-red-500">
            {error}
          </p>
        ))}
      </div>
      <div>
        <label htmlFor="email" className="block   items-center  text-gray-600">
          Email *
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded-[8px] items-center  text-gray-600 border border-gray-300 rounded"
        />
        {errors.email?.map((error, index) => (
          <p key={index} className="text-red-500">
            {error}
          </p>
        ))}
      </div>
      <div>
        <label
          htmlFor="message"
          className="block   items-center  text-gray-600"
        >
          Message *
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 rounded-[8px] items-center  h-full max-h-[200px] min-h-[100px] text-gray-600 border border-gray-300 rounded"
        />
        {errors.message?.map((error, index) => (
          <p key={index} className="text-red-500">
            {error}
          </p>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full p-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </div>
  );
};

export default Contact;
