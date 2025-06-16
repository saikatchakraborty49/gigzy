import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-100 px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-yellow-50">About Us</h1>
        <p className="text-lg leading-relaxed text-richblack-300">
          Welcome to <span className="text-yellow-100 font-semibold">Gigzy</span> – your trusted platform to connect skilled freelancers with short-term and project-based job opportunities.
          Our mission is to simplify hiring and empower freelancers to monetize their skills effortlessly.
        </p>
        {/* <div className="mt-10 grid md:grid-cols-2 gap-8 text-left"> */}
        <div className="mt-10 flex flex-col justify-around gap-8 lg:flex-row lg:text-left text-center">
          <div>
            <h2 className="text-2xl font-semibold text-yellow-50 mb-2">What We Offer</h2>
            <ul className="list-disc list-inside text-richblack-200">
              <li>Instant onboarding and profile creation</li>
              {/* <li>AI-powered job recommendations</li> */}
              <li>Secure and fast payouts via RazorpayX</li>
              <li>User-friendly dashboard and tracking</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-yellow-50 mb-2">Why Choose Us</h2>
            <ul className="list-disc list-inside text-richblack-200">
              <li>Transparent workflow</li>
              <li>No long processing delays</li>
              <li>Real-time job matching</li>
              <li>Support for PAN India gigs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
