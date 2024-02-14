import {RecordSubscription} from 'pocketbase';
import {pb} from '../helpers/db';
import {useProjectStore} from '../store/ProjectStore';
import {Collections, ProjectsResponse} from '../types/pocketbase-types';

const usePocketbase = () => {
  const {addProject, fetchProjects, updateProject, deleteProject} = useProjectStore();
  const Pocketbase = {
    fetch: async () => {
      fetchProjects();
    },
    subscribe: async () => {
      pb.collection(Collections.Projects).subscribe(
        '*',
        function (e: RecordSubscription<ProjectsResponse>) {
          const action = e.action;
          if (action === 'create') addProject(e.record);
          else if (action === 'update') updateProject(e.record);
          else if (action === 'delete') deleteProject(e.record);
        },
      );
    },
    unsubscribe: async () => {
      pb.collection(Collections.Projects).unsubscribe();
    },
  };

  return Pocketbase;
};

export default usePocketbase;
