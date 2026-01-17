import React from "react";
import Header from "../Pages/Header.jsx";
import Navigation from "../Pages/company/Navigation.jsx";
import About from "../Pages/company/About.jsx";
import Features from "../Pages/company/Features.jsx";
import Services from "../Pages/company/Services.jsx";
import Footer from "../Pages/Footer.jsx";
import Team from "../Pages/Team.jsx";
import Testimonial from "../Pages/Testimonial.jsx";
import Contact from "../Pages/Contact.jsx";

const Home = () => {
  return (
    <div>
      <Navigation />
      <Header />
      <About />
      <Features />
      <Services />
      <Team />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
