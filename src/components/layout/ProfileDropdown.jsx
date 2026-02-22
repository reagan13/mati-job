"use client";
import Link from "next/link";
import {
  CircleUser,
  LogOut,
  Settings,
  LayoutDashboard,
  User,
  Heart,
} from "lucide-react";
import { useDropdown } from "@/hooks/useDropdown";
import { signOutUser } from "@/app/actions/auth";
import styles from "./ProfileDropdown.module.css";

const ProfileDropdown = ({ user, profile }) => {
  const { isOpen, open, close, containerRef } = useDropdown();

  return (
    <div
      className={styles.profileContainer}
      ref={containerRef}
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <div className={styles.avatarWrapper} onClick={isOpen ? close : open}>
        <div className={styles.avatarInner}>
          <CircleUser size={24} strokeWidth={1.5} />
        </div>
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.userInfo}>
            <p className={styles.userName}>
              {profile?.full_name || "New User"}
            </p>
            <p className={styles.userEmail}>{user?.email}</p>
          </div>

          <div className={styles.divider} />

          <Link href="/home" className={styles.dropdownItem} onClick={close}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link href="/saved" className={styles.dropdownItem} onClick={close}>
            <Heart size={18} />
            <span>Saved Jobs</span>
          </Link>
          <Link href="/profile" className={styles.dropdownItem} onClick={close}>
            <User size={18} />
            <span>My Profile</span>
          </Link>
          <Link
            href="/settings"
            className={styles.dropdownItem}
            onClick={close}
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>

          <div className={styles.divider} />

          <form action={signOutUser} style={{ width: "100%" }}>
            <button
              type="submit"
              className={`${styles.dropdownItem} ${styles.logoutBtn}`}
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
