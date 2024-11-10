import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';

interface EventAttributes {
    id: number;
    userId: number;
    name: string;
    url: string;
    imageUrl: { url: string }[];
    date: string;
    venue: { name: string };    
}

interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
    public id!: number;
    public userId!: number;
    public name!: string;
    public url!: string;
    public imageUrl!: { url: string }[];
    public date!: string;
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
            imageUrl: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            date: {
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