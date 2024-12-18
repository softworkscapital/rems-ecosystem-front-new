import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCamera,
  FaEdit,
  FaSave,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/sb-admin-2.css";
import Sidebar from "./components/Sidebar";
import { API_URL } from "./config";
import Swal from "sweetalert2";

const ClientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://picsum.photos/200/200?random=1"
  );
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

  const fetchMember = () => {
    const userId = localStorage.getItem("user");

    fetch(`${API_URL}/members/${userId}`)
      .then((res) => res.json())
      .then((resp) => {
        if (resp.length === 1) {
          // Set the member data to formData
          setFormData({
            firstName: resp[0].name || "John",
            lastName: resp[0].surname || "Doe",
            email: resp[0].email || "john.doe@example.com",
            phone: resp[0].phone || "+1 234 567 8900",
            address: resp[0].address || "123 Tech Street, Silicon Valley",
            ID_Number:
              resp[0].idnumber ||
              "Passionate developer with 5 years of experience in web development.",
            profession: resp[0].profession || "Senior Web Developer",
            company: resp[0].company || "Tech Solutions Inc.",
            Instagram: resp[0].Instagram || "Instagram/johndoe",
            facebook: resp[0].facebook || "facebook/johndoe",
            twitter: resp[0].twitter || "@johndoe",
            skills: resp[0].skills || [
              "React",
              "Node.js",
              "Python",
              "AWS",
              "Docker",
            ],
          });

          // Store member data in local storage if needed
          localStorage.setItem("member", JSON.stringify(resp[0]));
        } else {
          Swal.fire({
            text: "User Terminated!",
            icon: "error",
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
        Swal.fire({
          text: "System Boot Failed, Please check your network connection!",
          icon: "error",
        });
      });
  };

  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    address: "123 Tech Street, Silicon Valley",
    bio: "Passionate developer with 5 years of experience in web development.",
    profession: "Senior Web Developer",
    company: "Tech Solutions Inc.",
    Instagram: "Instagram/johndoe",
    facebook: "facebook/johndoe",
    twitter: "@johndoe",
    skills: ["React", "Node.js", "Python", "AWS", "Docker"],
  });
  fetchMember();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page-container" style={{ display: "flex" }}>
      <Sidebar />
      <div
        className="main-content"
        style={{ flex: 1, padding: "2rem", backgroundColor: "#f8f9fc" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="profile-header">
            <i className="fas fa"></i>
            <h1 className="h3 mb-4 text-gray-800">My Profile</h1>
            <button
              className={`btn ${
                isEditing ? "btn-danger" : "btn-primary"
              } float-right`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <>
                  <FaTimes /> Cancel
                </>
              ) : (
                <>
                  <FaEdit /> Edit Profile
                </>
              )}
            </button>
          </div>

          <div className="row">
            {/* Profile Image Section */}
            <div className="col-xl-4 col-lg-5">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Profile Picture
                  </h6>
                </div>
                <div className="card-body text-center">
                  <div className="profile-image-container position-relative">
                    <img
                      src={"https://picsum.photos/800/400?random=3"}
                      alt="Profile"
                      className="img-profile rounded-circle mb-3"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    {isEditing && (
                      <div className="image-upload-overlay">
                        <label htmlFor="profile-image-upload" className="mb-0">
                          <FaCamera className="camera-icon" />
                          <input
                            id="profile-image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <h4 className="mb-1">{`${formData.firstName} ${formData.lastName}`}</h4>
                  <p className="text-muted">{formData.package}</p>
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="col-xl-8 col-lg-7">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Personal Information
                  </h6>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            <FaUser className="mr-2" /> First Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            <FaUser className="mr-2" /> Last Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            <FaEnvelope className="mr-2" /> Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            <FaPhone className="mr-2" /> Phone
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        <FaMapMarkerAlt className="mr-2" /> Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                         rows="3"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="form-group">
                      <label>National-ID-Number</label>
                      <textarea
                        className="form-control"
                        name="bio"
                        rows="1"
                        value={formData.ID_Number}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </form>
                </div>
              </div>

              {/* Professional Information */}
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Professional Information
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Profession</label>
                        <input
                          type="text"
                          className="form-control"
                          name="profession"
                          value={formData.profession}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Company</label>
                        <input
                          type="text"
                          className="form-control"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Social Links
                  </h6>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>
                      <FaInstagram className="mr-2" /> Instagram
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="linkedin"
                      value={formData.Instagram}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <FaFacebook className="mr-2" /> Facebook
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <FaTwitter className="mr-2" /> Twitter
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-4"
            >
              <button className="btn btn-success btn-lg">
                <FaSave className="mr-2" /> Save Changes
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ClientProfile;
