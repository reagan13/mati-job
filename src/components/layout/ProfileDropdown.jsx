"use client";
import Link from "next/link";
import {
  CircleUser,
  LogOut,
  Settings,
  LayoutDashboard,
  User,
} from "lucide-react";
import { useDropdown } from "@/hooks/useDropdown";
import Button from "../ui/Button";
import styles from "./ProfileDropdown.module.css";

const ProfileDropdown = ({ user, logout }) => {
  const { isOpen, open, close, containerRef } = useDropdown();

  return (
    <div
      className={styles.profileContainer}
      ref={containerRef}
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <div className={styles.avatarWrapper}>
        <div className={styles.avatarInner}>
          <CircleUser size={24} strokeWidth={1.5} />
        </div>
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <Link href="/home" className={styles.dropdownItem}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link href="/profile" className={styles.dropdownItem}>
            <User size={18} />
            <span>My Profile</span>
          </Link>
          <Link href="/settings" className={styles.dropdownItem}>
            <Settings size={18} />
            <span>Settings</span>
          </Link>

          <div className={styles.divider} />

          <div className={styles.logoutWrapper}>
            <Button
              variant="secondary"
              onClick={logout}
              className={styles.logoutBtn}
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
