import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../Service/Operations/apiConnector";
import { categoryEndPoints } from "../Service/apis";
import CategoryPageComponent from "../Components/Core/CategoryPage/CategoryPageComponent";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [jobs,setJobs]=useState([]);
  const [categoryName,setCategoryName]=useState();
  
  useEffect(() => {
    async function fetchJobs(){
      const response=await apiConnector("GET",`${categoryEndPoints.GET_JOBS_OF_PARTICULAR_CATEGORY_API}/${categoryId}`)
      // console.log(response)
      setCategoryName(response.data.data.name)
      setJobs(response.data.data.jobs);
    }
    fetchJobs()
  }, [categoryId])
  
  // useEffect(() => {
  //   console.log(jobs)
  // }, [jobs])

  return (
    <div className="w-11/12 flex flex-col place-items-center text-white mt-7">
      <p className="text-2xl font-bold text-richblack-5">
        Category: {categoryName}
      </p>
      <div className='w-full h-full flex flex-col items-center'>
        {jobs.length===0?
            <div className='text-richblack-5 mt-7 w-full h-full text-3xl font-bold flex justify-center items-center'>
                <p>No Jobs Posted</p>
            </div>
        :
        <div className="w-fit">
            {jobs.map((job)=>(
                <CategoryPageComponent
                    Job={job}
                />
            ))}
        </div>
        }
        
    </div>
    </div>
  );
};

export default CategoryPage;
