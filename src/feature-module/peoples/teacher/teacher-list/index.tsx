import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../../../core/common/dataTable/index";
import TooltipOption from "../../../../core/common/tooltipOption";
import { api_path } from "../../../../environment";
import { all_routes } from "../../../router/all_routes";
import TeacherModal from "../teacherModal";

const TeacherList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
  const routes = all_routes;

  // Fetch Data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api_path}/teachers/getAllTeacher`, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch teachers");

      const result = await response.json();

      // Transform API data to fit table structure
      const transformedData = result.map((item: any, index: number) => ({
        key: item.id || index, // Unique key
        img: item.uploadImage || "assets/img/teachers/teacher-default.jpg",
        id: item.id || "T849127", // Fallback for missing `id`
        name: `${item.firstName || ""} ${item.lastName || ""}`.trim(), // Full name
        class: item.teacherClass || "CS-CS",
        subject: item.subject || "C Programming",
        email: item.email || "teacher@example.com",
        phone: item.contactNumber || "+1 82392 37359",
        dateofJoin: item.workExperience || "N/A",
        status: item.status || "Active", // Default "Active"
      }));

      setData(transformedData);
    } catch (err: any) {
      setError(err.message);
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

  // Columns for Table
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text: string) => (
        <Link to={routes.teacherDetails} className="link-primary">
          {text}
        </Link>
      ),
      sorter: (a: any, b: any) => a.id.localeCompare(b.id),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string, record: any) => (
        <div className="d-flex align-items-center">
          <p className="text-dark mb-0">{text}</p>
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
      title: "Subject",
      dataIndex: "subject",
      sorter: (a: any, b: any) => a.subject.localeCompare(b.subject),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: any, b: any) => a.email.localeCompare(b.email),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a: any, b: any) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Work Experience",
      dataIndex: "dateofJoin",
      sorter: (a: any, b: any) => a.dateofJoin.localeCompare(b.dateofJoin),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <span
          className={`badge ${
            text === "Active" ? "badge-soft-success" : "badge-soft-danger"
          }`}
        >
          <i className="ti ti-circle-filled fs-5 me-1"></i>
          {text}
        </span>
      ),
      sorter: (a: any, b: any) => a.status.localeCompare(b.status),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* Page Header */}
        <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
          <div className="my-auto mb-2">
            <h3 className="page-title mb-1">Teacher List</h3>
            <nav>
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link to={routes.adminDashboard}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="#">Peoples</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Teacher List
                </li>
              </ol>
            </nav>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            <TooltipOption />
            <Link
              to={routes.addTeacher}
              className="btn btn-primary d-flex align-items-center"
            >
              <i className="ti ti-square-rounded-plus me-2" />
              Add Teacher
            </Link>
          </div>
        </div>
        {/* /Page Header */}
        {/* Teachers List */}
        <div className="card">
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
      <TeacherModal />
    </div>
  );
};

export default TeacherList;
