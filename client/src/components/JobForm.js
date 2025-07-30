import { useState } from "react";
import axios from "axios";
import './styles.css';

export default function JobForm() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    type: "",
    location: "",
    description: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    const isEmptyField = Object.values(form).some((value) => value.trim() === "");
    if (isEmptyField) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post("https://mini-job-board-application.onrender.com/api/jobs", form)
     setSuccess("Job posted successfully!");
      setForm({
        title: "",
        company: "",
        type: "",
        location: "",
        description: ""
      });
    } catch (err) {
      if (err.response) {
        setError(`Error ${err.response.status}: ${err.response.data.error || "Server error"}`);
      } else if (err.request) {
        setError("No response from server. Is the backend running?");
      } else {
        setError("Request failed: " + err.message);
      }
    }
  };

  return (
    <form
      className="job-form max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
      onSubmit={handleSubmit}
    >


      {["title", "company", "location", "description"].map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="w-full p-2 mb-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
      ))}

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded-md focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Job Type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
      </select>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Post Job
      </button>

      {error && <p className="mt-2 text-red-500">{error}</p>}
      {success && <p className="mt-2 text-green-600">{success}</p>}
    </form>
  );
}
