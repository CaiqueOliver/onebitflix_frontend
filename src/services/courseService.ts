import api from "./api";

export type CourseType = {
  id: number;
  name: string;
  thumbnailUrl: string;
  synopsis: string;
  episodes?: EpisodeType[];
};

export type EpisodeType = {
  id: number;
  name: string;
  synopsis: string;
  order: number;
  videoUrl: string;
  secondsLong: number;
};

const courseService = {
  getNewestCourse: async () => {
    const res = await api.get("/course/newest").catch((error) => {
      console.log(error.response.data.message);
      return error.response;
    });
    return res;
  },
};

export default courseService;
