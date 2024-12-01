import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { api_path } from "../../../environment";
import { all_routes } from "../../router/all_routes";


const LibraryModal = () => {
  const routes = all_routes;
  const navigation = useNavigate();
  const navigationPath = () => {
    setTimeout(() => {
      navigation(routes.libraryMembers);
    }, 1000);
  };

  const [memberData, setMemberData] = useState({
    name: "",
cardNo: "",
email: "",
dateOfJoin: "",
phoneNumber: "",
    });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMemberData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // if (!validateForm()) return;
    try {
      const response = await fetch(`${api_path}/members/createMember`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: memberData.name,
          cardNo: memberData.cardNo,
          email: memberData.email,
          dateOfJoin: memberData.dateOfJoin,
          phoneNumber: memberData.phoneNumber,
      }),
      });
      const data = await response.text();
    if (response.ok) {
      console.log(data);
      console.log("Library Member Created Successfully");
      alert("Library Member Created Successfully");
      navigationPath(); // Redirect immediately
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error('Error Creating User:', error);
  }
};



// book 


// const navigation = useNavigate();
  const navigationPath1 = () => {
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

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit1 = async (event: React.FormEvent) => {
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
      navigationPath1(); // Redirect immediately
    } else {
      console.log(data1);
    }
  } catch (error) {
    console.error('Error Creating User:', error);
  }
};



  return (
    <>
      <>
        {/* Book Details */}
        <div className="modal fade" id="book_details">
          <div className="modal-dialog modal-dialog-centered  modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">View Details</h4>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <div className="modal-body">
                <div className="view-book">
                  <div className="view-book-title">
                    <h5>Issue Book Details</h5>
                  </div>
                  <div className="book-issue-details">
                    <div className="book-details-head">
                      <span className="text-primary">IB853629</span>
                      <h6>
                        <span>Issue Date :</span> 19 May 2024
                      </h6>
                    </div>
                    <ul className="book-taker-info">
                      <li>
                        <div className="d-flex align-items-center">
                          <span className="student-img">
                            <ImageWithBasePath
                              src="assets/img/students/student-01.jpg"
                              className="img-fluid rounded-circle"
                              alt="Img"
                            />
                          </span>
                          <h6>
                            Janet <br /> III, A
                          </h6>
                        </div>
                      </li>
                      <li>
                        <span>Roll No</span>
                        <h6>35010</h6>
                      </li>
                      <li>
                        <span>Book Name</span>
                        <h6>Echoes of Eternity</h6>
                      </li>
                      <li>
                        <span>Book No</span>
                        <h6>501</h6>
                      </li>
                      <li>
                        <span>Due Date</span>
                        <h6>19 May 2024</h6>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Book Details */}
      </>

      {/* Add Member */}
      <div className="modal fade" id="add_library_members">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Member</h4>
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
                      <label className="form-label">Name</label>
                      <input
                          type="text"
                          className="form-control"
                          id="name"
                              name="name"
                              onChange={handleChange}  value={memberData.name}
                        />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Card No</label>
                      <input
                          type="text"
                          className="form-control"
                          id="cardNo"
                              name="cardNo"
                              onChange={handleChange}  value={memberData.cardNo}
                        />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                          type="text"
                          className="form-control"
                          id="email"
                              name="email"
                              onChange={handleChange}  value={memberData.email}
                        />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Date of Join</label>
                      <input
                          type="text"
                          className="form-control"
                          id="dateOfJoin"
                              name="dateOfJoin"
                              onChange={handleChange}  value={memberData.dateOfJoin}
                        />
                    </div>
                    <div className="mb-0">
                      <label className="form-label">Phone Number</label>
                      <input
                          type="text"
                          className="form-control"
                          id="phoneNumber"
                              name="phoneNumber"
                              onChange={handleChange}  value={memberData.phoneNumber}
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
                <button
                  onClick={handleSubmit}
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Add Member */}
      {/* Edit Member */}
      <div className="modal fade" id="edit_library_members">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Member</h4>
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
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        defaultValue="James"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Card No</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Card No"
                        defaultValue={501}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Email"
                        defaultValue="james@example.com"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Date of Join</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Date of Join"
                        defaultValue="22 Apr 2024"
                      />
                    </div>
                    <div className="mb-0">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Phone Number"
                        defaultValue="+1 78429 82414"
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
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Save Changes
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Edit Member */}

      <>
        {/* Add Book */}
        <div className="modal fade" id="add_library_book">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Book</h4>
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
                        <label className="form-label">Book Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="bookName"
                              name="bookName"
                              onChange={handleChange1}  value={bookData.bookName}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Book No</label>
                            <input
                            className="form-control"
                          type="text"
                          id="bookNo"
                              name="bookNo"
                              onChange={handleChange1}  value={bookData.bookNo}
                        />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Rack No</label>
                            <input
                            className="form-control"
                          type="text"
                          id="rackNo"
                              name="rackNo"
                              onChange={handleChange1}  value={bookData.rackNo}
                        />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Publisher</label>
                        <input
                        className="form-control"
                          type="text"
                          id="publisher"
                              name="publisher"
                              onChange={handleChange1}  value={bookData.publisher}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Author</label>
                        <input
                          type="text"
                          className="form-control"
                          id="author"
                              name="author"
                              onChange={handleChange1}  value={bookData.author}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Subject</label>
                         <input
                         className="form-control"
                          type="text"
                          id="subject"
                              name="subject"
                              onChange={handleChange1}  value={bookData.subject}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Qty</label>
                             <input
                             className="form-control"
                          type="text"
                          id="qty"
                              name="qty"
                              onChange={handleChange1}  value={bookData.qty}
                        />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Available</label>
                           <input
                           className="form-control"
                          type="text"
                          id="available"
                              name="available"
                              onChange={handleChange1}  value={bookData.available}
                        />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Price</label>
                       <input
                          type="text"
                          id="price"
                          className="form-control"
                              name="price"
                              onChange={handleChange1}  value={bookData.price}
                        />
                      </div>
                      <div className="mb-0">
                        <label className="form-label">Post Date</label>
                       <input
                          type="text"
                          id="postDate"
                          className="form-control"
                              name="postDate"
                              onChange={handleChange1}  value={bookData.postDate}
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
                  <button
                    onClick={handleSubmit1}
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Add Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Add Book */}
        {/* Edit Book */}
        <div className="modal fade" id="edit_library_book">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Book</h4>
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
                        <label className="form-label">Book Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Book Name"
                          defaultValue="Echoes of Eternity"
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Book No</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Book No"
                              defaultValue={501}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Rack No</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Rack Name"
                              defaultValue={6550}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Publisher</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Publisher"
                          defaultValue="Aurora Press"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Author</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Author"
                          defaultValue=" Isabella Rivers"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Subject</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Subject"
                          defaultValue="History"
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Qty</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Qty"
                              defaultValue={150}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Available</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Available"
                              defaultValue={120}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          defaultValue="$300"
                        />
                      </div>
                      <div className="mb-0">
                        <label className="form-label">Post Date</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Post Date"
                          defaultValue="25 Apr 2024"
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
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Save Changes
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Edit Book */}
      </>

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
  );
};

export default LibraryModal;
