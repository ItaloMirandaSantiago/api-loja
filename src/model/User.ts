import { DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/mysql";



export interface UserInstance extends Model {
    email: string,
    password: string,
}

export const User = sequelize.define<UserInstance>('user', {
    email: {
        primaryKey: true,
        type: DataTypes.TEXT
    },
    password: {
        type: DataTypes.TEXT
    },
}, {
    tableName:"user",
    timestamps: false
})