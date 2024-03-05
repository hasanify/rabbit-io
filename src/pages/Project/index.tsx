import Header from "@/components/Header";
import {pb} from "@/utils/pocketbase";
import {useParams} from "react-router-dom";
import ProjectDetails from "./ProjectDetails";

const Project = () => {
  if (!pb.authStore.isValid) window.location.replace("/");
  const {id} = useParams();

  return (
    <>
      <Header />
      <section className="w-full max-w-screen-xl px-8 py-2 mx-auto">
        <ProjectDetails project_id={id!} />
      </section>
    </>
  );
};

export default Project;
