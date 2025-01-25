import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, about, gender, age, photoUrl } = user;

  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src={photoUrl}
          alt="Photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && <p>Age : {age}</p>}
        {gender && <p>Gender : {gender}</p>}
        <p>{about}</p>
        {/* <div>
          Skills:{" "}
          {skills && skills.length > 0 ? skills.join(", ") : "No skills added"}
        </div> */}

        <div className="card-actions justify-center ">
          <button
            className="btn bg-red-600 hover:bg-red-700 flex justify-between hover:text-black mx-2"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            ignore
          </button>
          <button
            className="btn bg-green-600 hover:bg-green-700 hover:text-black mx-8"
            onClick={() => handleSendRequest("interested", _id)}
          >
            interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
