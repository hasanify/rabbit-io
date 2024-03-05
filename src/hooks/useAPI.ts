import {pb} from "@/utils/pocketbase";
import axios from "axios";

const useAPI = () => {
  const API = {
    addProject: async ({git_url}: {git_url: string}) => {
      await axios.post("/api/project", {
        git_url,
        owner: pb.authStore.model?.id,
      });
    },
  };

  return API;
};

export default useAPI;
