exports.prodpre = {
  HOST: "ls-5e57a03e9ca4f5a5491675b69ec870e30d87b402.cebmet6zjys4.us-east-1.rds.amazonaws.com",
  USER: "practice2",
  PASSWORD: "12345",
  DB: "practice1",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
exports.prodalta = {
  HOST: "ls-5e57a03e9ca4f5a5491675b69ec870e30d87b402.cebmet6zjys4.us-east-1.rds.amazonaws.com",
  USER: "adn",
  PASSWORD: "+ADN981126",
  DB: "concremovil",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};


exports.localpre = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "practice1",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

exports.localalta = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "concremovil",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

