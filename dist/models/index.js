"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = exports.Hike = exports.Trail = exports.Difficulty = exports.Post = exports.User = void 0;
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
    }
}, {
    tableName: "Users",
    timestamps: true
});
//Creating an instance of Post from Posts entity
exports.Post = config_1.db_handler.define("Post", {
    post_id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    post_title: {
        type: sequelize_1.DataTypes.STRING(1024),
        allowNull: false
    },
    post_body: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "Posts",
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
    }
}, {
    tableName: "Trails",
    timestamps: false
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
//Creating an instance of Like from Likes entity
exports.Like = config_1.db_handler.define("Like", {
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    post_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
}, {
    tableName: "Likes",
    timestamps: false
});
