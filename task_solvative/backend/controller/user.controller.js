const userDB = require("../model/user.model");
const rewardDB = require("../model/rewardhistory.model");

exports.createuser = (req, res) => {
  try {
    const { name } = req.body;

    const userdata = new userDB({
      name: name,
    });

    userdata
      .save()
      .then((resp) => {
        return res.json({
          status: true,
          message: "User created successfully",
          data: resp,
        });
      })
      .catch((err) => {
        return res.json({ status: false, message: err?.message, data: [] });
      });
  } catch (e) {
    res.json({ status: false, message: e, data: [] });
  }
};

exports.trasactionhistory = (req, res) => {
  try {
    rewardDB
      .find({ transferstatus: true })
      .then((resp) => {
        return res.json({
          status: true,
          message: "transaction histiroy",
          data: resp,
        });
      })
      .catch((err) => {
        return res.json({ status: false, message: err, data: [] });
      });
  } catch (e) {
    res.json({ status: false, message: e, data: [] });
  }
};

exports.userRewardTransaction = async (req, res) => {
  try {
    let { from, to, amount, fromName, toName } = req.body;

    const fromUser = await userDB.findById({ _id: from });
    const toUser = await userDB.findById({ _id: to });

    if (fromUser.p5 < amount) {
      return res.json({
        status: false,
        message: "NOt enough balance",
        data: [],
      });
    }
    fromUser.p5 -= amount;
    toUser.reward += Number(amount);

    await fromUser.save();
    await toUser.save();

    const rewarddata = new rewardDB({
      fromName: fromName,
      toName: toName,
      reward: amount,
      fromId: from,
      toId: to,
    });

    rewarddata.save();

    return res.json({
      status: false,
      message: "Transaction successul",
      data: [],
    });
  } catch (e) {
    res.json({ status: false, message: e, data: [] });
  }
};

exports.listusers = (req, res) => {
  try {
    userDB
      .find({})
      .then((resp) => {
        return res.json({
          status: true,
          message: "User created successfully",
          data: resp,
        });
      })
      .catch((err) => {
        return res.json({ status: false, message: err, data: [] });
      });
  } catch (e) {
    res.json({ status: false, message: e, data: [] });
  }
};

exports.revertTransaction = async (req, res) => {
  try {
    const { id } = req.body;
    rewardDB
      .find({ _id: id })
      .then(async (resp) => {
        let data = resp[0];

        const fromUser = await userDB.findById({ _id: resp[0].fromId });
        const toUser = await userDB.findById({ _id: resp[0].toId });

        fromUser.p5 += resp[0].reward;
        toUser.reward -= resp[0].reward;

        await fromUser.save();
        await toUser.save();
        await rewardDB.updateOne(
          { _id: id },
          { $set: { transferstatus: true } }
        );

        return res.json({ status: true, message: "scuccsesful", data: [] });
      })
      .catch((err) => {
        return res.json({ status: false, message: err, data: [] });
      });
  } catch (e) {
    res.json({ status: false, message: e, data: [] });
  }
};


exports.rewardhistory = (req, res) => {
  try {
    rewardDB
      .find({ transferstatus: false })
      .then((resp) => {
        return res.json({
          status: true,
          message: "transaction histiroy",
          data: resp,
        });
      })
      .catch((err) => {
        return res.json({ status: false, message: err, data: [] });
      });
  } catch (e) {
    res.json({ status: false, message: e, data: [] });
  }
};
