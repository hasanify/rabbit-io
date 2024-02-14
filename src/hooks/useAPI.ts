import axios from "axios";

const useAPI = () => {
  const API = {
    addProject: async ({
      project_slug,
      git_url,
    }: {
      project_slug: string;
      git_url: string;
    }) => {
      await axios.post("localhost:9000/project", {
        project_slug,
        git_url,
      });
    },
  };

  return API;
};

export default useAPI;
