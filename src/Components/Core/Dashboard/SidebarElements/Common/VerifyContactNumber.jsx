import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
// import { sendOtp, signUp } from "../Service/Operations/authApi";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../../../../Service/Operations/apiConnector";
import { endpoints, profileEndPoints } from "../../../../../Service/apis";
import toast from "react-hot-toast";
import { setContactNumber, setUpdateProfile } from "../../../../../Slices/authSlice";

function VerifyContactNumber() {
  const [otp, setOtp] = useState("");
  // const { signupData, loading } = useSelector((state) => state.auth);
  const {contactNumber}=useSelector((state)=>state.auth);
  const {updateProfile}=useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    console.log(contactNumber)
    if(!contactNumber){
      navigate("/dashboard/settings");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

   async function updateProfileData(data) {
      const formData = new FormData();
      for (const key in data) {
        if(key=="profilePicture" && data[key]==null){
          continue;
            // console.log(key+"-->"+data[key])
        }
        formData.append(key, data[key]);
      }
    
      const response = await apiConnector("PUT", profileEndPoints.UPDATE_PROFILE_API, formData);
      if (response?.data?.success) {
        navigate("/dashboard/my-profile");
      }
    }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const toastId=toast.loading("Loading");
    try{
      const body={
        contactNumber,
        OTP:otp,
      }
      const response=await apiConnector("POST",endpoints.VERIFYMOBILEOTP_API,body);
      console.log(response)
      await updateProfileData(updateProfile);
      dispatch(setContactNumber(null));
      dispatch(setUpdateProfile(null))
      toast.success("OTP verified successfully")
      // return ;
    }catch(error){
      console.log(error)
      toast.error(error.response.data.message)
    }    
    toast.dismiss(toastId);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {/* {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : ( */}
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleSubmit}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/dashboard/Settings">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Settings
              </p>
            </Link>
            <button
              className="flex items-center text-blue-100 gap-x-2"
              // onClick={() => dispatch(sendOtp(signupData.email,navigate))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      {/* )} */}
    </div>
  );
}

export default VerifyContactNumber;