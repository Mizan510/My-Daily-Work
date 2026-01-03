// InputFormE.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserReportE from "../components/UserReportE";
import SBUE from "../products/SBU-E";
import { toast } from "react-hot-toast";

const InputFormE = () => {
  const initialState = {};
  const [FormDataE, setFormDataE] = useState(initialState);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [allReports, setAllReports] = useState([]);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // <-- Loading state

  // Load logged-in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))?.name || "";
    setLoggedInUser(user);
  }, []);

  // Fetch all reports and check if already submitted today
  const fetchReports = async () => {
    try {
      const res = await axios.get(
        "https://my-daily-work.onrender.com/api/form-datae"
      );
      setAllReports(res.data);

      const today = new Date().toISOString().slice(0, 10);
      const submitted = res.data.some(
        (r) =>
          r.userName === loggedInUser &&
          new Date(r.createdAt).toISOString().slice(0, 10) === today
      );
      setAlreadySubmitted(submitted);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch reports");
    }
  };

  // inside your component
  useEffect(() => {
    if (loggedInUser) fetchReports();
  }, [loggedInUser]);
  // Auto-calculate Total Rx Forecast
  useEffect(() => {
    const totalRxForecast =
      Number(FormDataE.opdRxForecast || 0) +
      Number(FormDataE.gpRxForecast || 0) +
      Number(FormDataE.dischargeRxForecast || 0);
    setFormDataE((prev) => ({ ...prev, totalRxForecast }));
  }, [
    FormDataE.opdRxForecast,
    FormDataE.gpRxForecast,
    FormDataE.dischargeRxForecast,
  ]);

  // Auto-calculate Total Basket And New Product Rx
  useEffect(() => {
    const totalBasketAndNewProductRx =
      Number(FormDataE.totalStrategicBasketRx || 0) +
      Number(FormDataE.totalFocusBasketRx || 0) +
      Number(FormDataE.totalEmergingBasketRx || 0) +
      Number(FormDataE.totalNewProductRx || 0);
    setFormDataE((prev) => ({ ...prev, totalBasketAndNewProductRx }));
  }, [
    FormDataE.totalStrategicBasketRx,
    FormDataE.totalFocusBasketRx,
    FormDataE.totalEmergingBasketRx,
    FormDataE.totalNewProductRx,
  ]);

  // Auto-calculate Total Rxs
  useEffect(() => {
    const totalRxs =
      Number(FormDataE.opdRx || 0) +
      Number(FormDataE.dischargeRx || 0) +
      Number(FormDataE.gpRx || 0);
    setFormDataE((prev) => ({ ...prev, totalRxs }));
  }, [FormDataE.opdRx, FormDataE.dischargeRx, FormDataE.gpRx]);

  // Auto-calculate SBU-E Rx Without Basket And New Product Rx
  useEffect(() => {
    const sbueRxWithoutBasketAndNewProductRx =
      (FormDataE.totalRxs || 0) - (FormDataE.totalBasketAndNewProductRx || 0);
    setFormDataE((prev) => ({ ...prev, sbueRxWithoutBasketAndNewProductRx }));
  }, [FormDataE.totalRxs, FormDataE.totalBasketAndNewProductRx]);

  // Auto-calculate No. of Not Giving Order Party
  useEffect(() => {
    const noOfNotGivingOrderParty =
      Number(FormDataE.noOfPartySbueOrderRoute || 0) -
      Number(FormDataE.noOfCollectedOrderSbue || 0);
    setFormDataE((prev) => ({ ...prev, noOfNotGivingOrderParty }));
  }, [FormDataE.noOfPartySbueOrderRoute, FormDataE.noOfCollectedOrderSbue]);

  const handleChange = (e) =>
    setFormDataE({ ...FormDataE, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loggedInUser) return toast.error("Logged-in user not detected!");
    if (alreadySubmitted) {
      toast.error("You have already submitted today's report!");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      await axios.post("https://my-daily-work.onrender.com/api/form-datae", {
        ...FormDataE,
        userName: loggedInUser,
      });
      toast.success("Report submitted successfully!"); // <-- Custom toast
      setFormDataE(initialState); // Reset form
      fetchReports(); // refresh reports & submission lock
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit report"); // <-- Custom toast
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-4 w-full max-w-5xl mx-auto border rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4">Input Form for SBU-E</h2>

      {alreadySubmitted && (
        <p className="text-red-600 font-bold text-lg mb-2">
          You have already submitted today's report. Try again tomorrow.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="userName"
          value={loggedInUser}
          readOnly
          className="border px-2 py-1 w-full bg-gray-100"
        />

        <SBUE
          FormDataE={FormDataE}
          handleChange={handleChange}
          disabled={alreadySubmitted || isLoading} // disable inputs while loading
        />

        <div className="flex gap-2 flex-wrap">
          {/* Submit Button with Spinner */}
          <button
            type="submit"
            disabled={alreadySubmitted || isLoading}
            className={`px-4 py-2 rounded text-white flex items-center justify-center gap-2 ${
              alreadySubmitted || isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {isLoading
              ? "Submitting..."
              : alreadySubmitted
              ? "Already Submitted"
              : "Submit"}
          </button>
        </div>
      </form>

      {loggedInUser && (
        <UserReportE loggedInUser={loggedInUser} allReports={allReports} />
      )}
    </div>
  );
};

export default InputFormE;
