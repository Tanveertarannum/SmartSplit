import { useEffect, useState } from "react";
import { FaCamera, FaUser, FaEdit } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import API from "../api/api";

function Profile() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const res = await API.get(`/users/${user._id}`);

      setName(res.data.name);
      setEmail(res.data.email);
      setAvatar(res.data.avatar);

    } catch (err) {

      console.log(err);

    }

  };

  const uploadAvatar = async () => {

    if (!file) {

      alert("Please select an image.");

      return;

    }

    const formData = new FormData();

    formData.append("avatar", file);

    try {

      const res = await API.post(

        `/users/upload/${user._id}`,

        formData,

        {

          headers: {

            "Content-Type": "multipart/form-data",

          },

        }

      );

      setAvatar(res.data.avatar);

      alert("Avatar Updated Successfully ✅");

    } catch (err) {

      console.log(err);

    }

  };

  const saveProfile = async () => {

    try {

      await API.put(`/users/${user._id}`, {

        name,
        email,

      });

      setEditing(false);

      alert("Profile Updated Successfully ✅");

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="layout">

      <Sidebar />

      <main className="dashboard">

        <div className="profile-card glass">

          <h1 className="profile-title">

            My Profile

          </h1>
                    <div className="avatar-container">

            <div className="avatar-circle">

              {avatar ? (

                <img
                  src={`http://localhost:5000${avatar}`}
                  alt="avatar"
                  className="avatar-image"
                />

              ) : (

                <FaUser className="avatar-icon" />

              )}

              <label htmlFor="avatar" className="camera-btn">

                <FaCamera />

              </label>

            </div>

            <input
              id="avatar"
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />

          </div>

          <button
            className="upload-btn"
            onClick={uploadAvatar}
          >
            Upload Avatar
          </button>

          <div className="profile-user">

            <h2>{name}</h2>

            <p>{email}</p>

          </div>

          <button
            className="edit-profile-btn"
            onClick={() => setEditing(!editing)}
          >

            <FaEdit />

            <span>Edit Profile</span>

          </button>

          <div className="profile-form">
            {editing && (
  <>
    <div className="input-group">
      <label>Full Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div className="input-group">
      <label>Email Address</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <button className="save-btn" onClick={saveProfile}>
      Save Changes
    </button>
  </>
)}
</div>

        </div>

      </main>

    </div>

  );

}

export default Profile;