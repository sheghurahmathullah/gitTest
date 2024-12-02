import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonSelect from "../../../core/common/commonSelect";
import Table from "../../../core/common/dataTable/index";
import PredefinedDateRanges from "../../../core/common/datePicker";
import {
  allSubject,
  cardNo,

  moreFilterBook,
} from "../../../core/common/selectoption/selectoption";
import TooltipOption from "../../../core/common/tooltipOption";
import { bookList } from "../../../core/data/json/bookList";
import { api_path } from "../../../environment";
import { all_routes } from "../../router/all_routes";
import LibraryModal from "./libraryModal";

const Books = () => {

  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api_path}/books/getAllBook`, {
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
        bookName: item.bookName || "N/A",
        rackNo: item.rackNo || "N/A",
        bookNo: item.bookNo || "N/A",
        publisher: item.publisher || "N/A",
        author: item.author || "N/A",
        subject: item.subject || "N/A",
        qty: item.qty || "N/A",
        available: item.available || "N/A",
        price: item.price || "N/A",
        postDate: item.postDate || "N/A",
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
    console.log("Table data updated:", Data);
  }, [Data]);
  
  
  useEffect(() => {
    fetchData(); // Called once on mount
  }, []); // Empty dependency array to avoid repeated calls
  


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
      const data1 = await response.text();
    if (response.ok) {
      console.log(data1);
      console.log("Book Created Successfully");
      alert("Book Created Successfully");
      navigationPath(); // Redirect immediately
    } else {
      console.log(data1);
    }
  } catch (error) {
    console.error('Error Creating User:', error);
  }
};



  const routes = all_routes;
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
  const data12 = bookList;
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
      sorter: (a: any, b: any) => a.id.localeCompare(b.id),

    },
    {
      title: "Book Name",
      dataIndex: "bookName",
      
      sorter: (a: any, b: any) => a.bookName.localeCompare(b.bookName),

    },
    {
      title: "Book No",
      dataIndex: "bookNo",
      sorter: (a: any, b: any) => a.bookNo.localeCompare(b.bookNo),

    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      sorter: (a: any, b: any) => a.publisher.localeCompare(b.publisher),

    },
    {
      title: "Author",
      dataIndex: "author",
      
      sorter: (a: any, b: any) => a.author.localeCompare(b.author),

    },
    {
      title: "Subject",
      dataIndex: "subject",
      
      sorter: (a: any, b: any) => a.subject.localeCompare(b.subject),

    },
    {
      title: "Rack No",
      dataIndex: "rackNo",
      
      sorter: (a: any, b: any) => a.rackNo.localeCompare(b.rackNo),

    },
    {
      title: "Qty",
      dataIndex: "qty",
      
      sorter: (a: any, b: any) => a.qty.localeCompare(b.qty),

    },
    {
      title: "Available",
      dataIndex: "available",
      
      sorter: (a: any, b: any) => a.available.localeCompare(b.available),

    },
    {
      title: "Price",
      dataIndex: "price",
      
      sorter: (a: any, b: any) => a.price.localeCompare(b.price),

    },
    {
      title: "Post Date",
      dataIndex: "postDate",
      
      sorter: (a: any, b: any) => a.postDate.localeCompare(b.postDate),

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
            <Table dataSource={Data} columns={columns} Selection={true} />
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
