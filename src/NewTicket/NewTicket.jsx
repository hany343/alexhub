import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './NewTicket.css';
import axios from 'axios';

function NewTicket() {
  const url = 'http://localhost:5077/Tickets/Create';
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    subject: '',
    issue: '',
    location: '',
    category: '',
    fingerprint: '',
    categoryID: 0,
    UID: 0
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
    loadUserData();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5077/Tickets/GetCategories');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  var locs={
    'date':'',
    'usr':Object
  }
  const loadUserData = () => {
    locs = localStorage.getItem('user');
    if (locs) {
      console.log(locs)
      var us=JSON.parse(locs);
      const user =us.usr;// JSON.parse(locs.value.usr);
      setFormData(prevData => ({ ...prevData, UID: user.value.userId }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.issue) newErrors.issue = 'Issue description is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.fingerprint) newErrors.fingerprint = 'Fingerprint is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handle = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };

    if (name === 'category') {
      const selectedCategory = categories.find(cat => cat.categoryName === value);
      newFormData.categoryID = selectedCategory ? selectedCategory.cid : 0;
    }

    setFormData(newFormData);
    if (errors[name]) setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const ticketData = {
      subject: formData.subject,
      issue: formData.issue,
      location: formData.location,
      categoryID: formData.categoryID,
      fingerprint: formData.fingerprint,
      UID: formData.UID
    };

    try {
      const result = await axios.post(url, ticketData);
      if (result.status === 200) {
        console.log('Ticket created successfully', result.data);
        navigate('/dashboard'); // Redirect to the dashboard
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div style={{ margin: 'auto', width: '90%', padding: '10px' }}>
      <h2 className='Text3D mb-2'>Create New Ticket</h2>
      <hr className='mb-3' style={{ backgroundColor: "white", height: "4px" }} />
      <form onSubmit={submit}>
        <div className="form-group SubConatin  mb-4">
          <label className='text-white fw-bold mb-2'>Subject</label>
          <input
            onChange={handle}
            id='Subject'
            type="text"
            name="subject"
            className="form-control SubjectInput mb-2"
            value={formData.subject}
          />
          {errors.subject && <span className="text-danger"><i className="bi bi-shield-fill-x"></i> {errors.subject}</span>}
        </div>
        
        <label className='text-white fw-bold mb-2'>Location</label>
        <select
          name="location"
          onChange={handle}
          id='Location'
          className="form-control LocationDrop dropdown-toggle show"
          value={formData.location}
        >
          <option value="" disabled style={{ backgroundColor: "rgba(0, 12, 125, 0.8)", color: "white" }}>Select Site</option>
          <option className="opt" value="Alex 1">Alex 1</option>
          <option className="opt" value="Alex 2">Alex 2</option>
          <option className="opt" value="Alex 3">Alex 3</option>
          <option className="opt" value="Alex 5">Alex 5</option>
          <option className="opt" value="Alex 7">Alex 7</option>
          <option className="opt" value="Alex 8">Alex 8</option>
          <option className="opt" value="Alex 9">Alex 9</option>
          <option className="opt" value="Alex 10">Alex 10</option>
          <option className="opt" value="Alex 11">Alex 11</option>
          <option className="opt" value="Alex 12">Alex 12</option>
          <option className="opt" value="Chapter">Chapter</option>
          <option className="opt" value="Import">Import</option>
          <option className="opt" value="Export">Export</option>
        </select>
        {errors.location && <span className="text-danger"><i className="bi bi-shield-fill-x"></i> {errors.location}</span>}
     
        <div className="form-group mb-4 finger">
          <label className='text-white fw-bold mb-2'>Fingerprint</label>
          <input
            onChange={handle}
            id='fingerprint'
            name="fingerprint"
            className="form-control fingerprint"
            value={formData.fingerprint}
          />
          {errors.fingerprint && <span className="text-danger"><i className="bi bi-shield-fill-x"></i> {errors.fingerprint}</span>}
        </div>
        
        <div className="form-group mb-4">
          <label className='text-white fw-bold mb-2'>Category</label>
          <select
            onChange={handle}
            id='Categories'
            name="category"
            className="form-control LocationDrop mb-2"
            value={formData.category}
          >
            <option value=""  disabled style={{ backgroundColor: "rgba(0, 12, 125, 0.8)", color: "white" }}>Select Category</option>
            {categories.map(category => (
              <option className='opt' key={category.cid} value={category.categoryName}>{category.categoryName}</option>
            ))}
          </select>
          {errors.category && <span className="text-danger"><i className="bi bi-shield-fill-x"></i> {errors.category}</span>}
        </div>
        
        <div className="form-group mb-4">
          <label className='text-white fw-bold mb-2'>Issue</label>
          <textarea
            onChange={handle}
            id='Issues'
            name="issue"
            className="form-control IssueTArea mb-2 no-resize"
            value={formData.issue}
          />
          {errors.issue && <span className="text-danger"><i className="bi bi-shield-fill-x"></i> {errors.issue}</span>}
        </div>

        <button type="submit" className="btn btn-primary mt-5 fw-bold">Submit</button>
      </form>
    </div>
  );
}

export default NewTicket;
