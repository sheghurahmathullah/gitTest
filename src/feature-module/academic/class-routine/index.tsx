<<<<<<< HEAD
import React, { useRef,useState,useEffect } from "react";
import { classRoutine } from "../../../core/data/json/class-routine";
=======
import { TimePicker } from "antd";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonSelect from "../../../core/common/commonSelect";
>>>>>>> f4116030764f6dbc078b7c13d7a533486e37f24f
import Table from "../../../core/common/dataTable/index";
import PredefinedDateRanges from "../../../core/common/datePicker";
import {
  allClass,
  classSection,
  count,
  routinename,
  teacher,
  weak,
} from "../../../core/common/selectoption/selectoption";
import TooltipOption from "../../../core/common/tooltipOption";
import { classRoutine } from "../../../core/data/json/class-routine";
import { api_path } from "../../../environment";
import { all_routes } from "../../router/all_routes";

const ClassRoutine = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api_path}/classRoutines/getAllClassRoutine`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const result = await response.json();

      // Transform API data to fit table structure
      const transformedData = result.map((item: any) => ({
        key: item.key || "",
        id: item.id || "N/A",
        class: item.class || "N/A",
        section: item.section || "N/A",
        teacher: item.teacher || "N/A",
        day: item.day || "N/A",
        startTime: item.startTime || "N/A",
        endTime: item.endTime || "N/A",
        classRoom: item.classRoom || "N/A",
        imgSrc: item.uploadImage || "assets/img/default-student.jpg",
      }));
      setData(transformedData);
    } catch (err:any) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigation = useNavigate();
  const navigationPath = () => {
    setTimeout(() => {
      navigation(routes.classRoutine);
    }, 1000);
  };

  const [classRoutineData, setClassRoutineData] = useState({
    teacher: "",
class: "",
section: "",
day: "",
startTime: "",
endTime: "",
classRoom: "",
status: "",
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClassRoutineData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // if (!validateForm()) return;
    try {
      const response = await fetch(`${api_path}/classRoutines/createClassRoutine`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacher: classRoutineData.teacher,
          className: classRoutineData.class,
          section: classRoutineData.section,
          day: classRoutineData.day,
          startTime: classRoutineData.startTime,
          endTime: classRoutineData.endTime,
          classRoom: classRoutineData.classRoom,
          status: classRoutineData.status,
         
      }),
      });
      const data = await response.text();
    if (response.ok) {
      console.log(data);
      console.log("Class Routine Created Successfully");
      alert("Class Routine Created Successfully");
      navigationPath(); // Redirect immediately
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error('Error Creating User:', error);
  }
};


  const routes = all_routes;

  const data1 = classRoutine;
  const getModalContainer = () => {
    const modalElement = document.getElementById("modal-datepicker");
    return modalElement ? modalElement : document.body; // Fallback to document.body if modalElement is null
  };
  const getModalContainer2 = () => {
    const modalElement = document.getElementById("modal_datepicker");
    return modalElement ? modalElement : document.body; // Fallback to document.body if modalElement is null
  };
  const getModalContainer3= () => {
    const modalElement = document.getElementById("modal_datepicker");
    return modalElement ? modalElement : document.body; // Fallback to document.body if modalElement is null
  };
  const getModalContainer4= () => {
    const modalElement = document.getElementById("modal_datepicker");
    return modalElement ? modalElement : document.body; // Fallback to document.body if modalElement is null
  };
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
  const handleApplyClick = () => {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.remove("show");
    }
  };
  const route = all_routes
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text: string, record: any, index: number) => (
        <>
          <Link to="#" className="link-primary">
            {record.id}
          </Link>
        </>
      ),
      sorter: (a: any, b: any) => a.id.localeCompare(b.id),

    },

    {
      title: "Class",
      dataIndex: "class",
      sorter: (a: any, b: any) => a.class.localeCompare(b.class),

    },
    {
      title: "Section",
      dataIndex: "section",
      sorter: (a: any, b: any) => a.section.localeCompare(b.section),

    },
    {
      title: "Teacher",
      dataIndex: "teacher",
      sorter: (a: any, b: any) => a.teacher.localeCompare(b.teacher),

    },
    {
      title: "Day",
      dataIndex: "day",
      sorter: (a: any, b: any) => a.day.localeCompare(b.day),

    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      sorter: (a: any, b: any) => a.startTime.localeCompare(b.startTime),

    },
    {
      title: "End Time",
      dataIndex: "endTime",
      sorter: (a: any, b: any) => a.endTime.localeCompare(b.endTime),

    },
    {
      title: "Class Room",
      dataIndex: "classRoom",
      sorter: (a: any, b: any) => a.classRoom.localeCompare(b.classRoom),

    },
   
  ];
  return (
    <div>
      <>
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content">
            {/* Page Header */}
            <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
              <div className="my-auto mb-2">
                <h3 className="page-title mb-1">Class Routine</h3>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to={routes.adminDashboard}>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="#">Academic </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Class Routine
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
              <TooltipOption />
                <div className="mb-2">
                  <Link
                    to="#"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#add_class_routine"
                  >
                    <i className="ti ti-square-rounded-plus-filled me-2" />
                    Add Class Routine
                  </Link>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            {/* Guardians List */}
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
                <h4 className="mb-3">Class Routine</h4>
                <div className="d-flex align-items-center flex-wrap">
                  <div className="input-icon-start mb-3 me-2 position-relative">
                    <PredefinedDateRanges />
                  </div>
                  <div className="dropdown mb-3 me-2">
                    <Link
                      to="#"
                      className="btn btn-outline-light bg-white dropdown-toggle"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                    >
                      <i className="ti ti-filter me-2" />
                      Filter
                    </Link>
                    <div className="dropdown-menu drop-width"  ref={dropdownMenuRef}>
                      <form >
                        <div className="d-flex align-items-center border-bottom p-3">
                          <h4>Filter</h4>
                        </div>
                        <div className="p-3 border-bottom pb-0">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">Class</label>

                                <CommonSelect
                                  className="select"
                                  options={allClass}
                                  defaultValue={allClass[0]}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">Section</label>

                                <CommonSelect
                                  className="select"
                                  options={classSection}
                                  defaultValue={classSection[0]}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">Teacher</label>
                                <CommonSelect
                                  className="select"
                                  options={routinename}
                                  defaultValue={routinename[0]}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">Room No</label>
                                <CommonSelect
                                  className="select"
                                  options={count}
                                  defaultValue={count[0]}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">Day</label>
                                <CommonSelect
                                  className="select"
                                  options={weak}
                                  defaultValue={weak[0]}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 d-flex align-items-center justify-content-end">
                          <Link to="#" className="btn btn-light me-3">
                            Reset
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-primary"
                            onClick={handleApplyClick}
                          >
                            Apply
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="dropdown mb-3">
                    <Link
                      to="#"
                      className="btn btn-outline-light bg-white dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      <i className="ti ti-sort-ascending-2 me-2" />
                      Sort by A-Z
                    </Link>
                    <ul className="dropdown-menu p-3">
                      <li>
                        <Link to="#" className="dropdown-item rounded-1 active">
                          Ascending
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item rounded-1">
                          Descending
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item rounded-1">
                          Recently Viewed
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item rounded-1">
                          Recently Added
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body p-0 py-3">
                {/* Guardians List */}
                <Table columns={columns} dataSource={data} Selection={true} />
                {/* /Guardians List */}
              </div>
            </div>
            {/* /Guardians List */}
          </div>
        </div>
        {/* /Page Wrapper */}
      </>
      <>
        {/* Add Class Routine */}
        <div className="modal fade" id="add_class_routine">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Class Routine</h4>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <form >
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Teacher</label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Class Name"
                          id="teacher"
                              name="teacher"
                              onChange={handleChange}  value={classRoutineData.teacher}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Class</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Class Name"
                          id="class"
                              name="class"
                              onChange={handleChange}  value={classRoutineData.class}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Section</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Class Name"
                          id="section"
                              name="section"
                              onChange={handleChange}  value={classRoutineData.section}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Day</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Class Name"
                          id="day"
                              name="day"
                              onChange={handleChange}  value={classRoutineData.day}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Start Time</label>
                            <div className="date-pic">
                            <input
                          type="text"
                          className="form-control"
                          placeholder="Enter start time"
                          id="startTime"
                              name="startTime"
                              onChange={handleChange}  value={classRoutineData.startTime}
                        />
                              <span className="cal-icon">
                                <i className="ti ti-clock" />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">End Time</label>
                            <div className="date-pic">
                            <input
                          type="text"
                          className="form-control"
                          placeholder="Enter end time"
                          id="endTime"
                              name="endTime"
                              onChange={handleChange}  value={classRoutineData.endTime}
                        />
                              <span className="cal-icon">
                                <i className="ti ti-clock" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Class Room</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter start time"
                          id="classRoom"
                              name="classRoom"
                              onChange={handleChange}  value={classRoutineData.classRoom}
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="status-title">
                          <h5>Status</h5>
                          <p>Change the Status by toggle </p>
                        </div>
                        <div className="form-check form-switch">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter status"
                          id="status"
                              name="status"
                              onChange={handleChange}  value={classRoutineData.status}
                        />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Link
                    to="#"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <button onClick={handleSubmit} className="btn btn-primary" data-bs-dismiss="modal">
                    Add Class Routine
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Add Class Routine */}
        {/* Edit Class Routine */}
        <div className="modal fade" id="edit_class_routine">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Class Routine</h4>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <form >
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Teacher</label>
                        <CommonSelect className="select" options={teacher} defaultValue={teacher[2]}/>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Class</label>
                        <CommonSelect className="select" options={allClass} defaultValue={allClass[2]}/>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Section</label>
                        <CommonSelect
                          className="select"
                          options={classSection}
                          defaultValue={classSection[2]}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Day</label>
                        <CommonSelect className="select" options={weak} />
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Start Time</label>
                            <div className="date-pic">
                            <TimePicker
                                getPopupContainer={getModalContainer3}
                                use12Hours
                                placeholder="Choose"
                                format="h:mm A"
                                className="form-control timepicker"
                              />
                              <span className="cal-icon">
                                <i className="ti ti-clock" />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">End Time</label>
                            <div className="date-pic">
                            <TimePicker
                                getPopupContainer={getModalContainer4}
                                use12Hours
                                placeholder="Choose"
                                format="h:mm A"
                                className="form-control timepicker"
                              />
                              <span className="cal-icon">
                                <i className="ti ti-clock" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Class Room</label>
                        <CommonSelect className="select" options={count} />
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="status-title">
                          <h5>Status</h5>
                          <p>Change the Status by toggle </p>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="switch-sm2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Link
                    to="#"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link to="#" className="btn btn-primary" data-bs-dismiss="modal">
                    Save Changes
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Edit Class Routine */}
        {/* Delete Modal */}
        <div className="modal fade" id="delete-modal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form >
                <div className="modal-body text-center">
                  <span className="delete-icon">
                    <i className="ti ti-trash-x" />
                  </span>
                  <h4>Confirm Deletion</h4>
                  <p>
                    You want to delete all the marked items, this cant be undone
                    once you delete.
                  </p>
                  <div className="d-flex justify-content-center">
                    <Link
                      to="#"
                      className="btn btn-light me-3"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <Link to="#" className="btn btn-danger" data-bs-dismiss="modal">
                      Yes, Delete
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Delete Modal */}
      </>
    </div>
  );
};

export default ClassRoutine;
