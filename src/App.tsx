import { BrowserRouter, Routes, Route } from "react-router-dom"
import Portfolio from "./components/layout/Porfolio"
import ProfilePage from "./components/pages/ProfilePage"
import Navbar from "./components/layout/Navbar"
import ProjectsPage from "./components/pages/ProjectsPage"
import ContactPage from "./components/pages/ContactPage"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
