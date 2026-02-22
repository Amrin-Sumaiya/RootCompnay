import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const contactData = {
    paragraph:
      "We’d love to hear from you! Fill out the form below and our team will get back to you shortly.",
    email: "support@iglweb.com",
    phone: "+880-1958-666999.",
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setStatus("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">
            Get in <span className="text-red-600">Touch</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            {contactData.paragraph}
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-red-600 text-xl">
                <FaEnvelope />
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Email</h4>
                <p className="text-gray-600">{contactData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-red-600 text-xl">
                <FaPhoneAlt />
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Phone</h4>
                <p className="text-gray-600">{contactData.phone}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg space-y-5"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-900 transition"
            >
              <FaPaperPlane />
              Send Message
            </button>

            {status && (
              <p className="text-green-600 text-center font-medium">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
