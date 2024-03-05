import Icon from "@/components/Icon";
import {relativeTime} from "@/lib/utils";
import {ProjectsResponse, ProjectsStatusOptions} from "@/types/pocketbase-types";
import {XCircle} from "lucide-react";
import {FC} from "react";
import {FaCheckCircle, FaCircleNotch, FaExternalLinkAlt, FaRegCircle} from "react-icons/fa";
import {IoCloudCircle} from "react-icons/io5";
import {TbWorldUpload} from "react-icons/tb";
import {Link} from "react-router-dom";

type ProjectsProps = {
  projects: ProjectsResponse[];
  loading: boolean;
};

const Projects: FC<ProjectsProps> = ({projects, loading}) => {
  return (
    <>
      <div className="flex flex-row flex-wrap items-center justify-between gap-2 justify-self-center">
        {loading ? (
          <ProjectSkeletons count={5} />
        ) : (
          <>
            {projects.map(project => {
              return <ProjectCard key={project.id} project={project} />;
            })}
          </>
        )}
      </div>
    </>
  );
};

type ProjectCardProps = {
  project: ProjectsResponse;
};

const ProjectCard: FC<ProjectCardProps> = ({project}) => {
  return (
    <div
      key={project.id}
      className="flex flex-row justify-between flex-grow w-full p-2 px-4 bg-white border rounded-lg group text-dark sm:w-max border-dark/10 text-foreground drop-shadow-lg"
    >
      <div className="flex flex-row items-center gap-2">
        <Icon url={project.icon} slug={project.project_slug} />
        <div className="flex flex-col">
          {project.title ? (
            <>
              <Link
                to={`/dashboard/${project.id}`}
                className="text-base font-bold text-blue-500 line-clamp-1"
              >
                {project.title}
              </Link>
              <a
                href={project.domain}
                target="_blank"
                className="flex flex-row items-center gap-1 text-sm underline group/link decoration-blue-800 underline-offset-2 text-dark/60 line-clamp-1"
              >
                {project.project_slug}
                <FaExternalLinkAlt className="size-3" />
              </a>
            </>
          ) : (
            <>
              <h1 className="text-base font-bold text-dark line-clamp-1">{project.project_slug}</h1>
              {project.status === "success" ? (
                <p className="text-sm text-dark/90 line-clamp-1">Waiting for distribution</p>
              ) : (
                <p className="text-sm text-dark/90 line-clamp-1">{project.status}</p>
              )}
            </>
          )}

          <p className="text-sm text-dark/40">created {relativeTime(project.created)}</p>
          <p className="text-sm text-dark/40">updated {relativeTime(project.updated)}</p>
        </div>
      </div>
      <Status status={project.status} />
    </div>
  );
};

const Status = ({status}: {status: ProjectsStatusOptions}) => {
  return (
    <div className="flex items-start justify-center gap-2">
      <div className="size-5">
        {
          {
            queued: <FaRegCircle className="w-full h-auto text-yellow-400" />,
            building: <FaCircleNotch className="w-full h-auto text-yellow-400 animate-spin" />,
            uploading: <IoCloudCircle className="w-6 h-auto text-blue-400 animate-pulse" />,
            distributing: <TbWorldUpload className="w-full h-auto text-blue-400 animate-pulse" />,
            failed: <XCircle className="w-full h-auto text-white bg-red-400 rounded-full" />,
            success: <FaCheckCircle className="w-full h-auto text-green-400" />,
          }[status]
        }
      </div>
    </div>
  );
};

const ProjectSkeletons = ({count}: {count: number}) => {
  const skeletons = new Array(count).fill(null);
  return (
    <>
      {skeletons.map((_, i) => {
        return (
          <div
            key={`project_skeleton_${i}`}
            className="flex justify-center flex-grow w-full h-[100px] p-2 px-4 bg-white rounded-lg animate-pulse sm:w-96 drop-shadow-lg border-dark/10"
          />
        );
      })}
    </>
  );
};

export default Projects;
