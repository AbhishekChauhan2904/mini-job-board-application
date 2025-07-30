import JobForm from "../components/JobForm";
import "./AddJob.css"; 

export default function AddJob() {
  return (
    <div className="add-job-container">
      <h1 className="add-job-title">Post a New Job</h1>
      <JobForm />
    </div>
  );
}
