import React, { useRef,useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  activeList,
  gradeOne,
  gradePercentage,
  gradePoints,
  marksFrom,
  marksUpto,
} from "../../../../core/common/selectoption/selectoption";
import Table from "../../../../core/common/dataTable/index";
import { gradetable } from "../../../../core/data/json/grade";
import { TableData } from "../../../../core/data/interface";
import CommonSelect from "../../../../core/common/commonSelect";
import PredefinedDateRanges from "../../../../core/common/datePicker";
import { all_routes } from "../../../router/all_routes";
import { api_path } from "../../../../environment";
import TooltipOption from "../../../../core/common/tooltipOption";
const Grade = () => {


  const navigation = useNavigate();
  const navigationPath = () => {
    setTimeout(() => {
      navigation(routes.grade);
    }, 1000);
  };

  const [gradeData, setGradeData] = useState({
    description: "",
    grade: "",
    gradePoints: "",
    marksFrom: "",
    marksUpto: "",
    status: "",
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGradeData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // if (!validateForm()) return;
    try {
      const response = await fetch(`${api_path}/grades/createGrade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: gradeData.description,
grade: gradeData.grade,
gradePoints: gradeData.gradePoints,
marksFrom: gradeData.marksFrom,
marksUpto: gradeData.marksUpto,
status: gradeData.status,
         
      }),
      });
      const data = await response.text();
    if (response.ok) {
      console.log(data);
      console.log(" Grade Created Successfully");
      alert("Grade Created Successfully");
      navigationPath(); // Redirect immediately
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error('Error Creating User:', error);
  }
};



  const routes = all_routes;
  const data = gradetable;
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
  const handleApplyClick = () => {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.remove("show");
    }
  };
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
      sorter: (a: TableData, b: TableData) => a.id.length - b.id.length,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      sorter: (a: TableData, b: TableData) => a.grade.length - b.grade.length,
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      sorter: (a: TableData, b: TableData) =>
        a.percentage.length - b.percentage.length,
    },
    {
      title: "Grade Points",
      dataIndex: "gradePoints",
      sorter: (a: TableData, b: TableData) =>
        a.gradePoints.length - b.gradePoints.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: () => (
        <>
          <span className="badge badge-soft-success d-inline-flex align-items-center">
            <i className="ti ti-circle-filled fs-5 me-1"></i>Active
          </span>
        </>
      ),
      sorter: (a: TableData, b: TableData) => a.status.length - b.status.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <>
          <div className="d-flex align-items-center">
            <div className="dropdown">
              <Link
                to="#"
                className="btn btn-white btn-icon btn-sm d-flex align-items-center justify-content-center rounded-circle p-0"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="ti ti-dots-vertical fs-14" />
              </Link>
              <ul className="dropdown-menu dropdown-menu-right p-3">
                <li>
                  <Link
                    className="dropdown-item rounded-1"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_grade"
                  >
                    <i className="ti ti-edit-circle me-2" />
                    Edit
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item rounded-1"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete-modal"
                  >
                    <i className="ti ti-trash-x me-2" />
                    Delete
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      ),
    },
  ];
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Grade</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={routes.adminDashboard}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Academic </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Grade
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
                  data-bs-target="#add_grade"
                >
                  <i className="ti ti-square-rounded-plus-filled me-2" />
                  Add Grade
                </Link>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Guardians List */}
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
              <h4 className="mb-3">Grade List</h4>
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
                              <label className="form-label">Grade</label>
                              <CommonSelect
                                className="select"
                                options={gradeOne}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Percentage</label>
                              <CommonSelect
                                className="select"
                                options={gradePercentage}
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
        <div className="d-flex align-items-center">
          <div className="dropdown">
            <Link
              to="#"
              className="btn btn-white btn-icon btn-sm d-flex align-items-center justify-content-center rounded-circle p-0"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="ti ti-dots-vertical fs-14" />
            </Link>
            <ul className="dropdown-menu dropdown-menu-right p-3">
              <li>
                <Link
                  className="dropdown-item rounded-1"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#edit_grade"
                >
                  <i className="ti ti-edit-circle me-2" />
                  Edit
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item rounded-1"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#delete-modal"
                >
                  <i className="ti ti-trash-x me-2" />
                  Delete
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Add Grade */}
        <div className="modal fade" id="add_grade">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Grade</h4>
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
                      <div className="mb-3">
                        <label className="form-label">Grade</label>
                        <input
                          type="text"
                          className="form-control"
                          
                          id="grade"
                              name="grade"
                              onChange={handleChange}  value={gradeData.grade}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Marks From(%)</label>
                        <input
                          type="text"
                          className="form-control"
                          
                          id="marksFrom"
                              name="marksFrom"
                              onChange={handleChange}  value={gradeData.marksFrom}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Marks Upto(%)</label>
                        <CommonSelect className="select" options={marksUpto} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Grade Points</label>
                        <input
                          type="text"
                          className="form-control"
                          
                          id="marksUpto"
                              name="marksUpto"
                              onChange={handleChange}  value={gradeData.marksUpto}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <input
                          type="text"
                          className="form-control"
                          
                          id="status"
                              name="status"
                              onChange={handleChange}  value={gradeData.status}
                        />
                      </div>
                      <div className="mb-0">
                        <label className="form-label">Description</label>
                        <input
                          type="text"
                          className="form-control"
                          
                          id="description"
                              name="description"
                              onChange={handleChange}  value={gradeData.description}
                        />
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
                  <Link
                    to="#"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Add Grade
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Add Grade */}
        {/* Edit Grade */}
        <div className="modal fade" id="edit_grade">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Grade</h4>
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
                      <div className="mb-3">
                        <label className="form-label">Grade</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Grade"
                          defaultValue="O"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Marks From(%)</label>
                        <CommonSelect
                          className="select"
                          options={marksFrom}
                          defaultValue={marksFrom[1]}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Marks Upto(%)</label>
                        <CommonSelect
                          className="select"
                          options={marksUpto}
                          defaultValue={marksUpto[1]}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Grade Points</label>
                        <CommonSelect
                          className="select"
                          options={gradePoints}
                          defaultValue={gradePoints[1]}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <CommonSelect
                          className="select"
                          options={activeList}
                          defaultValue={activeList[1]}
                        />
                      </div>
                      <div className="mb-0">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control"
                          rows={4}
                          placeholder="Add Comment"
                          defaultValue={""}
                        />
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
                  <Link
                    to="#"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Save Changes
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Edit Grade */}
        {/* Delete Modal */}
        <div className="modal fade" id="delete-modal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form>
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
                    <Link
                      to="#"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
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

export default Grade;
