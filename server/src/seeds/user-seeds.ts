import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { userName: 'JollyGuru', password: 'password', zipCode: '55412' },
    { userName: 'SunnyScribe', password: 'password', zipCode: '92549' },
    { userName: 'RadiantComet', password: 'password', zipCode: '90210' },
  ], { individualHooks: true });
};
