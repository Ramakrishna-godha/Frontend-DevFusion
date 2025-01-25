import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();

  const fromConnections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(response?.data?.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!fromConnections) return;

  if (fromConnections.length === 0) return <h1>No connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl">Connections</h1>
      {fromConnections?.map((connection) => {
        const {
          _id,
          firstName,
          lastName,
          about,
          skills,
          photoUrl,
          age,
          gender,
        } = connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 lg:w-1/2 w-3/4 md:w-2/4 mx-auto"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
