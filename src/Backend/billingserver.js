const http = require('http');
const url = require('url');
const database = require("./billingdatabase.js"); 
http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Max-Age', 2592000);

    console.log(req.url);
    const { pathname, query } = url.parse(req.url, true);
    console.log(pathname);
    console.log(query);

    try {
        if (pathname === '/api/find') {
            const dataset = await database.finddata(query.sno);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(dataset));
        } else if (pathname === '/api/invoicefind') {
            const dataset = await database.finddata(query.sno,query.sname,query.course,query.fees);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(dataset));
        } else if (pathname === '/api/lastInvoiceNum') {
            const dataset = await database.lastInvoiceNum(query.invoiceNum);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(dataset));
        } else if (pathname === '/api/getLastSno') {
            const selectedCourse = query.course; // Correctly extract the selectedCourse parameter from the query
            const dataset = await database.getLastSno(selectedCourse);
            console.log(dataset);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(dataset));
        }
        
         else if (pathname === '/api/findAmount') {
            const dataset = await database.findAmountToBeCreated(query.sno,query.remainingAmount,query.updatedPaidAmount);
            console.log(dataset)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(dataset));
        } else if (pathname === '/api/FindInvoices') {
            const dataset = await database.FindInvoices(query.invoiceNum);
            console.log(dataset)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(dataset));
        } else if (pathname === '/api/login') {
            const dataset = await database.login(query.username,query.password);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(dataset));
        } else if (pathname === '/api/signup') {
            const dataset = await database.signupdata(query);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(dataset));
        } else if (pathname === '/api/insert') {
            const dataset = await database.insertdata(query);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(dataset));
        } else if (pathname === '/api/InsertInvoice') {
            const dataset = await database.InsertInvoice(query);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(dataset));
        } else if (pathname === '/api/createInvoice') {
            const dataset = await database.createInvoice(query);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(dataset));
        } else if (pathname === '/api/delete') {
            const dataset = await database.deletedata(parseInt(query.sno));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(dataset));
        } else if (pathname === '/api/update') {
            const sno = query.sno; 
            const newSname = query.sname; // Assuming user provides the new sname
            const newDob=query.dob;
            const newDoj=query.doj;
            const newQualification=query.qualification;
            const newCourse=query.course;
            const newFees =parseInt(query.fees);
            const newState=query.state;
            const newAddress=query.address;
            const newEmail=query.email;
            const newContact = parseInt(query.contact); // Assuming user provides the new mark
            const modifiedCount = await database.updateData(sno, newSname,newDob,newDoj, newQualification,newCourse,newFees,newState,newAddress,newEmail,newContact);

            console.log("Documents updated:", modifiedCount);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(modifiedCount));
        } else if (pathname === '/api/updateInvoice') {
            const sno = query.sno;
            const newPayingAmount = parseInt(query.payingAmount);
            const newupdatedPaidAmount = parseInt(query.updatedPaidAmount);
            const newRemainingAmount = parseInt(query.remainingAmount);
            const newPaymentMethod = query.paymentMethod;
            const newCurrentDateTime = query.currentDateTime;
            const result = await database.Invoicedata(sno, newPayingAmount, newupdatedPaidAmount,newRemainingAmount,newPaymentMethod, newCurrentDateTime);

            console.log("Documents updated:", result);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
        }
    } catch (error) {
        console.error("Error:", error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
}).listen(4002);

console.log("Server listening on port 4002");

// const http = require('http');
// const url = require('url');
// const database = require("./billingdatabase.js"); // Connect to MongoDB and define database operations

// http.createServer(async (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
//     res.setHeader('Access-Control-Max-Age', 2592000);

//     console.log(req.url);
//     const { pathname, query } = url.parse(req.url, true);
//     console.log(pathname);
//     console.log(query);

//     try {
//         if (pathname === '/api/find') {
//             const dataset = await database.finddata(query.sno);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(dataset));
//         } else if (pathname === '/api/invoicefind') {
//             const dataset = await database.finddata(query.sno,query.sname,query.course,query.fees);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(dataset));
//         } else if (pathname === '/api/login') {
//             const dataset = await database.login(query.username,query.password);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify(dataset));
//         } else if (pathname === '/api/signup') {
//             const dataset = await database.signupdata(query);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(dataset));
//         } else if (pathname === '/api/insert') {
//             const dataset = await database.insertdata(query);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(dataset));
//         } else if (pathname === '/api/createInvoice') {
//             const dataset = await database.createInvoice(query);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(dataset));
//         } else if (pathname === '/api/delete') {
//             const dataset = await database.deletedata(parseInt(query.sno));
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(dataset));
//         } else if (pathname === '/api/update') {
//             const sno = query.sno; 
//             const newSname = query.sname; // Assuming user provides the new sname
//             const newDob=parseInt(query.dob);
//             const newDoj=parseInt(query.doj);
//             const newQualification=query.qualification;
//             const newCourse=query.course;
//             const newFees =parseInt(query.fees);
//             const newAddress=query.address;
//             const newState=query.state;
//             const newEmail=query.email;
//             const newContact = parseInt(query.contact); // Assuming user provides the new mark
//             const modifiedCount = await database.updateData(sno, newSname, newQualification,newDob,newDoj,newFees,newCourse,newAddress,newState,newEmail,newContact);

//             console.log("Documents updated:", modifiedCount);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(modifiedCount));
//         } else if (pathname === '/api/updateInvoice') {
//             const sno = query.sno;
//             const newfees = parseInt(query.fees);
//             const newpayingAmount = parseInt(query.payingAmount);
//             const newupdatedPaidAmount = parseInt(query.updatedPaidAmount);
//             const newremainingAmount = parseInt(query.remainingAmount);
//             const newpaymentMethod = query.paymentMethod;
//             const newCurrentDateTime = query.currentDateTime;
//             const modifiedCount = await database.updateInvoice(sno, newfees, newpayingAmount, newupdatedPaidAmount, newremainingAmount, newpaymentMethod, newCurrentDateTime);

//             console.log("Documents updated:", modifiedCount);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(modifiedCount));
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         res.writeHead(500, { 'Content-Type': 'application/json' });
//         res.write(JSON.stringify({ error: "Internal Server Error" }));
//     } finally {
//         res.end();
//     }
// }).listen(4002);

// console.log("Server listening on port 4002");

// const http = require('http');
// const url = require('url');
// const database = require("./billingdatabase.js"); // Connect to MongoDB and define database operations

// http.createServer(async (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
//     res.setHeader('Access-Control-Max-Age', 2592000);

//     console.log(req.url);
//     const { pathname, query } = url.parse(req.url, true);
//     console.log(pathname);
//     console.log(query);

//     try {
//         if (pathname === '/api/find') {
//             const dataset = await database.finddata(query.sno);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(dataset));
//         }
//         if (pathname === '/api/invoicefind') {
//             const dataset = await database.finddata(query.sno,query.sname,query.course,query.fees);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(dataset));
//         }
//         if (pathname === '/api/login') {
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             const dataset = await database.login(query.username,query.password);
//             res.end(JSON.stringify(dataset));
//         } else if (pathname === '/api/signup') {
//             const dataset = await database.signupdata(query);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(dataset));
//         } else if (pathname === '/api/insert') {
//             const dataset = await database.insertdata(query);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(dataset));
//         } else if (pathname === '/api/createInvoice') {
//             const dataset = await database.createInvoice(query);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(dataset));
//         } else if (pathname === '/api/delete') {
//             const dataset = await database.deletedata(parseInt(query.sno));
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(dataset));
//         } else if (pathname === '/api/update') {
//             const sno = query.sno; 
//             const newSname = query.sname; // Assuming user provides the new sname
//             const newDob=parseInt(query.dob);
//             const newDoj=parseInt(query.doj);
//             const newQualification=query.qualification;
//             const newCourse=query.course;
//             const newFees =parseInt(query.fees);
//             const newAddress=query.address;
//             const newState=query.state;
//             const newEmail=query.email;
//             const newContact = parseInt(query.contact); // Assuming user provides the new mark
//             const modifiedCount = await database.updateData(sno, newSname, newQualification,newDob,newDoj,newFees,newCourse,newAddress,newState,newEmail,newContact);

//             console.log("Documents updated:", modifiedCount);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(modifiedCount));
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         res.writeHead(500, { 'Content-Type': 'application/json' });
//         res.write(JSON.stringify({ error: "Internal Server Error" }));
//     } finally {
//         res.end();
//     }
//     }       else if (pathname === '/api/updateInvoice') {
           
           
//             const newFees =parseInt(query.Fees);
//             const newpayingAmount=query.payingAmount
//             const newupdatedPaidAmount=query.updatedPaidAmount;
//             const newremainingAmount=query.remainingAmount;
//             const newpaymentMethod = query.paymentMethod; // Assuming user provides the new mark
//             const newcurrentDateTime = query.currentDateTime; // Assuming user provides the new mark
//             const modifiedCount = await database.updateData(sno, newSname, newQualification,newDob,newDoj,newFees,newCourse,newAddress,newState,newEmail,newContact);

//             console.log("Documents updated:", modifiedCount);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(modifiedCount));
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         res.writeHead(500, { 'Content-Type': 'application/json' });
//         res.write(JSON.stringify({ error: "Internal Server Error" }));
//     } finally {
//         res.end();
//     }
// }).listen(4002);

// console.log("Server listening on port 4002"); 

// const http = require('http');
// const url = require('url');
// const database = require("./billingdatabase.js"); // Connect to MongoDB and define database operations

// http.createServer(async (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
//     res.setHeader('Access-Control-Max-Age', 2592000);

//     console.log(req.url);
//     const { pathname, query } = url.parse(req.url, true);
//     console.log(pathname);
//     console.log(query);

    
//         try {
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             if (pathname === '/api/find') {
//                 const dataset = await database.finddata(query.sno);
//                 res.write(JSON.parse(JSON.stringify(dataset)));
                
//             } else if (pathname === '/api/signup') {
//                 const dataset = await database.signupdata(query);
//                 res.write(JSON.parse(JSON.stringify(dataset)));
//             } else if (pathname === '/api/insert') {
//                 const dataset = await database.insertdata(query);
//                 res.write(JSON.parse(JSON.stringify(dataset)));

//             } else if (pathname === '/api/delete') {
//                 const dataset = await database.deletedata(parseInt(query.sno));
//                 res.write(JSON.parse(JSON.stringify(dataset)));

//             } else if (pathname === '/api/update') {
//         const sno = query.sno; 
//         const newSname = query.sname; // Assuming user provides the new sname
//         const newDob=parseInt(query.dob);
//         const newDoj=parseInt(query.doj);
//         const newQualification=query.qualification;
//         const newCourse=query.course;
//         const newFees =parseInt(query.fees);
//         const newAddress=query.address;
//         const newState=query.state;
//         const newEmail=query.email;
//         const newContact = parseInt(query.contact); // Assuming user provides the new mark
//         const dataset = await database.updateData(sno, newSname, newQualification,newDob,newDoj,newFees,newCourse,newAddress,newState,newEmail,newContact);
        
//         console.log("Documents updated:", modifiedCount);
//         res.write(JSON.parse(JSON.stringify(dataset)));
        
//     }
//         } catch (error) {
//             console.error("Error:", error);
//             res.write(JSON.stringify({ error: "Internal Server Error" }));
//         } 
        
//         res.end();
//     } 
  
    
// ).listen(4002);

// console.log("Server listening on port 4002"); 

// const http = require('http');
// const url = require('url');
// const database = require("./billingdatabase.js"); // Connect to MongoDB and define database operations

// const PORT = 4002;

// const server = http.createServer(async (req, res) => {
//     // Set CORS headers
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
//     res.setHeader('Access-Control-Max-Age', 2592000);

//     // Parse request URL
//     const { pathname, query } = url.parse(req.url, true);

//     try {
//         if (pathname === '/api/find') {
//             const dataset = await database.findData(parseInt(query.registrationNumber));
//             sendJSONResponse(res, 200, dataset);
//         } else if (pathname === '/api/insert') {
//             let requestBody = '';
//             req.on('data', (chunk) => {
//                 requestBody += chunk.toString();
//             });
//             req.on('end', async () => {
//                 try {
//                     const newData = JSON.parse(requestBody);
//                     // Process newData...
//                     const result = await database.insertData(newData);
//                 } catch (error) {
//                     console.error("Error parsing JSON:", error);
//                     // Send error response to client...
//                 }
//                 sendJSONResponse(res, 200, result);
//             });
//         } else if (pathname === '/api/delete') {
//             const result = await database.deleteData(parseInt(query.registrationNumber));
//             sendJSONResponse(res, 200, result);
//         } else if (pathname === '/api/update') {
//             const { id, ...updatedFields } = query;
//             const result = await database.updateData(id, updatedFields);
//             sendJSONResponse(res, 200, result);
//         } else {
//             sendJSONResponse(res, 404, { error: "Not Found" });
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         sendJSONResponse(res, 500, { error: "Internal Server Error" });
//     }
// });

// function sendJSONResponse(res, statusCode, data) {
//     res.writeHead(statusCode, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify(data));
// }

// server.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });

// const http = require('http');
// const url = require('url');
// const database = require("./billingdatabase.js"); // Connect to MongoDB and define database operations

// const PORT = 4002;

// const server = http.createServer(async (req, res) => {
//     // Set CORS headers
//     // Set CORS headers
// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
// res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Include necessary headers
// res.setHeader('Access-Control-Max-Age', 2592000);

//     // Parse request URL
//     console.log('Request URL:', req.url);
//     const { pathname, query } = url.parse(req.url, true);
//     console.log('Pathname:', pathname);
//     console.log('Query:', query);

//     try {
//         res.writeHead(200, { 'Content-Type': 'application/json' });

//         if (pathname === '/api/find') {
//             const dataset = await database.finddata(parseInt(query.registrationNumber));
//             console.log('Data retrieved from database:', dataset);
//             res.end(JSON.parse(JSON.stringify(dataset)));
//         } else if (pathname === '/api/insert') {
//             const dataset = await database.insertdata(query);
//             console.log('Insert result:', dataset);
//             res.end(JSON.parse(JSON.stringify(dataset)));
//         } else if (pathname === '/api/delete') {
//             const dataset = await database.deletedata(parseInt(query.registrationNumber));
//             console.log('Delete result:', dataset);
//             res.end(JSON.stringify(dataset));
//         } else if (pathname === '/api/update') {
//             const { id, name, dob, qualification, address, state, pincode, contact, experience, course, fees, pendingAmount, dateOfJoining } = query;
//             const updatedFields = { name, dob, qualification, address, state, pincode, contact, experience, course, fees, pendingAmount, dateOfJoining };
//             const dataset = await database.updatedata(id, updatedFields);
//             console.log('Update result:', dataset);
//             res.end(JSON.stringify(dataset));
//         } 
//     } catch (error) {
//         console.error("Error:", error);
//         // res.writeHead(500, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ error: "Internal Server Error" }));
//     }
// });

// server.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });

// const http = require('http');
// const url = require('url');
// const database = require("./billingdatabase.js"); // Connect to MongoDB and define database operations

// const PORT = 4002;

// const server = http.createServer(async (req, res) => {
//     // Set CORS headers
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow content-type header
//     res.setHeader('Access-Control-Max-Age', 2592000);

//     // Parse request URL
//     console.log('Request URL:', req.url);
//     const { pathname, query } = url.parse(req.url, true);
//     console.log('Pathname:', pathname);
//     console.log('Query:', query);

//     try {
//         res.writeHead(200, { 'Content-Type': 'application/json' });

//         if (pathname === '/api/find') {
//             const dataset = await database.finddata(parseInt(query.registrationNumber));
//             console.log('Data retrieved from database:', dataset);
//             res.write(JSON.parse(JSON.stringify(dataset)));
//         } else if (pathname === '/api/insert') {
//             const dataset = await database.insertdata(query);
//             console.log('Insert result:', dataset);
//             res.write(JSON.stringify(dataset));

//         } else if (pathname === '/api/delete') {
//             const dataset = await database.deletedata(parseInt(query.registrationNumber));
//             console.log('Delete result:', dataset);
//             res.write(JSON.parse(JSON.stringify(dataset)));
//         } else if (pathname === '/api/update') {
//             const { id, name, dob, qualification, address, state, pincode, contact, experience, course, fees, pendingAmount, dateOfJoining } = query;
//             const updatedFields = { name, dob, qualification, address, state, pincode, contact, experience, course, fees, pendingAmount, dateOfJoining };
//             const dataset = await database.updatedata(id, updatedFields);
//             console.log('Update result:', dataset);
//             res.write(JSON.parse(JSON.stringify(dataset)));
//         } 
//     } catch (error) {
//         console.error("Error:", error);
//         // res.writeHead(500, { 'Content-Type': 'application/json' });
//         res.write(JSON.stringify({ error: "Internal Server Error" }));
//     } finally {
//         res.end();
//     }
// });

// server.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });

// const http = require('http');
    // const url = require('url');
    // const database = require("./billingdatabase.js"); // Connect to MongoDB and define database operations

    // const PORT = 4002;

    // const server = http.createServer(async (req, res) => {
    //     // Set CORS headers
    //     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    //     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
        
    //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow content-type header
    //     res.setHeader('Access-Control-Max-Age', 2592000);

    //     // Parse request URL
    //     console.log(req.url);
    //     const { pathname, query } = url.parse(req.url, true);
    //     console.log(pathname);
    //     console.log(query);

    //     try {
    //         res.writeHead(200, { 'Content-Type': 'application/json' });

    //         if (pathname === '/api/find') {
    //             const dataset = await database.finddata(parseInt(query.registrationnumber));
    //             res.write(JSON.parse(JSON.stringify(dataset)));
    //         } else if (pathname === '/api/insert') {
    //             const dataset = await database.insertdata(query);
    //             res.write(JSON.parse(JSON.stringify(dataset)));

    //         } else if (pathname === '/api/delete') {
    //             const dataset = await database.deletedata(parseInt(query.registrationnumber));
    //             res.write(JSON.parse(JSON.stringify(dataset)));
    //         } else if (pathname === '/api/update') {
    //             const { id, name, dob, qualification, address, state, pincode, contact, experience, course, fees, pendingAmount, dateOfJoining } = query;
    //             const updatedFields = { name, dob, qualification, address, state, pincode, contact, experience, course, fees, pendingAmount, dateOfJoining };
    //             const dataset = await database.updatedata(id, updatedFields);
    //             res.write(JSON.parse(JSON.stringify(dataset)));
    //         } 
    //     } catch (error) {
    //         console.error("Error:", error);
    //         // res.writeHead(500, { 'Content-Type': 'application/json' });
    //         res.write(JSON.stringify({ error: "Internal Server Error" }));
    //     } 
    //         res.end();
        

    //     });

    // server.listen(PORT, () => {
    //     console.log(`Server listening on port ${PORT}`);
    // });

// const http = require('http');
// const url = require('url');
// const database = require("./dbreactfind.js"); // Connect to MongoDB and define database operations

// http.createServer(async (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
//     res.setHeader('Access-Control-Max-Age', 2592000);

//     console.log(req.url);
//     const { pathname, query } = url.parse(req.url, true);
//     console.log(pathname);
//     console.log(query);

    
//         try { let dataset={}
//             if (pathname === '/api/find') {
//          dataset = await database.finddata(parseInt(query.sno));
                
//             } else if (pathname === '/api/insert') {
//                  dataset = await database.insertdata(query);

//             } else if (pathname === '/api/delete') {
//                 dataset = await database.deletedata(parseInt(query.sno));
                
//             } else if (pathname === '/api/update') {
//                 const sno = parseInt(query.sno);
//                 const newSname = query.sname; // Assuming user provides the new sname
//                 const newMark = parseInt(query.mark); // Assuming user provides the new mark
//                 const modifiedCount = await database.updateData(sno, newSname, newMark);
                
//                 console.log("Documents updated:", modifiedCount);
                
//             }
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.parse(JSON.stringify(dataset)));
//         } catch (error) {
//             console.error("Error:", error);
//             res.writeHead(500, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify({ error: "Internal Server Error" }));
//         } finally {
//             res.end();
//         }
//     } 
  
    
// ).listen(4002);

// console.log("Server listening on port 4002"); 


// const http = require('http');
// const url = require('url');
// const database = require("./billingdatabase.js"); // Connect to MongoDB and define database operations

// http.createServer(async (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
//     res.setHeader('Access-Control-Max-Age', 2592000);

//     console.log(req.url);
//     const { pathname, query } = url.parse(req.url, true);
//     console.log(pathname);
//     console.log(query);

    
//         try {
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             if (pathname === '/api/find') {
//                 const dataset = await database.finddata(parseInt(query.StudentId));
//                 res.write(JSON.parse(JSON.stringify(dataset)));
                
//             } else if (pathname === '/api/insert') {
//                 const dataset = await database.insertdata(query);
//                 res.write(JSON.parse(JSON.stringify(dataset)));

//             } else if (pathname === '/api/delete') {
//                 const dataset = await database.deletedata(parseInt(query.StudentId));
//                 res.write(JSON.parse(JSON.stringify(dataset)));

//             } else if (pathname === '/api/update') {
//         const sno = parseInt(query.sno); 
//         const newSname = query.sname; // Assuming user provides the new sname
//         const newMark = parseInt(query.mark); // Assuming user provides the new mark
//         const dataset = await database.updateData(sno, newSname, newMark);
        
//         console.log("Documents updated:", modifiedCount);
//         res.write(JSON.parse(JSON.stringify(dataset)));
        
//     }
//         } catch (error) {
//             console.error("Error:", error);
//             res.write(JSON.stringify({ error: "Internal Server Error" }));
//         } 
        
//         res.end();
//     } 
  
    
// ).listen(4002);

// console.log("Server listening on port 4002"); 
// var http = require('http')
// var url = require('url')
// var database=require("./dbreactfind.js") // connect to mongodb showalldata


// http.createServer(async(req,res)=>{
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET')
//     res.setHeader('Access-Control-Max-Age', 2592000),
//     console.log(req.url)
//     var argdata=url.parse(req.url,true)
//     console.log(argdata)
//     console.log(argdata.query)
//     finalres=JSON.parse(JSON.stringify(argdata.query))
//     console.log(finalres)

// if(req.url=='/api/find')
// {

//     try{
//     res.writeHead(200,{'content-Type':'application/json'})
//     const dataset= await database.showalldata(parseInt(finalres.sno))
//     console.log("Result",dataset)
//     res.write(dataset)
//     }
//     finally{
//         res.end()
//     }
// }
//     if(req.url=='/api/insert')
// {

// try{
//     res.writeHead(200,{'content-Type':'application/json'})
//     const dataset= await database.insertdata((finalres))
//     console.log("Result",dataset)
//     res.write(dataset)
//     }
//     finally{
//         res.end()
//     }
// }
// }
// ).listen(4002)

// console.log("port listening at 4002")