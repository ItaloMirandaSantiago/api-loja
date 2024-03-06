import {Model, DataTypes} from "sequelize"
import {sequelize} from "../instances/mysql"

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
        type: DataTypes.TEXT
    },
    title : {
        unique: true,
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    unit: {
        type: DataTypes.INTEGER,
    },
    productionprice : {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.STRING
    },
    newprice: {
        type: DataTypes.STRING,
        allowNull: true
    },
    discount: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sold:{
        type: DataTypes.NUMBER,
        allowNull: true
    }}, {
        tableName: 'produtos',
        timestamps: false
    }
)