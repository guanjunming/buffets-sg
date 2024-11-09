import { useState, useEffect } from "react";
import axios from "axios";

const useFetchRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/restaurants",
        );
        setRestaurants(response.data);
      } catch (err) {
        setError("Failed to fetch restaurants");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { restaurants, loading, error };
};

export default useFetchRestaurants;
