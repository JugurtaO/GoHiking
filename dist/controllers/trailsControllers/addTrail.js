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
exports.addTrail = void 0;
const myModels = __importStar(require("../../models/index"));
const addTrail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { trail_name, trail_location, difficulty_level, trail_image } = req.body;
    const author_id = req.session.active_user_id;
    console.log(">>>>>>>>>>>> ", trail_name, trail_location, trail_image);
    if (!trail_name.length || !trail_location.length || !difficulty_level.length || !trail_image.length)
        return res.send("Trail characteristics cannot be blank!!");
    //check wether the wanted trail doesn't not already exist -- if not create new trail 
    const existedTrails = yield myModels.Trail.findAll({ where: { trail_name: trail_name } });
    if (existedTrails.length)
        return res.send("Trail with given name already exists! ");
    // now we can create new trail 
    //no need to await the operation the user cannot see the effect behind the scenes
    const newTrail = myModels.Trail.create({ trail_name: trail_name, trail_location: trail_location, difficulty_level: difficulty_level, trail_image: trail_image, author_id: author_id })
        .then(data => {
        return res.send("OK.");
    }).catch(err => {
        res.send("error set to" + err);
    });
});
exports.addTrail = addTrail;
