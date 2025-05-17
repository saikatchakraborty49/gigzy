import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiConnector } from "../../../../../Service/Operations/apiConnector";
import { categoryEndPoints, jobEndPoints } from "../../../../../Service/apis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const PostAJob = () => {
  const navigate=useNavigate();
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiConnector("GET",categoryEndPoints.GET_CATEGORIES);
        setCategories(response.data);
        
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
      console.log("Updated Categories:", categories);
    }, [categories]);

  const onSubmit = async (data) => {
    const toastId=toast.loading("Loading");
    try {
      const response = await apiConnector("POST",jobEndPoints.CREATEJOB_API,data);
      console.log("Job posted successfully:", response.data);
      reset(); // Reset form after successful submission
      navigate("/dashboard/jobs-posted")
      toast.success("Job posted successfully")
    } catch (error) {
      toast.error("Error in Posting Job")
      console.error("Error posting job:", error.response?.data || error.message);
    }
    toast.dismiss(toastId)
  };

  return (
    <div className="my-10 flex flex-col gap-y-3 rounded-md border-[1px] text-richblack-25 border-richblack-700 bg-richblack-800 p-8 px-12 ">
      <p className="text-3xl font-bold text-richblack-5 text-center">Post a Job</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-3">
        {/* Job Title */}
        <label className="w-full">
          Job Title <sup className="text-pink-200">*</sup>
          <input
            type="text"
            className="w-full px-3 py-2 bg-richblack-500 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-100"
            placeholder="Enter job title"
            {...register("title", { required: true })}
          />
          {errors.title && <span className="text-red text-sm">Job title is required</span>}
        </label>

        {/* Description */}
        <label className="w-full">
          Job Description <sup className="text-pink-200">*</sup>
          <textarea
            className="w-full px-3 py-2 bg-richblack-500 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-100"
            placeholder="Describe the job"
            rows="4"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && <span className="text-red text-sm">Description is required</span>}
        </label>

        {/* Category Dropdown */}
        <label className="w-full">
          Category <sup className="text-pink-200">*</sup>
          <select
            className="w-full px-3 py-2 bg-richblack-500 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-100"
            {...register("category", { required: true })}
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && <span className="text-red text-sm">Category is required</span>}
        </label>

        {/* Budget */}
        <label className="w-full">
          Budget (₹) <sup className="text-pink-200">*</sup>
          <input
            type="number"
            className="w-full px-3 py-2 bg-richblack-500 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-100"
            placeholder="Enter budget"
            {...register("budget", { required: true, min: 1 })}
          />
          {errors.budget && <span className="text-red text-sm">Budget must be greater than zero</span>}
        </label>

        {/* Deadline */}
        <label className="w-full">
          Deadline <sup className="text-pink-200">*</sup>
          <input
            type="date"
            className="w-full px-3 py-2 bg-richblack-500 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-100"
            {...register("deadline", { required: true })}
          />
          {errors.deadline && <span className="text-red text-sm">Deadline is required</span>}
        </label>

        {/* Submit Button */}
        <button
          className="bg-yellow-100 text-black px-3 py-2 rounded-lg mt-3 hover:bg-yellow-200 transition duration-300"
          type="submit"
        >
          Post Job
        </button>
      </form>
    </div>
  )
};

export default PostAJob;
