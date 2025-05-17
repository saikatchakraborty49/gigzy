const BASE_URL = process.env.REACT_APP_BASE_URL
// console.log(BASE_URL);

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/register",
  LOGIN_API: BASE_URL + "/auth/login",
  SENDMOBILEOTP_API:BASE_URL+"/auth/send-mobile-otp",
  VERIFYMOBILEOTP_API:BASE_URL+"/auth/verify-mobile-otp",
//   RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
//   RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const jobEndPoints={
  JOBSPOSTED_API:BASE_URL+"/jobs/get-posted-jobs-by-client",
  CREATEJOB_API:BASE_URL+"/jobs/create-job",
  DELETEJOB_API:BASE_URL+"/jobs/delete-job",
  SENDPROPOSAL_API:BASE_URL+"/jobs/apply-for-job",
  GETJOBPROPOSALS_API:BASE_URL+"/jobs/get-job-proposals",
  UPDATEPROPOSALSTATUS_API:BASE_URL+"/jobs/update-propsal-status",
  // GETONGOINGJOB_API:BASE_URL+"/jobs/get-ongoing-job",
  GETONGOINGJOB_API:BASE_URL+"/jobs/get-ongoing-job",
  GETCOMPLETEDJOB_API:BASE_URL+"/jobs/get-completed-job",
  GET_FREELANCER_JOBS:BASE_URL+"/jobs/get-freelancer-jobs",
  GET_FREELANCER_JOB:BASE_URL+"/jobs/get-freelancer-job",
  UPDATE_JOB_STATUS_API:BASE_URL+"/jobs/update-job-status",
}

export const paymentEndPoints={
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  PAYOUT_API:BASE_URL+"/payment/payout",
}

export const categoryEndPoints={
  GET_CATEGORIES:BASE_URL+"/categories/get-all-categories",
  GET_JOBS_OF_PARTICULAR_CATEGORY_API:BASE_URL+"/categories/get-jobs-of-particular-category",
}

export const fileUploadEndPoints={
  POST_FILE:BASE_URL+"/uploads/upload-work",
}

export const balanceEndPoints={
  UPDATE_BALANCE_API:BASE_URL+"/payment/updateBalance"
}

export const profileEndPoints={
  GET_USER_PROFILE_API:BASE_URL+"/users/profile",
  UPDATE_PROFILE_API:BASE_URL+"/users/profile",
}

export const complaintEndPoints={
  FILE_COMPLAINT_API:BASE_URL+"/jobs/file-complaint",
  GET_COMPLAINT_API:BASE_URL+"/jobs/get-complaint",
}

export const contactEndPoints={
  CONTACTUS_API:BASE_URL+"/contact/contact-us",
}