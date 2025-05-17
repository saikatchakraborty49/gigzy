import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../../../../../../Service/Operations/apiConnector";
import { jobEndPoints } from "../../../../../../Service/apis";
import { toast } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SendProposalForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { jobId } = useParams();
  const [coverLetter, setCoverLetter] = useState("");

  async function onSubmit(data) {
    const toastId = toast.loading("Loading...");
    try {
      const requestBody = {
        jobId,
        coverLetter, // Already stored in state
        bidAmount: data.bidAmount
      };

      const response = await apiConnector("POST", jobEndPoints.SENDPROPOSAL_API, requestBody);
      console.log(response)
      toast.success("Proposal Sent Successfully");
      reset();
      setCoverLetter(""); // Reset Quill Editor
    } catch (error) {
      console.log(error);
      toast.error("Error in sending proposal");
    }
    toast.dismiss(toastId);
  }

  return (
    <div className="my-10 flex flex-col gap-y-3 rounded-md border-[1px] text-richblack-25 border-richblack-700 bg-richblack-800 p-8 px-12">
      <p className="text-3xl font-bold text-richblack-5 text-center">Send Proposal</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-3">
        
        {/* Cover Letter with Quill.js */}
        <label className="w-full">
          Cover Letter <sup className="text-pink-200">*</sup>
          <ReactQuill
            theme="snow"
            value={coverLetter}
            onChange={setCoverLetter}
            className="bg-white text-black rounded-lg mt-2"
          />
        </label>

        {/* Bid Amount */}
        <label className="w-full">
          Bid Amount (₹) <sup className="text-pink-200">*</sup>
          <input
            type="number"
            className="w-full px-3 py-2 bg-richblack-500 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-100"
            placeholder="Enter your bid amount"
            {...register("bidAmount", { required: true, min: 1 })}
          />
          {errors.bidAmount && <span className="text-red text-sm">Bid amount must be greater than zero</span>}
        </label>

        {/* Submit Button */}
        <button
          className="bg-yellow-100 text-black px-3 py-2 rounded-lg mt-3 hover:bg-yellow-200 transition duration-300"
          type="submit"
        >
          Send Proposal
        </button>
      </form>
    </div>
  );
};

export default SendProposalForm;
