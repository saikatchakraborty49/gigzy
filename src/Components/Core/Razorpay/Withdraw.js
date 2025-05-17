import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../../Service/Operations/apiConnector";
import { paymentEndPoints } from "../../../Service/apis";
import toast from "react-hot-toast";

const Withdraw = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [accountType, setAccountType] = useState("vpa");
  const [mode,setMode] = useState("IMPS")

  const onSubmit = async (formData) => {
    const toastId=toast.loading("Loading");
    try {
        let account_details = {};
        let Mode;
        if (accountType === "vpa") {
          account_details = {
            address: formData.vpa,
          };
          Mode="UPI";
        } else {
          account_details = {
            name: formData.name,
            account_number: formData.account_number,
            ifsc: formData.ifsc,
          };
          Mode=mode;
        }
    
        const payload = {
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          account_type: accountType,
          account_details,
          mode:Mode
        };
    
        console.log("Payload to Backend:", payload);
    
        const response = await apiConnector("POST", paymentEndPoints.PAYOUT_API, payload);
        toast.success("Amount withdrawn successfully");

    } catch (error) {
        console.log(error);
        toast.error("Failed to process amount withdrawal");
    }
    toast.dismiss(toastId)
    };
  

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Fund Account Validation</h2>

      <div className="mb-4">
        <label className="font-semibold mr-4">Account Type:</label>
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="vpa">VPA (UPI)</option>
          <option value="bank_account">Bank Account</option>
        </select>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Common Contact Details */}
        <div className="mb-4">
          <label className="block font-medium">Full Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="border p-2 w-full rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            className="border p-2 w-full rounded-md"
            type="email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Phone Number</label>
          <input
            type="number"
            {...register("contact", {
              required: "Contact number is required",
              minLength: {
                value: 10,
                message: "Contact number must be exactly 10 digits",
              },
              maxLength: {
                value: 10,
                message: "Contact number must be exactly 10 digits",
              },
            })}
            className="border p-2 w-full rounded-md"
          />

          {errors.contact?console.log(errors.contact):<></>}
          {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
        </div>

        {/* Conditional Fields */}
        {accountType === "vpa" ? (
          <div className="mb-4">
            <label className="block font-medium">VPA (UPI ID)</label>
            <input
              {...register("vpa", { required: "VPA is required" })}
              className="border p-2 w-full rounded-md"
              placeholder="e.g. yourname@upi"
            />
            {errors.vpa && <p className="text-red-500 text-sm">{errors.vpa.message}</p>}
          </div>
        ) : (
          <>
            <div className="mb-4">
            <label className="font-semibold mr-4">Mode:</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mb-4"
            >
              <option value="IMPS">IMPS</option>
              <option value="NEFT">NEFT</option>
              <option value="RTGS">RTGS</option>
            </select>
              <label className="block font-medium">Account Number</label>
              <input
                {...register("account_number", { required: "Account number is required" })}
                className="border p-2 w-full rounded-md"
              />
              {errors.account_number && (
                <p className="text-red-500 text-sm">{errors.account_number.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block font-medium">IFSC Code</label>
              <input
                {...register("ifsc", { required: "IFSC code is required" })}
                className="border p-2 w-full rounded-md"
              />
              {errors.ifsc && <p className="text-red-500 text-sm">{errors.ifsc.message}</p>}
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
