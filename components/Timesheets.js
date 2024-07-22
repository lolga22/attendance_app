import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimesheetForm from './TimesheetForm';
import '../styles.css';

const Timesheets = () => {
    const [timesheets, setTimesheets] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedTimesheetId, setSelectedTimesheetId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        fetchTimesheets();
        fetchEmployees();
    }, []);

    const fetchTimesheets = () => {
        axios.get('http://localhost:5106/api/timesheets')
            .then(response => {
                setTimesheets(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the timesheets!', error);
            });
    };

    const fetchEmployees = () => {
        axios.get('http://localhost:5106/api/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the employees!', error);
            });
    };

    const handleEdit = (id) => {
        setSelectedTimesheetId(id);
        setIsFormVisible(true);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5106/api/timesheets/${id}`)
            .then(() => {
                fetchTimesheets();
            })
            .catch(error => {
                console.error('There was an error deleting the timesheet!', error);
            });
    };

    const handleSave = () => {
        fetchTimesheets();
        setIsFormVisible(false);
    };

    const handleCancel = () => {
        setIsFormVisible(false);
    };

    const reasons = [
        { id: 1, description: 'vacation' },
        { id: 2, description: 'sick' },
        { id: 3, description: 'leave' }
    ];

    const getReasonDescription = (id) => {
        const reason = reasons.find(reason => reason.id === id);
        return reason ? reason.description : 'Unknown';
    };

    const getEmployeeName = (id) => {
        const employee = employees.find(emp => emp.id === id);
        return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown';
    };

    return (
        <div className="table-container">
            <h2>Timesheets</h2>
            <button onClick={() => { setSelectedTimesheetId(null); setIsFormVisible(true); }}>Add Timesheet</button>
            {isFormVisible && (
                <TimesheetForm
                    timesheetId={selectedTimesheetId}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Reason</th>
                        <th>Start Date</th>
                        <th>Duration (days)</th>
                        <th>Discounted</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {timesheets.map(timesheet => (
                        <tr key={timesheet.id}>
                            <td>{timesheet.id}</td>
                            <td>{getEmployeeName(timesheet.employee)}</td>
                            <td>{getReasonDescription(timesheet.reason)}</td>
                            <td>{new Date(timesheet.startDate).toLocaleDateString()}</td>
                            <td>{timesheet.duration}</td>
                            <td>{timesheet.discounted ? 'Yes' : 'No'}</td>
                            <td>{timesheet.description}</td>
                            <td>
                                <button onClick={() => handleEdit(timesheet.id)}>Edit</button>
                                <button onClick={() => handleDelete(timesheet.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Timesheets;
