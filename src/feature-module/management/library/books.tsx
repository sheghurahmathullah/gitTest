import React, { useRef,useState } from "react";
import { all_routes } from "../../router/all_routes";
import { api_path } from "../../../environment";
import { Link,useNavigate } from "react-router-dom";
import PredefinedDateRanges from "../../../core/common/datePicker";
import CommonSelect from "../../../core/common/commonSelect";
import {
  allSubject,
  cardNo,

  moreFilterBook,

} from "../../../core/common/selectoption/selectoption";
import { TableData } from "../../../core/data/interface";
import Table from "../../../core/common/dataTable/index";
import TooltipOption from "../../../core/common/tooltipOption";
import LibraryModal from "./libraryModal";
import { bookList } from "../../../core/data/json/bookList";

const Books = () => {

  const navigation = useNavigate();
  const navigationPath = () => {
    setTimeout(() => {
      navigation(routes.libraryBooks);
    }, 1000);
  };

  const [bookData, setBookData] = useState({
    bookName: "",
bookNo: "",
rackNo: "",
publisher: "",
author: "",
subject: "",
qty: "",
available: "",
price: "",
postDate: "",
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // if (!validateForm()) return;
    try {
      const response = await fetch(`${api_path}/books/createBook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookName: bookData.bookName,
bookNo: bookData.bookNo,
rackNo: bookData.rackNo,
publisher: bookData.publisher,
author: bookData.author,
subject: bookData.subject,
qty: bookData.qty,
available: bookData.available,
price: bookData.price,
postDate: bookData.postDate,

      }),
      });
      const data = await response.text();
    if (response.ok) {
      console.log(data);
      console.log("Book Created Successfully");
      alert("Book Created Successfully");
      navigationPath(); // Redirect immediately
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error('Error Creating User:', error);
  }
};



  const routes = all_routes;
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
  const data = bookList;
  const handleApplyClick = () => {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.remove("show");
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text: string) => (
        <Link to="#" className="link-primary">
          {text}
        </Link>
      ),
      sorter: (a: TableData, b: TableData) => a.id.length - b.id.length,
    },
    {
      title: "Book Name",
      dataIndex: "bookName",
      
      sorter: (a: TableData, b: TableData) =>
        a.bookName.length - b.bookName.length,
    },
    {
      title: "Book No",
      dataIndex: "bookNo",
      sorter: (a: TableData, b: TableData) =>
        a.bookNo.length - b.bookNo.length,
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      sorter: (a: TableData, b: TableData) =>
        a.publisher.length - b.publisher.length,
    },
    {
      title: "Author",
      dataIndex: "author",
      
      sorter: (a: TableData, b: TableData) => a.author.length - b.author.length,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      
      sorter: (a: TableData, b: TableData) => a.subject.length - b.subject.length,
    },
    {
      title: "Rack No",
      dataIndex: "rackNo",
      
      sorter: (a: TableData, b: TableData) => a.rackNo.length - b.rackNo.length,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      
      sorter: (a: TableData, b: TableData) => a.qty.length - b.qty.length,
    },
    {
      title: "Available",
      dataIndex: "available",
      
      sorter: (a: TableData, b: TableData) => a.available.length - b.available.length,
    },
    {
      title: "Price",
      dataIndex: "price",
      
      sorter: (a: TableData, b: TableData) => a.price.length - b.price.length,
    },
    {
      title: "Post Date",
      dataIndex: "postDate",
      
      sorter: (a: TableData, b: TableData) => a.postDate.length - b.postDate.length,
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
                    data-bs-target="#edit_library_book"
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
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Books</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={routes.adminDashboard}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Management</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Books
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
                  data-bs-target="#add_library_book"
                >
                  <i className="ti ti-square-rounded-plus me-2" />
                  Add Book
                </Link>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Students List */}
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
              <h4 className="mb-3">Books</h4>
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
                  <div
                    className="dropdown-menu drop-width"
                    ref={dropdownMenuRef}
                  >
                    <form>
                      <div className="d-flex align-items-center border-bottom p-3">
                        <h4>Filter</h4>
                      </div>
                      <div className="p-3 border-bottom">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Book No</label>
                              <CommonSelect
                                className="select"
                                options={cardNo}
                                defaultValue={undefined}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Subject</label>
                              <CommonSelect
                                className="select"
                                options={allSubject}
                                defaultValue={allSubject[0]}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-0">
                              <label className="form-label">More Filter</label>
                              <CommonSelect
                                className="select"
                                options={moreFilterBook}
                                defaultValue={moreFilterBook[0]}
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
                    Sort by A-Z{" "}
                  </Link>
                  <ul className="dropdown-menu p-3">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
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
              {/* Student List */}
              <Table dataSource={data} columns={columns} Selection={true} />
              {/* /Student List */}
            </div>
          </div>
          {/* /Students List */}
        </div>
      </div>
      {/* /Page Wrapper */}
      <LibraryModal />
    </>
  );
};

export default Books;
