import { useEffect, useState } from "react";
import { Animal, BreedListAPIResponse } from "../types/APIResponseTypes";

type Status = "unloaded" | "loading" | "loaded";

const localCache: {
  [index: string]: string[];
} = {};

const useBreedList = (animal: Animal): [string[], Status] => {
  const [breedList, setBreedList] = useState([] as string[]);
  const [status, setStatus] = useState("unloaded" as Status);

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      void requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json = (await res.json()) as BreedListAPIResponse;

      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
};

export default useBreedList;
