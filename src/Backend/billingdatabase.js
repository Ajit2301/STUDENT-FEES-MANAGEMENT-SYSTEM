const { MongoClient } = require('mongodb');

// Replace the connection string with your MongoDB Atlas connection string
// const uri = "mongodb+srv://akajith2243:5f1NpHCisJS9YIj9@cluster0.cv8txfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const uri = "mongodb+srv://akajith2243:5f1NpHCisJS9YIj9@cluster0.cv8txfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(uri);

async function connectClient() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    }
}
connectClient()

// Export other database functions as before

// const { MongoClient } = require('mongodb');

// const client = new MongoClient("mongodb://127.0.0.1:27017");

// // Function to establish connection to MongoDB client
// async function connectClient() {
//     try {
//         await client.connect();
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// }

// // Call the connectClient function to establish connection
// connectClient();

async function login(username, password) {
    try {
        const users = await client.db("aks").collection("signup").find({ username, password }).toArray();
        if (users.length > 0) {
            return { success: true, message: "Login successful", users };
        } else {
            return { success: false, message: "Invalid username or password" };
        }
    } catch (error) {
        console.log("Error occurred while logging in:", error);
        return { success: false, message: "An error occurred while logging in" };
    }
}

async function FindInvoices(invoiceNum) {
    try {
        const invoice = await client.db("aks").collection("Invoices").find({  invoiceNum }).toArray();
        console.log("INVOICE", invoice);
        if (invoice) {
            return { success: true, message: "Find successful", invoice };
        } else {
            return { success: false, message: "Cannot find invoice" };
        }
    } catch (error) {
        console.log("Error occurred while finding invoice:", error);
        return { success: false, message: "An error occurred while finding invoice" };
    }
}

async function lastInvoiceNum(invoiceNum) {
    try {
        const invoices = await client.db("aks").collection("Invoices").find(invoiceNum).sort({ invoiceNum: -1 }).limit(1).toArray();
        if (invoices.length > 0) {
            return { success: true, message: "Find successful", lastInvoiceNum: invoices[0].invoiceNum };
        } else {
            return { success: false, message: "Cannot find invoices" };
        }
    } catch (error) {
        console.log("Error occurred while finding last invoice number:", error);
        return { success: false, message: "An error occurred while finding last invoice number" };
    }
}
async function getLastSno(selectedCourse) {
    try {
        console.log("Selected Course:", selectedCourse);
        const LastSno = await client.db("aks").collection("datas").find({ course: selectedCourse }).sort({ sno: -1 }).limit(1).toArray();
        console.log("Last Sno Data:", LastSno);
        if (LastSno.length > 0) {
            const lastSerialNumber = LastSno[0].sno;
            console.log("Last Serial Number:", lastSerialNumber);
            return { success: true, message: "Find successful", lastSerialNumber };
        } else {
            console.log("No Last Serial Number found.");
            return { success: false, message: "Cannot find sno" };
        }
    } catch (error) {
        console.log("Error occurred while finding last serial number:", error);
        return { success: false, message: "An error occurred while finding last serial number" };
    }
}


async function invoicefind(sno, sname, course, fees) {
    try {
        const users = await client.db("aks").collection("datas").find({ sno, sname, course, fees }).toArray();
        if (users.length > 0) {
            return { success: true, message: "Find successful", users };
        } else {
            return { success: false, message: "Cannot find students" };
        }
    } catch (error) {
        console.log("Error occurred while finding invoice:", error);
        return { success: false, message: "An error occurred while finding invoice" };
    }
}

async function createInvoice(mydata) {
    try {
        mydata.sno = mydata.sno;
        mydata.payingAmount = parseInt(mydata.payingAmount);
        mydata.remainingAmount = parseInt(mydata.remainingAmount);
        mydata.updatedPaidAmount = parseInt(mydata.updatedPaidAmount);
        mydata.fees = parseInt(mydata.fees);

        const result = await client.db("aks").collection("invoice").insertOne(mydata);
        return result;
    } catch (error) {
        console.log("Error occurred while creating invoice:", error);
        return { error: "Failed to create invoice" };
    }
}
async function InsertInvoice(mydata) {
    try {
        mydata.sno = mydata.sno;
        mydata.payingAmount = parseInt(mydata.payingAmount);
        mydata.remainingAmount = parseInt(mydata.remainingAmount);
        mydata.updatedPaidAmount = parseInt(mydata.updatedPaidAmount);
        mydata.fees = parseInt(mydata.fees);

        const result = await client.db("aks").collection("Invoices").insertOne(mydata);
        return result;
    } catch (error) {
        console.log("Error occurred while creating invoice:", error);
        return { error: "Failed to create invoice" };
    }
}


async function finddata(sno) {
    try {
        const dataset = await client.db("aks").collection("datas").find({ sno }).toArray();
        return JSON.parse(JSON.stringify(dataset));
    } catch (error) {
        console.log("Error occurred while fetching data:", error);
        return { error: "Failed to fetch data" };
    }
}
async function findAmountToBeCreated(sno) {
    try {
        const dataset = await client.db("aks").collection("invoice").find({ sno }).toArray();
        return JSON.parse(JSON.stringify(dataset));
    } catch (error) {
        console.log("Error occurred while fetching data:", error);
        return { error: "Failed to fetch data" };
    }
}

async function signupdata(data) {
    try {
        const result = await client.db("aks").collection("signup").insertOne(data);
        return result;
    } catch (error) {
        console.log("Error occurred while signing up:", error);
        throw error;
    }
}

async function insertdata(mydata) {
    try {
        mydata.sno = mydata.sno;
        mydata.contact = parseInt(mydata.contact);
        mydata.dob = mydata.dob;
        mydata.doj = mydata.doj;
        mydata.fees = parseInt(mydata.fees);

        const result = await client.db("aks").collection("datas").insertOne(mydata);
        return result;
    } catch (error) {
        console.log("Error occurred while inserting data:", error);
        return { error: "Failed to insert data" };
    }
}

async function deletedata(sno) {
    try {
        const dataset = await client.db("aks").collection("datas").deleteOne({ sno });
        return dataset.deletedCount;
    } catch (error) {
        console.log("Error occurred while deleting data:", error);
        return { error: "Failed to delete data" };
    }
}

async function updateData(sno, newSname, newDob, newDoj,newQualification, newCourse,newFees, newState, newAddress,newEmail,  newContact, ) {
    try {
        const updateValues = {};
        if (newSname !== undefined) updateValues.sname = newSname;
        if (newDob !== undefined) updateValues.dob = newDob;
        if (newDoj !== undefined) updateValues.doj = newDoj;
        if (newQualification !== undefined) updateValues.qualification = newQualification;
        if (newCourse !== undefined) updateValues.course = newCourse;
        if (newFees !== undefined) updateValues.fees = newFees;
        if (newState !== undefined) updateValues.state = newState;
        if (newAddress !== undefined) updateValues.address = newAddress;
        if (newEmail !== undefined) updateValues.email = newEmail;
        if (newContact !== undefined) updateValues.contact = newContact;

        const result = await client.db('aks').collection('datas').updateMany({ sno }, { $set: updateValues });
        return result.modifiedCount;
    } catch (error) {
        console.error("Error updating data:", error);
        return { error: "Failed to update data" };
    }
}
async function Invoicedata(sno,newPayingAmount ,newupdatedPaidAmount,newRemainingAmount,newPaymentMethod,newCurrentDateTime ) {
     try {
        const updateValues = {};
       
        if (newPayingAmount !== undefined) updateValues.payingAmount = newPayingAmount;
        if (newupdatedPaidAmount !== undefined) updateValues.updatedPaidAmount = newupdatedPaidAmount;
        if (newRemainingAmount !== undefined) updateValues.remainingAmount = newRemainingAmount;
        if (newPaymentMethod !== undefined) updateValues.paymentMethod = newPaymentMethod;
        if (newCurrentDateTime !== undefined) updateValues.currentDateTime= newCurrentDateTime;

        const result = await client.db('aks').collection('invoice').updateOne({ sno }, { $set: updateValues });
        return result.modifiedCount;
    } catch (error) {
        console.error("Error updating data:", error);
        return { error: "Failed to update data" };
    }
}


module.exports = { login, signupdata, finddata, insertdata, deletedata, updateData, invoicefind, createInvoice, Invoicedata,findAmountToBeCreated,FindInvoices,InsertInvoice ,lastInvoiceNum,getLastSno};
// const { MongoClient } = require('mongodb');

// const client = new MongoClient("mongodb://127.0.0.1:27017");
// let isConnected = false;

// async function connect() {
//   try {
//     if (!isConnected) {
//       await client.connect();
//       isConnected = true;
//       console.log("Connected to MongoDB");
//     }
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error;
//   }
// }

// async function findData(studentData) {
//   try {
//     await connect();
//     const dataset = await client.db("Studentdata").collection("data").find({ registrationNumber: studentData }).toArray();
//     console.log("Result:", dataset);
//     return dataset;
//   } catch (error) {
//     console.error("Error occurred while fetching data:", error);
//     throw error;
//   }
// }

// async function insertData(studentData) {
//   try {
//     await connect();
//     const result = await client.db("Studentdata").collection("data").insertOne(studentData);
//     console.log("Insert result:", result);
//     return result.insertedId;
//   } catch (error) {
//     console.error("Error occurred while inserting data:", error);
//     throw error;
//   }
// }

// async function deleteData(registrationNumber) {
//   try {
//     await connect();
//     const result = await client.db("Studentdata").collection("data").deleteOne({ registrationNumber });
//     console.log("Data deleted:", result);
//     return result.deletedCount;
//   } catch (error) {
//     console.error("Error occurred while deleting data:", error);
//     throw error;
//   }
// }

// async function updateData(registrationNumber, updatedFields) {
//   try {
//     await connect();
//     const result = await client.db('Studentdata').collection('data').updateOne({ registrationNumber }, { $set: updatedFields });
//     console.log("Update result:", result);
//     return result.modifiedCount;
//   } catch (error) {
//     console.error("Error updating data:", error);
//     throw error;
//   }
// }

// module.exports = { findData, insertData, deleteData, updateData };

// const { MongoClient } = require('mongodb');

// const client = new MongoClient("mongodb://127.0.0.1:27017");
// let isConnected = false;

// async function connect() {
//   try {
//     if (!isConnected) {
//       await client.connect();
//       isConnected = true;
//       console.log("Connected to MongoDB");
//     }
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error; // Rethrow the error for handling in the caller function
//   }
// }

// async function finddata(studentData) {
//   try {
//     await connect();
//     const dataset = await client.db("Student").collection("data").findOne({ registrationNumber: studentData });
//     return dataset ? JSON.stringify(dataset) : JSON.stringify({ error: "Student not found" });
//   } catch (error) {
//     console.log("Error occurred while fetching data:", error);
//     return JSON.stringify({ error: "Failed to fetch data" });
//   }
// }

// async function insertdata(newStudent) {
//   try {
//     await connect();
//     const result = await client.db("Student").collection("data").insertOne(newStudent);
//     console.log("Insert result:", result);
//     return (JSON.parse(JSON.stringify(result)));
//   } catch (error) {
//     console.log("Error occurred while inserting data:", error);
//     return JSON.stringify({ error: "Failed to insert data" });
//   }
// }

// async function deletedata(registrationNumber) {
//   try {
//     await connect()
//     const result = await client.db("Student").collection("data").deleteOne({ registrationNumber });
//     console.log("Data deleted:", result);
//     return result.deletedCount;
//   } catch (error) {
//     console.log("Error occurred while deleting data:", error);
//     return 0;
//   }
// }

// async function updatedata(registrationNumber, updatedFields) {
//   try {
//     await connect();
//     const result = await client.db("Student").collection("data").updateOne({ registrationNumber }, { $set: updatedFields });
//     console.log("Data updated:", result);
//     return result.modifiedCount;
//   } catch (error) {
//     console.error("Error updating data:", error);
//     return 0;
//   }
// }

// module.exports = { finddata, insertdata, deletedata, updatedata };

// const { MongoClient } = require('mongodb');

// const client = new MongoClient("mongodb://127.0.0.1:27017");
// let isConnected = false;

// async function connect() {
//   try {
//     if (!isConnected) {
//       await client.connect();
//       isConnected = true;
//       console.log("Connected to MongoDB");
//     }
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }

// async function finddata(studentData) {
// //   const ans = k;

//   try {
//     await connect();
//     const dataset = await client.db("Studentdata").collection("data").find({ registrationNumber: studentData }).toArray();
//     console.log("result:", dataset);
//     return JSON.stringify(dataset);

//   } catch (error) {
//     console.log("Error occurred while fetching data:", error);
//     return JSON.stringify({ error: "Failed to fetch data" });
//   }
// }

// async function insertdata({ name, dob, qualification, address, state, pincode, contact, experience, course, fees, pendingAmount, dateOfJoining, registrationNumber }) {
//     try {
//         await client.connect();
//         const result = await client.db("Studentdata").collection("data").insertOne({
//             name: name,
//             dob: dob,
//             qualification: qualification,
//             address: address,
//             state: state,
//             pincode: pincode,
//             contact: contact,
//             experience: experience,
//             course: course,
//             fees: fees,
//             pendingAmount: pendingAmount,
//             dateOfJoining: dateOfJoining,
//             registrationNumber: registrationNumber
//         });
//         console.log("Insert result:", result);
//         return JSON.stringify(result);
//     } catch (error) {
//         console.log("Error occurred while inserting data:", error);
//         return JSON.stringify({ error: "Failed to insert data" });
//     } finally {
//         await client.close();
//     }
// }

// async function deletedata(k) {
//   const mydata = { registrationNumber: k };

//   try {
//     await connect();
//     const dataset = await client.db("Studentdata").collection("data").deleteOne(mydata);
//     console.log("data deleted:", dataset);
//     return dataset.deletedCount;
//   } catch (error) {
//     console.log("Error occurred while deleting data:", error);
//     return { error: "Failed to delete data" };
//   }
// }

// async function updatedata(registrationNumber, updatedFields) {
//   try {
//     await connect();
//     const dataset = await client.db('studentdata').collection('data').updateOne({ registrationNumber }, { $set: updatedFields });
//     return dataset.modifiedCount;
//   } catch (error) {
//     console.error("Error updating data:", error);
//   }
// }

// module.exports = { finddata, insertdata, deletedata, updatedata };

// const { MongoClient } = require('mongodb');

// const client = new MongoClient("mongodb://127.0.0.1:27017");

// async function finddata(k) {
//     const ans = k;

//     try {
//         await client.connect();
//         const dataset = await client.db("StudentList").collection("data").find({ registrationNumber: ans }).toArray();
//         console.log("result:", dataset);
//         return JSON.stringify(dataset);

//     } catch (error) {
//         console.log("Error occurred while fetching data:", error);
//         return JSON.stringify({ error: "Failed to fetch data" });
//     } finally {
//         await client.close();
//     }
// }

// async function insertdata({ name, dob, qualification, address, state, pincode, contact, experience, course, fees, pendingAmount, dateOfJoining,registrationNumber }) {
//     try {
//         await client.connect();
//         const result = await client.db("StudentList").collection("data").insertOne({
//             name: name,
//             dob: dob,
//             qualification: qualification,
//             address: address,
//             state: state,
//             pincode: pincode,
//             contact: contact,
//             experience: experience,
//             course: course,
//             fees: fees,
//             pendingAmount: pendingAmount,
//             dateOfJoining: dateOfJoining,
//             registrationNumber: registrationNumber
//         });
//         return JSON.stringify(result);
//     } catch (error) {
//         console.log("Error occurred while inserting data:", error);
//         return JSON.stringify({ error: "Failed to insert data" });
//     } finally {
//         await client.close();
//     }
// }


// async function deletedata(k) {
//     const mydata = { registrationNumber: k };

//     try {
//         await client.connect();
//         const dataset = await client.db("StudentList").collection("data").deleteOne(mydata);
//         console.log("data deleted:", dataset);
//         return dataset.deletedCount;
//     } catch (error) {
//         console.log("Error occurred while deleting data:", error);
//         return { error: "Failed to delete data" };
//     } finally {
//         await client.close();
//     }
// }

// async function updatedata(registrationNumber, updatedFields) {
//     try {
//         await client.connect();
//         const dataset = await client.db('StudentList').collection('data').updateOne({ registrationNumber }, { $set: updatedFields });
//         return dataset.modifiedCount;
//     } catch (error) {
//         console.error("Error updating data:", error);
//     } finally {
//         await client.close();
//     }
// }

// module.exports = { finddata, insertdata, deletedata, updatedata };

// const { MongoClient } = require('mongodb');
// const client = new MongoClient("mongodb://127.0.0.1:27017");

// async function finddata(k) {
//     const ans =k
    
//     try {
//         await client.connect();
//         const dataset = await client.db("StudentList").collection("data").find({ StudentId: ans }).toArray();
//         console.log("result:",dataset)
//         return JSON.stringify(dataset);
        
//     } catch (error) {
//         console.log("Error occurred while fetching data:", error);
//         return JSON.stringify({ error: "Failed to fetch data" });
//     } finally {
//         await client.close();
//     }
// }

// async function insertdata(mydata) {
//     mydata.StudentId = parseInt(mydata.StudentId);
//     mydata.StudentName = parseInt(mydata.mark);

//     try {
//         await client.connect();
//         const result = await client.db("Studentlist").collection("data").insertOne(mydata);
//         return JSON.stringify(result);
//     } catch (error) {
//         console.log("Error occurred while inserting data:", error);
//         return JSON.stringify({ error: "Failed to insert data" });
//     } finally {
//         await client.close();
//     }
// }

// async function deletedata(k){
//     const mydata = { StudentId: k };
    
//     try {
//         await client.connect();
//         const dataset = await client.db("StudentList").collection("data").deleteOne(mydata);
//         console.log("data deleted:",dataset)
//         return dataset.deletedCount;
//     } catch (error) {
//         console.log("Error occurred while deleting data:", error);
//         return { error: "Failed to delete data" };
//     } finally {
//         await client.close();
//     }
// }
// async function updateData(StudentId, StudentName ) {
//     try {
//         await client.connect();
//         const updateValues = {};
//         if (newSname !== undefined) {
//             updateValues.sname = newSname;
//         }
//         if (newMark !== undefined) {
//             updateValues.mark = newMark;
//         }
//         const dataset = await client.db('StudentList').collection('data').updateOne({ sno }, { $set: updateValues });
//         return dataset.modifiedCount; 
//     } catch (error) {
//         console.error("Error updating data:", error);
//     } finally {
//         await client.close();
//     }
// }



// module.exports = { finddata, insertdata, deletedata, updateData };


// async function updatedata(filter, update) {
//     try {
//         await client.connect();
//         const result = await client.db("ak").collection("data").updateOne(filter, { $set: update });
//         return JSON.stringify(result);
//     } catch (error) {
//         console.log("Error occurred while updating data:", error);
//         return JSON.stringify({ error: "Failed to update data" });
//     } finally {
//         await client.close();
//     }

// const {MongoClient}= require('mongodb')
// const client = new MongoClient("mongodb://127.0.0.1:27017")
// client.connect()

// async function showalldata(k){
//     ans=k
//     try{
//         const dataset = await client.db("ak").collection("data").find({sno:ans}).toArray()
//         // dataset.then((res)=>{
//         //     console.log(res)
//         // })
//  return JSON.stringify(dataset)

//     }
//     catch{
//         console.log("db closed")
//         await client.close();
//     }
//     async function insertdata(mydata){
    
//         try{
//             const dataset = await client.db("ak").collection("data").insertOne(mydata)
//             // dataset.then((res)=>{
//             //     console.log(res)
    
//             // })
//      return JSON.stringify(dataset)
    
//         }
//         catch{
//             console.log("db closed")
//             await client.close();
//         }
// }
// module.exports = {showalldata,insertdata}
// }
