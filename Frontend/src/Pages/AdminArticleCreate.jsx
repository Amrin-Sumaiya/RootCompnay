import React, { useState } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const AdminArticleCreate = () => {
  const [form, setForm] = useState({
    page_key: "",
    title: "",
    content: ""
  });
  const [loading, setLoading] = useState(false);
  const pageOptions = {
  home: "Home Page",
  about: "About Page",
  jobs: "All Jobs Page",
  "candidate-login": "Candidate Login Page",
  "company-login": "Company Login Page"
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "https://backendjob.chulkani.com/api/articles",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      alert("Article created successfully!");
      setForm({ page_key: "", title: "", content: "" }); // Reset form
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Failed to create article. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Article for Individual Pages</h2>
          <p className="mt-2 text-gray-600">Fill in the details below to publish a new page component.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Page Key Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Page Identifier</label>
<select
  className={inputStyle}
  value={form.page_key}
  onChange={(e) => setForm({ ...form, page_key: e.target.value })}
  required
>
  <option value="">Select Page</option>

  {Object.entries(pageOptions).map(([key, label]) => (
    <option key={key} value={key}>
      {label}
    </option>
  ))}

</select>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Article Title</label>
            <input
              className={inputStyle}
              placeholder="Enter a descriptive title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          {/* Content Textarea */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Body Content</label>
<div>
  <CKEditor 
  editor={ClassicEditor}
  data={form.content}
  onChange={(event, editor) => {
    const data = editor.getData();
    setForm({ ...form, content: data });
  }}
/>
</div>
          </div>
          <br />
      

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors 
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg'}`}
          >
            {loading ? "Publishing..." : "Publish Article"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminArticleCreate;