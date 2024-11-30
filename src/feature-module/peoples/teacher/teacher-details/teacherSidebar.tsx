import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ImageWithBasePath from "../../../../core/common/imageWithBasePath";
import { api_path } from "../../../../environment";

const TeacherSidebar = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teacherId = queryParams.get("teacherId");

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
      const response = await fetch(`${api_path}/teachers/getTeachersById?teacherId=${teacherId}`, { method: "GET" });
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
  
  
    useEffect(() => {
      fetchData();
    }, []);

  return (
    <div className="col-xxl-3 col-xl-4 theiaStickySidebar">
      <div className="stickytopbar pb-4">
        <div className="card border-white">
          <div className="card-header">
            <div className="d-flex align-items-center flex-wrap row-gap-3">
              <div className="d-flex align-items-center justify-content-center avatar avatar-xxl border border-dashed me-2 flex-shrink-0 text-dark frames">
                <ImageWithBasePath
                  src="assets/img/parents/pa-3.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </div>
              <div>
                <h5 className="mb-1 mb-1 text-truncate">{teacherData.firstName} {teacherData.lastName}</h5>
                <p className="text-primary mb-1">{teacherData.teacherId}</p>
                <p>Experience : {teacherData.workExperience}</p>
              </div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="mb-3">Basic Information</h5>
            <dl className="row mb-0">
              <dt className="col-6 fw-medium text-dark mb-3">
                Class &amp; Section
              </dt>
              <dd className="col-6  mb-3">{teacherData.teacherClass}</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Subject</dt>
              <dd className="col-6  mb-3">{teacherData.subject}</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Gender</dt>
              <dd className="col-6  mb-3">{teacherData.gender}</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Blood Group</dt>
              <dd className="col-6  mb-3">{teacherData.bloodGroup}</dd>
              <dt className="col-6 fw-medium text-dark mb-3">House</dt>
              <dd className="col-6  mb-3">{teacherData.address}</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Language Known</dt>
              <dd className="col-6  mb-3">{teacherData.languageKnown}</dd>
              <dt className="col-6 fw-medium text-dark mb-0">Language</dt>
              <dd className="col-6  mb-0">
                <span className="badge badge-light text-dark me-2">
                  English
                </span>
                <span className="badge badge-light text-dark">Spanish</span>
              </dd>
            </dl>
          </div>
        </div>
        <div className="card border-white">
          <div className="card-body">
            <h5 className="mb-3 ">Primary Contact Info</h5>
            <div className="d-flex align-items-center mb-3">
              <span className="avatar avatar-md bg-light-300 rounded me-2 flex-shrink-0 text-default">
                <i className="ti ti-phone" />
              </span>
              <div>
                <span className=" text-dark fw-medium mb-1">Phone Number</span>
                <p>{teacherData.contactNumber}</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <span className="avatar avatar-md bg-light-300 rounded me-2 flex-shrink-0 text-default">
                <i className="ti ti-mail" />
              </span>
              <div>
                <span className="text-dark fw-medium mb-1">Email Address</span>
                <p>{teacherData.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card border-white">
          <div className="card-body pb-1">
            <h5 className="mb-3">PAN Number / ID Number</h5>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center mb-3">
                <span className="avatar avatar-md bg-light-300 rounded me-2 flex-shrink-0 text-default">
                  <i className="ti ti-id" />
                </span>
                <div>
                  <p className="text-dark">{teacherData.panNumber}</p>
                </div>
              </div>
              <Link to="#" className="btn btn-primary btn-icon btn-sm mb-3">
                <i className="ti ti-copy" />
              </Link>
            </div>
          </div>
        </div>
        <div className="card border-white mb-0">
          <div className="card-body pb-1">
            <ul className="nav nav-tabs nav-tabs-bottom mb-3">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="#hostel"
                  data-bs-toggle="tab"
                >
                  Hostel
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#transport" data-bs-toggle="tab">
                  Transportation
                </Link>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="hostel">
                <div className="d-flex align-items-center mb-3">
                  <span className="avatar avatar-md bg-light-300 rounded me-2 flex-shrink-0 text-default">
                    <i className="ti ti-building-fortress fs-16" />
                  </span>
                  <div>
                    <h6 className="mb-1">HI-Hostel, Floor</h6>
                    <p className="text-primary">Room No : 25</p>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="transport">
                <div className="d-flex align-items-center mb-3">
                  <span className="avatar avatar-md bg-light-300 rounded me-2 flex-shrink-0 text-default">
                    <i className="ti ti-bus fs-16" />
                  </span>
                  <div>
                    <span className="fs-12 mb-1">Route</span>
                    <p className="text-dark">Newyork</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <span className="fs-12 mb-1">Bus Number</span>
                      <p className="text-dark">AM 54548</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <span className="fs-12 mb-1">Pickup Point</span>
                      <p className="text-dark">Cincinatti</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSidebar;
