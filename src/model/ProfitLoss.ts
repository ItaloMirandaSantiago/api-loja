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
        unique: true,  // Garante que a data seja única
        defaultValue: sequelize.literal('CURRENT_DATE'),  // Apenas data, sem hora
        type: DataTypes.DATEONLY  // Utiliza o tipo DATEONLY para armazenar apenas data
    },
    result:{
        type: DataTypes.INTEGER
    },
    email:{
        type: DataTypes.STRING
    }}, {
        tableName:'profitproducts',
        timestamps: false
    })