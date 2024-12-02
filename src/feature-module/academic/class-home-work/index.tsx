import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Datatable from "../../../core/common/dataTable/index"; // Ensure correct import
import TooltipOption from "../../../core/common/tooltipOption";
import { api_path } from "../../../environment";
import { all_routes } from "../../router/all_routes"; // Your routes

const ClassHomeWork = () => {
  const routes = all_routes;

  // State for homework data
  const [homeworkData, setHomeworkData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch homework data from the API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api_path}/assignments/getAllAssignments`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch homework data");
      }

      const result = await response.json();
      console.log(result); // Check if data is coming correctly from the API

      // Map API response to match the table columns structure
      const formattedData = result.map((item: any) => ({
        key: item.key,
        class: item.className,
        section: item.section,
        subject: item.subject,
        homeworkDate: item.homeworkDate,
        submissionDate: item.submissionDate,
        createdBy: "Admin", // Assuming you have a fixed "created by" field
        img: "path/to/image.jpg", // If the image URL is part of the data, update this accordingly
        action: "", // Placeholder for action buttons
      }));

      setHomeworkData(formattedData); // Set the data in the state
    } catch (error) {
      console.error("Error fetching homework data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      render: (text: string, record: any) => (
        <Link to="#" className="link-primary">
          {record.key}
        </Link>
      ),
      sorter: (a: any, b: any) => a.key - b.key, // Sorting by key
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
      title: "Subject",
      dataIndex: "subject",
      sorter: (a: any, b: any) => a.subject.localeCompare(b.subject),
    },
    {
      title: "Homework Date",
      dataIndex: "homeworkDate",
      sorter: (a: any, b: any) => a.homeworkDate - b.homeworkDate,
    },
    {
      title: "Submission Date",
      dataIndex: "submissionDate",
      sorter: (a: any, b: any) => a.submissionDate - b.submissionDate,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div className="dropdown">
          <Link to="#" className="btn btn-white btn-icon btn-sm d-flex align-items-center justify-content-center rounded-circle p-0" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="ti ti-dots-vertical fs-14" />
          </Link>
          <ul className="dropdown-menu dropdown-menu-right p-3">
            <li>
              <Link className="dropdown-item rounded-1" to="#" data-bs-toggle="modal" data-bs-target="#edit_home_work">
                <i className="ti ti-edit-circle me-2" />
                Edit
              </Link>
            </li>
            <li>
              <Link className="dropdown-item rounded-1" to="#" data-bs-toggle="modal" data-bs-target="#delete-modal">
                <i className="ti ti-trash-x me-2" />
                Delete
              </Link>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Assignments</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={routes.adminDashboard}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Academic</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Assignments
                  </li>
                </ol>
              </nav>
            </div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
              <TooltipOption />
              <div className="mb-2">
                <Link to="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_home_work">
                  <i className="ti ti-square-rounded-plus-filled me-2" />
                  Add Assignment
                </Link>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body p-0 py-3">
              {/* Pass the homeworkData and columns to Datatable */}
              <Datatable columns={columns} dataSource={homeworkData} Selection={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassHomeWork;
