import React from "react";

const About = () => {
  const aboutData = {
    paragraph:
      "Welcome to JobPortal! We help you discover amazing career opportunities and connect with top companies worldwide. Whether you’re starting your career or looking for a new challenge, we’ve got you covered.",
    Why: [
      "Instant Job Alerts for new opportunities",
      "Easy One-Click Applications",
      "Connect with Verified Companies",
      "Personalized Skill-Based Job Matching",
    ],
    Why2: [
      "Save time with smart search filters",
      "Get recommendations tailored to your profile",
      "Stay updated with the latest industry trends",
      "Enhance your career growth with expert tips",
    ],
  };

  return (
    <section id="about" className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
              alt="About Job Portal"
              className="rounded-2xl shadow-lg w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-green-700 text-white px-6 py-4 rounded-xl shadow-lg hidden sm:block">
              <p className="text-lg font-semibold">10K+ Jobs Posted</p>
            </div>
          </div>
             
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-700">
              About <span className="text-red-600">Us</span>
            </h2>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
              {aboutData.paragraph}
            </p>

            <h3 className="mt-10 text-2xl font-semibold text-gray-800">
              Why Choose Us?
            </h3>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutData.Why.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <span className="text-blue-600 text-xl">✔</span>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}

              {aboutData.Why2.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <span className="text-blue-600 text-xl">✔</span>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
