import VideoRepository from "../repositories/video.js";

const VideoService = {
  getAllVideos: async (page, searchQuery) => {
    const videosPerPage = 12;
    const skip = (page - 1) * videosPerPage;

    let videos = await VideoRepository.getAllVideos();

    if (searchQuery) {
      videos = videos.filter((video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const totalVideos = videos.length;
    const paginatedVideos = videos.slice(skip, skip + videosPerPage);
    const returnVideos = paginatedVideos.map((video) => {
      return {
        id: video._id,
        youtube_url: video.youtube_url,
        thumbnail_url: video.thumbnail_url,
        title: video.title,
        views: video.views,
      };
    });
    return {
      data: returnVideos,
      currentPage: page,
      totalPages: Math.ceil(totalVideos / videosPerPage),
    };
  },
  getVideo: async (id) => {
    const data = await VideoRepository.getVideo(id);
    const returnVideo = {
      id: data.video._id,
      youtube_url: data.video.youtube_url,
      thumbnail_url: data.video.thumbnail_url,
      title: data.video.title,
      views: data.video.views,
      comments: data.comments,
      products: data.products,
    };
    return returnVideo;
  },
  createVideo: async (video) => {
    return await VideoRepository.createVideo(video);
  },
};

export default VideoService;
