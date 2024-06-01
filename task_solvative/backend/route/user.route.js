const userrouter = require("express").Router();

const usercontroller = require("../controller/user.controller");

userrouter.post("/createuser", usercontroller.createuser);

userrouter.get("/listallusers", usercontroller.listusers);

userrouter.post("/transfer", usercontroller.userRewardTransaction);

userrouter.get("/trasactionhistory", usercontroller.trasactionhistory);

userrouter.post("/revertTransaction", usercontroller.revertTransaction);

userrouter.get("/rewardhistory", usercontroller.rewardhistory);


module.exports = userrouter;
