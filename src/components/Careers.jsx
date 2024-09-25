// import { AiTwotoneHome } from "react-icons/ai";
// import Edit from "./edie.jsx";
// import { useState } from "react";

// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [careers, setCareers] = useState([]);

//   const handleAddClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleSaveCareer = (newCareer) => {
//     setCareers([...careers, newCareer]);
//     setIsModalOpen(false);
//   };
//   const handleCloseMmodal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <div className="w-full lg:w-10/12 xl:w-8/12 mx-auto mt-7 bg-white rounded-md border border-black/90 shadow-md p-2">
//         <div className="flex items-center">
//           <AiTwotoneHome size={20} className="mr-2" />
//         </div>
//       </div>

//       <div className="flex justify-end gap-3 items-center">
//         {/* Add Button */}
//         <button
//           onClick={handleAddClick}
//           className="w-[73px] h-[36px] rounded-[6px]  mr-[16.25rem]  mt-4 bg-[#003179] text-white"
//         >
//           +Add
//         </button>
//       </div>

//       {/* Table */}
//       <div className="mt-4  overflow-x-auto">
//         <table className=" w-full lg:w-10/12 xl:w-8/12 mx-auto table-auto text-center border-collapse">
//           <thead>
//             <tr>
//               <th className="py-2 px-3 border-gray-300 border">Job Title</th>
//               <th className="py-2 px-3 border-gray-300 border">Job Location</th>
//               <th className="py-2 px-3 border-gray-300 border">
//                 No of Requirements
//               </th>
//               <th className="py-2 px-3 border-gray-300 border">Experience</th>
//               <th className="py-2 px-3 border-gray-300 border">Age</th>
//               <th className="py-2 px-3 border-gray-300 border">Start From</th>
//               <th className="py-2 px-3 border-gray-300 border">Start To</th>
//               <th className="py-2 px-3 border-gray-300 border">Job Type</th>
//               <th className="py-2 px-3 border-gray-300 border">Publish Date</th>
//               <th className="py-2 px-3 border-gray-300 border">Expired Date</th>
//               <th className="py-2 px-3 border-gray-300 border">Description</th>
//               <th className="py-2 px-3 border-gray-300 border">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* {careers.map((career, index) => ( */}
//             {careers.length > 0 ? (
//               careers.map((career, index) => (
//                 <tr key={index}>
//                   <td className="py-2 px-3 border">{career.jobTitle}</td>
//                   <td className="py-2 px-3 border">{career.jobLocation}</td>
//                   <td className="py-2 px-3 border">{career.noOfRequirement}</td>
//                   <td className="py-2 px-3 border">
//                     {career.experienceYear} years {career.experienceMonth}{" "}
//                     months
//                   </td>
//                   <td className="py-2 px-3 border">{career.age}</td>
//                   <td className="py-2 px-3 border">{career.salaryFrom}</td>
//                   <td className="py-2 px-3 border">{career.salaryTo}</td>
//                   <td className="py-2 px-3 border">{career.jobType}</td>
//                   <td className="py-2 px-3 border">{career.publishDate}</td>
//                   <td className="py-2 px-3 border">{career.expiredDate}</td>
//                   <td className="py-2 px-3 border">{career.jobDescription}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="py-2 px-3 border-gray-300 border">
//                   No career entries yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Render CareerPopup if isModalOpen is true */}
//       {isModalOpen && (
//         <Edit 
//           onSave={handleSaveCareer}
//           onClose={handleCloseMmodal}
//         />
//       )}
//     </>
//   );
// }
// // export default App;
// import { TiPencil } from "react-icons/ti";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { AiTwotoneHome } from "react-icons/ai";
// import EditCareerPopup from "./edie";
// import { useState } from "react";

// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [careers, setCareers] = useState([]);
//   const [selectedCareer, setSelectedCareer] = useState(null); // To store the career being edited


//   const handleAddClick = () => {
//     setIsModalOpen(true);
//     setSelectedCareer(null); // Reset for adding new career

//   };
//   const handleEditClick = (career) => {
//     setSelectedCareer(career); // Pass the career to be edited
//     setIsModalOpen(true);
//   };

//   const handleSaveCareer = (newCareer) => {
//     if (selectedCareer) {
//       // Edit existing career
//       const updatedCareers = careers.map((career) =>
//         career === selectedCareer ? newCareer : career
//       );
//       setCareers(updatedCareers);
//     } else {
//       // Add new career
//       setCareers([...careers, newCareer]);
//     }
//     setIsModalOpen(false);
//   };
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <div className="w-full lg:w-10/12 xl:w-9/12 mx-auto mt-7 bg-white rounded-md border border-black/90 shadow-md p-2">
//         <div className="flex items-center">
//           <AiTwotoneHome size={20} className="mr-2" />
//           <h1 className="text-lg">Careers Masters</h1>
//         </div>
//       </div>

//       <div className="flex justify-end gap-3 items-center">
//         <button
//           onClick={handleAddClick}
//           className="w-[73px] h-[36px] rounded-[6px]  mr-[12.25rem]  mt-4 bg-[#003179] text-white"
//         >
//           +Add
//         </button>
//       </div>

//       <div className="mt-4 overflow-x-auto">
//         <table className="w-full lg:w-11/12 xl:w-9/12 mx-auto table-auto text-center border-collapse">
//           <thead>
//             <tr>
//               <th className="py-2 px-3 border-gray-300 border">Job Title</th>
//               <th className="py-2 px-3 border-gray-300 border">Job Location</th>
//               <th className="py-2 px-3 border-gray-300 border">
//                 No of Requirements
//               </th>
//               <th className="py-2 px-3 border-gray-300 border">Experience</th>
//               <th className="py-2 px-3 border-gray-300 border">Age</th>
//               <th className="py-2 px-3 border-gray-300 border">Salary From</th>
//               <th className="py-2 px-3 border-gray-300 border">Salary To</th>
//               <th className="py-2 px-3 border-gray-300 border">Job Type</th>
//               <th className="py-2 px-3 border-gray-300 border">Publish Date</th>
//               <th className="py-2 px-3 border-gray-300 border">Expired Date</th>
//               <th className="py-2 px-3 border-gray-300 border">Description</th>
//               <th className="py-2 px-3 border-gray-300 border">status</th>
//               <th className="py-2 px-3 border-gray-300 border">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {careers.length > 0 ? (
//               careers.map((career, index) => (
//                 <tr key={index}>
//                   <td className="py-2 px-3 border">{career.jobTitle}</td>
//                   <td className="py-2 px-3 border">{career.jobLocation}</td>
//                   <td className="py-2 px-3 border">{career.noOfRequirement}</td>
//                   <td className="py-2 px-3 border">
//                     {career.experienceYear} years {career.experienceMonth} months
//                   </td>
//                   <td className="py-2 px-3 border">{career.age}</td>
//                   <td className="py-2 px-3 border">{career.salaryFrom}</td>
//                   <td className="py-2 px-3 border">{career.salaryTo}</td>
//                   <td className="py-2 px-3 border">{career.jobType}</td>
//                   <td className="py-2 px-3 border">{career.publishDate}</td>
//                   <td className="py-2 px-3 border">{career.expiredDate}</td>
//                   <td className="py-2 px-3 border">{career.jobDescription}</td>
//                   <td className="py-2 px-3 border">{career.status}</td>
//                   <td className="py-2 px-4 border-b border-gray-900 text-right">
//               <div className="flex flex-row">
//                 <TiPencil className="mr-2 cursor-pointer text-black-500 text-xs sm:text-sm" onClick={() => handleEditClick(career)} />
//                 <RiDeleteBin6Line className="cursor-pointer text-black-500 text-xs sm:text-sm"/>
//               </div>
//             </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="13" className="py-2 px-3 border">
//                   No career entries yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {isModalOpen && (
//         <EditCareerPopup onSave={handleSaveCareer} onClose={handleCloseModal}
//           career={selectedCareer} />
//       )}
//     </>
//   );
// }

// export default App;

// import { TiPencil } from "react-icons/ti";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { AiTwotoneHome } from "react-icons/ai";
// import EditCareerPopup from "./edie"; // Make sure you have this component
// import { useState } from "react";

// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCareer, setSelectedCareer] = useState(null);

//   const handleAddClick = () => {
//     setIsModalOpen(true);
//     setSelectedCareer(null); // Reset for adding new career
//   };

//   const handleSaveCareer = () => {
//     // Logic to save the career
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       {/* Header Section */}
//       <div className="w-full lg:w-10/12 xl:w-9/12 mx-auto mt-7 bg-white rounded-md border border-black/90 shadow-md p-3">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//             <AiTwotoneHome size={20} className="mr-2" />
//             <h1 className="text-lg font-bold">Careers Masters</h1>
//           </div>
//           <div className="flex gap-3 items-center">
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
//               Export to Excel
//             </button>
//             <button
//               onClick={handleAddClick}
//               className="w-[73px] h-[36px] rounded-[6px] bg-[#003179] text-white"
//             >
//               +Add
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Cards Section */}
//       <div className="w-full lg:w-10/12 xl:w-9/12 mx-auto mt-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {/* Card 1 */}
//         <div className="p-6 bg-white rounded-lg shadow-md border">
//           <h2 className="text-sm font-bold mb-2">Job Title :</h2>
//           <p className="text-sm">Role: Frontend Development</p>
//           <p className="text-sm">Job Location</p>
//           <p className="text-sm">Status: Published</p>
//           <p className="text-sm">Published Date: 06/09/2024</p>
//           <p className="text-sm">Expire Date: 06/09/2024</p>
//           <div className="flex justify-end mt-2">
//             <button className="text-blue-600">{" > "}</button>
//           </div>
//         </div>

//         {/* Card 2 (You can replicate as many cards as needed) */}
//         <div className="p-6 bg-white rounded-lg shadow-md border">
//           <h2 className="text-sm font-bold mb-2">Job ID :</h2>
//           <p className="text-sm">Role: Frontend Development</p>
//           <p className="text-sm">Status: Published</p>
//           <p className="text-sm">Published Date: 06/09/2024</p>
//           <p className="text-sm">Expire Date: 06/09/2024</p>
//           <div className="flex justify-end mt-2">
//             <button className="text-blue-600">{" > "}</button>
//           </div>
//         </div>
//       </div>

//       {/* Edit Modal */}
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
import { AiTwotoneHome } from "react-icons/ai"; 
import EditCareerPopup from "./edie"; // Make sure you have this component
import { useState } from "react";
import { MdOutlineExpandLess , MdOutlineExpandMore} from "react-icons/md";


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [careers, setCareers] = useState([]); // State to hold career cards
  const [expandedCardIndex, setExpandedCardIndex] = useState(null); // State to track expanded card

  const handleAddClick = () => {
    setIsModalOpen(true);
    setSelectedCareer(null); // Reset for adding new career
  };

  // const handleSaveCareer = (careerData) => {
  //   setCareers([...careers, careerData]); // Add the new career data to the careers list
  //   setIsModalOpen(false); // Close the modal after saving
  // };

  const handleSaveCareer = (careerData) => {
    if (selectedCareer !== null) {
      // Editing an existing career
      const updatedCareers = careers.map((career) =>
        career === selectedCareer ? careerData : career
      );
      setCareers(updatedCareers); // Update the careers state with the edited career
    } else {
      // Adding a new career
      setCareers([...careers, careerData]); // Add the new career data to the careers list
    }  
    setIsModalOpen(false); // Close the modal after saving
  };
    const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleExpandCard = (index) => {
    // Toggle the expanded card state - if already expanded, collapse it; otherwise, expand it
    setExpandedCardIndex(expandedCardIndex === index ? null : index);
  };

  const handleEditClick = (career) => {
    setSelectedCareer(career); // Set the career to be edited
    setIsModalOpen(true); // Open the modal
  };

  const handleDeleteClick = (career) => {
    // Delete the selected career
    const updatedCareers = careers.filter((c) => c !== career);
    setCareers(updatedCareers);
  };
  return (
    <>
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

      {/* Cards Section */}
      <div className="w-full lg:w-10/12 xl:w-9/12 mx-auto mt-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Render career cards from state */}
        {careers.map((career, index) => (
          <div
            key={index}
            className={`p-6 bg-white rounded-lg shadow-md border cursor-pointer transition-all duration-300 ease-in-out 
              ${expandedCardIndex === index ? "h-auto" : "h-40 overflow-hidden"}`}
            onClick={() => toggleExpandCard(index)} // Handle card click
          >
            <h2 className="text-lg font-bold">{career.jobTitle}</h2>
            <p className="text-base font-bold mb-2">Location:<span className="text-xs text-gray-700 pl-3"> {career.jobLocation}</span></p>
            <p className="text-sm font-bold">Role:  <span className="text-xs text-gray-700 pl-3">{career.jobType}</span></p>
            <p className="text-sm font-bold">Experience: <span className="text-xs text-gray-700 pl-3">{career.experienceYear} years and {career.experienceMonth} months</span></p>
            <p className="text-sm font-bold">Age: <span className="text-xs text-gray-700 pl-3">{career.age}</span></p>

            {/* Conditionally render more details if the card is expanded */}
            {expandedCardIndex === index && (
              <>
              <p className="text-sm font-bold">WorkMode:<span className="text-xs text-gray-700 pl-3">{career.workMode}</span></p>
                <p className="text-sm font-bold">Requirements:<span className="text-xs text-gray-700 pl-3">{career.noOfRequirement}</span> </p>
                <p className="text-sm font-bold">Salary:<span className="text-xs text-gray-700 pl-4">{career.salaryFrom} - {career.salaryTo}</span> </p>
                <p className="text-sm font-bold">Published Date:<span className="text-xs text-gray-700 mb-2 pl-2">{career.publishDate}</span> </p>
                <p className="text-sm font-bold">Expired Date:<span className="text-xs text-gray-700 pl-3">{career.expiredDate}</span> </p>
                <p className="text-sm font-bold">Skill Set:<span className="text-xs text-gray-700 pl-3">{career.skillSet}</span> </p>
                <p className="text-sm font-bold">Job Description: <span className="text-xs text-gray-700">{career.jobDescription}</span></p>
                <p className="text-bse font-bold mt-5">Status: Published</p>
                
              </>
            )}
     

            {/* Toggle expand/collapse button */}
            <div className="flex justify-end mt-2">
           
              <button className="text-blue-600" onClick={() =>toggleExpandCard(index)}>
              {expandedCardIndex === index ? (
                  <MdOutlineExpandLess size={24} />
                ) : (
                  <MdOutlineExpandMore size={24} />
                )}             
               
              </button>
              </div>
              <div>
              <button
                className=" flex float-end justify-end px-4 py-2 mt-2 ml-2 bg-white text-black border border-[#003179] rounded-lg"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  handleDeleteClick(career); // Open edit popup
                }}
              >
                Delete
              </button>
              <button
                className=" flex float-end justify-end px-4 py-2 mt-2 bg-[#003179] text-white rounded-lg"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  handleEditClick(career); // Open edit popup
                }}
              >
                Edit
              </button>          
              </div>       
              {/* <div className="flex justify-start pt-6">Cancel This Job</div>      */}
              {/*   should provide an link for that */}
          </div>
        ))}
      </div>

      {/* Edit Modal */}
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
// import React, { useState } from "react";
// import { AiTwotoneHome } from "react-icons/ai";
// import EditCareerPopup from "./edie"; // Ensure you have this component
// import DeleteConfirmationModal from "./DeletePopup"; // Import the DeleteConfirmationModal component
// import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
//   const [selectedCareer, setSelectedCareer] = useState(null);
//   const [careers, setCareers] = useState([]); // State to hold career cards
//   const [expandedCardIndex, setExpandedCardIndex] = useState(null); // State to track expanded card

//   const handleAddClick = () => {
//     setIsModalOpen(true);
//     setSelectedCareer(null); // Reset for adding new career
//   };

//   const handleSaveCareer = (careerData) => {
//     if (selectedCareer !== null) {
//       // Editing an existing career
//       const updatedCareers = careers.map((career) =>
//         career === selectedCareer ? careerData : career
//       );
//       setCareers(updatedCareers); // Update the careers state with the edited career
//     } else {
//       // Adding a new career
//       setCareers([...careers, careerData]); // Add the new career data to the careers list
//     }

//     setIsModalOpen(false); // Close the modal after saving
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const toggleExpandCard = (index) => {
//     // Toggle the expanded card state - if already expanded, collapse it; otherwise, expand it
//     setExpandedCardIndex(expandedCardIndex === index ? null : index);
//   };

//   const handleEditClick = (career) => {
//     setSelectedCareer(career); // Set the career to be edited
//     setIsModalOpen(true); // Open the modal
//   };

//   const handleDeleteClick = (career) => {
//     setSelectedCareer(career); // Store career to delete
//     setIsDeleteModalOpen(true); // Open delete confirmation modal
//   };

//   const confirmDelete = () => {
//     // Delete the selected career
//     const updatedCareers = careers.filter((c) => c !== selectedCareer);
//     setCareers(updatedCareers);
//     setIsDeleteModalOpen(false); // Close the delete confirmation modal
//   };

//   return (
//     <>
//       {/* Header Section */}
//       <div className="w-full lg:w-10/12 xl:w-9/12 mx-auto mt-7 bg-white rounded-md border border-black/90 shadow-md p-3">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//             <AiTwotoneHome size={20} className="mr-2" />
//             <h1 className="text-lg font-bold">Careers Masters</h1>
//           </div>
//           <div className="flex gap-3 items-center">
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
//               Export to Excel
//             </button>
//             <button
//               onClick={handleAddClick}
//               className="w-[73px] h-[36px] rounded-[6px] bg-[#003179] text-white"
//             >
//               +Add
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Cards Section */}
//       <div className="w-full lg:w-10/12 xl:w-9/12 mx-auto mt-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {/* Render career cards from state */}
//         {careers.map((career, index) => (
//           <div
//             key={index}
//             className={`p-6 bg-white rounded-lg shadow-md border cursor-pointer transition-all duration-300 ease-in-out 
//               ${expandedCardIndex === index ? "h-auto" : "h-40 overflow-hidden"}`}
//             onClick={() => toggleExpandCard(index)} // Handle card click
//           >
//             <h2 className="text-lg font-bold">{career.jobTitle}</h2>
//             <p className="text-base font-bold mb-2">Location:<span className="text-xs text-gray-700 pl-3"> {career.jobLocation}</span></p>
//             <p className="text-sm">Role:  <span className="text-xs text-gray-700 pl-3">{career.jobType}</span></p>
//             <p className="text-sm">Experience: <span className="text-xs text-gray-700 pl-3">{career.experienceYear} years and {career.experienceMonth} months</span></p>
//             <p className="text-sm">Age: <span className="text-xs text-gray-700 pl-3">{career.age}</span></p>

//             {/* Conditionally render more details if the card is expanded */}
//             {expandedCardIndex === index && (
//               <>
//                 <p className="text-sm">Requirements:<span className="text-xs text-gray-700 pl-3">{career.noOfRequirement}</span> </p>
//                 <p className="text-sm ">Salary:<span className="text-xs text-gray-700 pl-4">{career.salaryFrom} - {career.salaryTo}</span> </p>
//                 <p className="text-sm">Published Date:<span className="text-xs text-gray-700 mb-2 pl-2">{career.publishDate}</span> </p>
//                 <p className="text-sm">Expire Date:<span className="text-xs text-gray-700 pl-3">{career.expiredDate}</span> </p>
//                 <p className="text-sm font-bold">Description: <span className="text-xs text-gray-700">{career.jobDescription}</span></p>
//                 <p className="text-bse font-bold mt-5">Status: Published</p>
//               </>
//             )}

//             {/* Toggle expand/collapse button */}
//             <div className="flex justify-end mt-2">
//               <button className="text-blue-600" onClick={() => toggleExpandCard(index)}>
//                 {expandedCardIndex === index ? <MdOutlineExpandLess size={24} /> : <MdOutlineExpandMore size={24} />}
//               </button>
//             </div>

//             {/* Edit and Delete buttons */}
//             <div className="flex justify-end">
              
//               <button
//                 className="px-4 py-2 mt-2 bg-[#003179] text-white rounded-lg"
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent card click
//                   handleEditClick(career); // Open edit modal
//                 }}
//               >
//                 Edit
//               </button>
//               <button
//                 className="px-4 py-2 mt-2 bg-white text-black border border-[#003179] rounded-lg ml-2"
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent card click
//                   handleDeleteClick(career); // Open delete confirmation modal
//                 }}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for adding/editing careers */}
//       {isModalOpen && (
//         <EditCareerPopup
//           onSave={handleSaveCareer}
//           onClose={handleCloseModal}
//           career={selectedCareer}
//         />
//       )}

//       {/* Modal for delete confirmation */}
//       {isDeleteModalOpen && (
//         <DeleteConfirmationModal
//           onClose={() => setIsDeleteModalOpen(false)}
//           onConfirm={confirmDelete}
//         />
//       )}
//     </>
//   );
// }

// export default App;
