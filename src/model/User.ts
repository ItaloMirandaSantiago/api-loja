import { DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/mysql";



export interface UserInstance extends Model {
    email: string,
    password: string,
}

export const User = sequelize.define<UserInstance>('user', {
    email: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    tableName:"user",
    timestamps: false,
})