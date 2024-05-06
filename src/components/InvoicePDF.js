import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// PDF Invoice Component
function InvoicePDF({ invoiceNum, sno, sname, course, fees, payingAmount, paidAmount, remainingAmount, currentDateTime, paymentMethod }) {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Invoice Number: {invoiceNum}</Text>
            <Text>Student ID: {sno}</Text>
            <Text>Student Name: {sname}</Text>
            <Text>Date: {currentDateTime}</Text>
            <Text>Course: {course}</Text>
            <Text>Fees: {fees}</Text>
            <Text>Paying Amount: {payingAmount}</Text>
            <Text>Paid Amount: {paidAmount}</Text>
            <Text>Remaining Amount: {remainingAmount}</Text>
            <Text>Payment Method: {paymentMethod}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default InvoicePDF;
