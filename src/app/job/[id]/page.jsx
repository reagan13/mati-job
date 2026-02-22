import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getJobById } from "../../post-job/jobActions";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import styles from "./JobPage.module.css";
import JobSummaryCard from "@/components/ui/JobSummaryCard";

export default async function JobDetailPage({ params }) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.container}>
        <header className={styles.topActions}>
          <Link href="/home" className={styles.backLink}>
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </header>

        <div className={styles.layoutGrid}>
          <div className={styles.mainContent}>
            <section className={styles.heroCard}>
              <div className={styles.companyBranding}>
                <div className={styles.logoInitial}>
                  {job.company?.charAt(0)}
                </div>
                <div className={styles.headerText}>
                  <h1 className={styles.jobTitle}>{job.title}</h1>
                  <p className={styles.companyName}>{job.company}</p>
                  <div className={styles.statusRow}>
                    <span className={styles.date}>
                      <Clock size={14} /> Posted{" "}
                      {new Date(job.posted).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.descriptionCard}>
              <h2 className={styles.sectionTitle}>Role Description</h2>
              <div className={styles.richText}>{job.description}</div>
            </section>
          </div>

          <JobSummaryCard job={job} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
