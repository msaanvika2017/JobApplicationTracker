import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8080/api/applications";

const STATUSES = ["Applied", "Interview", "Selected", "Rejected"];

function App() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    company: "",
    jobRole: "",
    applicationDate: new Date().toISOString().slice(0, 10),
    status: "Applied",
  });

  // Fetch applications from Spring Boot
  async function fetchApplications() {
    try {
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Could not load applications.");
      }

      const data = await response.json();
      setApplications(data);
    } catch {
      setError(
        "Unable to connect to the backend. Check whether Spring Boot is running."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  // Update form values
  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  // Add a new application
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Unable to save application.");
      }

      setForm({
        company: "",
        jobRole: "",
        applicationDate: new Date().toISOString().slice(0, 10),
        status: "Applied",
      });

      await fetchApplications();
    } catch {
      setError("Could not save the application. Please try again.");
    }
  }

  // Change an application's status
  async function updateStatus(application, newStatus) {
    try {
      const response = await fetch(`${API_URL}/${application.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...application,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to update status.");
      }

      await fetchApplications();
    } catch {
      setError("Could not update the application status.");
    }
  }

  // Delete an application
  async function deleteApplication(id) {
    if (!window.confirm("Delete this application?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete application.");
      }

      await fetchApplications();
    } catch {
      setError("Could not delete the application.");
    }
  }

  const filteredApplications =
    filter === "All"
      ? applications
      : applications.filter((app) => app.status === filter);

  const selectedCount = applications.filter(
    (app) => app.status === "Selected"
  ).length;

  const interviewCount = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#">
          <span className="brand-mark">J</span>
          <span>trackr<span className="brand-dot">.</span></span>
        </a>

        <span className="topbar-label">YOUR CAREER, ORGANIZED.</span>

        <div className="live-indicator">
          <span></span> APPLICATION DASHBOARD
        </div>
      </header>

      <main className="dashboard">
        <section className="hero">
          <div>
            <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
            <h1>
              Make your
              <br />
              <span>next move.</span>
            </h1>
            <p className="hero-description">
              Every opportunity deserves a little organization.
              Keep your applications moving forward.
            </p>
          </div>

          <div className="hero-decoration" aria-hidden="true">
            <span className="deco-circle"></span>
            <span className="deco-star">✳</span>
            <span className="deco-number">01—04</span>
          </div>
        </section>

        <section className="stats-grid">
          <article className="stat-card stat-primary">
            <span className="stat-label">TOTAL APPLICATIONS</span>
            <div className="stat-bottom">
              <strong>{applications.length}</strong>
              <span className="stat-icon">↗</span>
            </div>
          </article>

          <article className="stat-card">
            <span className="stat-label">INTERVIEWS</span>
            <div className="stat-bottom">
              <strong>{interviewCount}</strong>
              <span className="mini-symbol">◎</span>
            </div>
          </article>

          <article className="stat-card stat-yellow">
            <span className="stat-label">OFFERS / SELECTED</span>
            <div className="stat-bottom">
              <strong>{selectedCount}</strong>
              <span className="mini-symbol">✳</span>
            </div>
          </article>

          <article className="stat-card">
            <span className="stat-label">REJECTED</span>
            <div className="stat-bottom">
              <strong>{rejectedCount}</strong>
              <span className="mini-symbol">↘</span>
            </div>
          </article>
        </section>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError("")}>Dismiss</button>
          </div>
        )}

        <section className="content-grid">
          <aside className="form-card">
            <div className="section-heading">
              <span className="section-number">01 / ADD</span>
              <span className="heading-star">✳</span>
            </div>

            <h2>New opportunity</h2>
            <p className="muted">
              One small step closer to your dream job.
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="company">Company name</label>
              <input
                id="company"
                name="company"
                placeholder="e.g. Google"
                value={form.company}
                onChange={handleChange}
                required
              />

              <label htmlFor="jobRole">Job role</label>
              <input
                id="jobRole"
                name="jobRole"
                placeholder="e.g. Software Engineer Intern"
                value={form.jobRole}
                onChange={handleChange}
                required
              />

              <label htmlFor="applicationDate">Application date</label>
              <input
                id="applicationDate"
                name="applicationDate"
                type="date"
                value={form.applicationDate}
                onChange={handleChange}
                required
              />

              <label htmlFor="status">Current status</label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <button className="submit-button" type="submit">
                Add application <span>↗</span>
              </button>
            </form>

            <div className="form-note">
              <span>✦</span> Your progress is worth tracking.
            </div>
          </aside>

          <section className="applications-section">
            <div className="applications-heading">
              <div>
                <span className="section-number">02 / YOUR JOURNEY</span>
                <h2>Applications<span className="blue-dot">.</span></h2>
              </div>

              <span className="record-count">
                {applications.length.toString().padStart(2, "0")} RECORDS
              </span>
            </div>

            <div className="filter-bar">
              {["All", ...STATUSES].map((status) => (
                <button
                  key={status}
                  className={`filter-button ${
                    filter === status ? "active" : ""
                  }`}
                  onClick={() => setFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="empty-state">
                <span className="loading-star">✳</span>
                <h3>Loading your journey...</h3>
                <p>Connecting to your applications.</p>
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">↗</span>
                <h3>Your next opportunity starts here.</h3>
                <p>
                  {filter === "All"
                    ? "Add your first application using the form."
                    : `No applications with the status "${filter}" yet.`}
                </p>
              </div>
            ) : (
              <div className="application-list">
                {filteredApplications.map((application, index) => (
                  <article className="application-card" key={application.id}>
                    <div className="company-symbol">
                      {application.company?.charAt(0).toUpperCase()}
                    </div>

                    <div className="application-info">
                      <span className="application-index">
                        APPLICATION {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3>{application.company}</h3>
                      <p>{application.jobRole}</p>
                      <span className="application-date">
                        {application.applicationDate || "Date not provided"}
                      </span>
                    </div>

                    <div className="application-actions">
                      <select
                        aria-label={`Status for ${application.company}`}
                        className={`status-select status-${application.status?.toLowerCase()}`}
                        value={application.status || "Applied"}
                        onChange={(event) =>
                          updateStatus(application, event.target.value)
                        }
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                      <button
                        className="delete-button"
                        title="Delete application"
                        aria-label={`Delete ${application.company}`}
                        onClick={() => deleteApplication(application.id)}
                      >
                        ×
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="list-footer">
              <span>KEEP GOING. YOU'RE GETTING THERE.</span>
              <span>✳</span>
            </div>
          </section>
        </section>

        <footer className="footer">
          <span>TRACKR © 2026</span>
          <span>BUILT FOR THE NEXT BIG THING.</span>
          <span>ONE APPLICATION AT A TIME ↗</span>
        </footer>
      </main>
    </div>
  );
}

export default App;