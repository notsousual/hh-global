import React, { useState, useCallback } from "react";
import "./App.scss";
import { Toggle } from "./components/Toggle";
import { mockJobs } from "./helpers/mockJobs";
import { generateUniqueId } from "./helpers/utilities";
import { Job } from "./components/Job";

const App = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [newJob, setNewJob] = useState({
    name: "",
    extraMargin: false,
    items: [],
  });

  const filteredJobs = jobs.filter((job) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      job.name.toLowerCase().includes(lowerSearchTerm) ||
      job.items.some((item) =>
        item.name.toLowerCase().includes(lowerSearchTerm)
      )
    );
  });

  const handleJobSubmit = (e) => {
    e.preventDefault();
    setJobs([...jobs, { ...newJob, id: generateUniqueId() }]);
    setNewJob({ name: "", extraMargin: false, items: [] });
  };

  const handleInputChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleDeleteJob = useCallback((jobId) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  }, []);

  const handleDeleteItem = useCallback((jobId, itemId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? { ...job, items: job.items.filter((item) => item.id !== itemId) }
          : job
      )
    );
  }, []);

  return (
    <>
      <div className="add-job">
        <form onSubmit={handleJobSubmit} className="add-job__form">
          <h2 className="add-job__header">Add a new job</h2>
          <input
            type="text"
            placeholder="Job Name"
            value={newJob.name}
            onChange={(e) => setNewJob({ ...newJob, name: e.target.value })}
            required
          />

          <Toggle
            text={"Extra margin"}
            checked={newJob.extraMargin}
            onChange={(e) =>
              setNewJob({ ...newJob, extraMargin: e.target.checked })
            }
          />

          <button type="submit">Add Job</button>
        </form>
        <div className="search">
          <input
            placeholder="Search jobs and products"
            className="search__input"
            value={searchTerm}
            onChange={handleInputChange}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#666666"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </div>
      </div>

      <div className="container">
        {filteredJobs.map((job) => (
          <Job
            key={job.id}
            jobContent={job}
            onDeleteJob={() => handleDeleteJob(job.id)}
            onDeleteItem={(itemId) => handleDeleteItem(job.id, itemId)}
          />
        ))}
      </div>
    </>
  );
};

export default App;
