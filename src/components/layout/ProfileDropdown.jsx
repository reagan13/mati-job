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
import { signOutUser } from "@/app/actions/auth"; // Ensure this path is correct
import Button from "../ui/Button";
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
      <div className={styles.avatarWrapper}>
        <div className={styles.avatarInner}>
          <CircleUser size={24} strokeWidth={1.5} />
        </div>
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {/* User Info Header */}
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

          <div className={styles.logoutWrapper}>
            <form action={signOutUser}>
              <Button
                variant="secondary"
                type="submit"
                className={styles.logoutBtn}
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
