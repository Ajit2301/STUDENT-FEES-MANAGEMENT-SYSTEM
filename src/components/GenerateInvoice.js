import React from 'react';
import html2pdf from 'html2pdf.js';
import Axios from 'axios';

function GenerateInvoice({invoiceNum, sno, sname, course, fees, payingAmount, paidAmount, remainingAmount, currentDateTime, paymentMethod }) {
    const totalAmount = parseInt(fees);
    const paid = parseInt(paidAmount);
    const remaining = parseInt(remainingAmount);
    const AddtoDatabase = () => {
   
        Axios.get(`http://127.0.0.1:4002/api/InsertInvoice`, {
          params: { invoiceNum, sno, sname, course, fees, payingAmount, paidAmount, remainingAmount, currentDateTime, paymentMethod }
        })
          .then((res) => {
           
    
        
            alert('Insert operation successful.');
          })
          .catch((err) => {
            console.log(err);
            alert('Error occurred during insert operation.');
          });
      };
    

    const downloadInvoice = () => {
        const opt = {
            margin:       0,
            filename:     'invoice.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 5 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(document.getElementById('invoice')).set(opt).save();
    };

    return (
        <>  
        
        <div  id="invoice"className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h2 className="card-title">Generated Invoice</h2>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <strong>Invoice Number:</strong> {invoiceNum}
                                </div>
                                <div className="col-md-6 text-md-end">
                                    <strong>Date:</strong> {currentDateTime}
                                </div>
                            </div>
                            <hr />
                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <h3>Student Information</h3>
                                    <p><strong>Student ID:</strong> {sno}</p>
                                    <p><strong>Name:</strong> {sname}</p>
                                    <p><strong>Course:</strong> {course}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <h3>Payment Information</h3>
                                    <p><strong>Fees:</strong> ${fees}</p>
                                    <p><strong>Paying Amount:</strong> ${payingAmount}</p>
                                    <p><strong>Paid Amount:</strong> ${paidAmount}</p>
                                    <p><strong>Remaining Amount:</strong> ${remainingAmount}</p>
                                    <p><strong>Payment Method:</strong> {paymentMethod}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-12">
                                    <h3>Summary</h3>
                                    <p><strong>Total Amount:</strong> ${totalAmount}</p>
                                    <p><strong>Paid:</strong> ${paid}</p>
                                    <p><strong>Remaining:</strong> ${remaining}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center mt-4">
                <div className="col-md-8">
                    <div className="card border-info">
                        <div className="card-body">
                            <p className="text-center">Thank you for your payment. If you have any questions, please contact us.</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
        <div className="row justify-content-center mt-4">
        <div className="col-md-8">
            <button className="btn btn-primary" onClick={downloadInvoice}>Download Invoice</button>
            <button className="btn btn-primary" onClick={AddtoDatabase}>Add To Database</button>
        </div>
    </div>
    </>
    );
}

export default GenerateInvoice;
