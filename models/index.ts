
import { Model,DataTypes } from "sequelize";
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
        allowNull: false,
    },
    user_email: {
        type: DataTypes.STRING(512),
        allowNull: false

    },
    user_password:{
        type:DataTypes.STRING(64),
        allowNull:false
    } 

},
    {
        tableName: "Users",
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
    },
    trail_image:{
        type: DataTypes.STRING(1024),
        allowNull: false
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    trail_longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    trail_latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
},
    {
        tableName: "Trails",
        timestamps: false
    });



    //Creating an instance of review from Reviews entity
    export const Review = db_handler.define("Review", {
        review_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        review_text: {
            type: DataTypes.STRING(16000),
            allowNull: false
        },
        review_rating:{
            type: DataTypes.INTEGER,
            allowNull:false

        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        trail_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        
    },
        {
            tableName: "Reviews",
            timestamps: true
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


//////////////////////////////:::Associating models 

User.hasMany(Trail,{foreignKey:'author_id'});
Trail.belongsTo(User,{foreignKey:'author_id'});

Trail.hasMany(Review,{foreignKey:'author_id'});

Review.belongsTo(Trail,{foreignKey:'author_id'});
Review.belongsTo(User,{foreignKey:'author_id'});
