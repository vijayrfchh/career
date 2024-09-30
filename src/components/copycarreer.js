import { useState, useEffect } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import EditCareerPopup from "./edie";
import axios from "axios";

function App() {
  // State variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [careers, setCareers] = useState([]); // Current page's job posts
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [isLoading, setIsLoading] = useState(false); // Loading state for job posts
  const jobsPerPage = 5;
  const backendBaseURL = "http://192.168.0.119:8080/hrmsapplication/carrers";

  // Fetch job posts when the component mounts or currentPage changes
  useEffect(() => {
    fetchJobPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]); // Added currentPage as dependency

  // Function to fetch job posts based on currentPage and jobsPerPage
  const fetchJobPosts = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(
        ${backendBaseURL}/getJobPosts?pageNumber=${currentPage - 1}&size=${jobsPerPage}
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
          isLoadingDetails: false, // To track loading state for details
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
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Handler to open the Add/Edit modal
  const handleAddClick = () => {
    setIsModalOpen(true);
    setSelectedCareer(null);
  };

  // Handler to save career data (add or edit)
  const handleSaveCareer = (careerData) => {
    if (selectedCareer !== null) {
      const updatedCareers = careers.map((career) =>
        career.jobId === selectedCareer.jobId ? careerData : career
      );
      setCareers(updatedCareers);
    } else {
      setCareers([...careers, careerData]);
    }
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
    if (!job.jobLocation && !job.isLoadingDetails) {
      try {
        // Set loading state
        const updatedCareers = [...careers];
        updatedCareers[index].isLoadingDetails = true;
        setCareers(updatedCareers);

        // Fetch detailed job data using jobId
        const response = await axios.get(${backendBaseURL}/${job.jobId});

        console.log(Details for jobId ${job.jobId}:, response.data);

        // Assuming the detailed API returns an object with the additional fields
        const detailedJob = response.data;

        // Update the job in the careers state with the detailed data
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
          isLoadingDetails: false, // Loading complete
        };

        setCareers(updatedCareers);
      } catch (error) {
        console.error("Error fetching job details:", error);
        alert("Failed to fetch job details. Please try again later.");
        // Reset loading state in case of error
        const updatedCareers = [...careers];
        updatedCareers[index].isLoadingDetails = false;
        setCareers(updatedCareers);
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
    const confirmDelete = window.confirm(`
      Are you sure you want to delete the job "${career.jobTitle}"?
    `);
    if (!confirmDelete) return;

    try {
      // Send DELETE request to the backend
      const deleteUrl = ${backendBaseURL}/deletecareers/${career.jobId};
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
      alert(Job "${career.jobTitle}" has been successfully deleted.);
    } catch (error) {
      console.error("Error deleting job post:", error);
      alert("Failed to delete the job post. Please try again.");
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
          {isLoading ? (
            // Loading Indicator
            <p className="text-center col-span-full">Loading job posts...</p>
          ) : careers.length === 0 ? (
            // No Jobs Found Message
            <p className="text-center col-span-full">No job posts available.</p>
          ) : (
            careers.map((career, index) => (
              <div
                key={career.jobId} // Use unique identifier for key
                className={p-6 bg-white rounded-lg shadow-md border cursor-pointer transition-all duration-300 ease-in-out 
                  ${
                    expandedCardIndex === index
                      ? "h-auto"
                      : "h-40 overflow-hidden"
                  }}
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

                {/* Loading Indicator for Details */}
                {career.isLoadingDetails && (
                  <p className="text-sm text-gray-500">Loading details...</p>
                )}

                {/* Detailed Job Information */}
                {expandedCardIndex === index && !career.isLoadingDetails && (
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
                    <div>

                      <p>Cancel This Job</p>
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