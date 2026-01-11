const User = require("../models/User");

async function getUser(userId) {
  let user = await User.findOne({ userId });

  if (!user) {
    user = await User.create({
      userId,
      preferences: [],
      memory: []
    });
  }

  return user;
}

async function updateMemory(user, msg) {
  const text = msg.toLowerCase();

  if (text.includes("my name is")) {
    user.name = msg.split("is")[1].trim();
  }

  if (text.includes("i like")) {
    const pref = msg.replace(/i like/i, "").trim();
    user.preferences = user.preferences.filter(p => p !== pref);
    user.preferences.push(pref);
  }

  user.memory.push(msg);

  if (user.memory.length > 10)
    user.memory = user.memory.slice(-10);

  await user.save();
}

module.exports = { getUser, updateMemory };
