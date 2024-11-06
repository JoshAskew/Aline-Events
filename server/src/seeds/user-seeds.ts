import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JollyGuru', password: 'password', zipCode: '55412' },
    { username: 'SunnyScribe', password: 'password', zipCode: '92549' },
    { username: 'RadiantComet', password: 'password', zipCode: '90210' },
  ], { individualHooks: true });
};
