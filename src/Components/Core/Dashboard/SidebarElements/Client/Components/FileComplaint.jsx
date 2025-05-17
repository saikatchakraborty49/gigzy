import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../../../../../../Service/Operations/apiConnector";
import { complaintEndPoints } from "../../../../../../Service/apis";
import { useParams } from "react-router";
// import { apiConnector } from "../../../../../Service/Operations/apiConnector";
// import { complaintEndPoints } from "../../../../../Service/apis";

const FileComplaint = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {jobId}=useParams();
  const onSubmit = async (data) => {
    const toastId = toast.loading("Submitting complaint...");
    try {
      const formData = new FormData();
      formData.append("reason", data.reason);
      formData.append("description", data.description);
      formData.append("jobId",jobId)
      if (data.evidence[0]) formData.append("evidence", data.evidence[0]);

      await apiConnector("POST", complaintEndPoints.FILE_COMPLAINT_API, formData);
      toast.success("Complaint submitted successfully");
      reset();
    } catch (error) {
      console.error("Complaint error:", error);
      toast.error("Error submitting complaint");
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="my-10 flex flex-col gap-y-3 rounded-md border-[1px] text-richblack-25 border-richblack-700 bg-richblack-800 p-8 px-12">
      <p className="text-3xl font-bold text-richblack-5 text-center">File a Complaint</p>

      <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="mt-4 flex flex-col gap-4">
        {/* Reason Dropdown */}
        <label className="w-full">
          Reason <sup className="text-pink-200">*</sup>
          <select
            {...register("reason", { required: true })}
            className="w-full px-3 py-2 bg-richblack-500 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-100"
          >
            <option value="">Select a reason</option>
            <option value="Delayed submission">Delayed submission</option>
            <option value="Work not as described">Work not as described</option>
            <option value="Poor communication">Poor communication</option>
            <option value="Other">Other</option>
          </select>
          {errors.reason && (
            <span className="text-red text-sm">Please select a reason</span>
          )}
        </label>

        {/* Description */}
        <label className="w-full">
          Description <sup className="text-pink-200">*</sup>
          <textarea
            {...register("description", { required: true })}
            className="w-full px-3 py-2 bg-richblack-500 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-100"
            placeholder="Describe the issue"
            rows="4"
          ></textarea>
          {errors.description && (
            <span className="text-red text-sm">Description is required</span>
          )}
        </label>

        {/* Evidence Upload */}
        <label className="w-full">
          Upload Evidence (optional)
          <input
            type="file"
            {...register("evidence")}
            className="w-full mt-2 text-richblack-200"
          />
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="bg-yellow-100 text-black px-3 py-2 rounded-lg mt-3 hover:bg-yellow-200 transition duration-300"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default FileComplaint;
