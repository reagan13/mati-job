"use client";
import styles from "./Banner.module.css";

const bannerItems = [
  "Fast Payments",
  "Top 1% Talent",
  "Global Reach",
  "Secure Escrow",
  "24/7 Support",
  "Verified Pro",
];

const Banner = () => {
  const duplicatedItems = [...bannerItems, ...bannerItems];

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerFadeLeft}></div>
      <div className={styles.bannerSlider}>
        <div className={styles.bannerTrack}>
          {duplicatedItems.map((item, index) => (
            <div key={index} className={styles.bannerItem}>
              <span className={styles.dot}>•</span>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bannerFadeRight}></div>
    </div>
  );
};

export default Banner;
