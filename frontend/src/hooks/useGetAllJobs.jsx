import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage

        if (!token) {
          console.error("No authentication token found."); // Log the error
          return; // Early exit if no token
        }

        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          console.error("Failed to fetch jobs:", res.data.message);
        }
      } catch (error) {
        // Handle specific error scenarios
        console.error(
          "Error fetching jobs:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchAllJobs();
  }, [searchedQuery, dispatch]); // Add dependencies
};

export default useGetAllJobs;
