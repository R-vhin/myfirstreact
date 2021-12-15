import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const Employee = () => {
    //function hooks
    const [employees, setEmployees] = useState([])

    //hooks
    useEffect(() => {
         refreshEmployeeTable();
    })

    const refreshEmployeeTable = () =>{
        EmployeeService.getEmployees()
        .then(
        response => {
            setEmployees(response.data);
        }
        )
        .catch(
            err => {
                console.log("something went wrong, awts oks lang yan mag move on ka nalang")
            }
        ) 
    }

    const deleteEmployee = (employeeId) =>{
        EmployeeService.deleteEmployee(employeeId)
        .then(
            response => {
                console.log("successfully deleted na siya sa buhay mo!")
                refreshEmployeeTable();
            }
        )
        .catch(
            error =>{
                console.error("something went wrong, kaya kayo nagbebreak eh", error)
            }
        )
    }

    return(
        <div className = "container">
            <h3>List of Employees</h3>
            <div>
                <table className= "table table-hover table-danger">
                    <thead>
                    <tr className = "table-info">
                        <td>Name</td>
                        <td>Department</td>
                        <td>Location</td>
                        <td>Actions</td>
                    </tr>
                    </thead>
                    <tbody> 
                    {
                        employees.map(
                            employee => (
                                <tr key={employee.employeeId}>
                                    <td>{employee.name}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.location}</td>
                                    <td> 
                                        <div className="d-grid gap-4 d-md-flex">
                                            <Link className="btn btn-primary" to ={`/edit/${employee.employeeId}`}>Update</Link>
                                            <button className="btn btn-danger" onClick={(e)=>deleteEmployee(employee.employeeId)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Employee;