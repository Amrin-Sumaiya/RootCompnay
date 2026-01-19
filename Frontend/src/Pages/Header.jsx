import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // const goToSection = (id) => {
  //   navigate("/contact");
  //   setTimeout(() => {
  //     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  //   }, 150);
  // };

  return (
    <header
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="relative z-10 max-w-4xl text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Let’s Find Your <span className="text-blue-200">Dream Job</span>
        </h1>

        <p className="mt-6 text-lg text-yellow-300">
          Explore thousands of job opportunities from top companies worldwide.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => navigate("/company/all-jobs")}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Browse Jobs
          </button>

          <button
           
            className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black"
          >
            Contact Us
          </button>
        </div>
      </div>
    </header>
  );
}; 

export default Header;
