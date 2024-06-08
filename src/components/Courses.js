import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./Courses.css"

function Courses() {
    const courses = [
        { name: 'Full Stack Web Developer-MERN', fees: 37000 },
        { name: 'Full Stack Web Developer-MEAN', fees: 37000 },
        { name: 'Data Science', fees: 30000 },
        { name: 'JAVA', fees: 35000 },
        { name: 'Advanced Java', fees: 38000 },
        { name: 'TALLY', fees: 22000 },
    ];

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 animate__animated animate__bounceIn">Available Courses</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 animate__animated animate__backInUp animate__delay-1s">
                {courses.map((course, index) => (
                    <div className="col " key={index}>
                        <div className="card h-100  shadow-sm ">
                            <div className="card-body">
                                <h5 className="card-title  mb-3">{course.name}</h5>
                                <p className="card-text ">Fees: ₹{course.fees} </p>
                            </div>
                            <div className="card-footer border-0 bg-transparent">
                                <Link to="/signup" className="btn  w-30 animate__animated animate__heartBeat animate__delay-3s">Enroll Now</Link>
                                {/* Use Link from react-router-dom to navigate to Signup component */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Courses;
