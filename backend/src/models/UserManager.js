const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findAll() {
    return this.database.query(
      `select id, name, firstname, mail, password from  ${this.table}`
    );
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (name, firstname, mail, password) values (?,?,?,?)`,
      [user.name, user.firstname, user.mail, user.password]
    );
  }

  updateOne(user) {
    return this.database.query(`update ${this.table} set ? where id = ?`, [
      user,
      user.id,
    ]);
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  findByMail(mail) {
    return this.database.query(
      `select id, name, firstname, password from ${this.table} where mail = ? `,
      [mail]
    );
  }
}

module.exports = UserManager;
