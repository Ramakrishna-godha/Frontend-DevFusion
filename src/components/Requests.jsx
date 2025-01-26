import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      // console.log(response.data.data);
      dispatch(addRequests(response.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1
        className="flex font-bold
  justify-center h-screen"
      >
        No Requests Found
      </h1>
    );

  return (
    <div className="text-center my-10 ">
      <h1 className="font-bold text-2xl">Requests</h1>
      {requests?.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          about,
          skills,
          photoUrl,
          age,
          gender,
        } = request.fromUserId;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 lg:w-2/3 w-3/4 md:w-2/4 mx-auto justify-between items-center "
          >
            <div>
              <img
                src={photoUrl}
                alt="photo"
                className="w-20 h-20 object-cover rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + "  " + lastName}
              </h2>
              {age && gender && <p>{age + "" + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="flex items-center   ">
              <button
                className="btn btn-outline btn-success mr-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>

              <button
                className="btn btn-outline btn-error"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
