import styles from "../layout/MainFeed.module.css";
import SearchFilter from "../sections/SearchFilter";

export default function FeedHeader() {
  return (
    <div className={styles.searchCard}>
      <h1 className={styles.title}>
        Find your next <span className={styles.highlight}>opportunity.</span>
      </h1>
      <SearchFilter />
    </div>
  );
}
