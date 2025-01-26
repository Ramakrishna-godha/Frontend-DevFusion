import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  // console.log("feed" + feed);

  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      // console.log(response?.data?.data);

      dispatch(addFeed(response?.data?.data));
    } catch (error) {
      console.error(error.message + "Feed is not available");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0)
    return (
      <h1
        className="flex font-bold
  justify-center h-screen"
      >
        No More New Users Found
      </h1>
    );
  return (
    feed && (
      <div className="flex justify-center ">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
