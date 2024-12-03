import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonSelect from "../../../core/common/commonSelect";
import Table from "../../../core/common/dataTable/index";
import PredefinedDateRanges from "../../../core/common/datePicker";
import {
  count,

  language,
  typetheory,
} from "../../../core/common/selectoption/selectoption";
import TooltipOption from "../../../core/common/tooltipOption";
import { classSubject } from "../../../core/data/json/class-subject";
import { api_path } from "../../../environment";
import { all_routes } from "../../router/all_routes";


const ClassSubject = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api_path}/subjects/getAllSubject`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const result = await response.json();

      // Transform API data to fit table structure
      const transformedData = result.map((item: any) => ({
        key: item.key || "",
        id: item.key  || "N/A",
        name: item.name || "N/A",
        code: item.code || "N/A",
        type: item.type || "N/A",
        status: item.status || "N/A",
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
      navigation(routes.classSubject);
    }, 1000);
  };

  const [subjectData, setSubjectData] = useState({
    Subjectname : "",
    code:"",
    type:"",
    status:"",
  
   
    });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubjectData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // if (!validateForm()) return;
    try {
      const response = await fetch(`${api_path}/subjects/createSubject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: subjectData.code,
name: subjectData.Subjectname,
status: subjectData.status,
type: subjectData.type,
         
      }),
      });
      const data = await response.text();
    if (response.ok) {
      console.log(data);
      console.log("Subject Created Successfully");
      alert("Subject Created Successfully");
      navigationPath(); // Redirect immediately
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error('Error Creating User:', error);
  }
};
  const routes = all_routes;

  const data1 = classSubject;
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
      sorter: (a: any, b: any) => a.id.localeCompare(b.id),

    },

    {
      title: "Name",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),

    },
    {
      title: "Code",
      dataIndex: "code",
      sorter: (a: any, b: any) => a.code.localeCompare(b.code),

    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: (a: any, b: any) => a.type.localeCompare(b.type),

    },
    {
      title: "Status",
      dataIndex: "status",
     
      sorter: (a: any, b: any) => a.status.localeCompare(b.status),

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
                <h3 className="page-title mb-1">Subjects</h3>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to={routes.adminDashboard}>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="#">Academic </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Subjects
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
                    data-bs-target="#add_subject"
                  >
                    <i className="ti ti-square-rounded-plus-filled me-2" />
                    Add Subject
                  </Link>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            {/* Guardians List */}
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
                <h4 className="mb-3">Class Subject</h4>
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
                      <form>
                        <div className="d-flex align-items-center border-bottom p-3">
                          <h4>Filter</h4>
                        </div>
                        <div className="p-3 border-bottom pb-0">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">Name</label>
                                <CommonSelect
                                  className="select"
                                  options={language}
                                  defaultValue={language[0]}
                                  
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">Code</label>
                                <CommonSelect
                                  className="select"
                                  options={count}
                                  defaultValue={count[0]}
                                   
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
                        <Link
                          to="#"
                          className="dropdown-item rounded-1 active"
                        >
                          Ascending
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item rounded-1"
                        >
                          Descending
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item rounded-1"
                        >
                          Recently Viewed
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item rounded-1"
                        >
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
      <div>
        {/* Add Subject */}
        <div className="modal fade" id="add_subject">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Subject</h4>
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
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Class Name"
                          id="Subjectname"
                              name="Subjectname"
                              onChange={handleChange}  value={subjectData.Subjectname}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Code</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Class Name"
                          id="code"
                              name="code"
                              onChange={handleChange}  value={subjectData.code}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Type</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Class Name"
                          id="type"
                              name="type"
                              onChange={handleChange}  value={subjectData.type}
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
                          placeholder="Enter Class Name"
                          id="status"
                              name="status"
                              onChange={handleChange}  value={subjectData.status}
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
                  <button onClick={handleSubmit} data-bs-dismiss="modal" className="btn btn-primary">
                    Add Subject
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Add Subject */}
        {/* Edit Subject */}
        <div className="modal fade" id="edit_subject">
          <div className="modal-dialog modal-dialog-centere">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Subject</h4>
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
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Name"
                          defaultValue="English"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Code</label>
                        <CommonSelect
                          className="select"
                          options={count}
                          defaultValue={count[0]}
                          
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Type</label>
                        <CommonSelect
                          className="select"
                          options={typetheory}
                          defaultValue={typetheory[0]}
                          
                        />
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
        {/* /Edit Subject */}
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
      </div>
    </div>
  );
};

export default ClassSubject;
