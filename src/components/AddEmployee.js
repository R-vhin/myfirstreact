import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import EmployeeService from "../services/EmployeeService";

const AddEmployee = () =>{
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [department, setDepartment] = useState("");
    const navigate = useNavigate();
    const {employeeId} = useParams(); 

    useEffect(
            () =>{
                if(employeeId){
                    EmployeeService.getEmployee(employeeId)
                .then(
                    response => {
                        setName(response.data.name);
                        setLocation(response.data.location);
                        setDepartment(response.data.department);
                    }
                )
                .catch(
                    error =>{
                        console.error("error, di ka na niya mahal!",error)
                    }
                )
                } 
            },[])

    const saveEmployee = (e) =>{
        e.preventDefault();//to prevent refresh
        const employee = {employeeId, name, location, department}

        if(employeeId){
            //update employee
            EmployeeService.putEmployee(employee)//promise
            .then(response =>{
                console.log("employee updated!")
                navigate("/employees");
            })
            .catch(error =>{
                console.log("something went wrong!",error)
            })
        }
        else{
            //add employee
            EmployeeService.postEmployee(employee)//promise
            .then(response =>{
                console.log("employee added!")
                navigate("/employees");
            })
            .catch(error =>{
                console.log("something went wrong!",error)
            })
        }

    }

    useEffect(
        () =>{
            if(employeeId){
                EmployeeService.getEmployee(employeeId)
                .then(
                    employee =>{
                        setName(employee.data.name);
                        setLocation(employee.data.location);
                        setDepartment(employee.data.department);
                        console.log(employee.data);
                        console.log(employee.location);
                        console.log(employee.department);
                    }
                )
                .catch(
                    error =>{
                        console.error("Error, di ka na niya mahal!",error)
                    }
                )
            }
        },[]
    )

    return(
        <div className = "container ">
            <h3>Add Employees</h3>
                    <form>
                        <div className="mb-3" >
                            <label for="name" className="form-label">Name</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            placeholder="Input Employee Name" 
                            onChange ={
                                (e) => setName(e.target.value) 
                            }
                            />
                        </div>
                        <div className="mb-3" >
                            <label for="location" class="form-label">Location</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="location" 
                            placeholder="Input Employee Location"
                            onChange ={
                                (e) => setLocation(e.target.value) 
                            }/>
                        </div>
                        <div className="mb-3">
                            <label for="department" class="form-label">Department</label>
                            <input 
                            type="text" 
                            class="form-control" 
                            id="department" 
                            placeholder="Input Employee Department"
                            onChange ={
                                (e) => setDepartment(e.target.value) 
                            }/>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={(e) => saveEmployee(e)}>Save</button>
                    </form>
        </div>
    )
}
export default AddEmployee;