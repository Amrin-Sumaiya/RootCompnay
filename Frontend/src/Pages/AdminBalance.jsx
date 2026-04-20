import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBalance = () => {
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");

  const token = localStorage.getItem("token");

  // ✅ Load companies
useEffect(() => {
  axios.get("https://backendjob.chulkani.com/api/admin/companies", {
    headers: { Authorization: `Bearer ${token}` }
  })
.then(res => {
  console.log("Companies:", res.data);

  if (Array.isArray(res.data) && res.data.length > 0) {
    setCompanies(res.data);
  } else {
    console.warn("No companies found");
    setCompanies([]);
  }
})
  .catch(err => {
    console.error(err);
    setCompanies([]);
  });
}, []);

  // ✅ Get balance when company selected
  const handleCompanyChange = async (id) => {
    setCompanyId(id);

    const res = await axios.get(`https://backendjob.chulkani.com/api/admin/company-balance/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setCurrentBalance(res.data.balance);
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("https://backendjob.chulkani.com/api/admin/add-balance", {
      companyId,
      amount,
      paymentMethod: method
    }, {
      headers: { Authorization: token }
    });

    alert("Balance Added!");

    // refresh balance
    handleCompanyChange(companyId);
  };

  return (
    <div className="p-6 max-w-xl">

      <h3 className="text centre  font-bold">Add balance section</h3>
      <h2 className="text-xl font-bold mb-4">Select Company</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Company Dropdown */}
        <select
          onChange={(e) => handleCompanyChange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option  value="">Select Company</option>
          {companies.map(c => (
            <option key={c.CompanyID} value={c.CompanyID}>
              {c.CompanyName}
            </option>
          ))}
        </select>

        {/* Current Balance */}
        <h2 className="text-xl font-bold">Current Balance</h2>
        <input
          value={`৳ ${currentBalance}`}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />

        {/* Input Balance */}
        <h2 className="text-xl font-bold">Add More Balance</h2>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />

        {/* Payment Method */}

        <h2 className="text-xl font-bold">Payment Method</h2>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Method</option>
          <option value="bikash">Bikash</option>
          <option value="nagad">Nagad</option>
          <option value="bank">Bank</option>
        </select>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Add Balance
        </button>
      </form>
    </div>
  );
};

export default AdminBalance;