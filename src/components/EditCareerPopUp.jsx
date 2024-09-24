import { useState } from "react";


const CareerPopup = ({onSave, onClose}) => {
  // const [showPopup, setShowPopup] = useState(true);
  // Set to true for initial demo
  const [formValues, setFormValues] = useState({
    jobTitle: "",
    jobLocation: "",
    noOfRequirement: "",
    experienceYear: "",
    experienceMonth: "",
    skillSet: "",
    age: "",
    salaryFrom: "",
    salaryTo: "",
    jobType: "",
    publishDate: "",
    expiredDate: "",
    jobDescription: "",
  });
  const [errors, setErrors] = useState({});
  // const [careers, setCareers] = useState([]); 
  const validateForm = () => {
    let validationsErrors = {};
    ["jobType", "jobTitle", "jobLocation", "experience"].forEach((field) => {
      if (!formValues[field]) {
        validationsErrors[field] = `${field} is required.`;
      } else if (!/^[A-Za-z ]+$/.test(formValues[field])) {
        validationsErrors[field] = `${field} should be in string format.`;
      } else if (formValues[field].length < 2) {
        validationsErrors[field] = `${field} must be min 2 characters`;
      } else if (formValues[field].length > 20) {
        validationsErrors[field] = `${field} must be max 20 characters`;
      }
    });

 // Experience validation (experienceYear or experienceMonth should be selected)
 if (!formValues.experienceYear && !formValues.experienceMonth) {
  validationsErrors.experience = "Experience is required (year or month).";
}



    setErrors(validationsErrors);
    return Object.keys(validationsErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formValues);      // setCareers([...careers, formValues]);
      console.log("Form submitted successfully", formValues);
       setFormValues({
        jobTitle: "",
        jobLocation: "",
        noOfRequirement: "",
        experienceYear: "",
        experienceMonth: "",
        skillSet: "",
        age: "",
        salaryFrom: "",
        salaryTo: "",
        jobType: "",
        publishDate: "",
        expiredDate: "",
        jobDescription: "",
      });
    } else {
      console.log("Form is invalid", errors);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues ({...formValues, [name]:value});

  
    const regex = /^[a-zA-Z].*[\s]*$/;
    if (["jobType", "jobTitle", "jobLocation"].includes(name)) {
      if (value === "" || regex.test(value)) {
        setFormValues({ ...formValues, [name]: value });
        setErrors({ ...errors, [name]: "" });
      } else {
        setErrors({
          ...errors,
          [name]: "only letters allowed no space",
        });
        return;
      }
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  return (
    <>
     
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center overflow-auto">
         
          <div className="bg-white rounded-md p-4 h-auto shadow-lg w-full sm:w-10/12 md:w-9/12 lg:w-6/12 xl:w-5/12 relative mx-auto max-w-7xl border-2 mt-16 overflow-auto max-h-[90vh]">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="block text-gray-700">Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formValues.jobTitle}
                    onChange={handleChange}
                    className="border border-gray-300 p-1 rounded-md overflow-hidden whitespace-nowrap text-ellipsis"
                  />
                  {errors.jobTitle && (
                    <span className="text-red-800 block h-3">
                      {errors.jobTitle}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700">Job Location</label>
                  <input
                    type="text"
                    name="jobLocation"
                    value={formValues.jobLocation}
                    onChange={handleChange}
                    className="border border-gray-300 p-1 rounded-md overflow-hidden whitespace-nowrap text-ellipsis"
                  />
                  {errors.jobLocation && (
                    <span className="text-red-800 block h-3">
                      {errors.jobLocation}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700">
                    No of Requirement
                  </label>
                  <input
                    type="number"
                    name="noOfRequirement"
                    value={formValues.noOfRequirement}
                    onChange={handleChange}
                    className="border border-gray-300 p-1 rounded-md overflow-hidden whitespace-nowrap text-ellipsis"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700">Experience</label>

                  <div className="flex space-x-3">
                   
                    <div>
                      <select
                        name="experienceYear"
                        value={formValues.experienceYear}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            experienceYear: e.target.value,
                          })
                        }
                        className="border border-gray-300 p-1  rounded-md"
                      >
                        <option value="">Select Year</option>
                        {Array.from({ length: 50 }, (_, index) => (
                          <option key={index} value={index}>
                            {index} Year{index !== 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                   
                    <div>
                      <select
                        name="experienceMonth"
                        value={formValues.experienceMonth}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            experienceMonth: e.target.value,
                          })
                        }
                        className="border border-gray-300 p-1 rounded-md"
                      >
                        <option value="">Select Month</option>
                        {Array.from({ length: 12 }, (_, index) => (
                          <option key={index} value={index}>
                            {index} Month{index !== 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="block text-gray-700">Skill Set</label>
                  <input
                    type="text"
                    name="skillSet"
                    value={formValues.skillSet}
                    onChange={handleChange}
                    className="border border-gray-300 p-1 rounded-md overflow-hidden whitespace-nowrap text-ellipsis"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formValues.age}
                    onChange={handleChange}
                    className="border border-gray-300 p-1 rounded-md overflow-hidden whitespace-nowrap text-ellipsis"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700">Salary From</label>
                  <input
                    type="number"
                    name="salaryFrom"
                    value={formValues.salaryFrom}
                    onChange={handleChange}
                    className="border border-gray-300 p-1 rounded-md overflow-hidden whitespace-nowrap text-ellipsis"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700">Salary To</label>
                  <input
                    type="number"
                    name="salaryTo"
                    value={formValues.salaryTo}
                    onChange={handleChange}
                    className="border border-gray-300 p-1 rounded-md overflow-hidden whitespace-nowrap text-ellipsis"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700">Job Type</label>
                  <input
                    type="text"
                    name="jobType"
                    value={formValues.jobType}
                    onChange={handleChange}
                    className="border border-gray-300 p-1 rounded-md overflow-hidden whitespace-nowrap text-ellipsis"
                  />
                  {errors.jobType && (
                    <span className="text-red-800 block h-3">
                      {errors.jobType}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700">Publish Date</label>
                  <input
                    type="date"
                    name="publishDate"
                    value={formValues.publishDate}
                    onChange={handleChange}
                    className="border border-gray-300 p-1 rounded-md overflow-hidden whitespace-nowrap text-ellipsis"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700">Expired Date</label>
                  <input
                    type="date"
                    name="expiredDate"
                    value={formValues.expiredDate}
                    onChange={handleChange}
                    className="border border-gray-300 p-1 rounded-md overflow-hidden whitespace-nowrap text-ellipsis"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-gray-700">Job Description</label>
                <textarea
                  rows="2"
                  name="jobDescription"
                  value={formValues.jobDescription}
                  onChange={handleChange}
                  placeholder="Enter job description"
                  className="border border-gray-300 p-2 rounded-md w-full"
                ></textarea>
                <span className="text-xs text-gray-500">300 characters</span>
              </div>

            
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
                <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
              </div>
            </form>
          </div>
        </div>
      {/* )} */}
    </>
  );
};

export default CareerPopup;
