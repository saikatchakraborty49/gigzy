import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";

const { paymentEndPoints } = require("../apis");

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API,}=paymentEndPoints;

//RAZORPAY CDN
function loadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement("script")
        script.src=src
        script.onload=()=>{
            resolve(true)
        }
        script.onerror=()=>{
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

//PAY FOR JOB
export async function jobPayment(proposal,navigate) {
    try{
        // console.log("************PROPOSALS:*********");
        // console.log(proposal);
        const clientDetails=proposal.clientId;
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            toast.error("Razorpay SDK failed to load. Check your Internet Connection.")
            return ;
        }

        //creating order in backend
        const orderResponse=await apiConnector("POST",COURSE_PAYMENT_API,{proposal})
        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message)
        }
        console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)

        const options = {
            key: 'rzp_test_p4Cc7BRTkxzlgr',
            // key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name: "GIGZY",
            description: "Payment for job",
            // image: rzpLogo,
            prefill: {
              name: `${clientDetails.firstName} ${clientDetails.lastName}`,
              email: clientDetails.email,
            },
            handler: function (response) {
            //   sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
              verifyPayment({...response,proposal}, navigate)
            },
        }
    
          const rzp =new window.Razorpay(options);
          rzp.open();
          rzp.on("payment.failed", function (response) {
            toast.error("Oops! Payment Failed.")
            console.log(response.error)
          })
    }catch(error){
        console.log(error);
    }
    
}


async function verifyPayment(bodyData, navigate) {
    const toastId = toast.loading("Verifying Payment...")
    // dispatch(setPaymentLoading(true))
    try {
      const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData)
  
      console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
  
      toast.success("Payment Successful.")
      navigate("/dashboard/ongoing-jobs")
    //   dispatch(resetCart())
    } catch (error) {
      console.log("PAYMENT VERIFY ERROR............", error)
      toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toastId)
    // dispatch(setPaymentLoading(false))
  }

// import toast from "react-hot-toast";
// import { apiConnector } from "./apiConnector";

// const { paymentEndPoints } = require("../apis");
// const { COURSE_PAYMENT_API } = paymentEndPoints;

// function loadScript(src) {
//     return new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.src = src;
//         script.onload = () => resolve(true);
//         script.onerror = () => resolve(false);
//         document.body.appendChild(script);
//     });
// }

// export async function jobPayment(proposal) {
//     try {
//         console.log("Proposal:", proposal);

//         const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
//         if (!res) {
//             toast.error("Failed to load Razorpay SDK.");
//             return;
//         }

//         if (!window.Razorpay) {
//             toast.error("Razorpay is not available. Refresh the page.");
//             return;
//         }

//         const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, proposal);
//         console.log("Order Response:", orderResponse);

//         if (!orderResponse.data.success) {
//             throw new Error(orderResponse.data.message);
//         }

//         const orderData = orderResponse.data.data;
//         if (!orderData.amount || !orderData.currency || !orderData.id) {
//             throw new Error("Invalid order details received.");
//         }

//         const options = {
//             key: process.env.REACT_APP_RAZORPAY_KEY || "rzp_test_gRiTDxOFVQNGHD",
//             currency: orderData.currency,
//             amount: orderData.amount * 100, // Convert to paise
//             order_id: orderData.id,
//             name: "GIGZY",
//             description: "Payment for job",
//             prefill: {
//                 name: `${proposal.clientId.firstName} ${proposal.clientId.lastName}`,
//                 email: proposal.clientId.email,
//             },
//             handler: function (response) {
//                 console.log("Payment Successful:", response);
//                 toast.success("Payment Successful!");
//             },
//         };

//         const rzp = new window.Razorpay(options);
//         rzp.open();

//         rzp.on("payment.failed", function (response) {
//             console.error("Payment Failed:", response.error);
//             toast.error("Oops! Payment Failed.");
//         });

//     } catch (error) {
//         console.error("Error in jobPayment:", error);
//         toast.error("Payment process failed. Try again.");
//     }
// }
