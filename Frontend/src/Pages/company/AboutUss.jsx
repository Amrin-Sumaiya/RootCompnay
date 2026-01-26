import React from 'react';
import { FaBriefcase, FaUsers, FaBuilding, FaHandshake, FaGlobe, FaRocket } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AboutUss = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      
      {/* --- HERO SECTION --- */}
      <div className="relative bg-green-900 py-20 px-6 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative max-w-4xl mx-auto z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Empowering Careers, <span className="text-white-700">Connecting Futures.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            We are more than just a job board. We are the bridge between ambitious talent 
            and world-class organizations.
          </p>
        </div>
      </div>

      {/* --- STATS BAR --- */}
      <div className="bg-white shadow-lg -mt-8 relative z-20 max-w-6xl mx-auto rounded-xl grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 border  border-slate-100">
        <StatItem number="10k+" label="Jobs Posted" icon={<FaBriefcase className="text-red-700" />} />
        <StatItem number="5k+" label="Companies" icon={<FaBuilding className="text-red-700" />} />
        <StatItem number="200k+" label="Active Users" icon={<FaUsers className="text-red-700" />} />
        <StatItem number="50+" label="Countries" icon={<FaGlobe className="text-red-700" />} />
      </div>

      {/* --- OUR MISSION SECTION --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-green-50">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Image Side */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Team collaborating" 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-blue-900/20"></div>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2 space-y-6">
            <h4 className="text-red-600 font-bold uppercase text-xl tracking-wider">Who We Are</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 leading-tight">
              Bridging the gap between <br/> talent and opportunity.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Founded in 2024, our platform was built with a simple mission: to make the hiring process 
              transparent, efficient, and human-centric. We believe that finding a job should be 
              exciting, not exhausting.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Whether you are a startup looking for your first engineer or a graduate looking for 
              your first break, we provide the tools and network to make it happen.
            </p>
            
            <div className="pt-4">
               <button className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all shadow-lg shadow-blue-500/30">
                 Read Our Story
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-green-800">Why Choose Us?</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              We are driven by values that prioritize the success of both job seekers and employers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-green-700 ">
            <ValueCard 
              icon={<FaHandshake size={40} />} 
           
              title="Trust & Transparency" 
              desc="We verify every company and job listing to ensure a safe ecosystem for your career growth."
            />
            <ValueCard 
              icon={<FaRocket size={40} />} 
              title="Fast Connections" 
              desc="Our advanced algorithms match your profile with the right opportunities in seconds, not days."
            />
            <ValueCard 
              icon={<FaUsers size={40} />} 
              title="Community First" 
              desc="We provide resources, resume reviews, and career guidance to help you succeed beyond just applying."
            />
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-green-900 rounded-3xl p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
           {/* Decorative Circles */}
           <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
           <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
           
           <div className="relative z-10 space-y-6">
             <h2 className="text-3xl md:text-4xl font-bold">Ready to Shape Your Future?</h2>
             <p className="text-blue-100 text-lg max-w-xl mx-auto">
               Join thousands of professionals who have found their dream careers through our platform.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
               <Link to="/jobs" className="bg-white text-red-700 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors">
                 Browse Jobs
               </Link>

             </div>
           </div>
        </div>
      </section>

    </div>
  );
};

// --- SUB-COMPONENTS for cleaner code ---

const StatItem = ({ number, label, icon }) => (
  <div className="p-8 text-center hover:bg-slate-50 transition-colors">
    <div className="flex justify-center mb-3 text-2xl">{icon}</div>
    <div className="text-3xl font-bold text-slate-900">{number}</div>
    <div className="text-sm text-slate-500 uppercase font-medium tracking-wide mt-1">{label}</div>
  </div>
);

const ValueCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="w-14 h-14 bg-green-50 text-red-800 rounded-lg flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">
      {desc}
    </p>
  </div>
);

export default AboutUss;