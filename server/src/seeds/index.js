"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_seeds_js_1 = require("./user-seeds.js");
// import { seedEvents } from './ticket-seeds.js';
const index_js_1 = require("../models/index.js");
const seedAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield index_js_1.sequelize.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');
        yield (0, user_seeds_js_1.seedUsers)();
        console.log('\n----- USERS SEEDED -----\n');
        // await seedEvents();
        // console.log('\n----- EVENTS SEEDED -----\n');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
});
seedAll();
