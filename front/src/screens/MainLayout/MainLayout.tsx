import React, { ReactNode } from "react";
import SideBar from "../../components/SideBar/SideBar";
import styles from "./MainLayout.module.css";
import { MainLayoutProps } from "../../interface/shared/MainLayoutProps";
import NavBar from "../../navigation/NavBar";
import greenLogo from "../../assets/images/green-logo.png";

function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={greenLogo} alt="logo" className={styles.img} />
        <h1 className={styles.title}>{title}</h1>
      </div>
      <NavBar activeTitle={title} />
      {/* <main className={styles.mainContent}>{children}</main> */}
    </div>
  );
}
export default MainLayout;
