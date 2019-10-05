const controller = {};
const { Comment } = require("../models");
const { Op } = require("sequelize");

controller.add = async comment => {
  const data = await Comment.create(comment);
  return data;
};
module.exports = controller;
