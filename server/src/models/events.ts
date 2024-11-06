import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface EventAttributes {
    id: number;
    name: string;
    url: string;
    type: string;
    images: string;
    dates: string;
    priceRanges: string;
    info: string;
    venue: string;    
}

interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
    public id!: number;
    public name!: string;
    public url!: string;
    public type!: string;
    public images!: string;
    public dates!: string;
    public priceRanges!: string;
    public info!: string;
    public venue!: string;

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
                type: DataTypes.STRING,
                allowNull: false,
            },
            dates: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            priceRanges: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            info: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            venue: {
                type: DataTypes.STRING,
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