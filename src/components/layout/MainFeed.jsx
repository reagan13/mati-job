import styles from "./MainFeed.module.css";
import JobCard from "../mainfeed/JobCard";
import FeedHeader from "../mainfeed/FeedHeader";

const mockJobs = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechNexus Philippines",
    location: "Makati City (Hybrid)",
    type: "Full-time",
    salary: "₱90,000 - ₱140,000",
    posted: "2h ago",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Pulse Agency",
    location: "Remote",
    type: "Contract",
    salary: "₱50,000 - ₱85,000",
    posted: "5h ago",
  },
  {
    id: 3,
    title: "Senior Full Stack Developer",
    company: "TechNexus Philippines",
    location: "Makati City (Hybrid)",
    type: "Full-time",
    salary: "₱90,000 - ₱140,000",
    posted: "2h ago",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Creative Pulse Agency",
    location: "Remote",
    type: "Contract",
    salary: "₱50,000 - ₱85,000",
    posted: "5h ago",
  },
  {
    id: 5,
    title: "Senior Full Stack Developer",
    company: "TechNexus Philippines",
    location: "Makati City (Hybrid)",
    type: "Full-time",
    salary: "₱90,000 - ₱140,000",
    posted: "2h ago",
  },
  {
    id: 6,
    title: "UI/UX Designer",
    company: "Creative Pulse Agency",
    location: "Remote",
    type: "Contract",
    salary: "₱50,000 - ₱85,000",
    posted: "5h ago",
  },
];

export default function MainFeed() {
  return (
    <section className={styles.feedContainer}>
      <FeedHeader />

      <div className={styles.recommendationCard}>
        <h3 className={styles.recommendationTitle}>Recommended for you</h3>
        <div className={styles.jobList}>
          {mockJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
