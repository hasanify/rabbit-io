import {useProjectStore} from "@/store/ProjectStore";

import Header from "@/components/Header";
import {pb} from "@/utils/pocketbase";
import AddProject from "./AddProject";
import Projects from "./Projects";

const Dashboard = () => {
  if (!pb.authStore.isValid) window.location.replace("/");
  const {projects, projectsLoading} = useProjectStore();

  return (
    <>
      <Header />
      <section className="w-full max-w-screen-xl px-8 py-2 mx-auto">
        <AddProject />
        <Projects projects={projects} loading={projectsLoading} />
      </section>
    </>
  );
};

export default Dashboard;
