import axios from 'axios';

const API_URL = 'http://localhost:8080/api/courses';

class CourseService {
    post(title, description, price) {
        let token = "";
        if (localStorage.getItem('user')) {
            token = JSON.parse(localStorage.getItem('user')).token;
        }
        return axios.post(API_URL, {
            title,
            description,
            price
        }, 
        {
            headers: {
                Authorization: token,
            }
        })
    }
    
    // get all courses by instructor id
    get(_id) {
        let token = "";
        if (localStorage.getItem('user')) {
            token = JSON.parse(localStorage.getItem('user')).token;
        }

        return axios.get(API_URL + '/instructor/' + _id, {
            headers: {
                Authorization: token,
            }
        })
    }

    getStudentCourses(_id) {
        let token = "";
        if (localStorage.getItem('user')) {
            token = JSON.parse(localStorage.getItem('user')).token;
        }

        return axios.get(API_URL + '/student/' + _id, {
            headers: {
                Authorization: token,
            }
        })
    }

    getCourseByName(name) {
        let token = "";
        if (localStorage.getItem('user')) {
            token = JSON.parse(localStorage.getItem('user')).token;
        }

        return axios.get(API_URL + '/findCourse/' + name, {
            headers: {
                Authorization: token,
            }
        })
    }

    enroll(_id) {
        let token = "";
        if (localStorage.getItem('user')) {
            token = JSON.parse(localStorage.getItem('user')).token;
        }
        return axios.post(API_URL + '/enroll/' + _id, {}, {
            headers: {
                Authorization: token,
            }
        })
    }

}

export default new CourseService();