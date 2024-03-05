import {Collections, ProjectsResponse} from "@/types/pocketbase-types";
import {pb} from "@/utils/pocketbase";
import axios from "axios";
import * as cheerio from "cheerio";
import {create} from "zustand";

interface ProjectStore {
  projects: ProjectsResponse[];
  projectsLoading: boolean;
  setLoadingState: (loading: boolean) => void;
  fetchProjects: () => Promise<void>;
  addProject: (project: ProjectsResponse) => void;
  updateProject: (project: ProjectsResponse) => void;
  deleteProject: (project: ProjectsResponse) => void;
}

export const useProjectStore = create<ProjectStore>()(set => ({
  projects: [],
  projectsLoading: true,

  setLoadingState: (loading: boolean) => {
    set({projectsLoading: loading});
  },

  fetchProjects: async () => {
    set({projectsLoading: true});
    pb.collection(Collections.Projects)
      .getFullList<ProjectsResponse>({
        sort: "-created",
      })
      .then(async projects => {
        for await (const project of projects) {
          try {
            if (project.status === "success") {
              const {icon, title} = await getMetadata(project.domain);

              if (icon) project.icon = icon;
              if (title) project.title = title;
            }
          } catch (error) {
            //
          }
        }
        return projects;
      })
      .then(projects => {
        set({projects});
      })
      .finally(() => set({projectsLoading: false}));
  },

  addProject: project => set(state => ({projects: [project, ...state.projects]})),

  updateProject: async updatedProject => {
    if (updatedProject.status === "success") {
      const {icon, title} = await getMetadata(updatedProject.domain);
      if (icon) updatedProject.icon = updatedProject.domain + icon;
      if (title) updatedProject.title = title;
    }

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

const getMetadata = async (domain: string) => {
  const response = await axios.get(domain);
  const html = response.data;
  const $ = cheerio.load(html);
  const iconLink = $('link[rel="icon"]').attr("href");
  const title = $("title").html();

  return {
    icon: iconLink ? domain + iconLink : null,
    title: title,
  };
};
