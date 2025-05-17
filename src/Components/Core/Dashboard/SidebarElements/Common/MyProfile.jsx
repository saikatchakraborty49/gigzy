import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../../../Utils/dateFormatter"
import { VscEdit } from "react-icons/vsc";
import IconBtn from "../../../../Common/IconBtn"

const MyProfile = () => {
    const {user}=useSelector((state)=>state.profile)
    // console.log(user)
    const navigate=useNavigate();
  return (
    <div className='text-white'>
        <p className='text-3xl font-bold'>My Profile</p>
        {/* Section 1 */}
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 ">
            <div className="flex justify-between">
              <div className="flex gap-4">

                {/* Profile Image */}
                <div>
                    <img alt="User image" className='w-[50px] h-[50px] rounded-full' src={user.profilePicture}/>
                </div>
                {/* User Details */}
                <div>
                    <p className="text-richblack-5 font-bold text-xl">{user?.firstName + " " + user?.lastName}</p>
                    <p className="text-richblack-100">{user.email}</p>
                </div>
              </div>
                {/* Edit */}
                <IconBtn
                  text="Edit"
                  onclick={() => {
                    navigate("/dashboard/settings")
                  }}
                >
                  <RiEditBoxLine />
                </IconBtn>
            </div>
        </div>
        {/* About */}
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <div className='flex justify-between'>
          <p className="text-lg font-semibold text-richblack-5">
            About
          </p>
            <IconBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/settings")
              }}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>
            
            <p
              className={`${
                user?.bio
                  ? "text-richblack-5"
                  : "text-richblack-400"
              } text-sm font-medium`}
            >
              {user?.bio ?? "Write Something About Yourself"}
            </p>
            
        </div>
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile