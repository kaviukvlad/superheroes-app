
import { Outlet, Link } from "react-router-dom";
import Layout from "./components/Layout";
import "./index.css";

export default function App() {
  return (
    <Layout>
      <header className="header">
        <h1 className="logo">
          <Link to="/">Superheroes</Link>
        </h1>
        <nav>
          <Link className="create-btn" to="/create">
            Create
          </Link>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </Layout>
  );
}
