import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { feeGroup, feesTypes, paymentType } from '../../../core/common/selectoption/selectoption'
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";

import { api_path } from "../../../../environment";


const AddStudent = () => {

  // const routes = all_routes;
  const navigation = useNavigate();

  const navigationPath = () => {
    setTimeout(() => {
      navigation(routes.studentList);
    }, 1000);
  };

  const [studentData, setStudentData] = useState({
    academicYear : "",
    admissionNumber: "",
    rollNumber: "",
    status :"",
    firstName: "",
    lastName: "",
    class:"",
    section:"",
    gender:"",
    bloodGroup:"",
    religion:"",
    caste:"",
    contactNumber:"",
    email:"",
    motherTongue:"",
    address:"",
    languageKnown:"",
    fatherName:"",
    fatherEmail:"",
    fatherNumber:"",
    fatherOccupation:"",
    motherName:"",
    motherEmail:"",
    motherNumber:"",
    motherOccupation:"",
    siblingName:"",
    siblingRollno:"",
    siblingAdno:"",
    siblingSection:"",
    currentAddress:"",
    permanentAddress:"",
    route:"",
    vehicleNumber:"",
    pickupPoint:"",
    hostel:"",
    hostelRoomNo:"",
    bankName:"",
    bankBranch:"",
    bankIfsc:"",
  
    });

  const routes = all_routes;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [owner, setOwner] = useState<string[]>(['English','Spanish']);
  const [owner1, setOwner1] = useState<string[]>([]);
  const [owner2, setOwner2] = useState<string[]>([]);
  const [defaultDate, setDefaultDate] = useState<dayjs.Dayjs | null>(null);
  const [newContents, setNewContents] = useState<number[]>([0]);
  const location = useLocation();
  const addNewContent = () => {
    setNewContents([...newContents, newContents.length]);
  };
  const removeContent = (index:any) => {
    setNewContents(newContents.filter((_, i) => i !== index));
  };
  useEffect(() => {
    if (location.pathname === routes.editStudent ) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${month}-${day}-${year}`;
      const defaultValue = dayjs(formattedDate);
      setIsEdit(true)
      setOwner(["English"])
      setOwner1(["Medecine Name"])
      setOwner2(["Allergy","Skin Allergy"])
      setDefaultDate(defaultValue)
      console.log(formattedDate,11);
      
    }else {
      setIsEdit(false)
      setDefaultDate(null)
    }
  }, [location.pathname])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async (event: React.FormEvent) => {

    event.preventDefault();

    // if (!validateForm()) return;

    try {
      const response = await fetch(`${api_path}/students/createStudent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          academicYear : studentData.academicYear,
          admissionNumber: studentData.admissionNumber,
          rollNumber: studentData.rollNumber,
          status :studentData.status,
          firstName: studentData.firstName,
          lastName: studentData.lastName,
          class:studentData.class,
          section:studentData.section,
          gender:studentData.gender,
          bloodGroup:studentData.bloodGroup,
          religion:studentData.religion,
          caste:studentData.caste,
          contactNumber:studentData.contactNumber,
          email:studentData.email,
          motherTongue:studentData.motherTongue,
          address:studentData.address,
          languageKnown:studentData.languageKnown,
          fatherName:studentData.fatherName,
          fatherEmail:studentData.fatherEmail,
          fatherNumber:studentData.fatherNumber,
          fatherOccupation:studentData.fatherOccupation,
          motherName:studentData.motherName,
          motherEmail:studentData.motherEmail,
          motherNumber:studentData.motherNumber,
          motherOccupation:studentData.motherOccupation,
          siblingName:studentData.siblingName,
          siblingRollno:studentData.siblingRollno,
          siblingAdno:studentData.siblingAdno,
          siblingSection:studentData.siblingSection,
          currentAddress:studentData.currentAddress,
          permanentAddress:studentData.permanentAddress,
          route:studentData.route,
          vehicleNumber:studentData.vehicleNumber,
          pickupPoint:studentData.pickupPoint,
          hostel:studentData.hostel,
          hostelRoomNo:studentData.hostelRoomNo,
          bankName:studentData.bankName,
          bankBranch:studentData.bankBranch,
          bankIfsc:studentData.bankIfsc,
        }),
      });
      const data = await response.text();
    if (response.ok) {
      console.log(data);
      alert("Student Created Successfully");
      navigationPath(); // Redirect immediately
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error('Error Creating User:', error);
  }
};


  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content content-two">
          {/* Page Header */}
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="mb-1">{isEdit?'Edit':'Add'} Student</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={routes.adminDashboard}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={routes.studentList}>Students</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {isEdit?'Edit':'Add'} Student
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              <form>
                {/* Personal Information */}
                <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-info-square-rounded fs-16" />
                      </span>
                      <h4 className="text-dark">Personal Information</h4>
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                          <div className="d-flex align-items-center justify-content-center avatar avatar-xxl border border-dashed me-2 flex-shrink-0 text-dark frames">
                            <i className="ti ti-photo-plus fs-16" />
                          </div>
                          <div className="profile-upload">
                            <div className="profile-uploader d-flex align-items-center">
                              <div className="drag-upload-btn mb-3">
                                Upload
                                <input
                                  type="file"
                                  className="form-control image-sign"
                                  multiple
                                />
                              </div>
                              <Link to="#" className="btn btn-primary mb-3">
                                Remove
                              </Link>
                            </div>
                            <p className="fs-12">
                              Upload image size 4MB, Format JPG, PNG, SVG
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row row-cols-xxl-5 row-cols-md-6">
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Academic Year</label>
                          <input type="text"
                                  id="academicYear"
                                  name="academicYear" className="form-control"
                            value={studentData.academicYear} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Admission Number</label>
                          <input type="text" id="admissionNumber" name="admissionNumber" className="form-control" value={studentData.admissionNumber} onChange={handleChange}/>
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Admission Date</label>
                          <div className="input-icon position-relative">
                          {isEdit? <DatePicker
                                className="form-control datetimepicker"  id="" name=""
                                format={{
                                  format: "DD-MM-YYYY",
                                  type: "mask",
                                }}
                                value={defaultDate} 
                                placeholder="Select Date"
                              /> : <DatePicker
                              className="form-control datetimepicker"
                              format={{
                                format: "DD-MM-YYYY",
                                type: "mask",
                              }}
                              defaultValue=""
                              placeholder="Select Date"
                            />}
                            <span className="input-icon-addon">
                              <i className="ti ti-calendar" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Roll Number</label>
                          <input type="text" id="rollNumber" name="rollNumber" className="form-control" value={studentData.rollNumber} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <input type="text" id="status" name="status" className="form-control" value={studentData.status}  onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">First Name</label>
                          <input type="text" id="firstName" name="firstName" className="form-control" value={studentData.firstName} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Last Name</label>
                          <input type="text" id="lastName" name="lastName" className="form-control" value={studentData.lastName} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Class</label>
                          <input type="text" id="class" name="class" className="form-control"
                            value={studentData.class} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Section</label>
                          <input type="text" id="section" name="section" className="form-control"
                            value={studentData.section} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Gender</label>
                          <input type="text" id="gender" name="gender" className="form-control"
                            value={studentData.gender} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Date of Birth</label>
                          <div className="input-icon position-relative">
                          {isEdit? <DatePicker
                                className="form-control datetimepicker"
                                format={{
                                  format: "DD-MM-YYYY",
                                  type: "mask",
                                }}
                                value={defaultDate}
                                placeholder="Select Date"
                              /> : <DatePicker
                              className="form-control datetimepicker"
                              format={{
                                format: "DD-MM-YYYY",
                                type: "mask",
                              }}
                              defaultValue=""
                              placeholder="Select Date"
                            />}
                            <span className="input-icon-addon">
                              <i className="ti ti-calendar" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Blood Group</label>
                          <input type="text" id="bloodGroup" name="bloodGroup" className="form-control"
                            value={studentData.bloodGroup} onChange={handleChange} />
                        </div>
                      </div>
                     
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Religion</label>
                          <input type="text" id="religion" name="religion" className="form-control"
                            value={studentData.religion} onChange={handleChange} />
                        </div>
                      </div>
                     
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Primary Contact Number
                          </label>
                          <input type="text" id="contactNumber" name="contactNumber" className="form-control" value={studentData.contactNumber} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Email Address</label>
                          <input type="email" id="email" name="email" className="form-control" value={studentData.email} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Caste</label>
                          <input type="text" id="caste" name="caste" className="form-control" value={studentData.caste} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Mother Tongue</label>
                          <input type="text" id="motherTongue" name="motherTongue" className="form-control"
                            value={studentData.motherTongue} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Language Known</label>
                          <input type="text" id="languageKnown" name="languageKnown" className="form-control"
                            value={studentData.languageKnown} onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Personal Information */}
                {/* Parents & Guardian Information */}
                <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-user-shield fs-16" />
                      </span>
                      <h4 className="text-dark">
                        Parents &amp; Guardian Information
                      </h4>
                    </div>
                  </div>
                  <div className="card-body pb-0">
                    <div className="border-bottom mb-3">
                      <h5 className="mb-3">Father’s Info</h5>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                            <div className="d-flex align-items-center justify-content-center avatar avatar-xxl border border-dashed me-2 flex-shrink-0 text-dark frames">
                              <i className="ti ti-photo-plus fs-16" />
                            </div>
                            <div className="profile-upload">
                              <div className="profile-uploader d-flex align-items-center">
                                <div className="drag-upload-btn mb-3">
                                  Upload
                                  <input
                                    type="file"
                                    className="form-control image-sign"
                                    multiple
                                  />
                                </div>
                                <Link to="#" className="btn btn-primary mb-3">
                                  Remove
                                </Link>
                              </div>
                              <p className="fs-12">
                                Upload image size 4MB, Format JPG, PNG, SVG
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Father Name</label>
                            <input type="text" id="fatherName" name="fatherName" className="form-control" value={studentData.fatherName} onChange={handleChange} />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="text" id="fatherEmail" name="fatherEmail" className="form-control" value={studentData.fatherEmail} onChange={handleChange} />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input type="text" id="fatherNumber" name="fatherNumber" className="form-control" value={studentData.fatherNumber} onChange={handleChange} />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Father Occupation
                            </label>
                            <input type="text" id="fatherOccupation" name="fatherOccupation" className="form-control" value={studentData.fatherOccupation} onChange={handleChange} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-bottom mb-3">
                      <h5 className="mb-3">Mother’s Info</h5>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                            <div className="d-flex align-items-center justify-content-center avatar avatar-xxl border border-dashed me-2 flex-shrink-0 text-dark frames">
                              <i className="ti ti-photo-plus fs-16" />
                            </div>
                            <div className="profile-upload">
                              <div className="profile-uploader d-flex align-items-center">
                                <div className="drag-upload-btn mb-3">
                                  Upload
                                  <input
                                    type="file"
                                    className="form-control image-sign"
                                    multiple
                                  />
                                </div>
                                <Link to="#" className="btn btn-primary mb-3">
                                  Remove
                                </Link>
                              </div>
                              <p className="fs-12">
                                Upload image size 4MB, Format JPG, PNG, SVG
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Mother Name</label>
                            <input type="text" id="motherName" name="motherName" className="form-control" value={studentData.motherName} onChange={handleChange} />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="text" id="motherEmail" name="motherEmail" className="form-control" value={studentData.motherEmail} onChange={handleChange} />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input type="text" id="motherNumber" name="motherNumber" className="form-control" value={studentData.motherNumber} onChange={handleChange} />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Mother Occupation
                            </label>
                            <input type="text" id="motherOccupation" name="motherOccupation" className="form-control" value={studentData.motherOccupation} onChange={handleChange} />
                          </div>
                        </div>
                      </div>
                    </div>
                   
                  </div>
                </div>
                {/* /Parents & Guardian Information */}
                {/* Sibilings */}
                <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-users fs-16" />
                      </span>
                      <h4 className="text-dark">Sibilings</h4>
                    </div>
                  </div>
                  <div className="card-body">
      <div className="addsibling-info">
        <div className="row">
          <div className="col-md-12">
            <div className="mb-2">
              <label className="form-label">Sibling Info</label>
              <div className="d-flex align-items-center flex-wrap">
                <label className="form-label text-dark fw-normal me-2">
                  Is Sibling studying in the same college
                </label>
                <div className="form-check me-3 mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sibling"
                    id="yes"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="yes">
                    Yes
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sibling"
                    id="no"
                  />
                  <label className="form-check-label" htmlFor="no">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          {newContents.map((_, index) => (
            <div key={index} className="col-lg-12">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" id="siblingName" name="siblingName" className="form-control"
                            value={studentData.siblingName} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Roll No</label>
                    <input type="text" id="siblingRollno" name="siblingRollno" className="form-control"
                            value={studentData.siblingRollno} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Admission No</label>
                    <input type="text" id="siblingAdno" name="siblingAdno" className="form-control"
                            value={studentData.siblingAdno} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="mb-3">
                    <div className="d-flex align-items-center">
                      <div className="w-100">
                        <label className="form-label">Class</label>
                        <input type="text" id="siblingSection" name="siblingSection" className="form-control"
                            value={studentData.siblingSection} onChange={handleChange} />
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-top pt-3">
        <Link
          to="#"
          onClick={addNewContent}
          className="add-sibling btn btn-primary d-inline-flex align-items-center"
        >
          <i className="ti ti-circle-plus me-2" />
          Add New
        </Link>
      </div>
    </div>
                </div>
                {/* /Sibilings */}
                {/* Address */}
                <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-map fs-16" />
                      </span>
                      <h4 className="text-dark">Address</h4>
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Current Address</label>
                          <input type="text" id="" name="" className="form-control" defaultValue={isEdit? '3495 Red Hawk Road, Buffalo Lake, MN 55314': undefined}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Permanent Address
                          </label>
                          <input type="text" id="" name="" className="form-control" defaultValue={isEdit? '3495 Red Hawk Road, Buffalo Lake, MN 55314': undefined}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Address */}
                {/* Transport Information */}
                <div className="card">
                  <div className="card-header bg-light d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-bus-stop fs-16" />
                      </span>
                      <h4 className="text-dark">Transport Information</h4>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                      />
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Route</label>
                          <input type="text" id="route" name="route" className="form-control"
                            value={studentData.route} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Vehicle Number</label>
                          <input type="text" id="vehicleNumber" name="vehicleNumber" className="form-control"
                            value={studentData.vehicleNumber} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Pickup Point</label>
                          <input type="text" id="pickupPoint" name="pickupPoint" className="form-control"
                            value={studentData.pickupPoint} onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Transport Information */}
                {/* Hostel Information */}
                <div className="card">
                  <div className="card-header bg-light d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-building-fortress fs-16" />
                      </span>
                      <h4 className="text-dark">Hostel Information</h4>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                      />
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Hostel</label>
                          <input type="text" id="hostel" name="hostel" className="form-control"
                            value={studentData.hostel} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Room No</label>
                          <input type="text" id="hostelRoomNo" name="hostelRoomNo" className="form-control"
                            value={studentData.hostelRoomNo} onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Hostel Information */}
                {/* Documents */}
                <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-file fs-16" />
                      </span>
                      <h4 className="text-dark">Documents</h4>
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-2">
                          <div className="mb-3">
                            <label className="form-label mb-1">
                              Medical Condition
                            </label>
                            <p>Upload image size of 4MB, Accepted Format PDF</p>
                          </div>
                          <div className="d-flex align-items-center flex-wrap">
                            <div className="btn btn-primary drag-upload-btn mb-2 me-2">
                              <i className="ti ti-file-upload me-1" />
                              Change
                              <input
                                type="file"
                                className="form-control image_sign"
                                multiple
                              />
                            </div>
                            {isEdit? <p className="mb-2">BirthCertificate.pdf</p> : <></>}
                            
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-2">
                          <div className="mb-3">
                            <label className="form-label mb-1">
                              Upload Transfer Certificate
                            </label>
                            <p>Upload image size of 4MB, Accepted Format PDF</p>
                          </div>
                          <div className="d-flex align-items-center flex-wrap">
                            <div className="btn btn-primary drag-upload-btn mb-2">
                              <i className="ti ti-file-upload me-1" />
                              Upload Document
                              <input
                                type="file"
                                className="form-control image_sign"
                                multiple
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Documents */}
                {/* Medical History */}
                {/* <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-medical-cross fs-16" />
                      </span>
                      <h4 className="text-dark">Medical History</h4>
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-2">
                          <label className="form-label">
                            Medical Condition
                          </label>
                          <div className="d-flex align-items-center flex-wrap">
                            <label className="form-label text-dark fw-normal me-2">
                              Medical Condition of a Student
                            </label>
                            <div className="form-check me-3 mb-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="condition"
                                id="good"
                                defaultChecked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="good"
                              >
                                Good
                              </label>
                            </div>
                            <div className="form-check me-3 mb-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="condition"
                                id="bad"
                              />
                              <label className="form-check-label" htmlFor="bad">
                                Bad
                              </label>
                            </div>
                            <div className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="condition"
                                id="others"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="others"
                              >
                                Others
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Allergies</label>
                        
                        <TagsInput
                            // className="input-tags form-control"
                            value={owner2}
                            onChange={setOwner2}
                          />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Medications</label>
                        <TagsInput
                            // className="input-tags form-control"
                            value={owner1}
                            onChange={setOwner1}
                          />
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* /Medical History */}
                {/* Previous School details */}
                {/* <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-building fs-16" />
                      </span>
                      <h4 className="text-dark">Previous School Details</h4>
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">School Name</label>
                          <input type="text" id="" name="" className="form-control" defaultValue={isEdit? 'Oxford Matriculation, USA': undefined}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Address</label>
                          <input type="text" id="" name="" className="form-control" defaultValue={isEdit? '1852 Barnes Avenue, Cincinnati, OH 45202': undefined}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* /Previous School details */}
                {/* Other Details */}
                <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-building-bank fs-16" />
                      </span>
                      <h4 className="text-dark">Other Details</h4>
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="mb-3">
                          <label className="form-label">Bank Name</label>
                          <input type="text" id="bankName" name="bankName" className="form-control" value={studentData.bankName} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="mb-3">
                          <label className="form-label">Branch</label>
                          <input type="text" id="bankBranch" name="bankBranch" className="form-control" value={studentData.bankBranch} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="mb-3">
                          <label className="form-label">IFSC Number</label>
                          <input type="text" id="bankIfsc" name="bankIfsc" className="form-control" value={studentData.bankIfsc} onChange={handleChange} />
                        </div>
                      </div>
                      {/* <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Other Information
                          </label>
                          <textarea
                            className="form-control"
                            rows={3}
                            defaultValue={""}
                          />
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                {/* /Other Details */}
                <div className="text-end">
                  <Link type="button" to={routes.adminDashboard} className="btn btn-light me-3">
                    Cancel
                  </Link>
                  <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </>
  );
};

export default AddStudent;
