import { Link } from "react-router-dom";
import './styles.css';

export default function JobCard({ job }) {
  return (
    <div className="job-card shadow-lg border rounded-lg p-4 bg-white hover:shadow-xl transition-all">
  <div className="job-card shadow-lg border rounded-lg p-4 bg-white hover:shadow-xl transition-all">
    <img
  src={job.imageUrl || "/default/image.png"}
  alt={job.company || "Company"}
className="job-image"
/>
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-gray-600">
        <strong>{job.company}</strong>
      </p>
      <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
      <Link
        to={`/job/${job._id}`}
        className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        View Details
      </Link>
    </div>
  );
}
