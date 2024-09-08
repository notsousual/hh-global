import React, { useState, useMemo, useCallback, useEffect } from "react";
import "./App.scss";
import { Toggle } from "./components/Toggle";
import { mockJobs } from "./helpers/mockJobs";
import { generateUniqueId } from "./helpers/utilities";
import { Job } from "./components/Job";

const App = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [newJob, setNewJob] = useState({
    name: "",
    extraMargin: false,
    items: [],
  });

  useEffect(() => {
    const filtered = jobs.filter((job) =>
      job.name.toLowerCase().includes(searchTerm)
    );
    setFilteredJobs(filtered);
  }, [jobs]);

  const handleJobSubmit = (e) => {
    e.preventDefault();
    setJobs([...jobs, { ...newJob, id: generateUniqueId() }]);
    setNewJob({ name: "", extraMargin: false, items: [] });
  };

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value.toLowerCase().trim(); // Makes search more effective by lower-casing and avoiding excessive filtering by skipping white spaces
      setSearchTerm(value);

      const filteredJobs = jobs.filter(
        (job) =>
          job.name.toLowerCase().trim().includes(value) ||
          job.items.some((item) => item.name.toLowerCase().includes(value))
      );
      setFilteredJobs(filteredJobs);
    },
    [jobs, searchTerm]
  );

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
            value={searchTerm}
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
            onDeleteJob={() => setJobs(jobs.filter((j) => j.id !== job.id))}
          />
        ))}
      </div>
    </>
  );
};

export default App;
