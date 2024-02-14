import {formatTime} from '@/lib/utils';
import {ProjectsResponse} from '@/types/pocketbase-types';
import {
  CheckCircle2Icon,
  CircleDotDashedIcon,
  CircleDotIcon,
  ExternalLinkIcon,
  HardDriveUploadIcon,
  XCircleIcon,
} from 'lucide-react';
import {FC} from 'react';

type ProjectCardProps = {
  project: ProjectsResponse;
  setLogs: React.Dispatch<React.SetStateAction<string[] | undefined>>;
};

const ProjectCard: FC<ProjectCardProps> = ({project, setLogs}) => {
  return (
    <div
      key={project.id}
      className={`flex max-w-[400px] px-4 flex-col border border-foreground/10 ease-in-out transition-all duration-75 bg-neutral text-foreground justify-center flex-grow p-2 rounded-lg drop-shadow-lg`}
    >
      <div className="absolute mb-4 top-2 right-2 has-tooltip">
        {
          <>
            <span className="px-8 py-1 font-bold capitalize -translate-x-[100%] rounded shadow-lg z-[99] tooltip -left-1 bg-foreground text-background">
              {project.status}
            </span>
            {project.status === 'queued' && (
              <CircleDotIcon className="rounded-full text-amber-500 bg-amber-500"></CircleDotIcon>
            )}
            {project.status === 'building' && (
              <CircleDotDashedIcon className="text-amber-500 animate-pulse"></CircleDotDashedIcon>
            )}
            {project.status === 'uploading' && (
              <HardDriveUploadIcon className="text-blue-500 animate-bounce"></HardDriveUploadIcon>
            )}
            {project.status === 'success' && (
              <CheckCircle2Icon className="text-green-400"></CheckCircle2Icon>
            )}
            {project.status === 'failed' && <XCircleIcon className="text-red-500"></XCircleIcon>}
          </>
        }
      </div>
      <div className="card-title">Project Name</div>
      <div className="card-value">
        <a
          className="flex items-center gap-2 w-max"
          target="_blank"
          rel="noreferrer"
          href={`http://${project.project_slug}.localhost:8000`}
        >
          <span className="text-blue-200 ">{project.project_slug}</span>
          <ExternalLinkIcon className="w-4 " />
        </a>
      </div>
      <div className="card-title">Github URL</div>
      <div className="card-value">{project.git_url}</div>
      <div className="card-title">Created At</div>
      <div className="card-value">{formatTime(project.created)}</div>
      <div className="card-title">Last Upated</div>
      <div className="card-value">{formatTime(project.updated)}</div>
      <button
        onClick={() => setLogs(project.logs)}
        className="px-2 py-1 mt-2 rounded-md shadow-sm text-background w-max shadow-black bg-foreground/90"
      >
        Show Logs
      </button>
    </div>
  );
};

export default ProjectCard;
