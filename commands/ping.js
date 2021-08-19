const { SlashCommandBuilder } = require('@discordjs/builders') ;

const ping = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping pong test'),
  async excute(interaction) {
    await interaction.reply('pong!');
  },
};

module.exports = ping;
