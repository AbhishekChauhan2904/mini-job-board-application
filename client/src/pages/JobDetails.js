import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./JobDetails.css"; 

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 axios
       .get(`https://mini-job-board-application.onrender.com/api/jobs/${id}`)
       .then((res) => {
        setJob(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch job:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-message">Loading...</div>;
  if (!job) return <div className="error-message">Job not found.</div>;

  return (
    <div className="job-details-container">
      <div className="job-details-card">
        <h2 className="job-title">{job.title}</h2>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Type:</strong> {job.type}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <div className="job-description">{job.description}</div>
      </div>
    </div>
  );
}
