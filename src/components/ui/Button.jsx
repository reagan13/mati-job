import Link from "next/link";
import styles from "./Button.module.css";

const Button = ({
  children,
  href,
  variant = "primary",
  icon: Icon,
  className = "",
  ...props
}) => {
  const variantClass = styles[variant] || styles.primary;
  const combinedClasses = `${styles.btn} ${variantClass} ${className}`;

  const content = (
    <>
      {Icon && <Icon size={18} className={styles.icon} />}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};

export default Button;
