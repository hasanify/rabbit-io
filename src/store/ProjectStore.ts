import {create} from 'zustand';
import {pb} from '../helpers/db';
import {Collections, ProjectsResponse} from '../types/pocketbase-types';

interface ProjectStore {
  projects: ProjectsResponse[];
  projectsLoading: boolean;
  fetchProjects: () => Promise<void>;
  addProject: (project: ProjectsResponse) => void;
  updateProject: (project: ProjectsResponse) => void;
  deleteProject: (project: ProjectsResponse) => void;
}

export const useProjectStore = create<ProjectStore>()(set => ({
  projects: [],
  projectsLoading: true,

  fetchProjects: async () => {
    set({projectsLoading: true});
    pb.collection(Collections.Projects)
      .getFullList<ProjectsResponse>({
        sort: '-created',
      })
      .then(projects => {
        set({projects});
      })
      .finally(() => {
        set({projectsLoading: false});
      });
  },

  addProject: project => set(state => ({projects: [project, ...state.projects]})),

  updateProject: updatedProject => {
    set(state => ({
      projects: state.projects.map(event =>
        event.id === updatedProject.id ? {...event, ...updatedProject} : event,
      ),
    }));
  },
  deleteProject: deletedProject => {
    set(state => ({
      projects: state.projects.filter(project => project.id !== deletedProject.id),
    }));
  },
}));
