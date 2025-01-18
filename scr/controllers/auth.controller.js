const db = require("../models");
const config = require("../config/config");
const User = db.User;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database

  console.log(req.body);

  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).send({ message: "All fields are required." });
  }

  req.body.password = bcrypt.hashSync(req.body.password, 8);
  User.create(req.body)
    .then((user) => {
      res.send({ data: user, message: "User registered successfully!" });

      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          //   user.setRoles(roles).then(() => {
          //     res.send({ message: "User registered successfully!" });
          //   });
        });
      } else {
        // user role = 1
        // user.setRoles([1]).then(() => {
        //   res.send({ message: "User registered successfully!" });
        // });
      }
    })
    .catch((err) => {
      console.log({ err });
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      // const token = jwt.sign({ id: user.id }, config.secret, {
      //   algorithm: "HS256",
      //   allowInsecureKeySizes: true,
      //   expiresIn: 86400, // 24 hours
      // });
      let token;
      // if (noExpiry) {
      //   token = jwt.sign(payload, process.env.JWT_SECRET, {});
      // } else {
      token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });
      // }

      var authorities = [];
      //   user.getRoles().then((roles) => {
      // for (let i = 0; i < roles.length; i++) {
      //   authorities.push("ROLE_" + roles[i].name.toUpperCase());
      // }
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
      //   });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
