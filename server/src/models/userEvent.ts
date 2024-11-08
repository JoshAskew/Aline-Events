// import { DataTypes, Sequelize, Model } from "sequelize";
// import { User } from "./user.js";
// import { Event } from "./events.js";

// interface UserEventAttributes {
//     userId: number;
//     eventId: number;
// }

// export class UserEvent extends Model<UserEventAttributes> implements UserEventAttributes {
//     public userId!: number;
//     public eventId!: number;

//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
// }

// export function UserEventFactory(sequelize: Sequelize): typeof UserEvent {
//     UserEvent.init(
//         {
//             userId: {
//                 type: DataTypes.INTEGER,
//                 primaryKey: true,
//                 references: {
//                     model: User,
//                     key: 'id'
//                 }
//             },
//             eventId: {
//                 type: DataTypes.INTEGER,
//                 primaryKey: true,
//                 references: {
//                     model: Event,
//                     key: 'id'
//                 }
//             }
//         },
//         {
//             tableName: 'userEvents',
//             sequelize
//         }
//     );

//     User.belongsToMany(Event, { through: UserEvent });
//     Event.belongsToMany(User, { through: UserEvent });

//     return UserEvent;
// }
  