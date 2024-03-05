import {useProjectStore} from "@/store/ProjectStore";
import {AuthSystemFields, Collections, ProjectsResponse} from "@/types/pocketbase-types";
import {pb} from "@/utils/pocketbase";
import {RecordSubscription} from "pocketbase";

const usePocketbase = () => {
  const {addProject, fetchProjects, deleteProject, updateProject} = useProjectStore();
  const Pocketbase = {
    fetch: async () => {
      await fetchProjects();
    },
    subscribe: () => {
      pb.collection(Collections.Projects).subscribe(
        "*",
        async function (e: RecordSubscription<ProjectsResponse>) {
          const action = e.action;
          console.log(e.record);
          if (action === "create") addProject(e.record);
          else if (action === "update") updateProject(e.record);
          else if (action === "delete") deleteProject(e.record);
        },
      );

      if (pb.authStore.model) {
        pb.collection("users").subscribe<AuthSystemFields>(pb.authStore.model.id, e => {
          if (e.action === "delete") {
            pb.authStore.clear();
            window.location.replace("/");
          } else pb.authStore.save(pb.authStore.token, e.record);
        });
      }
    },
    unsubscribe: () => {
      pb.collection(Collections.Projects).unsubscribe();
      pb.collection(pb.authStore.model?.id).unsubscribe();
    },
  };

  return Pocketbase;
};

export default usePocketbase;
