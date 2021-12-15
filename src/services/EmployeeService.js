import httpCommon from "../commons/http-common";

const getEmployees = () =>{
    return httpCommon.get('/employee/employees')
}

const postEmployee = (data) =>{
    return httpCommon.post('/employee/employees', data)
}

const getEmployee = (employeeId) =>{
    return httpCommon.get(`/employee/employees/${employeeId}`) //note: Different single quote
}

const putEmployee = (data) =>{
    return httpCommon.put('/employee/employees', data)
}

const deleteEmployee = (employeeId) =>{
    return httpCommon.delete(`/employee/employees/${employeeId}`)
}

export default {getEmployees, postEmployee, getEmployee, putEmployee, deleteEmployee}; 