import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import "./Invoices.css";
import Axios from 'axios';

function Invoices() {
    const [invoiceNum, setInvoiceNum] = useState('');
    const [invoiceData, setInvoiceData] = useState(null);

    const downloadInvoice = () => {
        const opt = {
            margin: 0,
            filename: 'invoice.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 5 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(document.getElementById('invoice')).set(opt).save();
    };

    const findInvoice = () => {
        Axios.get(`http://127.0.0.1:4002/api/FindInvoices`, { params: { invoiceNum } })
            .then((res) => {
                setInvoiceData(res.data);
                console.log("res", res.data);
            })
            .catch((err) => {
                console.log(err);
                alert('Error occurred during find operation.');
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 animate__animated animate__bounceIn">INVOICES</h2>
            <div className="row justify-content-center">
                <div className="col-md-8 animate__animated animate__backInRight animate__delay-1s">
                    <div className="input-group mb-3 ">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter invoice number"
                            value={invoiceNum}
                            onChange={(e) => setInvoiceNum(e.target.value)}
                        />
                        <button className="btn btn-primary mx-2 animate__animated animate__backInRight animate__delay-2s" type="button" onClick={findInvoice}>Find Invoice</button>
                    </div>
                </div>
            </div>
            {invoiceData && invoiceData.invoice && invoiceData.invoice.length > 0 && (
                <div className="row justify-content-center animate__animated animate__backInUp animate__delay-1s">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h2 className="card-title">STUDENT FEES PAYMENT INVOICE</h2>
                            </div>
                            <div className="card-body" id="invoice">
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                       <p> <strong>Invoice Number:</strong> {invoiceData.invoice[0].invoiceNum}</p>
                                    </div>
                                    <div className="col-md-6 text-md-end">
                                        <p><strong>Date:</strong> {invoiceData.invoice[0].currentDateTime}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <h3>Student Information</h3>
                                        <p><strong>Student ID:</strong> {invoiceData.invoice[0].sno}</p>
                                        <p><strong>Name:</strong> {invoiceData.invoice[0].sname}</p>
                                        <p><strong>Course:</strong> {invoiceData.invoice[0].course}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <h3>Payment Information</h3>
                                        <p><strong>Fees:</strong> ${invoiceData.invoice[0].fees}</p>
                                        <p><strong>Paying Amount:</strong> ${invoiceData.invoice[0].payingAmount}</p>
                                        <p><strong>Paid Amount:</strong> ${invoiceData.invoice[0].paidAmount}</p>
                                        <p><strong>Remaining Amount:</strong> ${invoiceData.invoice[0].remainingAmount}</p>
                                        <p><strong>Payment Method:</strong> {invoiceData.invoice[0].paymentMethod}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-12">
                                        <h3>Summary</h3>
                                        <p><strong>Total Amount:</strong> ${invoiceData.invoice[0].fees}</p>
                                        <p><strong>Paid:</strong> ${invoiceData.invoice[0].paidAmount}</p>
                                        <p><strong>Remaining:</strong> ${invoiceData.invoice[0].remainingAmount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="row justify-content-center mt-4">
                <div className="col-md-8">
                    <button className="btn btn-primary animate__animated animate__backInLeft animate__delay-3s" onClick={downloadInvoice}>Download Invoice</button>
                </div>
            </div>
        </div>
    );
}

export default Invoices;
