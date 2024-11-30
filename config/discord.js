const { Client, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();

const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Load Discord Commands
const commands = new Map();
const commandFiles = fs.readdirSync(
  path.join(__dirname, "../discord/commands")
);

commandFiles.forEach((file) => {
  const command = require(`../discord/commands/${file}`);
  commands.set(command.name, command);
});

// Handle Discord Bot Commands
discordClient.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const [command, ...args] = message.content.split(" ");
  if (!command.startsWith("!")) return;

  const cmd = commands.get(command.substring(1)); // Remove the "!" prefix
  if (cmd) {
    try {
      await cmd.execute(message, args);
    } catch (error) {
      console.error(`Error executing command ${command}:`, error.message);
      message.reply("There was an error trying to execute that command.");
    }
  } else {
    message.reply("Unknown command. Please try again.");
  }
});

// Start Discord Bot
const startDiscordBot = () => {
  discordClient.once("ready", () => {
    console.log(`Discord bot logged in as ${discordClient.user.tag}`);
  });

  discordClient.login(process.env.DISCORD_BOT_TOKEN);
};

module.exports = {
  startDiscordBot,
};
