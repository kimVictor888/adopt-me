import { useEffect, useState } from "react";
import axios from "axios";

const localCache = {};

const useBreedList = (animal) => {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      const { data } = await axios.get(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      localCache[animal] = data.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
};

export default useBreedList;
