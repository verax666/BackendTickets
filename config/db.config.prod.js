module.exports = {
    HOST: "ls-5e57a03e9ca4f5a5491675b69ec870e30d87b402.cebmet6zjys4.us-east-1.rds.amazonaws.com",
    USER: "checkmat",
    PASSWORD: "+Checkmat2020",
    DB: "checkmat3",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };