// === 📁 client/src/components/JobStatus.jsx ===
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobStatus = ({ jobId }) => {
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      try {
        const { data } = await axios.get(`/api/jobs/${jobId}`);
        setJob(data);
      } catch (err) {
        setError('Failed to fetch job status');
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [jobId]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!job) return <p>Loading job status...</p>;

  const percent = job.total ? Math.floor((job.enriched / job.total) * 100) : 0;

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Job Status</h5>
        <p>Status: <strong>{job.status}</strong></p>
        <p>Progress: <strong>{job.enriched} / {job.total}</strong> ({percent}%)</p>

        <div className="progress mb-3">
          <div
            className="progress-bar"
            style={{ width: `${percent}%` }}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {percent}%
          </div>
        </div>

        {job.status === 'done' && job.downloadLink && (
          <a href={job.downloadLink} className="btn btn-success">
            📅 Download Results
          </a>
        )}
      </div>
    </div>
  );
};

export default JobStatus;
