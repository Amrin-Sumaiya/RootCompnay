import React from "react";
import {
  FaBolt,
  FaBell,
  FaUsers,
  FaMagic,
} from "react-icons/fa";

const Features = () => {
  const featuresData = [
    {
      icon: <FaBolt />,
      title: "One-Click Applications",
      text: "Apply to multiple jobs effortlessly without filling repetitive forms.",
    },
    {
      icon: <FaBell />,
      title: "Instant Job Alerts",
      text: "Receive real-time notifications whenever new job opportunities match your preferences.",
    },
    {
      icon: <FaUsers />,
      title: "Verified Companies",
      text: "Explore opportunities from trusted and verified companies.",
    },
    {
      icon: <FaMagic />,
      title: "Skill-Based Matching",
      text: "Our system matches you with jobs based on your skills and experience.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Powerful <span className="text-blue-600">Features</span>
        </h2>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, i) => (
            <div
              key={i}
              className="bg-sky-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition"
            >
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-3xl">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-gray-600 text-sm">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
