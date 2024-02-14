import {FC, useState} from 'react';
import {useProjectStore} from '../store/ProjectStore';
import {ProjectsResponse} from '../types/pocketbase-types';

import {
  CheckCircle2Icon,
  CircleDotDashedIcon,
  CircleDotIcon,
  ExternalLinkIcon,
  HardDriveUploadIcon,
  XCircleIcon,
  XSquareIcon,
} from 'lucide-react';
import {IoSparkles} from 'react-icons/io5';
import {Button} from '../components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../components/ui/drawer';
import {formatTime} from '../lib/utils';

const Dashboard = () => {
  const {projects, projectsLoading} = useProjectStore();

  const [logs, setLogs] = useState<string[] | undefined>();

  return (
    <>
      <div className="w-full h-[100dvh] px-8 py-8 flex justify-center">
        <Drawer>
          <DrawerTrigger className="w-full max-w-[500px]">
            <div className="px-8 gap-2 w-full flex text-white  justify-center items-center font-[500] py-4 text-sm border rounded-md shadow-lg  bg-gradient-to-br border-white/30 from-accent_1 to-accent_2">
              <IoSparkles className="w-6 h-6 text-white" />
              <div>Deploy an App</div>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        {projectsLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {<Logs logs={logs} setLogs={setLogs} />}

            <div className="flex pt-2 max-h-[70dvh] pb-32 flex-wrap items-center gap-2">
              {projects.map(project => (
                <ProjectCard project={project} key={project.id} setLogs={setLogs} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

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

type LogsProps = {
  logs: string[] | undefined;
  setLogs: React.Dispatch<React.SetStateAction<string[] | undefined>>;
};
const Logs: FC<LogsProps> = ({logs, setLogs}) => {
  return (
    <>
      {logs && (
        <div
          className={
            'absolute z-[999] flex flex-col justify-center items-center backdrop-blur-sm bg-background-400/80 w-full h-full transition-all'
          }
        >
          <button
            className="absolute top-8 right-8 -translate-x-[100%]"
            onClick={() => setLogs(undefined)}
          >
            <XSquareIcon></XSquareIcon>
          </button>
          <div className="h-[80dvh] p-4 gap-0 rounded-md bg-foreground w-max max-w-[600px] overflow-y-scroll flex flex-col">
            {logs.map(log => {
              const timestamp = new Date(parseInt(log.split(':')[0])).toISOString();
              const message = log.replace(log.split(':')[0], '').slice(1);

              return (
                <div className="flex flex-row items-start justify-start gap-1">
                  <div className="text-base text-background/50 whitespace-nowrap">
                    [{formatTime(timestamp, true, true)}]
                  </div>
                  <div className="text-lg break-words text-background">{message}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
