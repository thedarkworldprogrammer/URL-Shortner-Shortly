import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import UrlDetailsPage from "./pages/UrlDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import useTheme from "./hooks/useTheme";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:px-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:shortCode" element={<UrlDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
