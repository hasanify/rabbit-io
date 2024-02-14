import {useProjectStore} from '@/store/ProjectStore';
import {useState} from 'react';

import AddProject from './AddProject';
import Logs from './Logs';
import ProjectCard from './ProjectCard';

const Dashboard = () => {
  const {projects, projectsLoading} = useProjectStore();
  const [logs, setLogs] = useState<string[] | undefined>();

  return (
    <>
      <div className="w-full h-[100dvh] px-8 py-8 flex justify-center">
        <AddProject />
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

export default Dashboard;
