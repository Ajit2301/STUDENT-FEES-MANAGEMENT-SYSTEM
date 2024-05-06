import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Courses() {
    const courses = [
        { name: 'Full Stack Web Developer-MERN', fees: 18000 },
        { name: 'Full Stack Web Developer-MEAN', fees: 18000 },
        { name: 'Data Science', fees: 2000 },
        { name: 'JAVA', fees: 18000 },
        { name: 'Advanced Java', fees: 16000 },
        { name: 'TALLY', fees: 22000 },
    ];

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Available Courses</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {courses.map((course, index) => (
                    <div className="col" key={index}>
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-primary mb-3">{course.name}</h5>
                                <p className="card-text text-muted">Fees: ${course.fees}</p>
                            </div>
                            <div className="card-footer border-0 bg-transparent">
                                <Link to="/signup" className="btn btn-primary w-100">Enroll Now</Link>
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
