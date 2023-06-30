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
exports.postLogin = void 0;
const myModels = __importStar(require("../../models/index"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.active_user_email) {
        req.flash("danger", "Already logged in .");
        return res.redirect("/home");
    }
    const { user_email, user_password } = req.body;
    if (!user_email.length || !user_password.length) {
        req.flash("danger", "credentials can not be blank!");
        return res.redirect("/users/login");
    }
    const userInDB = yield myModels.User.findAll({ where: { user_email: user_email }, attributes: ['user_password', 'user_id', 'user_nickname'] });
    if (!userInDB || userInDB.length != 1) {
        req.flash("danger", "Email or Password incorrect, try again!");
        return res.redirect("/users/login");
    }
    // check if the typed password is equal to the hashed database password.
    const is_password_correct = bcryptjs_1.default.compareSync(user_password, userInDB[0].dataValues.user_password);
    if (!is_password_correct) {
        req.flash("danger", "Email or Password incorrect, try again!");
        return res.redirect("/users/login");
    }
    // create session for the current user & send back a cookie 
    req.session.active_user_email = user_email;
    req.session.active_user_id = userInDB[0].dataValues.user_id;
    req.session.active_user_nickname = userInDB[0].dataValues.user_nickname;
    req.flash("success", "Successfuly logged in.");
    return res.redirect("/trails");
});
exports.postLogin = postLogin;
