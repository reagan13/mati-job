import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Banknote,
  Phone,
  Briefcase,
  ShieldCheck,
  Share2,
  Facebook,
} from "lucide-react";
import { getJobById } from "../../post-job/jobActions";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import styles from "./JobPage.module.css";
import Button from "@/components/ui/Button";

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

          <aside className={styles.sidebar}>
            <div className={styles.stickyWidget}>
              <h3 className={styles.widgetTitle}>Job Summary</h3>

              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <MapPin size={22} />
                  <div>
                    <label>Location</label>
                    <p>{job.location}</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <Briefcase size={22} />
                  <div>
                    <label>Job Type</label>
                    <p>{job.type}</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <Banknote size={22} />
                  <div>
                    <label>Salary Range</label>
                    <p>{job.salary || "Not Specified"}</p>
                  </div>
                </div>
                {job.contact_number && (
                  <div className={styles.infoItem}>
                    <Phone size={22} />
                    <div>
                      <label>Phone</label>
                      <p>{job.contact_number}</p>
                    </div>
                  </div>
                )}
                {job.facebook_url && (
                  <div className={styles.infoItem}>
                    <Facebook size={22} />
                    <div>
                      <label>Facebook</label>
                      <a
                        href={job.facebook_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Profile
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.actionStack}>
                <Button>Apply for this position</Button>
                {job.facebook_url && (
                  <a
                    href={job.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.fbBtn}
                  >
                    <Facebook size={18} /> Contact on Facebook
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
