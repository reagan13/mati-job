import styles from "./MainFeed.module.css";
import SearchFilter from "../sections/SearchFilter";
import { MapPin, Clock, Banknote, Calendar } from "lucide-react";

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
    title: "QA Automation Engineer",
    company: "FinTech Solutions",
    location: "BGC, Taguig",
    type: "Full-time",
    salary: "₱75,000 - ₱110,000",
    posted: "1d ago",
  },
  {
    id: 4,
    title: "Project Manager",
    company: "BuildRight Construction",
    location: "Cebu City",
    type: "Full-time",
    salary: "₱65,000 - ₱95,000",
    posted: "3h ago",
  },
  {
    id: 5,
    title: "Social Media Manager",
    company: "ViralVibe Marketing",
    location: "Remote",
    type: "Freelance",
    salary: "₱30,000 - ₱45,000",
    posted: "6h ago",
  },
  {
    id: 6,
    title: "Backend Engineer (Go/Node)",
    company: "DataStream Systems",
    location: "Ortigas Center",
    type: "Full-time",
    salary: "₱100,000 - ₱160,000",
    posted: "12h ago",
  },
];

export default function MainFeed() {
  return (
    <section className={styles.feedContainer}>
      <div className={styles.searchCard}>
        <h1 className={styles.title}>
          Find your next <span className={styles.highlight}>opportunity.</span>
        </h1>
        <SearchFilter />
      </div>

      <div className={styles.recommendationCard}>
        <h3 className={styles.recommendationTitle}>Recommended for you</h3>
        <div className={styles.jobList}>
          {mockJobs.map((job) => (
            <div key={job.id} className={styles.jobCard}>
              <div className={styles.jobHeader}>
                <div className={styles.logoPlaceholder} />
                <div className={styles.jobInfo}>
                  <h4 className={styles.jobTitleText}>{job.title}</h4>
                  <p className={styles.companyNameText}>{job.company}</p>
                </div>
                <span className={styles.postDate}>{job.posted}</span>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <MapPin size={14} /> {job.location}
                </div>
                <div className={styles.detailItem}>
                  <Clock size={14} /> {job.type}
                </div>
                <div className={styles.detailItem}>
                  <Banknote size={14} /> {job.salary}
                </div>
              </div>

              <div className={styles.cardActions}>
                <button className={styles.applyBtn}>Apply Now</button>
                <button className={styles.saveBtn}>Save Job</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
