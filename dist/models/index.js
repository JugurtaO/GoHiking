"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hike = exports.Review = exports.Trail = exports.Difficulty = exports.User = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
//Creating an instance of User from Users entity
exports.User = config_1.db_handler.define("User", {
    user_id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    user_nickname: {
        type: sequelize_1.DataTypes.STRING(512),
        allowNull: false
    },
    user_email: {
        type: sequelize_1.DataTypes.STRING(512),
        allowNull: false
    },
    user_password: {
        type: sequelize_1.DataTypes.STRING(64),
        allowNull: false
    }
}, {
    tableName: "Users",
    timestamps: true
});
//Creating an instance of Difficulty from Difficulties entity
exports.Difficulty = config_1.db_handler.define("Difficulty", {
    difficulty_level: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    difficulty_duration: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    difficulty_min_length: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    difficulty_height_difference: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "Difficulties",
    timestamps: false
});
//Creating an instance of Trail from Trails entity
exports.Trail = config_1.db_handler.define("Trail", {
    trail_id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    trail_name: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    trail_location: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    difficulty_level: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    trail_image: {
        type: sequelize_1.DataTypes.STRING(1024),
        allowNull: false
    },
    author_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: "Trails",
    timestamps: false
});
//Creating an instance of review from Reviews entity
exports.Review = config_1.db_handler.define("Review", {
    review_id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    review_text: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    author_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    trail_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: "Reviews",
    timestamps: true
});
//Creating an instance of Hike from Hikes entity
exports.Hike = config_1.db_handler.define("Hike", {
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    trail_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
}, {
    tableName: "Hikes",
    timestamps: false
});
