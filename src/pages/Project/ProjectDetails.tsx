import {relativeTime} from "@/lib/utils";
import {useProjectStore} from "@/store/ProjectStore";
import {ProjectsResponse} from "@/types/pocketbase-types";
import {useEffect, useLayoutEffect, useState} from "react";
import {FaExternalLinkAlt} from "react-icons/fa";
import Loading from "../Loading";

const colors = {
  queued: "bg-yellow-500 ring-yellow-300",
  building: "bg-yellow-500 ring-yellow-300",
  uploading: "bg-blue-500 ring-blue-300",
  distributing: "bg-purple-500 ring-purple-300",
  failed: "bg-red-500 ring-red-300",
  success: "bg-green-500 ring-green-300",
};

const ProjectDetails = ({project_id}: {project_id: string}) => {
  const {projects, projectsLoading} = useProjectStore();
  const [selectedProject, setSelectedProject] = useState<ProjectsResponse | undefined>();

  useEffect(() => {
    if (!projectsLoading) setSelectedProject(projects.find(project => project.id === project_id));
  }, [project_id, projects, projectsLoading]);

  return (
    <div className="flex flex-col gap-2 p-4 border rounded-lg lg:flex-row lg:gap-4 bg-dark/10 border-dark/20">
      {projectsLoading ? (
        <Loading />
      ) : selectedProject ? (
        <>
          <Preview project={selectedProject} />
          <div className="flex flex-col gap-8 mt-6">
            <div className="flex-col">
              <div className="text-xs text-dark/50">Project Name</div>
              <div className="flex flex-row items-center gap-2 font-bold">
                {selectedProject.project_slug}
              </div>
            </div>
            <div className="flex-col">
              <div className="text-xs text-dark/50">Deployment</div>
              <div className="flex flex-row items-center gap-2 font-bold">
                <a
                  target="_blank"
                  className="decoration-blue-600 hover:underline line-clamp-1"
                  href={selectedProject.domain}
                >
                  {selectedProject.domain}
                </a>
                <FaExternalLinkAlt className="text-blue-600 size-3" />
              </div>
            </div>

            <div className="flex flex-row w-full gap-8 text-sm">
              <div className="flex-col">
                <div className="text-xs text-dark/50">Status</div>
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-full  ring-1 size-3 ${colors[selectedProject.status]}`}
                  />
                  <div className="font-bold capitalize">{selectedProject.status}</div>
                </div>
              </div>
              <div className="flex-col">
                <div className="text-xs text-dark/50">Created</div>
                <div className="font-bold">{relativeTime(selectedProject.created)}</div>
              </div>
              <div className="flex-col">
                <div className="text-xs text-dark/50">Updated</div>
                <div className="font-bold">{relativeTime(selectedProject.updated)}</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ProjectNotFound />
      )}
    </div>
  );
};

const Preview = ({project}: {project: ProjectsResponse}) => {
  const [src, setSrc] = useState<string | undefined>();
  const [err, setErr] = useState(false);
  useLayoutEffect(() => {
    (async () => {
      const domain = encodeURIComponent(project.domain);
      try {
        const response = await fetch(`http://192.168.29.37:9000/project/screenshot/${domain}`);
        const {screenshot} = await response.json();

        if (screenshot) setSrc(`data:image/png;base64,${screenshot}`);
      } catch (error) {
        console.log(error);
        setErr(true);
      }
    })();

    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="w-full h-auto overflow-hidden rounded-lg aspect-video">
        {err ? (
          <></>
        ) : src ? (
          <img src={src} />
        ) : (
          <div className="w-full h-full bg-dark/60 animate-pulse" />
        )}
      </div>
    </>
  );
};

const ProjectNotFound = () => {
  return <div>Failed to Load the requested project</div>;
};

export default ProjectDetails;
