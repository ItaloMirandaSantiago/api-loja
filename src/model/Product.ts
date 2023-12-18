import {Model, DataTypes} from "sequelize"
import {sequelize} from "../instances/mysql"

export interface ProdutosInstance extends Model {
    id:number,
    title: string,
    description: string,
    unit: number,
    preco: number,
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
        allowNull: true
    },
    price: {
        type: DataTypes.STRING
    },
    discount: {
        type: DataTypes.STRING
    }}, {
        tableName: 'produtos',
        timestamps: false
    }
)