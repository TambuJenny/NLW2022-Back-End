"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/ads', function (request, response) {
    return response.json([
        { id: '1', name: 'Flame' },
        { id: '2', name: 'Tambu' },
        { id: '3', name: 'Jenny' },
        { id: '4', name: 'Zoombii' }
    ]);
});
app.listen(3333);
