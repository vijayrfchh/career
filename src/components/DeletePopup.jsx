// import {useState } from "react";

// const DeleteConfirmationModal = ({ onClose, onConfirm }) => {
//   const [isChecked, setIsChecked] = useState(false);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       {/* Overlay */}
//       <div className="fixed inset-0 bg-black opacity-50"></div>

//       {/* Modal content */}
//       <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-md mx-auto">
//         <h2 className="text-lg font-bold mb-4">Do You Confirm Delete This Role</h2>
//         <div className="flex items-center mb-4">
//           <input
//             type="checkbox"
//             id="confirm"
//             checked={isChecked}
//             onChange={(e) => setIsChecked(e.target.checked)}
//             className="mr-2"
//           />
//           <label htmlFor="confirm">Click This Box For Confirmation</label>
//         </div>
//         <div className="flex justify-end space-x-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 text-black rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               if (isChecked) onConfirm();
//             }}
//             className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${!isChecked && "opacity-50 cursor-not-allowed"}`}
//             disabled={!isChecked}
//           >
//             Done
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteConfirmationModal;
