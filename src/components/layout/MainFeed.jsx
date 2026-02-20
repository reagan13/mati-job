import styles from "./MainFeed.module.css";
import JobCard from "../mainfeed/JobCard";
import FeedHeader from "../mainfeed/FeedHeader";
import { getJobs, getUniqueLocations } from "@/lib/jobFetch";

export default async function MainFeed({ searchParams }) {
  // Safety check: Ensure filters is at least an empty object
  const filters = (await searchParams) || {};

  // Fetch jobs based on current URL filters
  const [jobs, locations] = await Promise.all([
    getJobs(filters),
    getUniqueLocations(),
  ]);

  // Now Object.keys will not fail because filters is guaranteed to be an object
  const hasFilters = Object.keys(filters).length > 0;

  return (
    <section className={styles.feedContainer}>
      <FeedHeader locations={locations} />
      <div className={styles.recommendationCard}>
        <h3 className={styles.recommendationTitle}>
          {hasFilters ? "Filtered Results" : "Latest Job Openings"}
        </h3>
        <div className={styles.jobList}>
          {jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <p className={styles.noResults}>
              No jobs found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
