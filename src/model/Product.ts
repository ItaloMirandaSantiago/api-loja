import {Model, DataTypes} from "sequelize"
import {sequelize} from "../instances/mysql"
import { User } from "./User"

export interface ProdutosInstance extends Model {
    id:number,
    title: string,
    description: string,
    unit: number,
    price: number,
    productionprice: number,
    discount: string,
    sold: number
}

export const Produtos = sequelize.define<ProdutosInstance>('produtos', {
    id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    email : {
        unique: true,
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            key: 'email',
            model: User
        }
    },
    title : {
        unique: true,
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    unit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productionprice : {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    price: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    newprice: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    discount: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    sold:{
        type: DataTypes.INTEGER,
        allowNull: true
    }}, {
        tableName: 'produtos',
        timestamps: false
    }
)