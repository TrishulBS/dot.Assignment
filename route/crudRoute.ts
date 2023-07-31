import express, { Router } from "express";
import {
    createHandler,
    getHandler,
    updateHandler,
    deleteHandler
} from "../controller/crudCtrl";

const router: Router = express.Router();

router.post("/:collection/", createHandler);
router.get("/:collection/:id", getHandler);
router.put("/:collection/:id", updateHandler);
router.delete("/:collection/:id", deleteHandler);

export default router;

