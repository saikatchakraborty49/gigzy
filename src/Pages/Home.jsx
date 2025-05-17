import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import { Link } from 'react-router'
import { TypeAnimation } from 'react-type-animation';
import CTAButton from '../Components/Core/Button';
import Banner1 from '../Assets/FreelancingVideo-1.mp4'
import Banner2 from '../Assets/FreelancingVideo-2.mp4'
import Banner3 from '../Assets/FreelancingVideo-3.mp4'


const Home = () => {
  return (
    <div className='w-11/12 flex flex-col place-items-center text-white gap-8 z-0'>
        {/* Section 1 */}
        <div className='flex flex-col place-items-center gap-5'>
            <div className='w-full'>
            <Link to={"/sign-up"}>
              <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
                <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                  <p>Become a Gigster with Gigzy</p>
                  <FaArrowRight />
                </div>
              </div>
            </Link>
            </div>
            <div className='text-4xl flex justify-center'>
                <span className='text-center'>Hire <span className='text-[#B76DFF] font-bold'>Gigsters</span> for&nbsp;
                
                <TypeAnimation className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'
                  sequence={[
                    // Same substring at the start will only be typed out once, initially
                    'Web Development',
                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                    'App Development',
                    1000,
                    'UI/UX Design',
                    1000,
                    'Video Editing',
                    1000,
                    'Blog & Article Writing',
                    1000,
                    'Technical Writing',
                    1000,
                    'SEO (Search Engine Optimization)',
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                //   style={{ fontSize: '2em', display: 'inline-block' }}
                  repeat={Infinity}
                />
                </span>
            </div>
            <div className='text-2xl w-10/12 text-center text-richblack-5'>
                <p>Find top-tier freelancers for all your content needs. Connect with skilled writers and bring your ideas to life!</p>
            </div>
            <div className="mt-8 flex flex-row gap-7">
                <CTAButton active={true} linkto={"/sign-up"}>
                  Book a Gigster
                </CTAButton>
                <CTAButton active={false} linkto={"/log-in"}>
                  Learn More
                </CTAButton>
            </div>

            <div className='my-10 text-3xl text-center  text-richblack-50 font-bold w-9/12'>
                <p>WORK ANYWHERE AND EVERYWHERE IN YOUR OWN COMFORT ZONE</p>
            </div>
            <div className='flex place-items-center gap-3'>
                <div className='flex flex-col gap-3'>
                    <div className="shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                        <video
                        //   className="shadow-[20px_20px_rgba(255,255,255)]"
                          muted
                          loop
                          autoPlay
                          width={500}
                        >
                          <source src={Banner2} type="video/mp4" />
                        </video>
                    </div>
                    <div className="shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                        <video
                        //   className="shadow-[20px_20px_rgba(255,255,255)]"
                          muted
                          loop
                          autoPlay
                          width={500}
                        >
                          <source src={Banner1} type="video/mp4" />
                        </video>
                    </div>
                </div>
            
                <div className=' h-full place-items-center'>
                    <div className="shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                          <video
                          //   className="shadow-[20px_20px_rgba(255,255,255)]"
                            muted
                            loop
                            autoPlay
                            width={300}
                          >
                            <source src={Banner3} type="video/mp4" />
                          </video>
                    </div>
                </div>
            </div>
            
            <div>
                {/* <p>Work Anywhere and </p> */}
            </div>
        </div>
    </div>
  )
}

export default Home