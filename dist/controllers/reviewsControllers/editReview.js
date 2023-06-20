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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editReview = void 0;
const myModels = __importStar(require("../../models/index"));
const editReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { new_review_text } = req.body;
    const { review_id } = req.params;
    if (!new_review_text.length)
        return res.send("Review cannot be blank, leave something !");
    const allReviews = yield myModels.Review.findAll({ where: { review_id: review_id } });
    if (!allReviews.length || allReviews.length != 1)
        return res.send("no review found with given data");
    if (allReviews[0].dataValues.author_id != req.session.active_user_id)
        return res.status(401).send("not authorized to edit review !");
    //UPDATE REVIEW
    myModels.Review.update({ review_text: new_review_text }, { where: { review_id: review_id } })
        .then(data => {
        return res.send("OK.");
    }).catch(err => {
        return res.send("error payload set to" + err);
    });
});
exports.editReview = editReview;
