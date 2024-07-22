import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

const TimesheetForm = ({ timesheetId, onSave, onCancel }) => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        employee: '',
        reason: '',
        startDate: '',
        duration: '',
        discounted: false,
        description: ''
    });

    const reasons = [
        { id: 1, description: 'vacation' },
        { id: 2, description: 'sick' },
        { id: 3, description: 'leave' }
    ];

    useEffect(() => {
        fetchEmployees();
        if (timesheetId) {
            fetchTimesheet(timesheetId);
        }
    }, [timesheetId]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5106/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const fetchTimesheet = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5106/api/timesheets/${id}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching timesheet:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (timesheetId) {
                await axios.put(`http://localhost:5106/api/timesheets/${timesheetId}`, formData);
            } else {
                await axios.post('http://localhost:5106/api/timesheets', formData);
            }
            onSave();
        } catch (error) {
            console.error('Error saving timesheet:', error);
        }
    };

    return (
        <div className="form-modal">
            <h2>{timesheetId ? 'Edit Timesheet' : 'Add Timesheet'}</h2>
            <form onSubmit={handleSubmit} className="timesheet-form">
                <div className="form-group">
                    <label htmlFor="employee">Employee:</label>
                    <select name="employee" value={formData.employee} onChange={handleChange}>
                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>
                                {emp.firstName} {emp.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="reason">Reason:</label>
                    <select name="reason" value={formData.reason} onChange={handleChange}>
                        <option value="">Select Reason</option>
                        {reasons.map(reason => (
                            <option key={reason.id} value={reason.id}>
                                {reason.description}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Duration (days):</label>
                    <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="discounted">Discounted:</label>
                    <input
                        type="checkbox"
                        name="discounted"
                        checked={formData.discounted}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="form-actions">
                    <button type="submit">Save</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default TimesheetForm;
