import { useState, useEffect } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import EditCareerPopup from "./edie"; // Ensure this component is properly implemented
import axios from "axios";

function App() {
  // State variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [careers, setCareers] = useState([]); // Current page's job posts
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const jobsPerPage = 5;
  const backendBaseURL = "http://192.168.0.119:8080/hrmsapplication/carrers";

  // Fetch job posts when the component mounts or currentPage changes
  useEffect(() => {
    fetchJobPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]); // Added currentPage as dependency

  // Function to fetch job posts based on currentPage and jobsPerPage
  const fetchJobPosts = async () => {
    try {
      const response = await axios.get(
        `${backendBaseURL}/getJobPosts?pageNumber=${currentPage - 1}&size=${jobsPerPage}`
      );

      // Log the full response to inspect its structure
      console.log("Full API Response:", response);
      console.log("Response Data:", response.data);

      // Check if jobList exists and is an array
      if (response.data.jobList && Array.isArray(response.data.jobList)) {
        const jobPosts = response.data.jobList.map((post) => ({
          jobId: post.jobId,
          jobTitle: post.jobTitle,
          status: post.status,
          publishDate: post.publishDate,
          expiryDate: post.expiryDate,
          // Initialize additional fields as null or default
          jobLocation: null,
          experienceYear: null,
          experienceMonth: null,
          workMode: null,
          noOfRequirements: null,
          salaryFrom: null,
          salaryTo: null,
          jobType: null,
          skillSet: null,
          age: null,
          jobDescription: null,
        }));

        // Update the careers state with the job posts
        setCareers(jobPosts);

        // Set totalPages from the API response
        if (response.data.totalPages) {
          setTotalPages(response.data.totalPages);
        } else if (response.data.totalJobs) {
          // If totalPages is not provided, calculate it
          setTotalPages(Math.ceil(response.data.totalJobs / jobsPerPage));
        } else {
          console.warn("Total pages or total jobs not provided in API response.");
          // Optionally set totalPages based on jobList length
          if (response.data.jobList.length === jobsPerPage) {
            setTotalPages(currentPage + 1); // Assume there's at least one more page
          } else {
            setTotalPages(currentPage);
          }
        }
      } else {
        console.error(
          "Expected an array in jobList but got:",
          response.data.jobList
        );
      }
    } catch (error) {
      console.error("Error fetching job posts:", error);
      alert("Failed to fetch job posts. Please try again later.");
    }
  };

  // Handler to open the Add/Edit modal
  const handleAddClick = () => {
    setIsModalOpen(true);
    setSelectedCareer(null);
  };

  // Handler to save career data (add or edit)
  const handleSaveCareer = async (careerData) => {
    if (selectedCareer !== null) {
      // Editing an existing career
      try {
        const patchUrl = `${backendBaseURL}/update`;
        // Assuming the API expects jobId as a query parameter and updated data in the request body
        await axios.patch(patchUrl, careerData, {
          params: { jobId: careerData.jobId },
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Update the careers state with the updated career data
        const updatedCareers = careers.map((career) =>
          career.jobId === careerData.jobId ? careerData : career
        );
        setCareers(updatedCareers);

        // Optionally, inform the user of successful update
        alert(`Job "${careerData.jobTitle}" has been successfully updated.`);
      } catch (error) {
        console.error("Error updating the job:", error);
        alert("Failed to update the job. Please try again.");
        return; // Exit the function without closing the modal
      }
    } else {
      // Adding a new career
      try {
        const postUrl = `${backendBaseURL}/create`;
        const response = await axios.post(postUrl, careerData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Assuming the response contains the created job with a new jobId
        setCareers([...careers, response.data]);

        // Optionally, inform the user of successful addition
        alert(`Job "${careerData.jobTitle}" has been successfully added.`);
      } catch (error) {
        console.error("Error adding the job:", error);
        alert("Failed to add the job. Please try again.");
        return; // Exit the function without closing the modal
      }
    }

    // Close the modal after successful add/edit
    setIsModalOpen(false);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to toggle the expansion of a card
  const toggleExpandCard = async (index) => {
    if (expandedCardIndex === index) {
      // If the clicked card is already expanded, collapse it
      setExpandedCardIndex(null);
      return;
    }

    setExpandedCardIndex(index);

    const job = careers[index];
    // If details are not yet loaded, fetch them
    if (!job.jobLocation) {
      try {
        // Fetch detailed job data using jobId
        const response = await axios.get(`${backendBaseURL}/${job.jobId}`);

        console.log(`Details for jobId ${job.jobId}:`, response.data);

        // Assuming the detailed API returns an object with the additional fields
        const detailedJob = response.data;

        // Update the job in the careers state with the detailed data
        const updatedCareers = [...careers];
        updatedCareers[index] = {
          ...updatedCareers[index],
          jobLocation: detailedJob.jobLocation,
          experienceYear: detailedJob.numberOfYears,
          experienceMonth: detailedJob.numberOfMonths,
          workMode: detailedJob.workMode,
          noOfRequirements: detailedJob.noOfRequirements,
          salaryFrom: detailedJob.salaryFrom,
          salaryTo: detailedJob.salaryTo,
          jobType: detailedJob.jobType,
          skillSet: detailedJob.skillSet,
          age: detailedJob.age,
          jobDescription: detailedJob.jobDescription,
        };

        setCareers(updatedCareers);
      } catch (error) {
        console.error("Error fetching job details:", error);
        alert("Failed to fetch job details. Please try again later.");
      }
    }
  };

  // Handler to open the Edit modal with selected career
  const handleEditClick = (career) => {
    setSelectedCareer(career);
    setIsModalOpen(true);
  };

  // Handler to delete a career
  const handleDeleteClick = async (career) => {
    // Confirm deletion with the user
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the job "${career.jobTitle}"?`
    );
    if (!confirmDelete) return;

    try {
      // Send DELETE request to the backend
      const deleteUrl = `${backendBaseURL}/deletecareers/${career.jobId}`;
      await axios.delete(deleteUrl);

      // After successful deletion, remove the job from the state
      const updatedCareers = careers.filter((c) => c.jobId !== career.jobId);
      setCareers(updatedCareers);

      // Adjust pagination if necessary
      const newTotalPages = Math.ceil(updatedCareers.length / jobsPerPage) || 1;
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }

      // Optionally, inform the user of successful deletion
      alert(`Job "${career.jobTitle}" has been successfully deleted.`);
    } catch (error) {
      console.error("Error deleting job post:", error);
      alert("Failed to delete the job post. Please try again.");
    }
  };

  // Handler to cancel a job by updating its status to 'cancelled'
  const handleCancelJob = async (career) => {
    // Confirm cancellation with the user
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel the job "${career.jobTitle}"?`
    );
    if (!confirmCancel) return;

    try {
      // Send PATCH request to update the job status
      const patchUrl = `${backendBaseURL}/updateStatus`;
      await axios.patch(patchUrl, null, {
        params: {
          jobId: career.jobId,
          status: "cancelled",
        },
      });

      // Update the job's status in the state
      const updatedCareers = careers.map((c) =>
        c.jobId === career.jobId ? { ...c, status: "cancelled" } : c
      );
      setCareers(updatedCareers);

      // Optionally, inform the user of successful cancellation
      alert(`Job "${career.jobTitle}" has been successfully cancelled.`);
    } catch (error) {
      console.error("Error cancelling the job:", error);
      alert("Failed to cancel the job. Please try again.");
    }
  };

  // Handler for pagination button clicks
  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate an array of page numbers for pagination controls
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="grid-col-4">
        {/* Header Section */}
        <div className="w-full lg:w-10/12 xl:w-9/12 mx-auto mt-7 bg-white rounded-md border border-black/90 shadow-md p-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <AiTwotoneHome size={20} className="mr-2" />
              <h1 className="text-lg font-bold">Careers Masters</h1>
            </div>
            <div className="flex gap-3 items-center">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Export to Excel
              </button>
              <button
                onClick={handleAddClick}
                className="w-[73px] h-[36px] rounded-[6px] bg-[#003179] text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Job Cards Section */}
        <div className="w-full lg:w-10/12 xl:w-9/12 mx-auto mt-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {careers.length === 0 ? (
            // No Jobs Found Message
            <p className="text-center col-span-full">No job posts available.</p>
          ) : (
            careers.map((career, index) => (
              <div
                key={career.jobId} // Use unique identifier for key
                className={`p-6 bg-white rounded-lg shadow-md border cursor-pointer transition-all duration-300 ease-in-out 
                  ${expandedCardIndex === index ? "h-auto" : "h-40 overflow-hidden"}`}
                onClick={() => toggleExpandCard(index)} // Handle card click
              >
                {/* Basic Job Information */}
                <h2 className="text-lg font-bold">{career.jobTitle}</h2>
                <p className="text-base font-bold pb-2">
                  Published Date:
                  <span className="text-xs text-gray-700 mb-2 pl-2">
                    {career.publishDate}
                  </span>
                </p>
                <p className="text-sm font-bold">
                  Expired Date:
                  <span className="text-xs text-gray-700 pl-3">
                    {career.expiryDate}
                  </span>
                </p>

                {/* Conditionally render Location if available */}
                {career.jobLocation && (
                  <p className="text-base font-bold mb-2">
                    Location:
                    <span className="text-xs text-gray-700 pl-3">
                      {career.jobLocation}
                    </span>
                  </p>
                )}

                {/* Status */}
                <p className="text-base font-bold mt-5">
                  Status: {career.status}
                </p>

                {/* Detailed Job Information */}
                {expandedCardIndex === index && (
                  <>
                    {career.workMode && (
                      <p className="text-sm font-bold">
                        Work Mode:
                        <span className="text-xs text-gray-700 pl-3">
                          {career.workMode}
                        </span>
                      </p>
                    )}
                    {career.noOfRequirements && (
                      <p className="text-sm font-bold">
                        Requirements:
                        <span className="text-xs text-gray-700 pl-3">
                          {career.noOfRequirements}
                        </span>
                      </p>
                    )}
                    {career.salaryFrom && career.salaryTo && (
                      <p className="text-sm font-bold">
                        Salary:
                        <span className="text-xs text-gray-700 pl-4">
                          {career.salaryFrom} - {career.salaryTo}
                        </span>
                      </p>
                    )}
                    {career.jobType && (
                      <p className="text-sm font-bold">
                        Role:{" "}
                        <span className="text-xs text-gray-700 pl-3">
                          {career.jobType}
                        </span>
                      </p>
                    )}
                    {career.skillSet && (
                      <p className="text-sm font-bold">
                        Skill Set:
                        <span className="text-xs text-gray-700 pl-3">
                          {career.skillSet}
                        </span>
                      </p>
                    )}
                    {career.age && (
                      <p className="text-sm font-bold">
                        Age:{" "}
                        <span className="text-xs text-gray-700 pl-3">
                          {career.age}
                        </span>
                      </p>
                    )}
                    {career.jobDescription && (
                      <p className="text-sm font-bold">
                        Job Description:{" "}
                        <span className="text-xs text-gray-700">
                          {career.jobDescription}
                        </span>
                      </p>
                    )}

                    {/* Action Buttons inside Expanded Card */}
                    <div className="flex justify-end mt-4">
                      <button
                        className="px-4 py-2 mr-2 bg-white text-black border border-[#003179] rounded-lg"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          handleDeleteClick(career);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="px-4 py-2 bg-[#003179] text-white rounded-lg"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          handleEditClick(career);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="mt-4">
                      <button
                        className={`px-4 py-2 mt-2 w-full ${
                          career.status.toLowerCase() === "cancelled"
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-red-600 text-white rounded-lg hover:bg-red-700"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          if (career.status.toLowerCase() !== "cancelled") {
                            handleCancelJob(career);
                          }
                        }}
                        disabled={career.status.toLowerCase() === "cancelled"}
                      >
                        {career.status.toLowerCase() === "cancelled"
                          ? "Job Cancelled"
                          : "Cancel This Job"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageClick(number)}
                className={`px-4 py-2 mx-1 rounded-lg ${
                  currentPage === number
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <EditCareerPopup
          onSave={handleSaveCareer}
          onClose={handleCloseModal}
          career={selectedCareer}
        />
      )}
    </>
  );
}

export default App;




// import { useState, useEffect } from "react";
// import { AiTwotoneHome } from "react-icons/ai";
// import EditCareerPopup from "./edie";
// import axios from "axios";

// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCareer, setSelectedCareer] = useState(null);
//   const [careers, setCareers] = useState([]);
//   const [expandedCardIndex, setExpandedCardIndex] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const jobsPerPage = 5;
//   const backendBaseURL = "http://192.168.0.119:8080/hrmsapplication/carrers";

//   useEffect(() => {
//     fetchJobPosts();
//   }, [currentPage]);

//   const fetchJobPosts = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(
//         `${backendBaseURL}/getJobPosts?pageNumber=${currentPage - 1}&size=${jobsPerPage}`
//       );

//       if (response.data.jobList && Array.isArray(response.data.jobList)) {
//         const jobPosts = response.data.jobList.map((post) => ({
//           jobId: post.jobId,
//           jobTitle: post.jobTitle,
//           status: post.status,
//           publishDate: post.publishDate,
//           expiryDate: post.expiryDate,
//           jobLocation: null,
//           experienceYear: null,
//           experienceMonth: null,
//           workMode: null,
//           noOfRequirements: null,
//           salaryFrom: null,
//           salaryTo: null,
//           jobType: null,
//           skillSet: null,
//           age: null,
//           jobDescription: null,
//           isLoadingDetails: false,
//         }));

//         setCareers(jobPosts);
//         setTotalPages(response.data.totalPages || Math.ceil(response.data.totalJobs / jobsPerPage));
//       }
//     } catch (error) {
//       console.error("Error fetching job posts:", error);
//       alert("Failed to fetch job posts. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAddClick = () => {
//     setIsModalOpen(true);
//     setSelectedCareer(null);
//   };

//   const handleSaveCareer = (careerData) => {
//     if (selectedCareer !== null) {
//       const updatedCareers = careers.map((career) =>
//         career.jobId === selectedCareer.jobId ? careerData : career
//       );
//       setCareers(updatedCareers);
//     } else {
//       setCareers([...careers, careerData]);
//     }
//     setIsModalOpen(false);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const toggleExpandCard = async (index) => {
//     if (expandedCardIndex === index) {
//       setExpandedCardIndex(null);
//       return;
//     }

//     setExpandedCardIndex(index);

//     const job = careers[index];
//     if (!job.jobLocation && !job.isLoadingDetails) {
//       try {
//         const updatedCareers = [...careers];
//         updatedCareers[index].isLoadingDetails = true;
//         setCareers(updatedCareers);

//         const response = await axios.get(`${backendBaseURL}/${job.jobId}`);
//         const detailedJob = response.data;

//         updatedCareers[index] = {
//           ...updatedCareers[index],
//           jobLocation: detailedJob.jobLocation,
//           experienceYear: detailedJob.numberOfYears,
//           experienceMonth: detailedJob.numberOfMonths,
//           workMode: detailedJob.workMode,
//           noOfRequirements: detailedJob.noOfRequirements,
//           salaryFrom: detailedJob.salaryFrom,
//           salaryTo: detailedJob.salaryTo,
//           jobType: detailedJob.jobType,
//           skillSet: detailedJob.skillSet,
//           age: detailedJob.age,
//           jobDescription: detailedJob.jobDescription,
//           isLoadingDetails: false,
//         };

//         setCareers(updatedCareers);
//       } catch (error) {
//         console.error("Error fetching job details:", error);
//         alert("Failed to fetch job details. Please try again later.");
//         const updatedCareers = [...careers];
//         updatedCareers[index].isLoadingDetails = false;
//         setCareers(updatedCareers);
//       }
//     }
//   };

//   const handleCancelJob = async (career, index) => {
//     try {
//       const patchUrl = `${backendBaseURL}/updateStatus?jobId=${career.jobId}&status=cancelled`;
//       await axios.patch(patchUrl);
//       const updatedCareers = [...careers];
//       updatedCareers[index].status = "cancelled";
//       setCareers(updatedCareers);
//       alert(`Job "${career.jobTitle}" status updated to cancelled.`);
//     } catch (error) {
//       console.error("Error cancelling the job:", error);
//       alert("Failed to cancel the job. Please try again.");
//     }
//   };

//   const handleEditClick = (career) => {
//     setSelectedCareer(career);
//     setIsModalOpen(true);
//   };

//   const handleDeleteClick = async (career) => {
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete the job "${career.jobTitle}"?`
//     );
//     if (!confirmDelete) return;

//     try {
//       const deleteUrl = `${backendBaseURL}/deletecareers/${career.jobId}`;
//       await axios.delete(deleteUrl);
//       const updatedCareers = careers.filter((c) => c.jobId !== career.jobId);
//       setCareers(updatedCareers);

//       const newTotalPages = Math.ceil(updatedCareers.length / jobsPerPage) || 1;
//       if (currentPage > newTotalPages) {
//         setCurrentPage(newTotalPages);
//       }

//       alert(`Job "${career.jobTitle}" has been successfully deleted.`);
//     } catch (error) {
//       console.error("Error deleting job post:", error);
//       alert("Failed to delete the job post. Please try again.");
//     }
//   };

//   const handlePageClick = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <>
//       <div className="grid-col-4">
//         <div className="w-full lg:w-10/12 xl:w-9/12 mx-auto mt-7 bg-white rounded-md border border-black/90 shadow-md p-3">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center">
//               <AiTwotoneHome size={20} className="mr-2" />
//               <h1 className="text-lg font-bold">Careers Masters</h1>
//             </div>
//             <div className="flex gap-3 items-center">
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
//                 Export to Excel
//               </button>
//               <button
//                 onClick={handleAddClick}
//                 className="w-[73px] h-[36px] rounded-[6px] bg-[#003179] text-white"
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="w-full lg:w-10/12 xl:w-9/12 mx-auto mt-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {isLoading ? (
//             <p className="text-center col-span-full">Loading job posts...</p>
//           ) : careers.length === 0 ? (
//             <p className="text-center col-span-full">No job posts available.</p>
//           ) : (
//             careers.map((career, index) => (
//               <div
//                 key={career.jobId}
//                 className={`p-6 bg-white rounded-lg shadow-md border cursor-pointer transition-all duration-300 ease-in-out 
//                   ${
//                     expandedCardIndex === index
//                       ? "h-auto"
//                       : "h-40 overflow-hidden"
//                   }`}
//                 onClick={() => toggleExpandCard(index)}
//               >
//                 <h2 className="text-lg font-bold">{career.jobTitle}</h2>
//                 <p className="text-base font-bold pb-2">
//                   Published Date:
//                   <span className="text-xs text-gray-700 mb-2 pl-2">
//                     {career.publishDate}
//                   </span>
//                 </p>
//                 <p className="text-sm font-bold">
//                   Expired Date:
//                   <span className="text-xs text-gray-700 pl-3">
//                     {career.expiryDate}
//                   </span>
//                 </p>
//                 <p className="text-base font-bold mt-5">
//                   Status: {career.status}
//                 </p>

//                 {expandedCardIndex === index && (
//                   <div className="mt-5">
                  

//                     <p className="mt-4">
//                       <strong>Location:</strong> {career.jobLocation}
//                     </p>
//                     <p>
//                       <strong>Experience:</strong>{" "}
//                       {career.experienceYear} years, {career.experienceMonth}{" "}
//                       months
//                     </p>
//                     <p>
//                       <strong>Work Mode:</strong> {career.workMode}
//                     </p>
//                     <p>
//                       <strong>No Of Requirements:</strong> {career.noOfRequirements}
//                     </p>
//                     <p>
//                       <strong>Salary:</strong> {career.salaryFrom} -{" "}
//                       {career.salaryTo}
//                     </p>
//                     <p>
//                       <strong>Job Type:</strong> {career.jobType}
//                     </p>
//                     <p>
//                       <strong>Skills:</strong> {career.skillSet}
//                     </p>
//                     <p>
//                       <strong>Age:</strong> {career.age}
//                     </p>
//                     <p>
//                       <strong>Job Description:</strong> {career.jobDescription}
//                     </p>

//                     <div className="mt-4 flex gap-2">
//                       <button
//                         className="px-4 py-2 bg-green-600 text-white rounded-md"
//                         onClick={() => handleEditClick(career)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="px-4 py-2 bg-red-600 text-white rounded-md"
//                         onClick={() => handleDeleteClick(career)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                     <button
//                       className="text-red-600 underline mt-2"
//                       onClick={() => handleCancelJob(career, index)}
//                     >
//                       Cancel this job
//                     </button> 
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>

//         <div className="flex justify-center mt-4">
//           {pageNumbers.map((pageNumber) => (
//             <button
//               key={pageNumber}
//               className={`mx-1 px-3 py-2 border rounded-md ${
//                 currentPage === pageNumber
//                   ? "bg-blue-500 text-white"
//                   : "bg-white text-black"
//               }`}
//               onClick={() => handlePageClick(pageNumber)}
//             >
//               {pageNumber}
//             </button>
//           ))}
//         </div>

//         {isModalOpen && (
//           <EditCareerPopup
//             career={selectedCareer}
//             onSave={handleSaveCareer}
//             onClose={handleCloseModal}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// export default App;





// import { useState, useEffect } from "react";
// import { AiTwotoneHome } from "react-icons/ai";
// import EditCareerPopup from "./edie";
// import axios from 'axios';

// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCareer, setSelectedCareer] = useState(null);
//   const [careers, setCareers] = useState([]); // State to hold current page job posts
//   const [expandedCardData, setExpandedCardData] = useState({}); // Holds additional data for expanded cards
//   const [expandedCardIndex, setExpandedCardIndex] = useState(null);
//   const [currentPage, setCurrentPage] = useState(0); // Pagination state (0-based index)
//   const jobsPerPage = 5; // Maximum job posts per page
//   const jobsPerRequest = 2; // Number of job posts fetched per API request
//   const [totalJobPosts, setTotalJobPosts] = useState(0); // Total number of job posts
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state

//   const backendBaseURL = "http://192.168.0.119:8080/hrmsapplication/carrers";

//   // Fetch job posts whenever currentPage changes
//   useEffect(() => {
//     const fetchJobPosts = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Calculate pageNumber based on jobsPerRequest
//         const pageNumber = currentPage * Math.ceil(jobsPerPage / jobsPerRequest);
//         const size = jobsPerRequest;
//         const response = await axios.get(
//           `${backendBaseURL}/getJobPosts?pageNumber=${pageNumber}&size=${size}`
//         );

//         // Assuming the response has a data field containing job posts and total count
//         const fetchedJobs = response.data.jobPosts; // Adjust based on actual API response
//         const total = response.data.total; // Adjust based on actual API response
//         setTotalJobPosts(total);

//         // Update careers state based on currentPage
//         // This example assumes that each page fetches 'jobsPerRequest' job posts
//         // You might need to adjust this logic based on how your backend handles pagination
//         setCareers(fetchedJobs);
//       } catch (err) {
//         console.error("Error fetching job posts:", err);
//         setError("Failed to fetch job posts.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobPosts();
//   }, [currentPage]);

//   const handleAddClick = () => {
//     setIsModalOpen(true);
//     setSelectedCareer(null);
//   };

//   const handleSaveCareer = async (careerData) => {
//     try {
//       // Replace with your actual POST API endpoint
//       await axios.post(`${backendBaseURL}/addJobPost`, careerData);

//       // After successful addition, refetch the current page job posts
//       // You might also want to handle pagination if the current page is full
//       setCurrentPage(0); // Reset to first page or adjust as needed
//     } catch (err) {
//       console.error("Error adding job post:", err);
//       alert("Failed to add job post.");
//     } finally {
//       setIsModalOpen(false);
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const toggleExpandCard = async (index, jobId) => {
//     if (expandedCardIndex === index) {
//       setExpandedCardIndex(null);
//       return;
//     }

//     setExpandedCardIndex(index);

//     // If additional data is already fetched, do not fetch again
//     if (expandedCardData[jobId]) return;

//     try {
//       // Replace with your actual GET API endpoint for additional details
//       const response = await axios.get(`${backendBaseURL}/getJobPostDetails?jobId=${jobId}`);

//       // Assuming the response has a data field containing additional details
//       const additionalDetails = response.data;

//       setExpandedCardData((prevData) => ({
//         ...prevData,
//         [jobId]: additionalDetails,
//       }));
//     } catch (err) {
//       console.error("Error fetching additional job details:", err);
//       alert("Failed to fetch additional job details.");
//     }
//   };

//   const handleEditClick = (career) => {
//     setSelectedCareer(career);
//     setIsModalOpen(true);
//   };

//   const handleDeleteClick = async (career) => {
//     if (!window.confirm("Are you sure you want to delete this job post?")) return;

//     try {
//       // Replace with your actual DELETE API endpoint
//       await axios.delete(`${backendBaseURL}/deleteJobPost?jobId=${career.jobId}`);

//       // After successful deletion, refetch the current page job posts
//       // Adjust currentPage if necessary
//       const newTotal = totalJobPosts - 1;
//       setTotalJobPosts(newTotal);
//       const newTotalPages = Math.ceil(newTotal / jobsPerPage);
//       if (currentPage >= newTotalPages) {
//         setCurrentPage(newTotalPages - 1);
//       } else {
//         // Refetch the current page
//         // This will be handled by useEffect
//       }
//     } catch (err) {
//       console.error("Error deleting job post:", err);
//       alert("Failed to delete job post.");
//     }
//   };

//   // Calculate total pages based on totalJobPosts
//   const totalPages = Math.ceil(totalJobPosts / jobsPerPage);

//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     setExpandedCardIndex(null); // Collapse any expanded card when page changes
//   };

//   // Generate an array of page numbers
//   const pageNumbers = [];
//   for (let i = 0; i < totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <>
//       <div className="grid-col-4">
//         <div className="w-full lg:w-10/12 xl:w-9/12 mx-auto mt-7 bg-white rounded-md border border-black/90 shadow-md p-3">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center">
//               <AiTwotoneHome size={20} className="mr-2" />
//               <h1 className="text-lg font-bold">Careers Masters</h1>
//             </div>
//             <div className="flex gap-3 items-center">
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
//                 Export to Excel
//               </button>
//               <button
//                 onClick={handleAddClick}
//                 className="w-[73px] h-[36px] rounded-[6px] bg-[#003179] text-white"
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="w-full lg:w-10/12 xl:w-9/12 mx-auto mt-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {loading ? (
//             <p>Loading job posts...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : careers.length === 0 ? (
//             <p>No job posts available.</p>
//           ) : (
//             careers.map((career, index) => (
//               <div
//                 key={career.jobId} // Use unique jobId as key
//                 className={`p-6 bg-white rounded-lg shadow-md border cursor-pointer transition-all duration-300 ease-in-out
//                   ${expandedCardIndex === index ? "h-auto" : "h-40 overflow-hidden"}`}
//                 onClick={() => toggleExpandCard(index, career.jobId)} // Handle card click
//               >
//                 {/* Display only the specified fields */}
//                 <h2 className="text-lg font-bold">{career.jobTitle}</h2>
//                 <p className="text-base font-bold mb-2">
//                   Job ID:<span className="text-xs text-gray-700 pl-3"> {career.jobId}</span>
//                 </p>
//                 <p className="text-sm font-bold">
//                   Status: <span className="text-xs text-gray-700 pl-3">{career.status}</span>
//                 </p>
//                 <p className="text-sm font-bold">
//                   Publish Date: <span className="text-xs text-gray-700 pl-3">{career.publishDate}</span>
//                 </p>
//                 <p className="text-sm font-bold">
//                   Expire Date: <span className="text-xs text-gray-700 pl-3">{career.expireDate}</span>
//                 </p>

//                 {expandedCardIndex === index && expandedCardData[career.jobId] && (
//                   <>
//                     {/* Display additional details fetched from the additional GET API */}
//                     <p className="text-sm font-bold">
//                       Location:<span className="text-xs text-gray-700 pl-3"> {expandedCardData[career.jobId].jobLocation}</span>
//                     </p>
//                     <p className="text-sm font-bold">
//                       Role: <span className="text-xs text-gray-700 pl-3">{expandedCardData[career.jobId].jobType}</span>
//                     </p>
//                     <p className="text-sm font-bold">
//                       Experience: <span className="text-xs text-gray-700 pl-3">{expandedCardData[career.jobId].experienceYear} years and {expandedCardData[career.jobId].experienceMonth} months</span>
//                     </p>
//                     <p className="text-sm font-bold">
//                       Age: <span className="text-xs text-gray-700 pl-3">{expandedCardData[career.jobId].age}</span>
//                     </p>
//                     <p className="text-sm font-bold">
//                       Work Mode:<span className="text-xs text-gray-700 pl-3">{expandedCardData[career.jobId].workMode}</span>
//                     </p>
//                     <p className="text-sm font-bold">
//                       Requirements:<span className="text-xs text-gray-700 pl-3">{expandedCardData[career.jobId].noOfRequirement}</span>
//                     </p>
//                     <p className="text-sm font-bold">
//                       Salary:<span className="text-xs text-gray-700 pl-4">{expandedCardData[career.jobId].salaryFrom} - {expandedCardData[career.jobId].salaryTo}</span>
//                     </p>
//                     <p className="text-sm font-bold">
//                       Skill Set:<span className="text-xs text-gray-700 pl-3">{expandedCardData[career.jobId].skillSet}</span>
//                     </p>
//                     <p className="text-sm font-bold">
//                       Job Description: <span className="text-xs text-gray-700">{expandedCardData[career.jobId].jobDescription}</span>
//                     </p>
//                     <p className="text-base font-bold mt-5">Status: Published</p>
//                   </>
//                 )}

//                 <div className="flex justify-end mt-2">
//                   <button
//                     className="flex float-end justify-end px-4 py-2 mt-2 ml-2 bg-white text-black border border-[#003179] rounded-lg"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDeleteClick(career);
//                     }}
//                   >
//                     Delete
//                   </button>
//                   <button
//                     className="flex float-end justify-end px-4 py-2 mt-2 bg-[#003179] text-white rounded-lg"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleEditClick(career);
//                     }}
//                   >
//                     Edit
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Pagination Controls with Page Numbers */}
//         {totalPages > 1 && (
//           <div className="flex justify-center mt-4">
//             <button
//               onClick={() => handlePageClick(currentPage - 1)}
//               disabled={currentPage === 0}
//               className={`px-4 py-2 mx-1 rounded-lg ${
//                 currentPage === 0
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
//               }`}
//             >
//               Previous
//             </button>
//             {pageNumbers.map((number) => (
//               <button
//                 key={number}
//                 onClick={() => handlePageClick(number)}
//                 className={`px-4 py-2 mx-1 rounded-lg ${
//                   currentPage === number
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
//                 }`}
//               >
//                 {number + 1}
//               </button>
//             ))}
//             <button
//               onClick={() => handlePageClick(currentPage + 1)}
//               disabled={currentPage === totalPages - 1}
//               className={`px-4 py-2 mx-1 rounded-lg ${
//                 currentPage === totalPages - 1
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>

//       {isModalOpen && (
//         <EditCareerPopup
//           onSave={handleSaveCareer}
//           onClose={handleCloseModal}
//           career={selectedCareer}
//         />
//       )}
//     </>
//   );
// }

// export default App;
