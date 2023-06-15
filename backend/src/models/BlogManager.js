const AbstractManager = require("./AbstractManager");

class BlogManager extends AbstractManager {
  constructor() {
    super({ table: "post" });
  }

  insert(post) {
    return this.database.query(
      `insert into ${this.table} (name, movies_details, user_id) values (?,?,?)`,
      [post.name, post.movies_details, post.user_id]
    );
  }

  findAll() {
    return this.database.query(
      `select id, name, movies_details, user_id from  ${this.table}`
    );
  }
}

module.exports = BlogManager;
