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
exports.postSignup = void 0;
const myModels = __importStar(require("../../models/index"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const postSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //get user credentials from request's body
    const { user_nickname, user_email, user_password } = req.body;
    if (!user_nickname.length || !user_email.length || !user_password.length) {
        req.flash("danger", "credentials can not be blank!");
        return res.redirect("/users/signup");
    }
    //checking wether user already exists
    const searchedUser = yield myModels.User.findAll({ where: { user_email: user_email } });
    if (searchedUser && searchedUser.length == 1) {
        req.flash("danger", "Something went wrong. Please log in to proceed !.");
        return res.redirect("/users/signup");
    }
    //generate a salt & hash the password
    const salt = bcryptjs_1.default.genSaltSync(12);
    const hash = bcryptjs_1.default.hashSync(user_password, salt);
    const newUser = myModels.User.create({ user_nickname: user_nickname, user_email: user_email, user_password: hash });
    newUser.then(data => {
        // create session for the current user & send back a cookie 
        req.session.active_user_email = user_email;
        req.session.active_user_id = data.dataValues.user_id;
        req.session.active_user_nickname = data.dataValues.user_nickname;
        req.flash("success", "Successfuly signed in, welcome to GOhiking!");
        return res.redirect("/");
    }).catch(err => {
        return next(err);
    });
});
exports.postSignup = postSignup;
