import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { coursesController } from "./controllers/coursesController";

const router = express.Router();

router.get("/categories", categoriesController.index);
router.get("/categories/:id", categoriesController.show);
//rotas com variavel dinamica deve sempre ficar abaixo das que não a possuem
router.get("/courses/featured", coursesController.featured);
router.get("/courses/newest", coursesController.newest);
router.get("/courses/search", coursesController.search);
router.get("/courses/:id", coursesController.show);

export { router };
