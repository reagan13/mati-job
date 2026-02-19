"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";
import Button from "../ui/Button";

const originalData = [
  {
    id: 1,
    title: "Hire Top Local Tech Talent",
    desc: "From developers to designers, find the best Filipino freelancers ready to scale your business.",
    img: "/assets/computer.png",
    accent: "Tech & Dev",
  },
  {
    id: 2,
    title: "Your Dream Project Awaits",
    desc: "Get discovered by international clients and turn your skills into a full-time career.",
    img: "/assets/briefcase.png",
    accent: "Marketplace",
  },
  {
    id: 3,
    title: "Seamless Global Payments",
    desc: "Secure, fast, and reliable transactions. Focus on the work, we'll handle the rest.",
    img: "/assets/sphere.png",
    accent: "Payments",
  },
  {
    id: 4,
    title: "Never Miss an Opportunity",
    desc: "Receive real-time notifications for jobs that match your specific expertise.",
    img: "/assets/bell.png",
    accent: "Notifications",
  },
];

const carouselData = [...originalData, originalData[0]];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [activeOverlay, setActiveOverlay] = useState(null);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    if (activeOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [activeOverlay]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === carouselData.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(handleNext, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, [currentIndex]);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            The marketplace for
            <span className={styles.highlight}>Modern Careers.</span>
          </h1>
          <p className={styles.subtitle}>
            Connect with premium talent or find your next big project. Built for
            speed, security, and the future of work.
          </p>
          <div className={styles.actions}>
            <Button href="/login">Start Raketing</Button>
            <Button href="/how-it-works" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        <div className={styles.carouselFrame}>
          <div
            className={styles.carouselSlider}
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isTransitioning
                ? "transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)"
                : "none",
            }}
          >
            {carouselData.map((slide, idx) => (
              <div key={`${slide.id}-${idx}`} className={styles.slide}>
                <div
                  className={styles.proCard}
                  onClick={() => setActiveOverlay(slide)}
                >
                  <div className={styles.cardInfo}>
                    <span className={styles.accentText}>{slide.accent}</span>
                    <h3>{slide.title}</h3>
                    <p className={styles.desktopDesc}>{slide.desc}</p>
                  </div>
                  <div className={styles.assetVisual}>
                    <Image
                      src={slide.img}
                      alt=""
                      width={100}
                      height={100}
                      className={styles.floatingImg}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.navWrapper}>
            {originalData.map((_, i) => (
              <div
                key={i}
                className={`${styles.navItem} ${
                  currentIndex % originalData.length === i
                    ? styles.activeNav
                    : ""
                }`}
              >
                <div className={styles.progressTrack}>
                  {currentIndex % originalData.length === i && (
                    <div className={styles.progressBar} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeOverlay && (
        <div
          className={styles.modalViewport}
          onClick={() => setActiveOverlay(null)}
        >
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeIcon}
              onClick={() => setActiveOverlay(null)}
            >
              ✕
            </button>
            <span className={styles.modalAccent}>{activeOverlay.accent}</span>
            <h2 className={styles.modalTitle}>{activeOverlay.title}</h2>
            <p className={styles.modalDesc}>{activeOverlay.desc}</p>
            <div className={styles.modalFooter}>
              <Button href="/find-jobs">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
