import React, { ReactNode } from "react";
import styles from "./MainLayout.module.css";
import { MainLayoutProps } from "../../interface/shared/MainLayoutProps";
import NavBar from "../../navigation/NavBar";

function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.mainContentsup}>
        <NavBar activeTitle={title} />
        <div className={styles.mainContent}>{children}</div>
      </div>
    </div>
  );
}
export default MainLayout;
