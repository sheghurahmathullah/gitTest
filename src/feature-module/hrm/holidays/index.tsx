import React, { useRef } from 'react'
import Table from "../../../core/common/dataTable/index";
import { holiday } from '../../../core/data/json/holiday';
import { TableData } from '../../../core/data/interface';
import PredefinedDateRanges from '../../../core/common/datePicker';
import CommonSelect from '../../../core/common/commonSelect';
import { activeList, holidays } from '../../../core/common/selectoption/selectoption';
import { Link } from 'react-router-dom';
import { all_routes } from '../../router/all_routes';
import TooltipOption from '../../../core/common/tooltipOption';

const Holiday = () => {
  const routes = all_routes;
    const data = holiday;
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        render: (text: string, record: any, index: number) => (
          <>
           <Link to="#" className="link-primary">{record.id}</Link>
          </>
        ),
        sorter: (a: TableData, b: TableData) => a.id.length - b.id.length,
      },
  
      {
        title: "Holiday Title",
        dataIndex: "holidayTitle",
        sorter: (a: TableData, b: TableData) => a.holidayTitle.length - b.holidayTitle.length,
      },
      {
        title: "Date",
        dataIndex: "date",
        sorter: (a: TableData, b: TableData) => a.date.length - b.date.length,
      },
      {
        title: "Description",
        dataIndex: "description",
        sorter: (a: TableData, b: TableData) => a.date.length - b.date.length,
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (text: string) => (
            <>
            {text === "Active" ? (
              <span
                className="badge badge-soft-success d-inline-flex align-items-center"
              >
                <i className='ti ti-circle-filled fs-5 me-1'></i>{text}
              </span>
            ):
            (
              <span
                className="badge badge-soft-danger d-inline-flex align-items-center"
              >
                <i className='ti ti-circle-filled fs-5 me-1'></i>{text}
              </span>
            )}
          </>
        ),
        sorter: (a: any, b: any) => a.status.length - b.status.length,
      },
      {
        title: "Action",
        dataIndex: "action",
        render: () => (
          <>
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
                    data-bs-target="#edit_holiday"
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
          </>
        ),
      },
    ];
    const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
    const handleApplyClick = () => {
      if (dropdownMenuRef.current) {
        dropdownMenuRef.current.classList.remove("show");
      }
    };
  return (
    <div>
        <>
  {/* Page Wrapper */}
  <div className="page-wrapper">
    <div className="content">
      {/*Page Header */}
      <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
        <div className="my-auto mb-2">
          <h3 className="page-title mb-1">Holidays</h3>
          <nav>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to={routes.adminDashboard}>Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">HRM</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Holidays
              </li>
            </ol>
          </nav>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
        <TooltipOption />
          <div className="mb-2">
            <Link
              to="#"
              className="btn btn-primary d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_holiday"
            >
              <i className="ti ti-square-rounded-plus me-2" />
              Add Holiday
            </Link>
          </div>
        </div>
      </div>
      {/* /Page Header */}
      {/* Filter Section */}
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
          <h4 className="mb-3">Holidays List</h4>
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
              <div className="dropdown-menu drop-width" ref={dropdownMenuRef}>
                <form >
                  <div className="d-flex align-items-center border-bottom p-3">
                    <h4>Filter</h4>
                  </div>
                  <div className="p-3 border-bottom">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Holiday Title</label>
                          <CommonSelect
                                  className="select"
                                  options={activeList}
                                />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-0">
                          <label className="form-label">Status</label>
                          <CommonSelect
                                  className="select"
                                  options={holidays}
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
          {/* Holidays List */}
         
            <Table columns={columns} dataSource={data} Selection={true}/>
          
          {/* /Holidays List */}
        </div>
      </div>
    </div>
  </div>
  {/* /Page Wrapper */}
  {/* Add Holiday */}
  <div className="modal fade" id="add_holiday">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Add Holiday</h4>
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
                  <label className="form-label">Holiday Title</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={4}
                    className="form-control"
                    defaultValue={""}
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
                      id="switch-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <Link to="#" className="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </Link>
            <Link to="#" className="btn btn-primary" data-bs-dismiss="modal">
              Add Holiday
            </Link >
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* Add Holiday */}
  {/* Edit Holiday */}
  <div className="modal fade" id="edit_holiday">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Edit Holiday</h4>
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
                  <label className="form-label">Holiday Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Holiday Title"
                    defaultValue="New Year"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Date"
                    defaultValue="01 Jan 2024"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={4}
                    className="form-control"
                    placeholder="Add Comment"
                    defaultValue={"First day of the new year"}
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
            <Link to="#" className="btn btn-light me-2" data-bs-dismiss="modal">
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
  {/* Edit Holiday */}
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
              You want to delete all the marked items, this cant be undone once
              you delete.
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
  )
}

export default Holiday