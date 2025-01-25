import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";

import { addUser } from "../utils/userSlice";
// import { setTimeout } from "timers/promises";

const EditProfile = ({ user }) => {
  // console.log(user);

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user?.age);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [showToast, setShowToast] = useState(false);
  // const [skills, setSkills] = useState(user.skills || "");
  // const [skillInput, setSkillInput] = useState("");
  // const [skills, setSkills] = useState([]);

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.user); // Get updated user from Redux
  console.log("Updated user from Redux:", users);

  const saveProfile = async () => {
    setError("");
    const profileData = {
      firstName,
      lastName,
      photoUrl,
      age, // Ensure `age` is a number
      gender,
      about,
      // skills,
    };
    // console.log("Profile Data being sent:", profileData);
    try {
      const response = await axios.put(
        BASE_URL + "/profile/edit",
        profileData,
        {
          withCredentials: true,
        }
      );

      console.log("Update response:", response?.data);

      if (response?.data?.data) {
        dispatch(addUser(response.data.data)); // Ensure correct path to user data
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center p-6 gap-8">
        <div className="card bg-base-300 w-full sm:w-96 md:w-80 shadow-xl p-4 rounded-lg">
          <h2 className="card-title text-center mb-4 text-xl font-bold">
            Edit Profile
          </h2>
          <div>
            {/* First Name */}
            <label className="form-control w-full my-2">
              <span className="label text-sm font-semibold mb-1">
                First Name
              </span>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full text-sm"
                placeholder="Enter your first name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            {/* Last Name */}
            <label className="form-control w-full my-2">
              <span className="label text-sm font-semibold mb-1">
                Last Name
              </span>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full text-sm"
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            {/* Age */}
            <label className="form-control w-full my-2">
              <span className="label text-sm font-semibold mb-1">Age</span>
              <input
                type="text"
                value={age}
                className="input input-bordered w-full text-sm"
                placeholder="Enter your age"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            {/* Age */}
            <label className="form-control w-full my-2">
              <span className="label text-sm font-semibold mb-1">Gender</span>
              <input
                type="text"
                value={gender}
                className="input input-bordered w-full text-sm"
                placeholder="Enter your age"
                onChange={(e) => setGender(e.target.value)}
              />
            </label>

            {/* Gender */}
            {/* <label className="form-control w-full my-2">
            <span className="label text-sm font-semibold mb-1">Gender</span>
            <select
              value={gender}
              className="select select-bordered w-full text-sm"
              onChange={(e) => setGender(e.target.value)}
            >
              <option
                value=""
                disabled
              >
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </label> */}

            {/* About */}
            <label className="form-control w-full my-2">
              <span className="label text-sm font-semibold mb-1">About</span>
              <textarea
                value={about}
                className="textarea textarea-bordered w-full text-sm"
                placeholder="Tell something about yourself"
                rows={3}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </label>

            {/* Photo URL */}
            <label className="form-control w-full my-2">
              <span className="label text-sm font-semibold mb-1">
                Photo URL
              </span>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered w-full text-sm"
                placeholder="Enter photo URL"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>

            {/* Skills */}
            {/* <label className="form-control w-full my-2">
            <span className="label text-sm font-semibold mb-1">Skills</span>
            <div className="flex items-center">
              <input
                type="text"
                value={skillInput}
                className="input input-bordered w-full text-sm"
                placeholder="Enter a skill"
                onChange={(e) => setSkillInput(e.target.value)}
              /> */}
            {/* <button
                className="btn btn-sm btn-primary ml-2"
                onClick={() => {
                  if (skillInput.trim() && !skills.includes(skillInput)) {
                    setSkills([...skills, skillInput.trim()]); // Add the skill
                    setSkillInput(""); // Clear the input field
                  }
                }}
              >
                Add
              </button>
            </div>
          </label> */}

            {/* Display Skills */}
            {/* <div className="form-control w-full my-2">
            <span className="label text-sm font-semibold mb-1">
              Your Skills
            </span>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-outline badge-primary cursor-pointer"
                  onClick={() => {
                    // Remove the skill when clicked
                    setSkills(skills.filter((_, i) => i !== index));
                  }}
                >
                  {skill} ✕
                </span>
              ))} */}
            {/* </div>
          </div> */}

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Save Button */}
            <div className="card-actions justify-center mt-4">
              <button
                className="btn btn-primary px-6"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="card  w-full sm:w-96 md:w-80 shadow-sm p-4 rounded-lg">
          <UserCard
            user={{ firstName, lastName, gender, age, photoUrl, about }}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center z-[1000] ">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;
