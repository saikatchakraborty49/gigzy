import React, { useEffect,useState } from 'react'
import { categoryEndPoints } from '../../../../../Service/apis';
import { apiConnector } from '../../../../../Service/Operations/apiConnector';
import FetchJobs from './BrowseJob.jsx/FetchJobs';

const BrowseJobs = () => {
  const [categories, setCategories] = useState([]);
  const [currCategory,setCurrCategory]=useState();

   useEffect(() => {
       const fetchCategories = async () => {
         try {
           const response = await apiConnector("GET",categoryEndPoints.GET_CATEGORIES);
           setCategories(response.data);
           console.log(response)        
         } catch (error) {
           console.error("Error fetching categories:", error);
         }
       };
   
       fetchCategories();
     }, []);

     useEffect(() => {
        if(categories.length!=0)
        setCurrCategory(categories[0]._id)
     }, [categories])
     
   
  return (
    <div className='w-full h-full'>
        {/* Jobs Navbar */}
        <div className='flex gap-2 p-1 bg-richblack-600 text-richblack-50 justify-center rounded-md'>
            {categories.map((category)=>(
                <button
                onClick={()=>{
                        setCurrCategory(category._id)
                    }}
                    className={`text-center hover:bg-richblack-800 rounded-md p-1 ${currCategory==category._id?"bg-richblack-800":"bg-richblack-600"}`}
                >
                    {category.name}
                </button>
            ))}
        </div>
        {/* All Jobs Of That Category */}
        <div className='w-full h-full'>
          {currCategory!=undefined?
            <FetchJobs
              currCategory={currCategory}
            />
            :
            <></>
          }
          
        </div>
    </div>
  )
}

export default BrowseJobs