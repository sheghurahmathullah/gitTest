import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Table from "../../../../core/common/dataTable/index";
import TooltipOption from "../../../../core/common/tooltipOption";
import { api_path } from "../../../../environment";
import { all_routes } from "../../../router/all_routes";
import ParentModal from "../parentModal";

const ParentList = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
  const routes = all_routes;

  // Fetch Data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api_path}/parents/getAllParent`, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch parent data");

      const result = await response.json();

      // Transform API data to fit table structure
      const transformedData = result.map((item: any) => ({
        key: item.id || "N/A",
        ParentImage: item.uploadImage || "assets/img/parents/pa-1.jpg",
        ChildImage: "assets/img/students/stu-1.jpg",
        id: item.id || "P124556",
        name: item.name || "N/A",
        AddedOn: "Added on 25 Mar 2024",
        child: item.child || "CHILD",
        class: "CS-CS , A",
        phone: item.phoneNumber || "+1 65738 58937",
        email: item.emailAddress || "parent@example.com",
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

  // Table Columns Definition
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text: string) => (
        <Link to="#" onClick={() => setShow(true)} className="link-primary">
          {text}
        </Link>
      ),
      sorter: (a: any, b: any) => a.id.localeCompare(b.id),
    },
    {
      title: "Parent Name",
      dataIndex: "name",
      render: (text: string, record: any) => (
        <div className="d-flex align-items-center">
          <p className="text-dark mb-0">{text}</p>
        </div>
      ),
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Child",
      dataIndex: "child",
      render: (text: string, record: any) => (
        <div className="d-flex align-items-center">
          <Link to={routes.studentDetail} className="avatar avatar-sm me-2">
          </Link>
          <p className="text-dark mb-0">{text}</p>
        </div>
      ),
      sorter: (a: any, b: any) => a.child.localeCompare(b.child),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a: any, b: any) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: any, b: any) => a.email.localeCompare(b.email),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: string, record: any) => (
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
                onClick={() => setShow(true)}
              >
                <i className="ti ti-menu me-2" />
                View Parent
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item rounded-1"
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#edit_parent"
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
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
          <h3 className="page-title mb-1">Parents</h3>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            <TooltipOption />
            <Link
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#add_parent"
              className="btn btn-primary"
            >
              <i className="ti ti-square-rounded-plus me-2" />
              Add Parent
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            {error ? (
              <div className="alert alert-danger">{error}</div>
            ) : loading ? (
              <div>Loading...</div>
            ) : (
              <Table dataSource={data} columns={columns} Selection={true} />
            )}
          </div>
        </div>
      </div>
      <ParentModal />
      <Modal show={show} centered size="lg">
        <div className="modal-header">
          <h4 className="modal-title">View Details</h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="modal-body">Parent Details Here</div>
      </Modal>
    </div>
  );
};

export default ParentList;
