"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDatabase = exports.User = void 0;
class UserDatabase {
    constructor() {
        this.m_users = new Array();
    }
    AddUser(user) {
        if (this.HasUser(user.Name()) && this.IsValidUserName(user.Name())) {
            this.m_users.push(user);
            return true;
        }
        return false;
    }
    IsValidUserName(p_name) {
        let invalidChars = ` '~!@#$%^&*(){}[]<>=,.?;:`;
        let invalidCharPattern = new RegExp(`[${invalidChars.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}]`);
        // check name doesn't contain invalid characters
        if (!invalidCharPattern.test(p_name)) {
            return false;
        }
        // check name length is between 3 and 16
        if (p_name.length > 16 && p_name.length < 3)
            return false;
        return true;
    }
    DeleteUser(p_connection) {
        this.m_users.find((u) => {
            u.Connection() === p_connection;
        });
    }
    HasUser(p_name) {
        return (this.m_users.find((u) => {
            u.Name() === p_name;
        }));
    }
    Find(p_connection) {
        return (this.m_users.find((u) => {
            u.Connection() === p_connection;
        }));
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
        return this.m_connection;
    }
}
exports.User = User;
exports.userDatabase = new UserDatabase();
