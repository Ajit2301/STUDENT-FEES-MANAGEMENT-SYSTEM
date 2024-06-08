import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import GenerateInvoice from './GenerateInvoice'; 
import Invoices from './Invoices';
import "./InvoiceCreate.css"
function InvoiceCreate() {
  const [sno, setSno] = useState('');
  const [sname, setSname] = useState('');
  const [course, setCourse] = useState('');
  const [fees, setFees] = useState('');
  const [payingAmount, setPayingAmount] = useState('');
  const [paidAmount, setPaidAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [isDataFound, setIsDataFound] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [updateDetails, setUpdateDetails] = useState([]);
  const [invoiceData, setInvoiceData] = useState(null);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
  const [showInvoiceNumInput, setShowInvoiceNumInput] = useState(false); 
  const [invoiceNum, setInvoiceNum] = useState('');

  useEffect(() => {
    getCurrentDateTime();
    generateInvoiceNum(); 
  }, []);

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString();
    setCurrentDateTime(formattedDateTime);
  };
  const generateInvoiceNum = () => { 
    Axios.get(`http://127.0.0.1:4002/api/lastInvoiceNum`)
        .then((res) => {
            const lastInvoiceNum = res.data.lastInvoiceNum;
            const nextInvoiceNum = lastInvoiceNum ? parseInt(lastInvoiceNum.split("STUD2024")[1]) + 1 : 1; // Extract the numeric part and increment
            setInvoiceNum(`STUD2024${nextInvoiceNum.toString().padStart(2, '0')}`);
        })
       

      .catch((err) => {
        console.log(err);
        alert('Error occurred while fetching last invoice number.');
      });
  }

 

  const findStudentData = () => {
    Axios.get(`http://127.0.0.1:4002/api/invoicefind`, { params: { sno: sno } })
      .then((res) => {
        const studentData = res.data[0];
        if (studentData) {
          setIsDataFound(true);
          setSname(studentData.sname);
          setCourse(studentData.course);
          setFees(studentData.fees);
          const remaining = parseInt(studentData.fees) - (parseInt(paidAmount) + parseInt(payingAmount));
          setRemainingAmount(remaining);
        } else {
          setIsDataFound(false);
          alert('Student not found.');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Error occurred during find operation.');
      });
  };

  const findAmountToBeCreated = (item) => {
    setPaidAmount(item.updatedPaidAmount)
    setRemainingAmount(item.remainingAmount)
    Axios.get(`http://127.0.0.1:4002/api/findAmount`, { params: { sno: sno } })
      .then((res) => {
        const studentData = res.data[0];
        if (studentData) {
          setIsDataFound(true);
          setUpdateDetails(res.data); 
          setFees(studentData.fees);
          const remaining = parseInt(studentData.fees) - (parseInt(paidAmount) + parseInt(payingAmount));
          setRemainingAmount(remaining);
          const updatedPaidAmount = parseInt(studentData.updatedPaidAmount);
          const updatedRemainingAmount = parseInt(studentData.remainingAmount);
          setPaidAmount(updatedPaidAmount);
          setRemainingAmount(updatedRemainingAmount);
        } else {
          setIsDataFound(false);
          alert('Student not found.');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Error occurred during find operation.');
      });
  };

  const updateRemainingAmount = (value) => {
    const remaining = parseInt(fees) - (parseInt(paidAmount) + parseInt(value));
    setPayingAmount(value);
    setRemainingAmount(remaining);
  };
  
  
  const createInvoice = (e) => {
    e.preventDefault();
   
    const updatedPaidAmount = parseInt(paidAmount) + parseInt(payingAmount);
    setPaidAmount(updatedPaidAmount);
    const updatedRemainingAmount = parseInt(remainingAmount) - parseInt(payingAmount);
    setRemainingAmount(updatedRemainingAmount);
    Axios.get(`http://127.0.0.1:4002/api/createInvoice`, {
      params: { 
      // InvoiceNumber:invoiceNum,
        sno: sno, 
        sname: sname,
        course: course,
        fees: parseInt(fees),
        payingAmount: parseInt(payingAmount),
        updatedPaidAmount: parseInt(updatedPaidAmount),
        remainingAmount:remainingAmount,
        paymentMethod: paymentMethod,
        currentDateTime: currentDateTime
      }
    })
      .then((res) => {
        console.log(res.data);
        setUpdateDetails(res.data);
        alert('Insert operation successful.');
        findStudentData();
        generateInvoiceNum();
      })
      .catch((err) => {
        console.log(err);
        alert('Error occurred during insert operation.');
      });
      setShowInvoiceNumInput(true);
    
  };
  
  const updateInvoice = () => {
    const updatedPaidAmount = parseInt(paidAmount) + parseInt(payingAmount);
    setPaidAmount(updatedPaidAmount);
    Axios.get(`http://127.0.0.1:4002/api/updateInvoice`, {
      params: { 
        sno: sno, 
        sname: sname,
        course: course,
        fees: parseInt(fees),
        payingAmount: parseInt(payingAmount),
        updatedPaidAmount: parseInt(updatedPaidAmount),
        remainingAmount:remainingAmount,
        paymentMethod: paymentMethod,
        currentDateTime: currentDateTime
      }
    })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          console.log(res.data[0]);
          setUpdateDetails(res.data);
          alert('Update operation successful.');
        } else {
          console.log("No data received from the server.");
          alert('Update operation failed: No data received from the server.');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Error occurred during update operation.');
      });
  };
  
  const generateInvoice = () => {
    setInvoiceData({
      invoiceNum,
      sno,
      sname,
      course,
      fees,
      payingAmount,
      paidAmount,
      remainingAmount,
      currentDateTime,
      paymentMethod
    });
    setInvoiceGenerated(true);
  }
  
  return (
    <div className='row justify-content-center  animate__animated animate__bounceIn'>
      <h2 className="text-center mt-5 animate__animated animate__bounceIn">CREATE INVOICES</h2>
      <div className="col-md-6">
      {invoiceGenerated ? (
        <GenerateInvoice {...invoiceData} />
      ) : (
        <form style={{ maxWidth: '700' }}>
          <div className=" mb-3 animate__animated animate__backInLeft animate__delay-1s">
            <label htmlFor="sno"><strong>Student ID:</strong></label>
            <input
              type="text"
              className="form-control"
              id="sno"
               value={sno}
              placeholder="Enter student ID"
              onChange={(e) => setSno(e.target.value)}
            />
          </div>
          {isDataFound && (
            <>
              <div className="mb-3 animate__animated animate__backInRight animate__delay-1s">
                <label htmlFor="sname"><strong>Student Name</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="sname"
                  value={sname}
                  disabled
                />
              </div>
              <div className="mb-3 animate__animated animate__backInRight animate__delay-1s">
                <label htmlFor="course"><strong>Course</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="course"
                  value={course}
                  disabled
                />
              </div>
              <div className="mb-3 animate__animated animate__backInRight animate__delay-1s">
                <label htmlFor="fees"><strong>Fees</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="fees"
                  value={fees}
                  disabled
                />
              </div>
              <div className="mb-3 animate__animated animate__backInRight animate__delay-1s">
                <label htmlFor="payingAmount"><strong>Paying Amount</strong></label>
                <input
                  type="text"
                  className="form-control animate__animated animate__backInRight animate__delay-1s"
                  id="payingAmount"
                  placeholder="Enter paying amount"
                  value={payingAmount}
                  onChange={(e) => updateRemainingAmount(e.target.value)}
                />
              </div>
              <div className="mb-3 animate__animated animate__backInRight animate__delay-1s">
                <label htmlFor="paidAmount"><strong>Paid Amount</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="paidAmount"
                  value={paidAmount}
                  disabled
                />
              </div>
              <div className="mb-3 animate__animated animate__backInRight animate__delay-1s">
                <label htmlFor="remainingAmount"><strong>Remaining Amount</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="remainingAmount"
                  value={remainingAmount}
                  disabled
                  onChange={(e) => setRemainingAmount(e.target.value)}
                />
              </div>
              <div className="mb-3 animate__animated animate__backInRight animate__delay-1s">
                <label htmlFor="currentDateTime"><strong>Current Date and Time</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="currentDateTime"
                  value={currentDateTime}
                  disabled
                />
              </div>
              <div className="mb-3 animate__animated animate__backInRight animate__delay-1s">
                <label htmlFor="paymentMethod"><strong>Payment Method</strong></label>
                <select
                  className="form-control"
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="">Select payment method</option>
                  <option value="online">Online</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
              <div className='mb-3 animate__animated animate__backInLeft animate__delay-1s'>
  <button type="button" className="btn btn-primary w-10 h-10 mx-2" onClick={updateInvoice}>Update</button>
  <button type="button" className="btn btn-secondary w-10 h-10 mx-2" onClick={findAmountToBeCreated}>Paid Amount</button>
  <button type="button" className="btn btn-success w-10 h-10 my-2" onClick={createInvoice}>Create Invoice</button>
  <button type="button" className="btn btn-info w-10 h-10 mx-2" onClick={generateInvoice}>Generate Invoice</button>
</div>

            </>
          )}
          <button type="button" className="btn btn-primary w-10 h-10 mx-2 animate__animated animate__backInRight animate__delay-2s" onClick={findStudentData}>Find</button>
          {showInvoiceNumInput && ( // Conditionally render invoice num input
            <div className="form-group">
              <label htmlFor="invoiceNum">Invoice Number</label>
              <input
                type="text"
                className="form-control"
                id="invoiceNum"
                value={invoiceNum}
                disabled // Disable input so that users cannot edit the invoice num
              />
            </div>
          )}
        </form>
      )}
    </div>
    </div>
  );
}

export default InvoiceCreate;

// import React, { useState, useEffect } from 'react';
// import Axios from 'axios';

// function InvoiceCreate() {
//   const [sno, setSno] = useState('');
//   const [sname, setSname] = useState('');
//   const [course, setCourse] = useState('');
//   const [fees, setFees] = useState('');
//   const [payingAmount, setPayingAmount] = useState('');
//   const [paidAmount, setPaidAmount] = useState(0);
//   const [remainingAmount, setRemainingAmount] = useState('');
//   
// const [currentDateTime, setCurrentDateTime] = useState('');
//   const [isDataFound, setIsDataFound] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('');

//   useEffect(() => {
//     getCurrentDateTime();
//   }, []);

//   const getCurrentDateTime = () => {
//     const currentDate = new Date();
//     const formattedDateTime = currentDate.toLocaleString();
//     setCurrentDateTime(formattedDateTime);
//   };

//   const findStudentData = () => {
//     Axios.get(`http://127.0.0.1:4002/api/invoicefind`, { params: { sno: sno } })
//       .then((res) => {
//         const studentData = res.data[0];
//         if (studentData) {
//           setIsDataFound(true);
//           setSname(studentData.sname);
//           setCourse(studentData.course);
//           setFees(studentData.fees);
//           const remaining = parseInt(studentData.fees) - (parseInt(paidAmount) + parseInt(payingAmount));
//           setRemainingAmount(remaining);
//         } else {
//           setIsDataFound(false);
//           alert('Student not found.');
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Error occurred during find operation.');
//       });
//   };

//   const findAmountToBeCreated = () => {
//     Axios.get(`http://127.0.0.1:4002/api/find`, { params: { sno: sno } })
//       .then((res) => {
//         const studentData = res.data[0];
//         if (studentData) {
//           setIsDataFound(true);
//           setFees(studentData.fees);
//           const remaining = parseInt(studentData.fees) - (parseInt(paidAmount) + parseInt(payingAmount));
//           setRemainingAmount(remaining);
//         } else {
//           setIsDataFound(false);
//           alert('Student not found.');
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Error occurred during find operation.');
//       });
//   };

//   const updateRemainingAmount = (value) => {
//     const remaining = parseInt(fees) - (parseInt(paidAmount) + parseInt(value));
//     setPayingAmount(value);
//     setRemainingAmount(remaining);
//   };

//   const createInvoice = (e) => {
//     e.preventDefault();
//     const updatedPaidAmount = parseInt(paidAmount) + parseInt(payingAmount);
//     setPaidAmount(updatedPaidAmount);
//     Axios.get(`http://127.0.0.1:4002/api/createInvoice`, {
//       params: { 
//         sno: sno, 
//         sname: sname,
//         course: course,
//         fees: parseInt(fees),
//         payingAmount: parseInt(payingAmount),
//         paidAmount: parseInt(updatedPaidAmount),
//         remainingAmount:remainingAmount,
//         paymentMethod: paymentMethod,
//         currentDateTime: currentDateTime
//       }
//     })
//       .then((res) => {
//         console.log(res.data)
//         alert('Insert operation successful.');
//         findStudentData()
//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Error occurred during insert operation.');
//       });
//   };
  
//   const updateInvoice = () => {
//     const updatedPaidAmount = parseInt(paidAmount) + parseInt(payingAmount);
//     setPaidAmount(updatedPaidAmount);
//     Axios.get(`http://127.0.0.1:4002/api/updateInvoice`, {
//       params: { 
//         sno: sno, 
//         fees: parseInt(fees),
//         payingAmount: parseInt(payingAmount),
//         paidAmount: parseInt(updatedPaidAmount),
//         remainingAmount:remainingAmount,
//         paymentMethod: paymentMethod,
//         currentDateTime: currentDateTime
//       }
//     })
//       .then((res) => {
//         console.log(res.data[0]);
//         alert('Update operation successful.');
      

//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Error occurred during update operation.');
//       });
//   };
  
//   return (
//     <div>
//       <h2>Create Invoice</h2>
      // <form>
      //   <div className="form-group">
      //     <label htmlFor="sno">Student ID</label>
      //     <input
      //       type="text"
      //       className="form-control"
      //       id="sno"
      //       value={sno}
      //       placeholder="Enter student ID"
      //       onChange={(e) => setSno(e.target.value)}
      //     />
      //   </div>
      //   {isDataFound && (
      //     <>
      //       <div className="form-group">
      //         <label htmlFor="sname">Student Name</label>
      //         <input
      //           type="text"
      //           className="form-control"
      //           id="sname"
      //           value={sname}
      //           disabled
      //         />
      //       </div>
      //       <div className="form-group">
      //         <label htmlFor="course">Course</label>
      //         <input
      //           type="text"
      //           className="form-control"
      //           id="course"
      //           value={course}
      //           disabled
      //         />
      //       </div>
      //       <div className="form-group">
      //         <label htmlFor="fees">Fees</label>
      //         <input
      //           type="text"
      //           className="form-control"
      //           id="fees"
      //           value={fees}
      //           disabled
      //         />
      //       </div>
      //       <div className="form-group">
      //         <label htmlFor="payingAmount">Paying Amount</label>
      //         <input
      //           type="text"
      //           className="form-control"
      //           id="payingAmount"
      //           placeholder="Enter paying amount"
      //           value={payingAmount}
      //           onChange={(e) => updateRemainingAmount(e.target.value)}
      //         />
      //       </div>
      //       <div className="form-group">
      //         <label htmlFor="paidAmount">Paid Amount</label>
      //         <input
      //           type="text"
      //           className="form-control"
      //           id="paidAmount"
      //           value={paidAmount}
      //           disabled
      //         />
      //       </div>
      //       <div className="form-group">
      //         <label htmlFor="remainingAmount">Remaining Amount</label>
      //         <input
      //           type="text"
      //           className="form-control"
      //           id="remainingAmount"
      //           value={remainingAmount}
      //           disabled
      //         />
      //       </div>
      //       <div className="form-group">
      //         <label htmlFor="currentDateTime">Current Date and Time</label>
      //         <input
      //           type="text"
      //           className="form-control"
      //           id="currentDateTime"
      //           value={currentDateTime}
      //           disabled
      //         />
      //       </div>
      //       <div className="form-group">
      //         <label htmlFor="paymentMethod">Payment Method</label>
      //         <select
      //           className="form-control"
      //           id="paymentMethod"
      //           value={paymentMethod}
      //           onChange={(e) => setPaymentMethod(e.target.value)}
      //         >
      //           <option value="">Select payment method</option>
      //           <option value="online">Online</option>
      //           <option value="cash">Cash</option>
      //         </select>
      //       </div>
      //     </>
      //   )}
      //   <button type="button" className="btn btn-primary" onClick={findStudentData}>Find</button>
      //   <button type="button" className="btn btn-primary" onClick={updateInvoice}>Update</button>
      //   <button type="button" className="btn btn-primary" onClick={findAmountToBeCreated}>Find Amount to be Created</button>
      //   <button type="button" className="btn btn-primary" onClick={createInvoice}>Create Invoice</button>
      // </form>
//     </div>
//   );
// }

// export default InvoiceCreate;

// import React, { useState, useEffect } from 'react';
// import Axios from 'axios';

// function InvoiceCreate() {
//   const [sno, setSno] = useState('');
//   const [sname, setSname] = useState('');
//   const [course, setCourse] = useState('');
//   const [fees, setFees] = useState('');
//   const [payingAmount, setPayingAmount] = useState('');
//   const [paidAmount, setPaidAmount] = useState(0);
//   const [remainingAmount, setRemainingAmount] = useState('');
//   const [currentDateTime, setCurrentDateTime] = useState('');
//   const [isDataFound, setIsDataFound] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('');

//   const getCurrentDateTime = () => {
//     const currentDate = new Date();
//     const formattedDateTime = currentDate.toLocaleString();
//     setCurrentDateTime(formattedDateTime);
//   };

//   useEffect(() => {
//     getCurrentDateTime();
//   }, []);

//   const find = () => {
//     Axios.get(`http://127.0.0.1:4002/api/invoicefind`, { params: { sno: sno } })
//       .then((res) => {
//         const studentData = res.data[0];
//         if (studentData) {
//           setIsDataFound(true);
//           setSname(studentData.sname);
//           setCourse(studentData.course);
//           setFees(studentData.fees);
//           const remaining = parseInt(studentData.fees) - (parseInt(paidAmount) + parseInt(payingAmount));
//           setRemainingAmount(remaining);
//         } else {
//           setIsDataFound(false);
//           alert('Student not found.');
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Error occurred during find operation.');
//       });
//   };
//   const findAmountToBeCreated = () => {
//     Axios.get(`http://127.0.0.1:4002/api/find`, { params: { sno: sno } })
//       .then((res) => {
//         const studentData = res.data[0];
//         if (studentData) {
//           setIsDataFound(true);
//           setFees(studentData.fees);
//           const remaining = parseInt(studentData.fees) - (parseInt(paidAmount) + parseInt(payingAmount));
//           setRemainingAmount(remaining);
//         } else {
//           setIsDataFound(false);
//           alert('Student not found.');
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Error occurred during find operation.');
//       });
//   };

//   const updateRemainingAmount = (value) => {
//     const remaining = parseInt(fees) - (parseInt(paidAmount) + parseInt(value));
//     setPayingAmount(value);
//     setRemainingAmount(remaining);
//   };

//   const CreateInvoice = (e) => {
//     e.preventDefault();
//     const updatedPaidAmount = parseInt(paidAmount) + parseInt(payingAmount);
//     setPaidAmount(updatedPaidAmount);
//     Axios.get(`http://127.0.0.1:4002/api/createInvoice`, {
//       params: { 
//         sno: sno, 
//         sname: sname,
//         course: course,
//         fees: parseInt(fees),
//         payingAmount: parseInt(payingAmount),
//         paidAmount:parseInt(updatedPaidAmount),
//         remainingAmount: parseInt(remainingAmount),
//         paymentMethod: paymentMethod,
//         currentDateTime: currentDateTime
//       }
//     })
//       .then((res) => {
//         alert('Insert operation successful.');
//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Error occurred during insert operation.');
//       });
//   };

//   const update = () => {
//     const updatedPaidAmount = parseInt(paidAmount) + parseInt(payingAmount);
//     setPaidAmount(updatedPaidAmount);
//     Axios.get(`http://127.0.0.1:4002/api/updateInvoice`, {
//       params: { 
//         fees: parseInt(fees),
//         payingAmount: parseInt(payingAmount),
//         paidAmount: parseInt(updatedPaidAmount),
//         remainingAmount: parseInt(remainingAmount),
//         paymentMethod: paymentMethod,
//         currentDateTime: currentDateTime
//       }
//     })
//       .then((res) => {
//         console.log(res.data)
//         alert('Update operation successful.');
//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Error occurred during update operation.');
//       });
//   };
  
//   return (
//     <div>
//       <h2>Create Invoice</h2>
//       <form >
//         <div className="form-group">
//           <label htmlFor="sno">Student ID</label>
//           <input
//             type="text"
//             className="form-control"
//             id="sno"
//             value={sno}
//             placeholder="Enter student ID"
//             onChange={(e) => setSno(e.target.value)}
//           />
//         </div>
//         {isDataFound && (
//           <>
//             <div className="form-group">
//               <label htmlFor="sname">Student Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="sname"
//                 value={sname}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="course">Course</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="course"
//                 value={course}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="fees">Fees</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="fees"
//                 value={fees}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="payingAmount">Paying Amount</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="payingAmount"
//                 placeholder="Enter paying amount"
//                 value={payingAmount}
//                 onChange={(e) => updateRemainingAmount(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="paidAmount">Paid Amount</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="paidAmount"
//                 value={paidAmount}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="remainingAmount">Remaining Amount</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="remainingAmount"
//                 value={remainingAmount}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="currentDateTime">Current Date and Time</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="currentDateTime"
//                 value={currentDateTime}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="paymentMethod">Payment Method</label>
//               <select
//                 className="form-control"
//                 id="paymentMethod"
//                 value={paymentMethod}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               >
//                 <option value="">Select payment method</option>
//                 <option value="online">Online</option>
//                 <option value="cash">Cash</option>
//               </select>
//             </div>
//           </>
//         )}
//         <button type="button" className="btn btn-primary" onClick={find}>Find</button>
//         <button type="button" className="btn btn-primary" onClick={update}>Update</button>
//         <button type="button" className="btn btn-primary" onClick={findAmountToBeCreated}>Find Amount to be Created</button>
//         <button type="button" className="btn btn-primary" onClick={CreateInvoice}>CreateInvoice</button>
//       </form>
//     </div>
//   );
// }

// export default InvoiceCreate;

// // import React, { useState, useEffect } from 'react';
// // import Axios from 'axios';

// // function InvoiceCreate() {
// //   const [sno, setSno] = useState('');
// //   const [sname, setSname] = useState('');
// //   const [course, setCourse] = useState('');
// //   const [fees, setFees] = useState('');
// //   const [payingAmount, setPayingAmount] = useState('');
// //   const [paidAmount, setPaidAmount] = useState(0); // State variable to track paid amount
// //   const [remainingAmount, setRemainingAmount] = useState('');
// //   const [currentDateTime, setCurrentDateTime] = useState('');
// //   const [isDataFound, setIsDataFound] = useState(false);
// //   const [paymentMethod, setPaymentMethod] = useState('');

// //   const getCurrentDateTime = () => {
// //     const currentDate = new Date();
// //     const formattedDateTime = currentDate.toLocaleString();
// //     setCurrentDateTime(formattedDateTime);
// //   };

// //   useEffect(() => {
// //     getCurrentDateTime();
// //   }, []);

// //   const find = () => {
// //     Axios.get(`http://127.0.0.1:4002/api/invoicefind`, { params: { sno: sno } })
// //       .then((res) => {
// //         const studentData = res.data[0];
// //         console.log(studentData)
// //         if (studentData) {
// //           setIsDataFound(true);
// //           setSname(studentData.sname);
// //           setCourse(studentData.course);
// //           setFees(studentData.fees);
// //           const remaining = parseInt(studentData.fees) - (parseInt(paidAmount) + parseInt(payingAmount)); // Adjust remaining amount based on paid amount
// //           setRemainingAmount(remaining);
// //         } else {
// //           setIsDataFound(false);
// //           alert('Student not found.');
// //         }
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //         alert('Error occurred during find operation.');
// //       });
// //   };

// //   const CreateInvoice = (e) => {
// //     e.preventDefault();
// //     const updatedPaidAmount = parseInt(paidAmount) + parseInt(payingAmount); // Update paid amount
// //     setPaidAmount(updatedPaidAmount);
// //     Axios.get(`http://127.0.0.1:4002/api/createInvoice`, {
// //       params: { 
// //         sno: sno, 
// //         sname: sname,
// //         course: course,
// //         fees: parseInt(fees),
// //         payingAmount: parseInt(payingAmount),
// //         paidAmount:parseInt(updatedPaidAmount), // Include updated paid amount in the request
// //         remainingAmount: parseInt(remainingAmount),
// //         paymentMethod: paymentMethod,
// //         currentDateTime: currentDateTime
// //       }
// //     })
// //       .then((res) => {
        
// //          alert('Insert operation successful.');
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //         alert('Error occurred during insert operation.');
// //       });
// //   };
// //   const update = () => {
// //     const updatedPaidAmount = parseInt(paidAmount) + parseInt(payingAmount);
// //     setPaidAmount(updatedPaidAmount);
// //     Axios.get(`http://127.0.0.1:4002/api/updateInvoice`, {
// //       params: { 
// //         fees: parseInt(fees),
// //         payingAmount: parseInt(payingAmount),
// //         paidAmount: parseInt(updatedPaidAmount),
// //         remainingAmount: parseInt(remainingAmount),
// //         paymentMethod: paymentMethod,
// //         currentDateTime: currentDateTime
// //       }
// //     })
// //       .then((res) => {
        
// //         alert('Update operation successful.');
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //         alert('Error occurred during update operation.');
// //       });
// //   };
  
    



// //   return (
// //     <div>
// //       <h2>Create Invoice</h2>
// //       <form >
// //         <div className="form-group">
// //           <label htmlFor="sno">Student ID</label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             id="sno"
// //             value={sno}
// //             placeholder="Enter student ID"
// //             onChange={(e) => setSno(e.target.value)}
// //           />
// //         </div>
// //         {isDataFound && (
// //           <>
// //             <div className="form-group">
// //               <label htmlFor="sname">Student Name</label>
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 id="sname"
// //                 value={sname}
// //                 disabled
// //               />
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="course">Course</label>
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 id="course"
// //                 value={course}
// //                 disabled
// //               />
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="fees">Fees</label>
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 id="fees"
// //                 value={fees}
// //                 disabled
// //               />
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="payingAmount">Paying Amount</label>
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 id="payingAmount"
// //                 placeholder="Enter paying amount"
// //                 value={payingAmount}
// //                 onChange={(e) => setPayingAmount(e.target.value)}
// //               />
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="paidAmount">Paid Amount</label>
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 id="paidAmount"
// //                 value={paidAmount}
// //                 disabled
// //               />
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="remainingAmount">Remaining Amount</label>
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 id="remainingAmount"
// //                 value={remainingAmount}
// //                 disabled
// //               />
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="currentDateTime">Current Date and Time</label>
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 id="currentDateTime"
// //                 value={currentDateTime}
// //                 disabled
// //               />
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="paymentMethod">Payment Method</label>
// //               <select
// //                 className="form-control"
// //                 id="paymentMethod"
// //                 value={paymentMethod}
// //                 onChange={(e) => setPaymentMethod(e.target.value)}
// //               >
// //                 <option value="">Select payment method</option>
// //                 <option value="online">Online</option>
// //                 <option value="cash">Cash</option>
// //               </select>
// //             </div>
// //           </>
// //         )}
// //         <button type="button" className="btn btn-primary" onClick={find}>Find</button>
// //         <button type="button" className="btn btn-primary" onClick={update}>update</button>
// //         <button type="button" className="btn btn-primary" onClick={CreateInvoice}>CreateInvoice</button>
       
// //       </form>
// //     </div>
// //   );
// // }

// // export default InvoiceCreate;
