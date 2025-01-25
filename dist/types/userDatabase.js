"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDatabase = exports.User = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
class UserDatabase {
    constructor() {
        this.db = new sqlite3_1.default.Database('mmo_game.db');
        console.log('Connected to SQLite database');
        this.init();
    }
    async init() {
        this.db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE,
                connection TEXT
            )
        `);
    }
    async AddUser(user) {
        const hasUser = await this.HasUser(user.Name());
        console.log('Adding user:', user.Name(), 'hasUser:', hasUser);
        if (!hasUser && this.IsValidUserName(user.Name())) {
            await this.db.run('INSERT INTO users (name, connection) VALUES (?, ?)', user.Name(), user.Connection());
            return true;
        }
        {
            console.log('Error adding user:', user.Name());
        }
        return false;
    }
    async DeleteUser(p_name) {
        try {
            await this.db.run('DELETE FROM users WHERE name = ?', p_name);
        }
        catch (error) {
            console.error('Error deleting user:', error);
            return false;
        }
    }
    IsValidUserName(p_name) {
        let invalidChars = ` '~!@#$%^&*(){}[]<>=,.?;:`;
        let invalidCharPattern = new RegExp(`[${invalidChars.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}]`);
        // check name doesn't contain invalid characters
        if (invalidCharPattern.test(p_name)) {
            return false;
        }
        // check name length is between 3 and 16
        if (p_name.length < 3 || p_name.length > 16) {
            return false;
        }
        return true;
    }
    async queryDb(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err)
                    reject(err);
                resolve(row);
            });
        });
    }
    // Then you could use it like:
    async HasUser(p_name) {
        try {
            const user = await this.queryDb('SELECT * FROM users WHERE name = ?', [p_name]);
            return user != null;
        }
        catch (error) {
            console.error('Database error:', error);
            return false;
        }
    }
    async Find(p_connection) {
        const user = await this.db.get('SELECT * FROM users WHERE connection = ?', p_connection);
        return user;
    }
}
class User {
    constructor(p_name, p_connection) {
        this.m_name = p_name;
        this.m_connection = p_connection;
    }
    Name() {
        return this.m_name;
    }
    Connection() {
        return this.m_connection.id;
    }
}
exports.User = User;
exports.userDatabase = new UserDatabase();
