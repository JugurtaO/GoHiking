"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trailControllers = __importStar(require("../../controllers/trailsControllers/index"));
const reviewControllers = __importStar(require("../../controllers/reviewsControllers/index"));
const trailRouter = express_1.default.Router();
trailRouter.get("/", trailControllers.allTrails);
trailRouter.get("/new", trailControllers.renderCreateTrail);
trailRouter.get("/:trail_id", trailControllers.viewTrail);
trailRouter.get("/:trail_id/reviews", reviewControllers.allReviews);
trailRouter.post("/add", trailControllers.addTrail);
trailRouter.post("/:trail_id/delete", trailControllers.deleteTrail);
trailRouter.post("/:trail_id/reviews/add", reviewControllers.addReview);
trailRouter.post("/:trail_id/reviews/:review_id/edit", reviewControllers.editReview);
trailRouter.post("/:trail_id/reviews/:review_id/delete", reviewControllers.deleteReview);
exports.default = trailRouter;
