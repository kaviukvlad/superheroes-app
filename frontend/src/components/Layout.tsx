import type { ReactNode } from "react";
//import "../styles/Layout.css";

export default function Layout({ children }: { children: ReactNode }) {
  return <main className="layout-main">{children}</main>;
}
