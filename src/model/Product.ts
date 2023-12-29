import {Model, DataTypes} from "sequelize"
import {sequelize} from "../instances/mysql"

export interface ProdutosInstance extends Model {
    id:number,
    title: string,
    description: string,
    unit: number,
    price: number,
    productionprice: number,
    discount: string
}

export const Produtos = sequelize.define<ProdutosInstance>('produtos', {
    id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
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
    }}, {
        tableName: 'produtos',
        timestamps: false
    }
)