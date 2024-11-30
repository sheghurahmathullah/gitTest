import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../../../core/common/dataTable/index";
import TooltipOption from "../../../../core/common/tooltipOption";
import { api_path } from "../../../../environment";
import { all_routes } from "../../../router/all_routes";
import StudentModals from "../studentModals";

const StudentList = () => {
  const routes = all_routes;
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api_path}/students/getAllStudent`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const result = await response.json();

      // Transform API data to fit table structure
      const transformedData = result.map((item: any) => ({
        key: item.key || "",
        AdmissionNo: item.admissionNumber || "N/A",
        RollNo: item.rollNumber || "N/A",
        name: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
        class: item.studentDAOClass || "N/A",
        section: item.section || "N/A",
        gender: item.gender || "N/A",
        status: item.status || "N/A",
        DateofJoin: item.admissionDate || "N/A",
        DOB: item.dateOfBirth || "N/A",
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

  const handleApplyClick = () => {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.remove("show");
    }
  }; 

  const columns = [
    {
      title: "Roll No",
      dataIndex: "RollNo",
      render: (text: string) => (
        <Link to={`${routes.studentDetail}?rollNo=${text}`} className="link-primary">
          {text}
        </Link>
      ),
      sorter: (a: any, b: any) => a.RollNo.localeCompare(b.RollNo),
    },
    {
      title: "Admission No",
      dataIndex: "AdmissionNo",

      sorter: (a: any, b: any) => a.AdmissionNo.localeCompare(b.AdmissionNo),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string, record: any) => (
        <div className="d-flex align-items-center">
          <div className="ms-2">
            <p className="text-dark mb-0">
              <Link to="#">{text}</Link>
            </p>
          </div>
        </div>
      ),
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
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
      title: "Gender",
      dataIndex: "gender",
      sorter: (a: any, b: any) => a.gender.localeCompare(b.gender),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <>
          {text === "Active" ? (
            <span className="badge badge-soft-success d-inline-flex align-items-center">
              <i className="ti ti-circle-filled fs-5 me-1"></i>
              {text}
            </span>
          ) : (
            <span className="badge badge-soft-danger d-inline-flex align-items-center">
              <i className="ti ti-circle-filled fs-5 me-1"></i>
              {text}
            </span>
          )}
        </>
      ),
      sorter: (a: any, b: any) => a.status.localeCompare(b.status),
    },
    {
      title: "Date of Join",
      dataIndex: "DateofJoin",
      sorter: (a: any, b: any) => a.DateofJoin.localeCompare(b.DateofJoin),
    },
    {
      title: "DOB",
      dataIndex: "DOB",
      sorter: (a: any, b: any) => a.DOB.localeCompare(b.DOB),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
          <div className="my-auto mb-2">
            <h3 className="page-title mb-1">Students List</h3>
            <nav>
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link to={routes.adminDashboard}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item">Students</li>
                <li className="breadcrumb-item active" aria-current="page">
                  All Students
                </li>
              </ol>
            </nav>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            <TooltipOption />
            <Link
              to={routes.addStudent}
              className="btn btn-primary d-flex align-items-center"
            >
              <i className="ti ti-square-rounded-plus me-2" />
              Add Student
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
            <h4 className="mb-3">Students List</h4>
          </div>
          <div className="card-body p-0 py-3">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <Table dataSource={data} columns={columns} Selection={true} />
            )}
          </div>
        </div>
      </div>
      <StudentModals />
    </div>
  );
};

export default StudentList;
