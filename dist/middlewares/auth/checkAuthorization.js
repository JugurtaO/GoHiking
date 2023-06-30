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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthorizationForReview = exports.checkAuthorizationForTrail = void 0;
const myModels = __importStar(require("../../models/index"));
const checkAuthorizationForTrail = (req, res, next) => {
    var _a;
    const { trail_id } = req.params;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.active_user_email)) {
        req.flash("danger", "Please log in to proceed.");
        return res.redirect("/users/login");
    }
    const trail = myModels.Trail.findOne({ where: { trail_id: trail_id } });
    trail.then(data => {
        if (req.session.active_user_id == data.dataValues.author_id) {
            return next();
        }
        else {
            req.flash("danger", "Not authorized!");
            return res.status(401).redirect(`/trails/${trail_id}`);
        }
    }).catch(err => {
        res.send("Error payload set to" + err);
    });
};
exports.checkAuthorizationForTrail = checkAuthorizationForTrail;
const checkAuthorizationForReview = (req, res, next) => {
    var _a;
    const { review_id, trail_id } = req.params;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.active_user_email)) {
        req.flash("danger", "Please log in to proceed.");
        return res.redirect("/users/login");
    }
    const review = myModels.Review.findOne({ where: { review_id: review_id } });
    review.then(data => {
        if (req.session.active_user_id == data.dataValues.author_id) {
            return next();
        }
        else {
            req.flash("danger", "Not authorized!");
            return res.status(401).redirect(`/trails/${trail_id}`);
        }
    }).catch(err => {
        res.send("Error payload set to" + err);
    });
};
exports.checkAuthorizationForReview = checkAuthorizationForReview;
