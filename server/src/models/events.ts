import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';

interface EventAttributes {
    id: number;
    userId: number;
    name: string;
    url: string;
    type: string;
    images: { url: string }[];
    dates: { start: { localDate: string } };
    priceRanges: { min: string; max: string }[];
    info: string;
    venue: { name: string };    
}

interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
    public id!: number;
    public userId!: number;
    public name!: string;
    public url!: string;
    public type!: string;
    public images!: { url: string }[];
    public dates!: { start: { localDate: string } };
    public priceRanges!: { min: string; max: string }[];
    public info!: string;
    public venue!: { name: string };

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function EventFactory(sequelize: Sequelize): typeof Event {
    Event.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            images: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            dates: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            priceRanges: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            info: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            venue: {
                type: DataTypes.JSON,
                allowNull: false,
            },
        },
        {
            tableName: 'events',
            sequelize,
        }
    );

    return Event;
    
}