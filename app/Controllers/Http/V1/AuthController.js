"use strict";

const User = use("App/Models/User");
const { validate } = use("Validator");
const Helpers = use("Helpers");
const fs = require("fs");
class AuthController {
  async register({ request, auth, response }) {
    const rules = {
      username: "required|string",
      email: "required|email",
      password: "required|string",
      confirm_password: "required|string"
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return response
        .status(400)
        .json({ status: 0, message: validation.messages() });
    }

    const username = request.input("username");
    const email = request.input("email");
    const password = request.input("password");
    const confirm_password = request.input("confirm_password");
    if (password !== confirm_password)
      return response
        .status(400)
        .json({ status: 0, message: "password not match" });

    let user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    user.picture = "no_avatar.jpg";
    user.level = 2;
    await user.save();

    let accessToken = await auth.withRefreshToken().generate(user);
    return response.json({
      user: user,
      access_token: accessToken
    });
  }

  async login({ request, auth, response }) {
    const rules = {
      email: "required|email",
      password: "required|string"
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return response
        .status(400)
        .json({ status: 0, message: validation.messages() });
    }

    const email = request.input("email");
    const password = request.input("password");

    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy("email", email);
        let accessToken = await auth.withRefreshToken().generate(user);

        return response.json({ user: user, access_token: accessToken });
      }
    } catch (e) {
      return response.json({
        status: 0,
        message: "you first need to register"
      });
    }
  }

  async generateRefreshToken({ request, auth, response }) {
    const rules = {
      refresh_token: "required|string"
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return response
        .status(400)
        .json({ status: 0, message: validation.messages() });
    }

    const refreshToken = request.input("refresh_token");
    const access_token = await auth
      .newRefreshToken()
      .generateForRefreshToken(refreshToken);
    return response.send({ status: 1, access_token });
  }

  async getProfile({ response, auth }) {
    return response.send({ status: 1, user: auth.current.user });
  }

  async editProfile({ params, request, response, auth }) {
    let rules = {
      username: "string",
      email: "email",
      password: "string"
    };

    if (request.input("password")) {
      rules = {
        ...rules,
        confirm_password: "required|string"
      };
    }

    const validation = await validate(request.all(), rules);
    if (validation.fails()) {
      return response
        .status(400)
        .json({ status: 0, message: validation.messages() });
    }

    const dataUser = await auth.getUser();

    const username = request.input("username");
    const email = request.input("email");
    const password = request.input("passowrd");
    const user = await User.find(dataUser.id);
    if (email) {
      const findSameEmail = await User.query()
        .where("email", email)
        .where("email", "<>", user.email)
        .count();
      if (findSameEmail > 0) {
        return response.json({
          status: 0,
          message: "email already taken"
        });
        user.email = email;
      }
    }

    if (password) {
      const confirm_password = request.input("confirm_password");
      if (confirm_password !== password) {
        return response.json({
          status: 0,
          message: "password not match"
        });
      }
      user.password = password;
    }

    user.username = username ? username : user.username;

    const coverPic = request.file("cover", {
      type: ["image"],
      size: "2mb",
      extnames: ["png", "jpg"]
    });

    console.log(coverPic);

    if (coverPic === null) {
      await user.save();
    } else {
      const name = coverPic.clientName;
      const ext = name.split(".")[1];
      const ts = new Date().valueOf();
      const fileName = "profile" + ts + "." + ext;

      await coverPic.move(Helpers.publicPath("uploads"), {
        name: fileName
      });

      if (user.picture !== "no_avatar.jpg") {
        const linkOldPicture =
          Helpers.publicPath("uploads") + "/" + user.picture;
        fs.unlink(linkOldPicture, function(err) {
          if (err) response.status(400).json({ status: 0, error: err });
        });
      }

      user.picture = fileName;
      await user.save();
    }

    return response.json({
      status: 1,
      data: user
    });

    // if(findSameEmail.rows[0])

    // user.username = username ? username : user.username;
    // user.email =
  }
}

module.exports = AuthController;

/**
 * @swagger
 * /user/login:
 *    post:
 *      tags:
 *        - User
 *      summary: Login to get access token
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *          - in: query
 *            name: email
 *            schema:
 *                type: string
 *            required: true
 *            description: set email
 *          - in: query
 *            name: password
 *            schema:
 *                type: string
 *            required: true
 *            description: set password
 *      responses:
 *        400:
 *          description: failure operation
 *        200:
 *          description: successful operation
 *
 * /user/register:
 *    post:
 *      tags:
 *        - User
 *      summary:  Register to get access token
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *          - in: query
 *            name: username
 *            schema:
 *                type: string
 *            required: true
 *            description: set username
 *          - in: query
 *            name: email
 *            schema:
 *                type: string
 *            required: true
 *            description: set email
 *          - in: query
 *            name: password
 *            schema:
 *                type: string
 *            required: true
 *            description: set password
 *          - in: query
 *            name: confirm_password
 *            schema:
 *                type: string
 *            required: true
 *            description: set confirm password
 *      responses:
 *        400:
 *          description: failure operation
 *        200:
 *          description: successful operation
 */
