const {Bot, session} = require("grammy");
const {connect} = require("mongoose");

const commandModule = require("./modules/command.module");
const config = require("../config");
const startRouter = require("./modules/start.module");
const categoryModule = require("./modules/category.module");

const bot = new Bot(config.token);

bot.use(session({initial: () => ({step: "start"})}));

bot.use(startRouter);
bot.use(categoryModule);
bot.use(commandModule);

const starter = async () => {
  try {
    await connect(config.mongoUri);
    bot.start({
      onStart: () => {
        console.log(bot.botInfo.username);
      },
    });
  } catch (error) {
    process.exit(1);
  }
};

starter();
