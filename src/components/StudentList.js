
// import Axios from 'axios';
// import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// function Ajith() {
//   const [list, setList] = useState([]);
//   const [sno, setSno] = useState('');
//   const [sname, setSname] = useState('');
//   const [dob, setDob] = useState('');
//   const [qualification, setQualification] = useState('');
//   const [course, setCourse] = useState('');
//   const [fees, setFees] = useState('');
  
//   const [state, setState] = useState('');
//   const [email, setEmail] = useState('');
//   const [address, setAddress] = useState('');
//   const [contact, setContact] = useState('');

//   const find = () => {
//     Axios.get(`http://127.0.0.1:4002/api/find`, { params: { sno: sno } })
//       .then((res) => {
//         setList(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Error occurred during find operation.');
//       });
//   };

//   const insert = () => {
   
//     Axios.get(`http://127.0.0.1:4002/api/insert`, {
//       params: { sno: parseInt(sno), sname: sname,dob:dob,qualification:qualification,course:course,fees:parseInt(fees),state:state,address:address,email:email,contact: parseInt(contact) }
//     })
//       .then((res) => {
//         setSno('');
//         setSname('');
//         setDob('');
//         setQualification('');
//         setCourse('');
//         setFees('');
//         setState('');
//         setAddress('');
//         setEmail('');
//         setContact('');

//         find();
//         alert('Insert operation successful.');
//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Error occurred during insert operation.');
//       });
//   };

//   const update = () => {
//     Axios.get(`http://127.0.0.1:4002/api/update`, {
//       params: { sno: parseInt(sno), sname: sname,dob:parseInt(dob),qualification:qualification,course:course,fees:parseInt(fees),state:state,address:address,email:email,contact: parseInt(contact) }
//     })
//       .then((res) => {
//         find();
//         alert('Update operation successful.');
//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Error occurred during update operation.');
//       });
//   };

//   const remove = () => {
//     Axios.get(`http://127.0.0.1:4002/api/delete`, { params: { sno: sno } })
//       .then((res) => {
//         find();
//         alert('Delete operation successful.');
//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Error occurred during delete operation.');
//       });
//   };
//   return (
//     <div className="container">
//       <h1 className="text-center mt-5">Welcome to React component</h1>
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//       <>
//             <div className="mb-3">
//              <label> <strong>SNO</strong></label> <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter the sno"
//                 value={sno}
//                 onChange={(e) => setSno(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter the sname"
//               value={sname}
//               onChange={(e) => setSname(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="date"
//               className="form-control"
//               placeholder="Enter the date of birth"
//               value={dob}
//               onChange={(e) => setDob(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter the Qualification"
//               value={qualification}
//               onChange={(e) => setQualification(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter the course"
//               value={course}
//               onChange={(e) => setCourse(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter the fees"
//               value={fees}
//               onChange={(e) => setFees(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter the address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter the State"
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter the emailid"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Enter the contact number"
//               value={contact}
//               onChange={(e) => setContact(e.target.value)}
//             />
//           </div>
//             </>
//         <div className="mb-3">
//               <button className="btn btn-primary me-2" onClick={insert}>Insert</button>
//               <button className="btn btn-info me-2" onClick={update}>Update</button>
//               <button className="btn btn-danger me-2" onClick={remove}>Delete</button>
//             <button className="btn btn-success me-2"  onClick={() => { find(); alert('Find operation successful.'); }}>Find</button>
//             </div>
        
          
//         </div>
//       </div>
//       <div className="row mt-5">
//         <div className="col-md-12">
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th><strong>SNO</strong></th>
//                 <th><strong>SNAME</strong></th>
//                 <th><strong>DOB</strong></th>
//                 <th><strong>QUALIFICATION</strong></th>
//                 <th><strong>COURSE</strong></th>
//                 <th><strong>FEES</strong></th>
//                 <th><strong>ADDRESS</strong></th>
//                 <th><strong>STATE</strong></th>
//                 <th><strong>EMAIL</strong></th>
//                 <th><strong>CONTACT</strong></th>
                
                
//               </tr>
//             </thead>
//             <tbody>
//               {list.map((item) => (
//                 <tr key={item.sno}>
//                   <td>{item.sno}</td>
//                   <td>{item.sname}</td>
//                   <td>{item.dob}</td>
//                   <td>{item.qualification}</td>
//                   <td>{item.course}</td>
//                   <td>{item.fees}</td>
//                   <td>{item.address}</td>
//                   <td>{item.state}</td>
//                   <td>{item.email}</td>
//                   <td>{item.contact}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Ajith;

import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import "./StudentList.css";
const coursesToFees = {
  "FULLSTACK WEB DEVELOPER-MERN":18000,
  "FULLSTACK WEB DEVELOPER-MEAN":19000,
  "JAVA": 25000,
  'ADVANCED JAVA': 30000,
  'PYTHON': 13000,
  'DATASCIENCE': 30000,
  'TALLY': 20000
  // Add more courses and their corresponding fees as needed
};
const initialCourseCounters = {
  "FULLSTACK WEB DEVELOPER-MERN":0,
  "FULLSTACK WEB DEVELOPER-MEAN":0,
  "JAVA": 0,
  'ADVANCED JAVA': 0,
  'PYTHON': 0,
  'DATASCIENCE': 0,
  'TALLY': 0
  // Add more courses and their corresponding starting sno as needed
};

function Ajith() {
  const [list, setList] = useState([]);
  const [sno, setSno] = useState('');     
  const [sname, setSname] = useState('');
  const [dob, setDob] = useState('');
  const [doj, setDoj] = useState('');
  const [qualification, setQualification] = useState('');
  const [course, setCourse] = useState('');
  const [fees, setFees] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [courseCounters, setCourseCounters] = useState(initialCourseCounters);
  const [dobMonth, setDobMonth] = useState('');
const [dobYear, setDobYear] = useState('');
const [dojMonth, setDojMonth] = useState('');
const [dojYear, setDojYear] = useState('');


  const find = () => {
    Axios.get(`http://127.0.0.1:4002/api/find`, { params: { sno: sno } })
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert('Error occurred during find operation.');
      });
    
  };

  const insert = () => {
    const formattedDob = `${dob}-${dobMonth}-${dobYear}`;
    const formattedDoj = `${doj}-${dojMonth}-${dojYear}`;

   
    Axios.get(`http://127.0.0.1:4002/api/insert`, {
      params: { sno: sno, sname: sname,dob:formattedDob ,doj:formattedDoj ,qualification:qualification,course:course,fees:parseInt(fees),state:state,address:address,email:email,contact: parseInt(contact) }
    })
      .then((res) => {
        setSno('');
        setSname('');
        setDob('');
        setDoj('');
        setQualification('');
        setCourse('');
        setFees('');
        setState('');
        setAddress('');
        setEmail('');
        setContact('');

        find();
        alert('Insert operation successful.');
      })
      .catch((err) => {
        console.log(err);
        alert('Error occurred during insert operation.');
      });
      handleCourseChange()
  };

  const update = () => {
    const formattedDob = `${dob}-${dobMonth}-${dobYear}`;
    console.log("update dob",formattedDob)
    const formattedDoj = `${doj}-${dojMonth}-${dojYear}`;
        console.log("update dob",formattedDoj)

    Axios.get(`http://127.0.0.1:4002/api/update`, {
      
      params: { sno: sno, sname: sname,dob:formattedDob,doj:formattedDoj,qualification:qualification,course:course,fees:parseInt(fees),state:state,address:address,email:email,contact: parseInt(contact) }
    })
      .then((res) => {
        find();
        alert('Update operation successful.');
      })
      .catch((err) => {
        console.log(err);
        alert('Error occurred during update operation.');
      });
  };

  const remove = () => {
    Axios.get(`http://127.0.0.1:4002/api/delete`, { params: { sno: sno } })
      .then((res) => {
        find();
        alert('Delete operation successful.');
      })
      .catch((err) => {
        console.log(err);
        alert('Error occurred during delete operation.');
      });
  };
  const clearFields = () => {
    setSno('');
    setSname('');
    setDob('');
    setDoj('');
    setQualification('');
    setCourse('');
    setFees('');
    setState('');
    setAddress('');
    setEmail('');
    setContact('');
};
const toggleEditMode = (item) => {
  setEditMode(!editMode); // Toggle edit mode
  if (!editMode && item) {
    setSno(item.sno);
    setSname(item.sname);
    
    // Create new Date object for DOB
    const dobDate = new Date(item.dob);
    setDob(dobDate.getDate().toString()); // Set day
    setDobMonth((dobDate.getMonth() + 1).toString()); // Set month (+1 because months are zero-indexed)
    setDobYear(dobDate.getFullYear().toString()); // Set year
    
    // Create new Date object for DOJ
    const dojDate = new Date(item.doj);
    setDoj(dojDate.getDate().toString()); // Set day
    setDojMonth((dojDate.getMonth() + 1).toString()); // Set month (+1 because months are zero-indexed)
    setDojYear(dojDate.getFullYear().toString()); // Set year
    
    setQualification(item.qualification);
    setCourse(item.course);
    setFees(item.fees);
    setState(item.state);
    setAddress(item.address);
    setEmail(item.email);
    setContact(item.contact);
  } else {
    // If not in edit mode, clear the input fields
    clearFields();
  }
};

const handleCourseChange = (selectedCourse) => {
    setCourse(selectedCourse);
    setFees(coursesToFees[selectedCourse]);
    const counter = courseCounters[selectedCourse] || 0;
    let prefix = '';
  
    // Determine prefix based on selected course
    if (selectedCourse === "FULLSTACK WEB DEVELOPER-MERN") {
      prefix = 'FSMERN';
    } else if (selectedCourse === "FULLSTACK WEB DEVELOPER-MEAN") {
      prefix = 'FSMEAN';
    } else if (selectedCourse === "JAVA") {
      prefix = 'JAV';
    } else if (selectedCourse === "ADVANCED JAVA") {
      prefix = 'ADJAV';
    } else if (selectedCourse === "PYTHON") {
      prefix = 'PY';
    } else if (selectedCourse === "DATA SCIENCE") {
      prefix = 'DS';
    } else if (selectedCourse === "TALLY") {
      prefix = 'TAL';
    }
  
    // Fetch last serial number from the backend API
    Axios.get(`http://127.0.0.1:4002/api/getLastSno`, { params: { course: selectedCourse } })
      .then((res) => {
        console.log("Response data:", res.data); // Add this line to inspect the response data
        const lastSerialNumber = res.data ? res.data.lastSerialNumber : undefined;
        if (typeof lastSerialNumber === 'string' && lastSerialNumber.startsWith(prefix + '2024')) {
          console.log("Last serial number:", lastSerialNumber); // Add this line to inspect the last serial number
          const numericPart = parseInt(lastSerialNumber.slice(prefix.length + 4)); // Extract the numeric part and convert to integer
          const nextSerialNumber = prefix + '2024' + (numericPart + 1).toString().padStart(2, '0'); // Increment and pad with leading zeros
          setSno(nextSerialNumber);
        } else {
          // If there's no serial number in the database, start with '01'
          setSno(prefix + '202401');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Error occurred while fetching last serial number.');
      });
  
    // Update the course counter
    setCourseCounters(prevCounters => ({
      ...prevCounters,
      [selectedCourse]: counter + 1,
    }));
     setDob('');
  setDobMonth('');
  setDobYear('');
  setDoj('');
  setDojMonth('');
  setDojYear('');
  };
  
  
  
  
  return (
    <div className="container ">
      <h2 className="text-center mt-5">STUDENT  RECORDS</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="sno" className="form-label"><strong>SNO</strong></label>
            <input type="text" className="form-control" id="sno" placeholder="Enter the sno"   value={sno} onChange={(e) => setSno(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="sname" className="form-label"><strong>SNAME</strong></label>
            <input type="text" className="form-control" id="sname" placeholder="Enter the sname" value={sname} onChange={(e) => setSname(e.target.value)} />
          </div>
          <div className="mb-3">
  <label htmlFor="dob" className="form-label"><strong>DOB</strong></label>
  <div className="row">
    <div className="col">
      <input type="number" className="form-control" id="dob" placeholder="Enter the date of birth" min="1" max="30"value={dob} onChange={(e) => setDob(e.target.value)} />
    </div>
    <div className="col">
      <input type="number" className="form-control" placeholder="MM" min="1" max="12" value={dobMonth} onChange={(e) => setDobMonth(e.target.value)} />
    </div>
    <div className="col">
      <input type="number" className="form-control" placeholder="YYYY" min="1900" max="9999" value={dobYear} onChange={(e) => setDobYear(e.target.value)} />
    </div>
  </div>
</div>
<div className="mb-3">
  <label htmlFor="doj" className="form-label"><strong>DOJ</strong></label>
  <div className="row">
    <div className="col">
      <input type="number" className="form-control" id="doj" placeholder="Enter the date of joining"min="1" max="30"  value={doj} onChange={(e) => setDoj(e.target.value)} />
    </div>
    <div className="col">
      <input type="number" className="form-control" placeholder="MM" min="1" max="12" value={dojMonth} onChange={(e) => setDojMonth(e.target.value)} />
    </div>
    <div className="col">
      <input type="number" className="form-control" placeholder="YYYY" min="1900" max="9999" value={dojYear} onChange={(e) => setDojYear(e.target.value)} />
    </div>
  </div>
</div>

          <div className="mb-3">
            <label htmlFor="qualification" className="form-label"><strong>QUALIFICATION</strong></label>
            <input type="text" className="form-control" id="qualification" placeholder="Enter the qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="course" className="form-label"><strong>COURSE</strong></label>
            <select className="form-select" id="course" value={course} onChange={(e) => handleCourseChange(e.target.value)}>
              <option value="">Select Course</option>
              <option value="FULLSTACK WEB DEVELOPER-MERN">FULLSTACK WEBDEVELOPER-MERN</option>
              <option value="FULLSTACK WEB DEVELOPER-MEAN">FULLSTACK WEBDEVELOPER-MEAN</option>
              <option value="JAVA">JAVA</option>
              <option value="ADVANCED JAVA"> ADVANCED JAVA</option>
              <option value="PYTHON">PYTHON</option>
              <option value="DATA SCIENCE">DATA SCIENCE</option>
              <option value="TALLY">TALLY</option>
              {/* Add more options as needed */}
            </select>          </div>
          <div className="mb-3">
            <label htmlFor="fees" className="form-label"><strong>FEES</strong></label>
            <input type="text" className="form-control" id="fees" placeholder="Enter the fees" value={fees} onChange={(e) => setFees(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label"><strong>STATE</strong></label>
            <input type="text" className="form-control" id="state" placeholder="Enter the state" value={state} onChange={(e) => setState(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label"><strong>ADDRESS</strong></label>
            <input type="text" className="form-control" id="address" placeholder="Enter the address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label"><strong>EMAIL</strong></label>
            <input type="email" className="form-control" id="email" placeholder="Enter the email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label"><strong>CONTACT</strong></label>
            <input type="text" className="form-control" id="contact" placeholder="Enter the contact" value={contact} onChange={(e) => setContact(e.target.value)} />
          </div>
          
          
            <>
              <div className="mb-3">
              <button className="btn btn-primary me-2" onClick={find}>Find</button>
              <button className="btn btn-primary me-2" onClick={insert}>Insert</button>
                <button className="btn btn-info me-2" onClick={update}>Update</button>
                <button className="btn btn-danger me-2" onClick={remove}>Delete</button>
               </div>
            </>
         
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
        {Array.isArray(list) && list.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SNO</th>
                <th>SNAME</th>
                <th>DOB</th>
                <th>DOJ</th>
                <th>QUALIFICATION</th>
                <th>COURSE</th>
                <th>FEES</th>
                <th>STATE</th>
                <th>EMAIL</th>
                <th>ADDRESS</th>
                <th>CONTACT</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.sno}>
                  <td>{item.sno}</td>
                  <td>{item.sname}</td>
                 <td>{`${item.dob}/${item.dobMonth}/${item.dobYear}`}</td>
  <td>{`${item.doj}/${item.dojMonth}/${item.dojYear}`}</td>
                  <td>{item.qualification}</td>
                  <td>{item.course}</td>
                  <td>{item.fees}</td>
                  <td>{item.state}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>{item.contact}</td>
                  <td>
                    {/* Edit button with icon */}
                    <button className="btn btn-primary me-2" onClick={()=> toggleEditMode(item)}>
                      <i className="bi bi-pencil-square"></i> Edit
                    </button>
                    {/* Delete button with icon */}
                    <button className="btn btn-danger" onClick={remove}>
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>
                 
                  
                </tr>
              ))}
            </tbody>
          </table>
           ) : (
                    <div>No students found</div>
                  )}
        </div>
      </div>
    </div>
  );
}

export default Ajith;
// import Axios from 'axios';
// import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// function Ajith() {
//   const [list, setList] = useState([]);
//   const [sno, setSno] = useState('');
//   const [sname, setSname] = useState('');
//   const [dob, setDob] = useState('');
//   const [qualification, setQualification] = useState('');
//   const [course, setCourse] = useState('');
//   const [fees, setFees] = useState('');
  
//   const [state, setState] = useState('');
//   const [email, setEmail] = useState('');
//   const [address, setAddress] = useState('');
//   const [contact, setContact] = useState('');

//   const find = () => {
//     Axios.get(`http://127.0.0.1:4002/api/find`, { params: { sno: sno } })
//       .then((res) => {
//         setList(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Error occurred during find operation.');
//       });
//   };

//   const insert = () => {
   
//     Axios.get(`http://127.0.0.1:4002/api/insert`, {
//       params: { sno: parseInt(sno), sname: sname,dob:dob,qualification:qualification,course:course,fees:parseInt(fees),state:state,address:address,email:email,contact: parseInt(contact) }
//     })
//       .then((res) => {
//         setSno('');
//         setSname('');
//         setDob('');
//         setQualification('');
//         setCourse('');
//         setFees('');
//         setState('');
//         setAddress('');
//         setEmail('');
//         setContact('');

//         find();
//         alert('Insert operation successful.');
//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Error occurred during insert operation.');
//       });
//   };

//   const update = () => {
//     Axios.get(`http://127.0.0.1:4002/api/update`, {
//       params: { sno: parseInt(sno), sname: sname,dob:parseInt(dob),qualification:qualification,course:course,fees:parseInt(fees),state:state,address:address,email:email,contact: parseInt(contact) }
//     })
//       .then((res) => {
//         find();
//         alert('Update operation successful.');
//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Error occurred during update operation.');
//       });
//   };

//   const remove = () => {
//     Axios.get(`http://127.0.0.1:4002/api/delete`, { params: { sno: sno } })
//       .then((res) => {
//         find();
//         alert('Delete operation successful.');
//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Error occurred during delete operation.');
//       });
//   };

  

//   return (
//     <div className="container">
//       <h1 className="text-center mt-5">Welcome to React component</h1>
//       <div className="row justify-content-center">
//         <div className="col-md-6">
        
           
          
//             <>
//             <div className="mb-3">
//              <label> <strong>SNO</strong></label> <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter the sno"
//                 value={sno}
//                 onChange={(e) => setSno(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter the sname"
//               value={sname}
//               onChange={(e) => setSname(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="date"
//               className="form-control"
//               placeholder="Enter the date of birth"
//               value={dob}
//               onChange={(e) => setDob(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter the Qualification"
//               value={qualification}
//               onChange={(e) => setQualification(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter the course"
//               value={course}
//               onChange={(e) => setCourse(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter the fees"
//               value={fees}
//               onChange={(e) => setFees(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter the address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter the State"
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter the emailid"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Enter the contact number"
//               value={contact}
//               onChange={(e) => setContact(e.target.value)}
//             />
//           </div>
//             </>
        
          
          
//             <div className="mb-3">
//               <button className="btn btn-primary me-2" onClick={insert}>Insert</button>
//               <button className="btn btn-info me-2" onClick={update}>Update</button>
//               <button className="btn btn-danger me-2" onClick={remove}>Delete</button>
//             <button className="btn btn-success me-2"  onClick={() => { find(); alert('Find operation successful.'); }}>Find</button>
//             </div>
        
          
//         </div>
//       </div>
//       <div className="row mt-5">
//         <div className="col-md-12">
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th><strong>SNO</strong></th>
//                 <th><strong>SNAME</strong></th>
//                 <th><strong>DOB</strong></th>
//                 <th><strong>QUALIFICATION</strong></th>
//                 <th><strong>COURSE</strong></th>
//                 <th><strong>FEES</strong></th>
//                 <th><strong>ADDRESS</strong></th>
//                 <th><strong>STATE</strong></th>
//                 <th><strong>EMAIL</strong></th>
//                 <th><strong>CONTACT</strong></th>
                
                
//               </tr>
//             </thead>
//             <tbody>
//               {list.map((item) => (
//                 <tr key={item.sno}>
//                   <td>{item.sno}</td>
//                   <td>{item.sname}</td>
//                   <td>{item.dob}</td>
//                   <td>{item.qualification}</td>
//                   <td>{item.course}</td>
//                   <td>{item.fees}</td>
//                   <td>{item.address}</td>
//                   <td>{item.state}</td>
//                   <td>{item.email}</td>
//                   <td>{item.contact}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Ajith;
// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import Axios from 'axios';

// function StudentList() {
//   const [students, setStudents] = useState([]);
//   const [newStudent, setNewStudent] = useState({
//     name: '',
//     dob: '',
//     qualification: '',
//     address: '',
//     state: '',
//     pincode: '',
//     contact: '',
//     experience: '',
//     course: '',
//     registrationNumber: '', // Added registration number field
//     fees: '',
//   });
//   const [editIndex, setEditIndex] = useState(null);
//   const [isUpdateMode, setIsUpdateMode] = useState(false);

//   const fetchData = () => {
//     // Fetch student data from the server
//     Axios.get('http://127.0.0.1:4002/api/find')
//       .then((res) => {
//         console.log('Response data:', res.data);
//         setStudents(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleAddStudent = () => {
//     Axios.get('http://127.0.0.1:4002/api/insert')
//       .then((res) => {
//         console.log('Response data:', res.data);
//         setStudents(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     console.log('New student:', newStudent);

//     // Calculate pending amount
//     const pendingAmount = newStudent.fees - students.reduce((total, student) => total + student.fees, 0);

//     // Update new student object with pending amount
//     setNewStudent({ ...newStudent, pendingAmount });

//     // Add new student to the list
//     setStudents([...students, newStudent]);

//     // Reset new student state
//     setNewStudent({
//       name: '',
//       dob: '',
//       qualification: '',
//       address: '',
//       state: '',
//       pincode: '',
//       contact: '',
//       experience: '',
//       course: '',
//       registrationNumber: '',
//       fees: '',
//     });

//     // Reset edit mode
//     if (isUpdateMode) {
//       setEditIndex(null);
//       setIsUpdateMode(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewStudent({ ...newStudent, [name]: value });
//   };
//   const handleEditStudent = (index) => {
//     setEditIndex(index);
//     const studentToEdit = students[index];
//     setNewStudent({ ...studentToEdit });
//     setIsUpdateMode(true);
//   };

//   const handleDeleteStudent = (index) => {
//     const studentId = students[index].id;
//     Axios.get(`http://127.0.0.1:4002/api/delete/`)
//       .then((res) => {
//         fetchData();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <div className="container">
//       <h2 className="mb-4">Student List</h2>
//       <div className="mb-4">
//         <h3>{isUpdateMode ? 'Update Student' : 'Add New Student'}</h3>
//         <div className="row g-3">
//           <div className="col-md-6">
//             <label htmlFor="name" className="form-label">Name:</label>
//             <input type="text" id="name" name="name" className="form-control" placeholder="Enter Name" value={newStudent.name} onChange={handleInputChange} />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="dob" className="form-label">Date of Birth:</label>
//             <input type="date" id="dob" name="dob" className="form-control" value={newStudent.dob} onChange={handleInputChange} />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="qualification" className="form-label">Qualification:</label>
//             <input type="text" id="qualification" name="qualification" className="form-control" placeholder="Enter Qualification" value={newStudent.qualification} onChange={handleInputChange} />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="address" className="form-label">Address:</label>
//             <input type="text" id="address" name="address" className="form-control" placeholder="Enter Address" value={newStudent.address} onChange={handleInputChange} />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="state" className="form-label">State:</label>
//             <input type="text" id="state" name="state" className="form-control" placeholder="Enter State" value={newStudent.state} onChange={handleInputChange} />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="pincode" className="form-label">Pincode:</label>
//             <input type="text" id="pincode" name="pincode" className="form-control" placeholder="Enter Pincode" value={newStudent.pincode} onChange={handleInputChange} />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="contact" className="form-label">Contact:</label>
//             <input type="text" id="contact" name="contact" className="form-control" placeholder="Enter Contact" value={newStudent.contact} onChange={handleInputChange} />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="experience" className="form-label">Experience:</label>
//             <input type="text" id="experience" name="experience" className="form-control" placeholder="Enter Experience" value={newStudent.experience} onChange={handleInputChange} />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="course" className="form-label">Course:</label>
//             <input list="courses" id="course" name="course" className="form-control" placeholder="Enter Course" value={newStudent.course} onChange={handleInputChange} />
           
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="registrationNumber" className="form-label">Registration Number:</label>
//             <input type="text" id="registrationNumber" name="registrationNumber" className="form-control" placeholder="Enter Registration Number" value={newStudent.registrationNumber} onChange={handleInputChange} />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="fees" className="form-label">Fees:</label>
//             <input type="number" id="fees" name="fees" className="form-control" placeholder="Enter Fees" value={newStudent.fees} onChange={handleInputChange} />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Pending Amount:</label>
//             <input type="number" className="form-control" value={newStudent.fees - students.reduce((total, student) => total + student.fees, 0)} readOnly />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="dateOfJoining" className="form-label">Date of Joining:</label>
//             <input type="date" id="dateOfJoining" name="dateOfJoining" className="form-control" value={newStudent.dateOfJoining} onChange={handleInputChange} />
//           </div>
//         </div>
//         <button className="btn btn-primary mt-3" onClick={handleAddStudent}>{isUpdateMode ? 'Update' : 'Add'} Student</button>
//       </div>
//       <div>
//         <h3>Student List</h3>
//         {Array.isArray(students) && students.length > 0 ? (
//         <table className="table table-dark table-striped-columns">
//           <thead>
//             <tr>
//               <th>Registration Number</th>
//               <th>Name</th>
//               <th>Date of Birth</th>
//               <th>Qualification</th>
//               <th>Address</th>
//               <th>State</th>
//               <th>Pincode</th>
//               <th>Contact</th>
//               <th>Experience</th>
//               <th>Course</th>
//               <th>Fees</th>
//               <th>Pending Amount</th>
//               <th>Date of Joining</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student, index) => (
//              <tr key={index}>
//              <td>{student.registrationNumber}</td>
//              <td>{student.name}</td>
//              <td>{student.dob}</td>
//              <td>{student.qualification}</td>
//              <td>{student.address}</td>
//              <td>{student.state}</td>
//              <td>{student.pincode}</td>
//              <td>{student.contact}</td>
//              <td>{student.experience}</td>
//              <td>{student.course}</td>
//              <td>{student.fees}</td>
//              <td>{student.fees - students.reduce((total, student) => total + student.fees, 0)}</td>
//              <td>{student.dateOfJoining}</td>
//              <td>
//                   <button className="btn btn-outline-primary me-2" onClick={() => handleEditStudent(index)}>
//                     <FontAwesomeIcon icon={faEdit} />
//                   </button>
//                   <button className="btn btn-outline-danger" onClick={() => handleDeleteStudent(index)}>
//                     <FontAwesomeIcon icon={faTrash} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div>No students found</div>
//       )}
//     </div>
//   </div>
//   );
// }

// export default StudentList;
