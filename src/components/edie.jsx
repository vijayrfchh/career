// import { useState } from "react";

// function EditCareerPopup({ onSave, onClose,career }) {
//   const [formData, setFormData] = useState({
//     jobTitle: "",
//     jobLocation: "",
//     noOfRequirement: "",
//     experienceYear: "",
//     experienceMonth: "",
//     age: "",
//     salaryFrom: "",
//     salaryTo: "",
//     jobType: "",
//     publishDate: "",
//     expiredDate: "",
//     jobDescription: "",
//   });
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     let validationsErrors = {};

//     ["jobType", "jobTitle", "jobLocation"].forEach((field) => {
//       if (!formData[field]) {
//         validationsErrors[field] = `${field} is required.`;
//       } else if (!/^[A-Za-z ]+$/.test(formData[field])) {
//         validationsErrors[field] = `${field} should be in string format.`;
//       } else if (formData[field].length < 2) {
//         validationsErrors[field] = `${field} must be min 2 characters`;
//       } else if (formData[field].length > 20) {
//         validationsErrors[field] = `${field} must be max 20 characters`;
//       }
//     });
//   // Validate noOfRequirement
//   if (!formData.noOfRequirement) {
//     validationsErrors.noOfRequirement = "No of Requirements is required.";
//   } else if (!/^\d+$/.test(formData.noOfRequirement)) {
//     validationsErrors.noOfRequirement = "No of Requirements must be a number.";
//   }
//   // Validate experienceYear
//   if (!formData.experienceYear) {
//     validationsErrors.experienceYear = "Experience (Years) is required.";
//   } else if (!/^\d+$/.test(formData.experienceYear)) {
//     validationsErrors.experienceYear = "Experience (Years) must be a number.";
//   }
//   // Validate experienceMonth
//   if (!formData.experienceMonth) {
//     validationsErrors.experienceMonth = "Experience (Months) is required.";
//   } else if (!/^\d+$/.test(formData.experienceMonth)) {
//     validationsErrors.experienceMonth = "Experience (Months) must be a number.";
//   }
//  // Set age to "---" if not provided
//  if (!formData.age) {
//     formData.age = "----";
//   }
//  // Validate salaryFrom
//  if (!formData.salaryFrom) {
//     validationsErrors.salaryFrom = "Salary From is required.";
//   } else if (!/^\d+$/.test(formData.salaryFrom) || formData.salaryFrom < 0) {
//     validationsErrors.salaryFrom = "Salary From must be a positive number.";
//   }
//    // Validate salaryTo
//    if (!formData.salaryTo) {
//     validationsErrors.salaryTo = "Salary To is required.";
//   } else if (!/^\d+$/.test(formData.salaryTo) || formData.salaryTo < 0) {
//     validationsErrors.salaryTo = "Salary To must be a positive number.";
//   }

//   // Validate jobDescription
//   if (!formData.jobDescription) {
//     validationsErrors.jobDescription = "Job Description is required.";
//   } else if (formData.jobDescription.length < 10) {
//     validationsErrors.jobDescription = "Job Description must be at least 10 characters.";
//   }
//  if(!formData.publishDate){
//     validationsErrors.publishDate = "Publish Date is required.";
//  }
//  if(!formData.expiredDate){
//     validationsErrors.expiredDate = "Expired Date is required.";
//  }
//     setErrors(validationsErrors);
//     return Object.keys(validationsErrors).length === 0;
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // onSave(formData);
//     if (validateForm()) {
//         onSave(formData);
//       console.log("Form submitted successfully", formData);
//       setFormData({
//         jobTitle: "",
//         jobLocation: "",
//         noOfRequirement: "",
//         experienceYear: "",
//         experienceMonth: "",
//         skillSet: "",
//         age: "",
//         salaryFrom: "",
//         salaryTo: "",
//         jobType: "",
//         publishDate: "",
//         expiredDate: "",
//         jobDescription: "",
//       });
//     }else {
//         console.log("Form is invalid", errors);
//       }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-md shadow-lg w-[700px]">
//         <h2 className="text-lg font-bold mb-4">New Career</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-3 gap-4 p-2">
//             <div>
//             <label className="block text-gray-900">Job Title</label>
//               <input
//                 type="text"
//                 name="jobTitle"
//                 // placeholder="Job Title"
//                 value={formData.jobTitle}
//                 onChange={handleChange}
//                 className="border p-2 border-gray-500 rounded-md"
//               />
//               {errors.jobTitle && (
//                 <span className="text-red-800 block h-3">
//                   {errors.jobTitle}
//                 </span>
//               )}
//             </div>
//             <div>
//             <label className="block text-gray-700">Job Location</label>
//               <input
//                 type="text"
//                 name="jobLocation"
//                 placeholder="Job Location"
//                 value={formData.jobLocation}
//                 onChange={handleChange}
//               className="border p-2 border-gray-500 rounded-md"
//               />
//               {errors.jobLocation && (
//                 <span className="text-red-800 block h-3">
//                   {errors.jobLocation}
//                 </span>
//               )}
//             </div>
//             <div>
//             <label className="block text-gray-700">No Of Requirements</label>
//               {" "}
//               <input
//                 type="number"
//                 name="noOfRequirement"
//                 placeholder="No of Requirements"
//                 value={formData.noOfRequirement}
//                 onChange={handleChange}
//              className="border p-2 border-gray-500 rounded-md"
//               />{errors.noOfRequirement && (
//                 <span className="text-red-800 block h-3">
//                   {errors.noOfRequirement}
//                 </span>
//               )}
//             </div>
//             <div>
//             <label className="block text-gray-700">Experience Year </label>
//               <input
//                 type="text"
//                 name="experienceYear"
//                 placeholder="Experience (Years)"
//                 value={formData.experienceYear}
//                 onChange={handleChange}
//               className="border p-2 border-gray-500 rounded-md"
//               />{errors.experienceYear && (
//                 <span className="text-red-800 block h-3">
//                   {errors.experienceYear}
//                 </span>
//               )}
//             </div>
//             <div>
//             <label className="block text-gray-700">Experience Months</label>
//               <input
//                 type="text"
//                 name="experienceMonth"
//                 placeholder="Experience (Months)"
//                 value={formData.experienceMonth}
//                 onChange={handleChange}
//               className="border p-2 border-gray-500 rounded-md"
//               />{errors.experienceMonth && (
//                 <span className="text-red-800 block h-3">
//                   {errors.experienceMonth}
//                 </span>
//               )}
//             </div>
//             <div>
//             <label className="block text-gray-700">Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 placeholder="Age"
//                 value={formData.age}
//                 onChange={handleChange}
//              className="border p-2 border-gray-500 rounded-md"
//               />{errors.age && (
//                 <span className="text-red-800 block h-3">
//                   {errors.age}
//                 </span>
//               )}
//             </div>
// <div>
// <label className="block text-gray-700">Salary From:</label>
//   {" "}
//   <input
//     type="number"
//     name="salaryFrom"
//     placeholder="Salary From"
//     value={formData.salaryFrom}
//     onChange={handleChange}
//   className="border p-2 border-gray-500 rounded-md"
//   />{errors.salaryFrom && (
//     <span className="text-red-800 block h-3">
//       {errors.salaryFrom}
//     </span>
//   )}
// </div>
// <div>
// <label className="block text-gray-700">Salary To:</label>
//   <input
//     type="number"
//     name="salaryTo"
//     placeholder="Salary To"
//     value={formData.salaryTo}
//     onChange={handleChange}
//    className="border p-2 border-gray-500 rounded-md"
//   />{errors.salaryTo && (
//     <span className="text-red-800 block h-3">
//       {errors.salaryTo}
//     </span>
//   )}
// </div>
// <div>
// <label className="block text-gray-700">Job Type</label>
//   <input
//     type="text"
//     name="jobType"
//     placeholder="Job Type"
//     value={formData.jobType}
//     onChange={handleChange}
//    className="border p-2 border-gray-500 rounded-md"
//   />{errors.jobType && (
//     <span className="text-red-800 block h-3">
//       {errors.jobType}
//     </span>
//   )}
// </div>
// <div className="flex flex-col">
// <label className="block text-gray-700">Publish Date:</label>
//   <input
//     type="date"
//     name="publishDate"
//     value={formData.publishDate}
//     onChange={handleChange}
//    className="border p-2 border-gray-500 rounded-md"
//   />
//   {errors.publishDate && (
//     <span className="text-red-800 block h-3">
//       {errors.publishDate}
//     </span>
//   )}
// </div>
// <div className="flex flex-col">
// <label className="block text-gray-700">Expired Date:</label>
//   <input
//     type="date"
//     name="expiredDate"
//     value={formData.expiredDate}
//     onChange={handleChange}
//    className="border p-2 border-gray-500 rounded-md"
//   />
//   {errors.expiredDate && (
//     <span className="text-red-800 block h-3">
//       {errors.expiredDate}
//     </span>
//   )}
// </div>
// <textarea
//   name="jobDescription"
//   placeholder="Job Description"
//   value={formData.jobDescription}
//   onChange={handleChange}
//   className="border p-2 col-span-2 border-gray-500 rounded-md"
//   rows="3"
// ></textarea>
// {errors.jobDescription && (
//     <span className="text-red-800 block h-3">
//       {errors.jobDescription}
//     </span>
//   )}
//           </div>

//           <div className="mt-4 flex justify-end ">
//           <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 mr-2 py-2 rounded-md"
//             >
//               Submit
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 text-black px-4 py-2 rounded-md"
//             >
//               Cancel
//             </button>

//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditCareerPopup;
import { useState, useEffect } from "react";

function EditCareerPopup({ onSave, onClose, career }) {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobLocation: "",
    noOfRequirement: "",
    experienceYear: "",
    experienceMonth: "",
    age: "",
    salaryFrom: "",
    salaryTo: "",
    jobType: "",
    workMode: "",
    publishDate: "",
    expiredDate: "",
    jobDescription: "",
  });
  const [errors, setErrors] = useState({});

  // Pre-fill the form if editing an existing career
  useEffect(() => {
    if (career) {
      setFormData(career);
    }
  }, [career]);

  const validateForm = () => {
    let validationsErrors = {};

    ["jobType", "jobTitle", "jobLocation"].forEach((field) => {
      if (!formData[field]) {
        validationsErrors[field] = `${field} is required.`;
      } else if (!/^[A-Za-z ,.-]+$/.test(formData[field])) {
        validationsErrors[field] = `${field} must be string .`;
      } else if (formData[field].length < 2) {
        validationsErrors[field] = `${field} must be min 2 characters`;
      } else if (formData[field].length > 20) {
        validationsErrors[field] = `${field} must be max 20 characters`;
      } 
    });
    //validate of skillset
    if (!formData.skillset) {
      validationsErrors.skillset = "skillset is required";
    }
    // Validate noOfRequirement
    if (!formData.noOfRequirement) {
      validationsErrors.noOfRequirement = " Requirements is required.";
    } else if (!/^\d+$/.test(formData.noOfRequirement)) {
      validationsErrors.noOfRequirement = "It must be a number.";
    }
    // Validate experienceYear
    if (!formData.experienceYear) {
      validationsErrors.experienceYear = "Experience is required.";
    } else if (!/^\d+$/.test(formData.experienceYear)) {
      validationsErrors.experienceYear = "Year must be a number.";
    } else if (parseInt(formData.experienceYear, 10) > 30) {
      validationsErrors.experienceYear = "It must not be morethan 30.";
    }
      
    // Validate experienceMonth
    if (!formData.experienceMonth) {
      validationsErrors.experienceMonth = "Month is required.";
    } else if (!/^\d+$/.test(formData.experienceMonth)) {
      validationsErrors.experienceMonth = "Month must be a  number.";
    } else if (parseInt(formData.experienceMonth, 10) > 12) {
      validationsErrors.experienceMonth = "It must not be morethan 12.";
    }
    
    
    if (!/^\d{2}$/.test(formData.age)) {
      // Check if the age is not exactly 2 digits
      validationsErrors.age = "It must be 2 digits.";
    } else if (formData.age < 18 || formData.age > 50) {
      // Age should be between 18 and 50
      validationsErrors.age = "should be 18 to 50.";
    } else if (!formData.age || formData.age <= 0) {
      // If no age is provided or age is zero or negative, set it to '---'
      formData.age = "---";
    } else {
      // Clear any previous age error if age is valid
      delete validationsErrors.age;
    }
    
    
  
    //workmode validataion
    if(!formData.workMode){
      validationsErrors.workMode = "Work Mode is required";
    }
    // Validate salaryFrom
    if (!formData.salaryFrom) {
      validationsErrors.salaryFrom = "Salary From is required.";
    } else if (!/^\d+$/.test(formData.salaryFrom) || formData.salaryFrom < 0) {
      validationsErrors.salaryFrom = "No Negative Number.";
    }
    // Validate salaryTo
    if (!formData.salaryTo) {
      validationsErrors.salaryTo = "Salary To is required.";
    } else if (!/^\d+$/.test(formData.salaryTo) || formData.salaryTo < 0) {
      validationsErrors.salaryTo = "No Negative Number.";
    }

    // Validate jobDescription
    if (!formData.jobDescription) {
      validationsErrors.jobDescription = "Job Description is required.";
    } else if (formData.jobDescription.length < 10) {
      validationsErrors.jobDescription =
        "Job Description must be at least 10 characters.";
    } else if (formData.jobDescription.length > 300) {
      validationsErrors.jobDescription =
        "Job Description should not be morethan 300 characters";
    }
    if (!formData.publishDate) {
      validationsErrors.publishDate = "Publish Date is required.";
    }
    if (!formData.expiredDate) {
      validationsErrors.expiredDate = "Expired Date is required.";
    }
    setErrors(validationsErrors);
    return Object.keys(validationsErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    //for preventing space ..
    const regex = /^[a-zA-Z].*[\s]*$/;
    if (["jobType", "jobTitle", "jobLocation","skillSet ","noOfRequirements","jobDescription","experienceMonth","experienceYear"].includes(name)) {
      if (value === "" || regex.test(value)) {
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
      } else {
        setErrors({
          ...errors,
          [name]: "No space allowed",
        });
        return;
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData); // Pass the form data back to the parent
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-[700px]">
        <h2 className="text-lg font-bold mb-4">New Career</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4 p-2">
            <div>
              <label className="block text-gray-900">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="border p-2 border-gray-500 rounded-md"
              />
              {errors.jobTitle && (
                <span className="text-red-800 block h-3">
                  {errors.jobTitle}
                </span>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Job Location</label>
              <input
                type="text"
                name="jobLocation"
                value={formData.jobLocation}
                onChange={handleChange}
                className="border p-2 border-gray-500 rounded-md"
              />
              {errors.jobLocation && (
                <span className="text-red-800 block h-3">
                  {errors.jobLocation}
                </span>
              )}
            </div>
            <div>
              <label className="block text-gray-700">No Of Requirements</label>{" "}
              <input
                type="text"
                name="noOfRequirement"
                placeholder="No of Requirements"
                value={formData.noOfRequirement}
                onChange={handleChange}
                className="border p-2 border-gray-500 rounded-md"
              />
              {errors.noOfRequirement && (
                <span className="text-red-800 block h-3">
                  {errors.noOfRequirement}
                </span>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Experience Year </label>
              <input
                type="text"
                name="experienceYear"
                placeholder="Experience (Years)"
                minLength={2}
                maxLength={2}
                value={formData.experienceYear}
                onChange={handleChange}
                className="border p-2 border-gray-500 rounded-md"
              />
              {errors.experienceYear && (
                <span className="text-red-800 block h-3">
                  {errors.experienceYear}
                </span>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Experience Months</label>{" "}
              <input
                type="text"
                name="experienceMonth"
                placeholder="Experience (Months)"
                minLength={2}
                maxLength={2}
                value={formData.experienceMonth}
                onChange={handleChange}
                className="border p-2 border-gray-500 rounded-md"
              />
              {errors.experienceMonth && (
                <span className="text-red-800 block h-3">
                  {errors.experienceMonth}
                </span>
              )}
            </div>
        
          <div>
            <label className="block text-gray-700">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="border p-2 border-gray-500 rounded-md w-full"
            >
              <option value="">Select Job Type</option>
              <option value="contractToHire">Contract To Hire</option>
              <option value="full time">Full Time</option>
              <option value="part time">Part Time</option>
              <option value="freelance">Freelance</option>
              <option value="internship">Internship</option>
            </select>
            {errors.jobType && (
              <span className="text-red-800 block h-3">{errors.jobType}</span>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Work Mode</label>
            <select
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              className="border p-2 border-gray-500 rounded-md w-full"
            >
              <option value="">Select Work Mode</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="office">Office</option>           
            </select>
            {errors.workMode && (
              <span className="text-red-800 block h-3">{errors.workMode}</span>
            )}
          </div>
            <div>
              <label className="block text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                minLength={2}
                maxLength={2}
                onChange={handleChange}
                className="border p-2 border-gray-500 rounded-md"
              />
              {errors.age && (
                <span className="text-red-800 block h-3">{errors.age}</span>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Salary From:</label>{" "}
              <input
                type="text"
                name="salaryFrom"
                placeholder="Salary From"
                value={formData.salaryFrom}
                minLength={5}
                maxLength={10}
                onChange={handleChange}
                className="border p-2 border-gray-500 rounded-md"
              />
              {errors.salaryFrom && (
                <span className="text-red-800 block h-3">
                  {errors.salaryFrom}
                </span>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Salary To:</label>
              <input
                type="text"
                name="salaryTo"
                placeholder="Salary To"
                value={formData.salaryTo}
                minLength={5}
                maxLength={10}
                onChange={handleChange}
                className="border p-2 border-gray-500 rounded-md"
              />
              {errors.salaryTo && (
                <span className="text-red-800 block h-3">
                  {errors.salaryTo}
                </span>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Skill Set:</label>
              <input
                type="text"
                name="skillset"
                placeholder="Skills"
                value={formData.skillset}
                onChange={handleChange}
                className="border p-2 border-gray-500 rounded-md"
              />
              {errors.skillset && (
                <span className="text-red-800 block h-3">
                  {errors.skillset}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700">Publish Date:</label>
              <input
                type="date"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
                onKeyDown={(e) => e.preventDefault()}
                className="border p-2 border-gray-500 rounded-md"
              />
              {errors.publishDate && (
                <span className="text-red-800 block h-3">
                  {errors.publishDate}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">Expired Date:</label>
              <input
                type="date"
                name="expiredDate"
                value={formData.expiredDate}
                onChange={handleChange}
                onKeyDown={(e) => e.preventDefault()}
                className="border p-2 border-gray-500 rounded-md"
              />
              {errors.expiredDate && (
                <span className="text-red-800 block h-3">
                  {errors.expiredDate}
                </span>
              )}
            </div>
            <textarea
              name="jobDescription"
              placeholder="Job Description........"
              value={formData.jobDescription}
              onChange={handleChange}
              className="border p-2 col-span-2 border-gray-500 rounded-md"
              rows="3"
            ></textarea>
            {errors.jobDescription && (
              <span className="text-red-800 block h-3">
                {errors.jobDescription}
              </span>
            )}
            {/* Add other form fields similarly */}
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 mr-2 py-2 bg-blue-600 text-white rounded-lg"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCareerPopup;
