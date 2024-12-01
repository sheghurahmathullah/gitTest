import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import { api_path } from "../../../environment";

const SportsModal = () => {

  const navigation = useNavigate();
  const navigationPath = () => {
    setTimeout(() => {
      navigation(routes.classHomeWork);
    }, 1000);
  };

  const [sportData, setSportData] = useState({
    name: "",
    coach: "",
    startedYear: "",
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSportData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // if (!validateForm()) return;
    try {
      const response = await fetch(`${api_path}/sports/createSport`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sportData.name,
          coach: sportData.coach,
          startedYear: sportData.startedYear,
      }),
      });
      const data = await response.text();
    if (response.ok) {
      console.log(data);
      console.log("Sport Created Successfully");
      alert("Sport Created Successfully");
      navigationPath(); // Redirect immediately
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error('Error Creating User:', error);
  }
};

const routes = all_routes;



  return (
    <>
    <>
  {/* Add Player */}
  <div className="modal fade" id="add_players">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Add Player</h4>
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
                  <label className="form-label">Player Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Sports</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-0">
                  <label className="form-label">Date of Join</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <Link to="#"  className="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </Link>
            <Link to="#" data-bs-dismiss="modal" className="btn btn-primary">
              Add Player
            </Link>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* Add Player */}
  {/* Edit Player */}
  <div className="modal fade" id="edit_players">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Edit Player</h4>
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
                  <label className="form-label">Player Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Player Name"
                    defaultValue="Francis"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Sports</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Sports"
                    defaultValue="Cricket"
                  />
                </div>
                <div className="mb-0">
                  <label className="form-label">Date of Join</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Date of Join"
                    defaultValue="25 Apr 2024"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <Link to="#"  className="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </Link>
            <Link to="#" data-bs-dismiss="modal" className="btn btn-primary">
              Save Changes
            </Link>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* Edit Player */}
</>

      {/* Add Sports */}
      <div className="modal fade" id="add_sports">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Sport</h4>
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
                          id="name"
                          className="form-control"
                              name="name"
                              onChange={handleChange}  value={sportData.name}
                        />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Coach</label>
                      <input
                          type="text"
                          className="form-control"
                          id="coach"
                              name="coach"
                              onChange={handleChange}  value={sportData.coach}
                        />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Started Year</label>
                      <input
                          type="text"
                          id="startedYear"
                          className="form-control"
                              name="startedYear"
                              onChange={handleChange}  value={sportData.startedYear}
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
                  Add Sport
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Add Sports */}
      {/* Edit Sports */}
      <div className="modal fade" id="edit_sports">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Sport</h4>
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
                        defaultValue="Cricket"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Coach</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Coach"
                        defaultValue="Thomas"
                      />
                    </div>
                    <div className="mb-0">
                      <label className="form-label">Started Year</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Started Year"
                        defaultValue={2004}
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
      {/* Edit Sports */}
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

export default SportsModal;
