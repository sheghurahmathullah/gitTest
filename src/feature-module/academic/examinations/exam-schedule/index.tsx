<<<<<<< HEAD
import React, { useRef, useState,useEffect } from "react";
=======
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonSelect from "../../../../core/common/commonSelect";
import Table from "../../../../core/common/dataTable/index";
>>>>>>> f4116030764f6dbc078b7c13d7a533486e37f24f
import PredefinedDateRanges from "../../../../core/common/datePicker";
import {
  classSection,
  classSylabus,
  count,
  durationOne,
  examOne,
  examtwo,
  maxMark,
  minMark,
  mothertongue,
  startTime,
  startTimeOne,
} from "../../../../core/common/selectoption/selectoption";
import TooltipOption from "../../../../core/common/tooltipOption";
import { TableData } from "../../../../core/data/interface";
import { examSchedule } from "../../../../core/data/json/exam_schedule";
import { api_path } from "../../../../environment";
import { all_routes } from "../../../router/all_routes";

const ExamSchedule = () => {


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api_path}/examSchedule/getAllExamSchedule`, {
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
        subject: item.subject || "N/A",
        examDate: item.examDate || "N/A",
        startTime: item.startTime || "N/A",
        endTime: item.endTime || "N/A",
        durationMin: item.durationMin || "N/A",
        roomNo: item.roomNo || "N/A",
        maxMarks: item.maxMarks || "N/A",
        minMarks: item.minMarks || "N/A",
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
      navigation(routes.examSchedule);
    }, 1000);
  };

  const [examScheduleData, setExamScheduleData] = useState({
    class: "",
    durationMin: "",
    endTime: "",
    examDate: "",
    examName: "",
    maxMarks: "",
    minMarks: "",
    roomNo: "",
    section: "",
    startTime: "",
    subject: "",
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExamScheduleData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // if (!validateForm()) return;
    try {
      const response = await fetch(`${api_path}/examSchedules/createExamSchedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          class: examScheduleData.class,
          durationMin: examScheduleData.durationMin,
          endTime: examScheduleData.endTime,
          examDate: examScheduleData.examDate,
          examName: examScheduleData.examName,
          maxMarks: examScheduleData.maxMarks,
          minMarks: examScheduleData.minMarks,
          roomNo: examScheduleData.roomNo,
          section: examScheduleData.section,
          startTime: examScheduleData.startTime,
          subject: examScheduleData.subject,
         
      }),
      });
      const data = await response.text();
    if (response.ok) {
      console.log(data);
      console.log("Exam Schedule Created Successfully");
      alert("Exam Schedule Created Successfully");
      navigationPath(); // Redirect immediately
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error('Error Creating User:', error);
  }
};



  const routes = all_routes;
  const data1 = examSchedule;
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
  const handleApplyClick = () => {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.remove("show");
    }
  };
  const [newContents, setNewContents] = useState<number[]>([0]);
  const columns = [
    {
      title: "Subject",
      dataIndex: "subject",
      render: (text: string, record: any, index: number) => (
        <>
          <Link to="#" className="link-primary">
            {record.subject}
          </Link>
        </>
      ),
      sorter: (a: any, b: any) => a.subject.localeCompare(b.subject),

    },
    {
      title: "Exam Date",
      dataIndex: "examDate",
      sorter: (a: any, b: any) => a.examDate.localeCompare(b.examDate),
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
      title: "Duration",
      dataIndex: "durationMin",
      sorter: (a: any, b: any) => a.durationMin.localeCompare(b.durationMin),
    },
    {
      title: "Room No",
      dataIndex: "roomNo",
      sorter: (a: any, b: any) => a.roomNo.localeCompare(b.roomNo),
    },
    {
      title: "Max Mark",
      dataIndex: "maxMarks",
      sorter: (a: any, b: any) => a.maxMarks.localeCompare(b.maxMarks),
    },
    {
      title: "Min Mark",
      dataIndex: "minMarks",
      sorter: (a: any, b: any) => a.minMarks.localeCompare(b.minMarks),
    },
    
  ];
  const addNewContent = () => {
    setNewContents([...newContents, newContents.length]);
  };
  const removeContent = (index:any) => {
    setNewContents(newContents.filter((_, i) => i !== index));
  };
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Exam Schedule</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={routes.adminDashboard}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Academic </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Exam Schedule
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
                  data-bs-target="#add_exam_schedule"
                >
                  <i className="ti ti-square-rounded-plus-filled me-2" />
                  Add Exam Schedule
                </Link>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Guardians List */}
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
              <h4 className="mb-3">Exam Schedule</h4>
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
                              <label className="form-label">Class 1-A</label>
                              <CommonSelect
                                className="select"
                                options={classSylabus}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Exam Date</label>
                              <CommonSelect
                                className="select"
                                options={examOne}
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
      <>
        {/* Add Exam Schedule */}
        <div className="modal fade" id="add_exam_schedule">
          <div className="modal-dialog modal-dialog-centered  modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Exam Schedule</h4>
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
                      <div className="row">
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">Class</label>
                            <input
                          type="text"
                          className="form-control"
                          
                          id="class"
                              name="class"
                              onChange={handleChange}  value={examScheduleData.class}
                        />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">Section</label>
                            <input
                          type="text"
                          className="form-control"
                          
                          id="section"
                              name="section"
                              onChange={handleChange}  value={examScheduleData.section}
                        />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">Exam Name</label>
                            <input
                          type="text"
                          className="form-control"
                          
                          id="examName"
                              name="examName"
                              onChange={handleChange}  value={examScheduleData.examName}
                        />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">Start Time</label>
                            <input
                          type="text"
                          className="form-control"
                          
                          id="startTime"
                              name="startTime"
                              onChange={handleChange}  value={examScheduleData.startTime}
                        />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">End Time</label>
                            <input
                          type="text"
                          className="form-control"
                          
                          id="endTime"
                              name="endTime"
                              onChange={handleChange}  value={examScheduleData.endTime}
                        />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">Duration(min)</label>
                            <input
                          type="text"
                          className="form-control"
                          
                          id="durationMin"
                              name="durationMin"
                              onChange={handleChange}  value={examScheduleData.durationMin}
                        />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {newContents.map((_, index) => (
                  <div className="exam-schedule-add">
                    <div className="exam-schedule-row d-flex align-items-center flex-wrap column-gap-3">
                      <div className="shedule-info flex-fill">
                        <div className="mb-3">
                          <label className="form-label">Exam Date</label>
                          <input
                          type="text"
                          className="form-control"
                          
                          id="examDate"
                              name="examDate"
                              onChange={handleChange}  value={examScheduleData.examDate}
                        />
                        </div>
                      </div>
                      <div className="shedule-info flex-fill">
                        <div className="mb-3">
                          <label className="form-label">Subject</label>
                          <input
                          type="text"
                          className="form-control"
                          
                          id="subject"
                              name="subject"
                              onChange={handleChange}  value={examScheduleData.subject}
                        />
                        </div>
                      </div>
                      <div className="shedule-info flex-fill">
                        <div className="mb-3">
                          <label className="form-label">Room No</label>
                          <input
                          type="text"
                          className="form-control"
                          
                          id="roomNo"
                              name="roomNo"
                              onChange={handleChange}  value={examScheduleData.roomNo}
                        />
                        </div>
                      </div>
                      <div className="shedule-info flex-fill">
                        <div className="mb-3">
                          <label className="form-label">Max Marks</label>
                          <input
                          type="text"
                          className="form-control"
                          
                          id="maxMarks"
                              name="maxMarks"
                              onChange={handleChange}  value={examScheduleData.maxMarks}
                        />
                        </div>
                      </div>
                      <div className="shedule-info flex-fill">
                        <div className="d-flex align-items-end">
                          <div className="mb-3 flex-fill">
                            <label className="form-label">Min Marks</label>
                            <input
                          type="text"
                          className="form-control"
                          
                          id="minMarks"
                              name="minMarks"
                              onChange={handleChange}  value={examScheduleData.minMarks}
                        />
                          </div>
                          {newContents.length > 1 && (
                          <div className="mb-3 ms-2">
                            <Link to="#" className="delete-schedule-table"   onClick={() => removeContent(index)}>
                              <i className="ti ti-trash" />
                            </Link>
                          </div>
                           )}
                        </div>
                      </div>
                    </div>
                  </div>
                   ))}
                  {/* <div>
                    <Link to="#" onClick={addNewContent} className="btn btn-primary add-new-schedule">
                      <i className="ti ti-square-rounded-plus-filled me-2" />
                      Add New
                    </Link>
                  </div> */}
                </div>
                <div className="modal-footer">
                  <Link
                    to="#"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <button onClick={handleSubmit}  className="btn btn-primary" data-bs-dismiss="modal">
                    Add Exam Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Add Exam Schedule */}
        {/* Edit Exam Schedule */}
        <div className="modal fade" id="edit_exam_schedule">
          <div className="modal-dialog modal-dialog-centered  modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Exam Schedule</h4>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">Class</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Class"
                              defaultValue="I"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">Section</label>
                            <CommonSelect
                              className="select"
                              options={classSection}
                              defaultValue={classSection[1]}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">Exam Name</label>
                            <CommonSelect
                              className="select"
                              options={examtwo}
                              defaultValue={examtwo[1]}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">Start Time</label>
                            <CommonSelect
                              className="select"
                              options={startTime}
                              defaultValue={startTime[1]}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">End Time</label>
                            <CommonSelect
                              className="select"
                              options={startTimeOne}
                              defaultValue={startTimeOne[1]}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">Duration(min)</label>
                            <CommonSelect
                              className="select"
                              options={durationOne}
                              defaultValue={startTime[1]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="exam-schedule-add">
                    <div className="exam-schedule-row d-flex align-items-center flex-wrap column-gap-3">
                      <div className="shedule-info flex-fill">
                        <div className="mb-3">
                          <label className="form-label">Exam Date</label>
                          <CommonSelect
                            className="select"
                            options={examOne}
                            defaultValue={examOne[1]}
                          />
                        </div>
                      </div>
                      <div className="shedule-info flex-fill">
                        <div className="mb-3">
                          <label className="form-label">Subject</label>
                          <CommonSelect
                            className="select"
                            options={mothertongue}
                            defaultValue={mothertongue[1]}
                          />
                        </div>
                      </div>
                      <div className="shedule-info flex-fill">
                        <div className="mb-3">
                          <label className="form-label">Room No</label>
                          <CommonSelect
                            className="select"
                            options={count}
                            defaultValue={count[1]}
                          />
                        </div>
                      </div>
                      <div className="shedule-info flex-fill">
                        <div className="mb-3">
                          <label className="form-label">Max Marks</label>
                          <CommonSelect
                            className="select"
                            options={maxMark}
                            defaultValue={maxMark[1]}
                          />
                        </div>
                      </div>
                      <div className="shedule-info flex-fill">
                        <div className="d-flex align-items-end">
                          <div className="mb-3 flex-fill">
                            <label className="form-label">Min Marks</label>
                            <CommonSelect
                              className="select"
                              options={minMark}
                              defaultValue={minMark[1]}
                            />
                          </div>
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
        {/* Edit Exam Schedule */}
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

export default ExamSchedule;
