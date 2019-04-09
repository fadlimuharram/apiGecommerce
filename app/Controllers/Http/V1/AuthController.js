"use strict";

const User = use("App/Models/User");
const { validate } = use("Validator");

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
    await user.save();

    let accessToken = await auth.generate(user);
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
        let accessToken = await auth.generate(user);

        return response.json({ user: user, access_token: accessToken });
      }
    } catch (e) {
      return response.json({
        status: 0,
        message: "you first need to register"
      });
    }
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
