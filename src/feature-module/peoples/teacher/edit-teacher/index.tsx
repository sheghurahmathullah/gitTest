import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { feeGroup, feesTypes, paymentType } from '../../../core/common/selectoption/selectoption'
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import CommonSelect from "../../../../core/common/commonSelect";
import {
    Contract,
    Hostel,
    PickupPoint,
    Shift,
    VehicleNumber,
    roomNO,
    route
} from "../../../../core/common/selectoption/selectoption";
import { api_path } from "../../../../environment";
import { all_routes } from "../../../router/all_routes";



const EditTeacher = () => {

    const locationPath = useLocation();
    const queryParams = new URLSearchParams(locationPath.search);
    const teacherId = queryParams.get("teacherId");
  // const routes = all_routes;
  const navigation = useNavigate();
  const navigationPath = () => {
    setTimeout(() => {
      navigation(routes.teacherList);
    }, 1000);
  };

  const [teacherData, setTeacherData] = useState({
    teacherId : "",
    firstName: "",
    lastName: "",
    teacherClass :"",
    subject: "",
    gender: "",
    contactNumber:"",
    email:"",
    bloodGroup:"",
    fatherName:"",
    motherName:"",
    martialStatus:"",
    languageKnown:"",
    qualification:"",
    workExperience:"",
    address:"",
    panNumber:"",
    });

  const fetchData = async () => {
    try {
      const response = await fetch(`${api_path}/teachers/getTeachersById?teacherId=${teacherId}`,
      { method: "GET" });
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      const teacherData = await response.json();
  console.table(teacherData);
  setTeacherData(prevState => ({
        ...prevState,
        ...teacherData,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const routes = all_routes;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [owner, setOwner] = useState<string[]>([]);
  const [owner1, setOwner1] = useState<string[]>([]);
  const [owner2, setOwner2] = useState<string[]>([]);
  const [defaultDate, setDefaultDate] = useState<dayjs.Dayjs | null>(null);
  const [newContents, setNewContents] = useState<number[]>([0]);
  const location = useLocation();
  const addNewContent = () => {
    setNewContents([...newContents, newContents.length]);
  };
  const removeContent = (index: any) => {
    setNewContents(newContents.filter((_, i) => i !== index));
  };
  useEffect(() => {
    fetchData();
    if (location.pathname === routes.editTeacher) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${month}-${day}-${year}`;
      const defaultValue = dayjs(formattedDate);
      setIsEdit(true);
      setOwner(["English"]);
      setOwner1(["Medecine Name"]);
      setOwner2(["Allergy", "Skin Allergy"]);
      setDefaultDate(defaultValue);
      console.log(formattedDate, 11);
    } else {
      setIsEdit(false);
      setDefaultDate(null);
    }
  }, [location.pathname]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeacherData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // if (!validateForm()) return;
    try {
      const response = await fetch(`${api_path}/teachers/updateTeacher`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId: teacherData.teacherId,
          firstName: teacherData.firstName,
          lastName: teacherData.lastName,
          teacherClass: teacherData.teacherClass,
          subject: teacherData.subject,
          gender: teacherData.gender,
          contactNumber: teacherData.contactNumber,
          email: teacherData.email,
          bloodGroup: teacherData.bloodGroup,
          fatherName: teacherData.fatherName,
          motherName: teacherData.motherName,
          martialStatus: teacherData.martialStatus,
          languageKnown: teacherData.languageKnown,
          qualification: teacherData.qualification,
          workExperience: teacherData.workExperience,
          address: teacherData.address,
          panNumber: teacherData.panNumber
      }),
      });
      const data = await response.text();
    if (response.ok) {
      console.log(data);
      alert("Teacher Updated Successfully");
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
              <h3 className="mb-1">{isEdit ? "Edit" : "Add"} Teacher</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={routes.adminDashboard}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={routes.teacherList}>Teacher</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {isEdit ? "Edit" : "Add"} Teacher
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              <form>
                <>
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
                                <Link
                                  to="#"
                                  className="btn btn-primary mb-3"
                                >
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
                            <label className="form-label">Teacher ID</label>
                            <input
                              type="text"
                              className="form-control"
                              id="teacherId"
                              name="teacherId"
                              onChange={handleChange}
                              defaultValue={isEdit ? "T849126" : undefined}
                              value={teacherData.teacherId} readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={isEdit ? "Teresa" : undefined}
                              id="firstName"
                              name="firstName"
                              onChange={handleChange}
                              value={teacherData.firstName}
                            />
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control"
                            id="lastName"
                            name="lastName"
                            onChange={handleChange}
                            value={teacherData.lastName} />
                            
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Class</label>
                            <input type="text" className="form-control"
                            id="teacherClass"
                            name="teacherClass"
                            onChange={handleChange}
                            value={teacherData.teacherClass} />
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Subject</label>
                            <input type="text" className="form-control"
                            id="subject"
                            name="subject"
                            onChange={handleChange}
                            value={teacherData.subject} />
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Gender</label>
                            <input type="text" className="form-control"
                            id="gender"
                            name="gender"
                            onChange={handleChange}
                            value={teacherData.gender} />
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Primary Contact Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="contactNumber"
                              name="contactNumber"
                              onChange={handleChange}
                            
                              value={teacherData.contactNumber} 
                            />
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              onChange={handleChange}
                              value={teacherData.email} 
                            />
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Blood Group</label>
                            <input type="text" className="form-control"
                            id="bloodGroup"
                            name="bloodGroup"
                            onChange={handleChange}
                            value={teacherData.bloodGroup} />
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Date of Joining
                            </label>
                            <div className="input-icon position-relative">
                              <span className="input-icon-addon">
                                <i className="ti ti-calendar" />
                              </span>
                              <input
                                type="text"
                                className="form-control datetimepicker"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Father’s Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fatherName"
                              name="fatherName"
                              onChange={handleChange}
                              value={teacherData.fatherName} 
                             
                            />
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Mother’s Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="motherName"
                              name="motherName"
                              onChange={handleChange}
                              value={teacherData.motherName} 
                            />
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
                            <label className="form-label">Marital Status</label>
                            <input type="text" className="form-control"
                            id="martialStatus"
                            name="martialStatus"
                            onChange={handleChange}
                            value={teacherData.martialStatus} />
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Language Known</label>
                            <input type="text" className="form-control"
                            id="languageKnown"
                            name="languageKnown"
                            onChange={handleChange}
                            value={teacherData.languageKnown} />
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Qualification</label>
                            <input
                              type="text"
                              className="form-control"
                              id="qualification"
                              name="qualification"
                              onChange={handleChange}
                              value={teacherData.qualification} 
                            />
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Work Experience
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="workExperience"
                              name="workExperience"
                              onChange={handleChange}
                              value={teacherData.workExperience} 
                            />
                          </div>
                        </div>
                      
                       
                     
                        <div className="col-xxl-3 col-xl-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              name="address"
                              onChange={handleChange}
                              value={teacherData.address} 
                            />
                          </div>
                        </div>
                       
                        <div className="col-xxl-3 col-xl-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              PAN Number / ID Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="panNumber"
                              name="panNumber"
                              onChange={handleChange}
                              value={teacherData.panNumber} 
                            />
                          </div>
                        </div>
                      
                     
                      </div>
                    </div>
                  </div>
                  {/* /Personal Information */}
                </>

                <>
                  {/* Payroll */}
                  <div className="card">
                    <div className="card-header bg-light">
                      <div className="d-flex align-items-center">
                        <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                          <i className="ti ti-user-shield fs-16" />
                        </span>
                        <h4 className="text-dark">Payroll</h4>
                      </div>
                    </div>
                    <div className="card-body pb-1">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">EPF No</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={isEdit ? "34234345" : undefined}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Basic Salary</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={isEdit ? "150000" : undefined}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Contract Type</label>
                            <CommonSelect
                              className="select"
                              options={Contract}
                              defaultValue={isEdit ? Contract[0] : undefined}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Work Shift</label>
                            <CommonSelect
                              className="select"
                              options={Shift}
                              defaultValue={isEdit ? Shift[0] : undefined}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Work Location</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={isEdit ? "2nd Floor" : undefined}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Date of Leaving
                            </label>
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
                      </div>
                    </div>
                  </div>
                  {/* /Payroll */}
                  {/* Leaves */}
                  <div className="card">
                    <div className="card-header bg-light">
                      <div className="d-flex align-items-center">
                        <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                          <i className="ti ti-users fs-16" />
                        </span>
                        <h4 className="text-dark">Leaves</h4>
                      </div>
                    </div>
                    <div className="card-body pb-1">
                      <div className="row">
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Medical Leaves</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={isEdit ? "01" : undefined}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Casual Leaves</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={isEdit ? "02" : undefined}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Maternity Leaves
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={isEdit ? "20" : undefined}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Sick Leaves</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={isEdit ? "02" : undefined}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Leaves */}
                  {/* Bank Details */}
                  <div className="card">
                    <div className="card-header bg-light">
                      <div className="d-flex align-items-center">
                        <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                          <i className="ti ti-map fs-16" />
                        </span>
                        <h4 className="text-dark">Bank Account Detail</h4>
                      </div>
                    </div>
                    <div className="card-body pb-1">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Account Name</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={isEdit ? "Teresa" : undefined}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Account Number</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={isEdit ? "0126784900" : undefined}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Bank Name</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={
                                isEdit ? "Bank of America" : undefined
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">IFSC Code</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={isEdit ? "BOA83209832" : undefined}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Branch Name</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={isEdit ? "Cincinnati" : undefined}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Bank Details */}
                </>

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
                          <CommonSelect
                            className="select"
                            options={route}
                            defaultValue={isEdit ? route[0] : undefined}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Vehicle Number</label>
                          <CommonSelect
                            className="select"
                            options={VehicleNumber}
                            defaultValue={isEdit ? VehicleNumber[0] : undefined}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Pickup Point</label>
                          <CommonSelect
                            className="select"
                            options={PickupPoint}
                            defaultValue={isEdit ? PickupPoint[0] : undefined}
                          />
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
                          <CommonSelect
                            className="select"
                            options={Hostel}
                            defaultValue={isEdit ? Hostel[0] : undefined}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Room No</label>
                          <CommonSelect
                            className="select"
                            options={roomNO}
                            defaultValue={isEdit ? roomNO[0] : undefined}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Hostel Information */}
                <>
                  {/* Social Media Links */}
                  <div className="card">
                    <div className="card-header bg-light">
                      <div className="d-flex align-items-center">
                        <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                          <i className="ti ti-building fs-16" />
                        </span>
                        <h4 className="text-dark">Social Media Links</h4>
                      </div>
                    </div>
                    <div className="card-body pb-1">
                      <div className="row rows-cols-xxl-5">
                        <div className="col-xxl col-xl-3 col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Facebook</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={
                                isEdit ? "www.facebook.com" : undefined
                              }
                            />
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Instagram</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={
                                isEdit ? "www.instagram.com" : undefined
                              }
                            />
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Linked In</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={
                                isEdit ? "www.Linkedin.com" : undefined
                              }
                            />
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Youtube</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={
                                isEdit ? "www.youtube.com" : undefined
                              }
                            />
                          </div>
                        </div>
                        <div className="col-xxl col-xl-3 col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Twitter URL</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={
                                isEdit ? "www.twitter.com" : undefined
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Social Media Links */}
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
                              <label className="form-label">
                                Upload Resume
                              </label>
                              <p>
                                Upload image size of 4MB, Accepted Format PDF
                              </p>
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
                              <p className="mb-2">Resume.pdf</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-2">
                            <div className="mb-3">
                              <label className="form-label">
                                Upload Joining Letter
                              </label>
                              <p>
                                Upload image size of 4MB, Accepted Format PDF
                              </p>
                            </div>
                            <div className="d-flex align-items-center flex-wrap">
                              <div className="btn btn-primary drag-upload-btn mb-2 me-2">
                                <i className="ti ti-file-upload me-1" />
                                Upload Document
                                <input
                                  type="file"
                                  className="form-control image_sign"
                                  multiple
                                />
                              </div>
                              <p className="mb-2">Resume.pdf</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Documents */}
                  {/* Password */}
                  <div className="card">
                    <div className="card-header bg-light">
                      <div className="d-flex align-items-center">
                        <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                          <i className="ti ti-file fs-16" />
                        </span>
                        <h4 className="text-dark">Password</h4>
                      </div>
                    </div>
                    <div className="card-body pb-1">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input type="password" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Confirm Password
                            </label>
                            <input type="password" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Password */}
                </>

                <div className="text-end">
                  <button type="button" className="btn btn-light me-3">
                    Cancel
                  </button>
                  <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                    Update Teacher
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

export default EditTeacher;