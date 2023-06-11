
import { Sequelize, DataTypes } from "sequelize";
import { db_handler } from "../database/config";

//Creating an instance of User from Users entity
export const User = db_handler.define("User", {
    user_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true

    },
    user_nickname: {
        type: DataTypes.STRING(512),
        allowNull: false
    },
    user_email: {
        type: DataTypes.STRING(512),
        allowNull: false

    }

},
    {
        tableName: "Users",
        timestamps: true
    });


//Creating an instance of Post from Posts entity
export const Post = db_handler.define("Post", {
    post_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    post_title: {
        type: DataTypes.STRING(1024),
        allowNull: false
    },
    post_body: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }


},
    {
        tableName: "Posts",
        timestamps: true
    });


//Creating an instance of Difficulty from Difficulties entity
export const Difficulty = db_handler.define("Difficulty", {

    difficulty_level: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    difficulty_duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    difficulty_min_length: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    difficulty_height_difference: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

},
    {
        tableName: "Difficulties",
        timestamps: false
    });




//Creating an instance of Trail from Trails entity
export const Trail = db_handler.define("Trail", {
    trail_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    trail_name: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    trail_location: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    difficulty_level: {
        type: DataTypes.STRING(128),
        allowNull: false
    }
},
    {
        tableName: "Trails",
        timestamps: false
    });

//Creating an instance of Hike from Hikes entity
export const Hike = db_handler.define("Hike", {

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    trail_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true
    }

},
    {
        tableName: "Hikes",
        timestamps: false
    });

//Creating an instance of Like from Likes entity
export const Like = db_handler.define("Like", {

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true
    }
},
    {
        tableName: "Likes",
        timestamps: false
    })


