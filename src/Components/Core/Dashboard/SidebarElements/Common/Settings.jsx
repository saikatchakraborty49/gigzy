import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import IconBtn from "../../../../Common/IconBtn"
import { endpoints, profileEndPoints } from "../../../../../Service/apis"
import { apiConnector } from "../../../../../Service/Operations/apiConnector"
import { setContactNumber, setUpdateProfile } from "../../../../../Slices/authSlice"

const Settings = () => {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch=useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      bio: user?.bio || "",
      gender: user?.gender || "",
      contactNumber: user?.contactNumber || "",
      dateOfBirth: user?.DateOfBirth?.split("T")[0] || "",
      profilePicture: null,
    },
  })

  async function updateProfile(data) {
    const formData = new FormData();
    for (const key in data) {
      if(key=="profilePicture" && data[key]==null){
        continue;
          // console.log(key+"-->"+data[key])
      }
      formData.append(key, data[key]);
    }
    // console.log(formData)
  
    const response = await apiConnector("PUT", profileEndPoints.UPDATE_PROFILE_API, formData);
    if (response?.data?.success) {
      navigate("/dashboard/my-profile");
    }
  }
  

  async function handleUpdateContactNumber(data){
    const contactNumber = data.contactNumber;

    dispatch(setContactNumber(contactNumber)); // Save in Redux
    dispatch(setUpdateProfile(data));
    // dispatch(setProfileFormData(data));        // Save full form temporarily
    
    const body = { contactNumber };
    const otpResponse = await apiConnector("POST", endpoints.SENDMOBILEOTP_API, body);
    
    if (otpResponse?.data?.success) {
      navigate("/dashboard/verify-contact-number");
    }
    // dispatch(setContactNumber(null));
  
    // return; // Stop here — continue after OTP
  }
  const onSubmit = async (data) => {
    try {
      // If contact number changed, go for OTP first
      if (data.contactNumber !== user.contactNumber) {
        
        await handleUpdateContactNumber(data)
        return ;
        
      }
  
      // Contact number is the same, proceed to update
      await updateProfile(data);
      // const formData = new FormData();
      // for (const key in data) {
      //   formData.append(key, data[key]);
      // }
  
      // const response = await apiConnector("PUT", profileEndPoints.UPDATE_PROFILE_API, formData);
  
      // if (response?.data?.success) {
      //   navigate("/dashboard/my-profile");
      // }
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };
  

  const profilePicture = watch("profilePicture")

  return (
    <div className="text-white">
      <p className="text-3xl font-bold">Edit Profile</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-10 flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12"
        encType="multipart/form-data"
      >
        {/* Profile Image */}
        <div className="flex items-center gap-4">
          <img
            src={
              profilePicture && profilePicture.length > 0
                ? URL.createObjectURL(profilePicture[0])
                : user?.profilePicture
            }
            alt="Profile"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            {...register("profilePicture")}
            className="text-sm text-richblack-200"
          />
        </div>

        {/* Names */}
        <div className="flex gap-6">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-richblack-300 text-sm">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: true })}
              className="rounded-md bg-richblack-700 p-2 text-white"
            />
            {errors.firstName && <p className="text-red-400 text-xs">Required</p>}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-richblack-300 text-sm">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: true })}
              className="rounded-md bg-richblack-700 p-2 text-white"
            />
            {errors.lastName && <p className="text-red-400 text-xs">Required</p>}
          </div>
        </div>

        {/* Email and Phone */}
        <div className="flex gap-6">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-richblack-300 text-sm">Email</label>
            <input
              type="email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              className="rounded-md bg-richblack-700 p-2 text-white"
            />
            {errors.email && <p className="text-red-400 text-xs">Invalid email</p>}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-richblack-300 text-sm">Phone Number</label>
            <input
              type="tel"
              {...register("contactNumber", {
                required: true,
                minLength: 10,
              })}
              className="rounded-md bg-richblack-700 p-2 text-white"
            />
            {errors.contactNumber && (
              <p className="text-red-400 text-xs">Invalid number</p>
            )}
          </div>
        </div>

        {/* Gender and DOB */}
        <div className="flex gap-6">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-richblack-300 text-sm">Gender</label>
            <select
              {...register("gender")}
              className="rounded-md bg-richblack-700 p-2 text-white"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-richblack-300 text-sm">Date of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className="rounded-md bg-richblack-700 p-2 text-white"
            />
          </div>
        </div>

        {/* About */}
        <div className="flex flex-col gap-1">
          <label className="text-richblack-300 text-sm">About</label>
          <textarea
            rows={4}
            {...register("bio")}
            className="rounded-md bg-richblack-700 p-2 text-white"
          />
        </div>

        {/* Submit Button */}
        <div className="self-end">
          <IconBtn text="Save Changes" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default Settings
