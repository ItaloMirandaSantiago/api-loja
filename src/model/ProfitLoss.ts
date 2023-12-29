import { DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface ProfitLossInstance extends Model {
    id: number,
    data: Date,
    result: number
}

export const ProfitLoss = sequelize.define<ProfitLossInstance>('profitproducts', {
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
    result:{
        type: DataTypes.INTEGER
    }}, {
        tableName:'profitproducts',
        timestamps: false
    })