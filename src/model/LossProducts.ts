import { DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface ProfitLossInstance extends Model {
    id: number,
    data: Date,
    title: string,
    lossproduct: number,
    loss: number
}

export const LossProductDB = sequelize.define<ProfitLossInstance>('lossproduct', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    data: {
        unique: true,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE
    },
    title:{
        type: DataTypes.STRING
    },
    lossproduct: {
        type: DataTypes.NUMBER
    },
    loss: {
        type: DataTypes.NUMBER
    }}, {
        tableName:'lossproduct',
        timestamps: false
    })