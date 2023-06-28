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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSignout = void 0;
const myModels = __importStar(require("../../models/index"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const postSignout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_email, user_password } = req.body;
    const user_id = req.session.active_user_id;
    console.log(">>>>>>>>>>>>>> ", user_id);
    if (!user_email.length || !user_password.length)
        return res.send("credentials can not be blank!");
    const all_Users_With_Given_Email = yield myModels.User.findAll({ where: { user_email: user_email } });
    if (!all_Users_With_Given_Email || all_Users_With_Given_Email.length != 1) {
        return res.send("Email or Password incorrect, try again !");
    }
    const safetoDelete = bcryptjs_1.default.compareSync(user_password, all_Users_With_Given_Email[0].dataValues.user_password);
    if (!safetoDelete)
        res.send("Email or Password incorrect, try again !");
    //now we can delelte safely all user activities before deleting it itself
    //delete user hikes and delete created user trails concurrently as we don't need to await them ( each one doesn't depend on the other)
    Promise.all([
        myModels.Hike.destroy({ where: { user_id: user_id } }),
        myModels.Trail.destroy({ where: { author_id: user_id } }),
        myModels.Review.destroy({ where: { author_id: user_id } })
    ]).then(data => {
        //now delete user
        myModels.User.destroy({ where: { user_email: user_email } });
        //set user session flags to null  <--> session killed
        req.session.active_user_email = null;
        req.session.active_user_id = null;
        req.session.active_user_nickname = null;
        // res.send("Successfuly signed  out. Good Bye")
        res.redirect("/users/signup");
    })
        .catch(err => {
        return res.send("error payload set to" + err);
    });
});
exports.postSignout = postSignout;
