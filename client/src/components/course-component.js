import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CourseService from '../services/course.service';

const CourseComponent = ({currentUser, setCurrentUser}) => {
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState(null);
    useEffect(() => {
        let _id;
        if(currentUser) {
            _id = currentUser.user._id;
        }

        if(currentUser.user.role == "instructor") {
            CourseService.get(_id).then((data) => {
                setCourseData(data.data);
            }).catch((e) => {
                console.log(e);
            })
        }
        else if(currentUser.user.role == "student") {
            CourseService.getStudentCourses(_id).then((data) => {
                setCourseData(data.data);
            }).catch((e) => {
                console.log(e);
            })
        }

    }, []);

  return (
    <div style={{ padding: '3rm' }}>
        {
            !currentUser && (
                <div>
                    <h1>您尚未登入，請先登入！</h1>
                    <button className="btn btn-primary btn-lg" onClick={() => navigate('/login')}>登入</button>
                </div>
            
        )}
        {
            currentUser && currentUser.user.role == "instructor" && (
                <div>
                    <h1>講師已經登入，歡迎！</h1>
                </div>
            )
        }
        {
            currentUser && currentUser.user.role == "student" && (
                <div>
                    <h1>學生已經登入，歡迎！</h1>
                </div>
            )
        }
        {
            currentUser && courseData && (
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {
                        courseData.map(course => {
                            console.log(course);
                            return <div className="card" style={{ width: "18rem", margin: "1rem" }}>
                                <div className='card-body'>
                                    <h5 className="card-title">課程名稱：{course.title}</h5>
                                    <p style={{margin: "0.5rem"}} className = "card-text">
                                        {course.description}
                                    </p>
                                    <p style={{ margin: "0.5rem 0rem"}}>
                                        學生人數：{course.student.length}
                                    </p>
                                    <p style={{ margin: "0.5rem 0rem"}}>
                                        課程價格：{course.price}
                                    </p>
                                </div>
                            </div>
                        })
                    }
                </div>
            )
        }
    </div>
  );
};

export default CourseComponent;