import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/candidate/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen font-sans text-slate-400 animate-pulse">
      Preparing your professional overview...
    </div>
  );

  if (!profile) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-700">
      <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100 text-center">
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Profile Not Found</h2>
        <p className="text-slate-500 mb-8">Ready to showcase your talent to the world?</p>
        <button onClick={() => navigate("/makingcv")} className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 transition-all font-medium">
          Create Profile Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-200 border-2 border-black text-slate-900 font-sans selection:bg-emerald-100">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold tracking-tight text-xl uppercase italic text-slate-800">My_Portfolio.</span>
          <button 
            onClick={() => navigate("/makingcv")}
            className="text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-full transition-all"
          >
            Edit Profile
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">
            {profile.fullName}
          </h1>
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-slate-500 font-medium italic">
            <span className="text-emerald-600 not-italic font-bold uppercase tracking-widest text-sm">{profile.profession}</span>
            <span>{profile.email}</span>
            <span>{profile.phone}</span>
            <span>{profile.address}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Main Content (8 cols) */}
          <div className="md:col-span-8 space-y-16">
            
            {/* Experience Section */}
            {profile.company && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-green-900 mb-8">Professional Background</h2>
                <div className="group">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{profile.jobTitle}</h3>
                    <span className="text-sm font-mono text-slate-400">{profile.duration}</span>
                  </div>
                  <p className="text-lg font-medium text-slate-600 mb-4">{profile.company}</p>
                  <p className="text-slate-500 leading-relaxed max-w-prose">
                    {profile.description}
                  </p>
                </div>
              </section>
            )}

            {/* Education Section */}
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-8">Academic Journey</h2>
              <div className="space-y-8">
                {profile.education.map((edu, i) => (
                  <div key={i} className="border-l-2 border-slate-800 pl-6 hover:border-emerald-500 transition-all">
                    <p className="text-slate-400 text-xs font-mono mb-1">{edu.passingYear}</p>
                    <h3 className="text-lg font-bold text-slate-800">{edu.degree}</h3>
                    <p className="text-slate-500 font-medium">{edu.institute}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Content (4 cols) */}
          <div className="md:col-span-4">
            <div className="sticky top-24 space-y-12">
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills?.split(",").map((skill, i) => (
                    <span
                      key={i}
                      className="bg-slate-100 text-slate-700 px-3 py-1 text-sm font-medium rounded-md"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </section>

              <section className="bg-slate-900 p-6 rounded-2xl text-white">
                <h3 className="font-bold mb-2">Quick Contact</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Interested in collaborating or hiring? Reach out via email or phone.
                </p>
                <div className="h-px bg-slate-800 w-full mb-4"></div>
                <p className="text-xs font-mono text-emerald-400 truncate">{profile.email}</p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto px-6 py-20 border-t border-slate-100 mt-20 text-center">
        <p className="text-slate-400 text-sm">Professional Profile &copy; 2026</p>
      </footer>
    </div>
  );
};

export default MyProfile;