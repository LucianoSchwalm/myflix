import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { coursesController } from "./controllers/coursesController";
import { episodesController } from "./controllers/episodesController";
import { authController } from "./controllers/authController";
import { ensureAuth, ensureAuthByQuery } from "./middlewares/auth";
import { favoriteController } from "./controllers/favoriteController";
import { likesController } from "./controllers/likeController";
import { userController } from "./controllers/userController";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/categories", ensureAuth, categoriesController.index);
router.get("/categories/:id", ensureAuth, categoriesController.show);
//rotas com variavel dinamica deve sempre ficar abaixo das que não a possuem
router.get("/courses/featured", ensureAuth, coursesController.featured);
router.get("/courses/newest", coursesController.newest);
router.get("/courses/popular", ensureAuth, coursesController.popular);
router.get("/courses/search", ensureAuth, coursesController.search);
router.get("/courses/:id", ensureAuth, coursesController.show);

router.get("/episodes/stream", ensureAuthByQuery, episodesController.stream);
router.get(
  "/episodes/:id/watchTime",
  ensureAuthByQuery,
  episodesController.getWatchTime
);
router.post(
  "/episodes/:id/watchTime",
  ensureAuthByQuery,
  episodesController.setWatchTime
);

router.get("/favorites", ensureAuth, favoriteController.index);
router.post("/favorites", ensureAuth, favoriteController.save);
router.delete("/favorites/:id", ensureAuth, favoriteController.delete);

router.post("/likes", ensureAuth, likesController.save);
router.delete("/likes/:id", ensureAuth, likesController.delete);

router.get("/users/current", ensureAuth, userController.show);
router.get("/users/current/watching", ensureAuth, userController.watching);

export { router };
