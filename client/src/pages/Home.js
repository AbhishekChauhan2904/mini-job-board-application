import { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import LoadingSpinner from "../components/LoadingSpinner";
import "./Home.css"; 

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/jobs?search=${search}`)
      .then((res) => setJobs(res.data))
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setJobs([]);
      })
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div className="home-container">
      <h1 className="home-title">Find Your Dream Job</h1>
      <input
        className="search-bar"
        placeholder="🔍 Search jobs by title, company or location..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      {loading ? (
        <LoadingSpinner />
      ) : jobs.length > 0 ? (
        <div className="job-list">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <p className="no-jobs">No jobs found. Try another keyword!</p>
      )}
    </div>
  );
}
