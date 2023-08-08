import VideoService from "../services/video.js";
import CommentService from "../services/comment.js";
import ProductService from "../services/product.js";

const VideoController = {
  //NOTE - Videos
  getAllVideos: async (req, res) => {
    try {
      const page = parseInt(req.query.page || 1, 10);
      const videos = await VideoService.getAllVideos(page);
      res.json(videos);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error getting videos");
    }
  },
  getVideo: async (req, res) => {
    const videoId = req.params.id;
    try {
      const video = await VideoService.getVideo(videoId);
      res.json(video);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error getting video details");
    }
  },
  createVideo: async (req, res) => {
    const video = req.body;
    const newVideo = await VideoService.createVideo(video);
    res.json(newVideo);
  },
  //NOTE - Comments
  getAllComments: async (req, res) => {
    const videoId = req.params.id;
    try {
      const comments = await CommentService.getAllComments(videoId);
      res.json(comments);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error getting comments");
    }
  },
  //NOTE - Products
  getAllProducts: async (req, res) => {
    const videoId = req.params.id;
    try {
      const products = await ProductService.getAllProducts(videoId);
      res.json(products);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error getting products");
    }
  },
};

export default VideoController;
