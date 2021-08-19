const { Client, Collection, Intents } = require('discord.js');
const ping = require('./commands/ping.js');
const translator = require('./commands/translator.js');
const { DISCORD_TOKEN } = require('./config.json');

/* 하나하나 client 만들어짐! */
const client = new Client({
  partials: ['MESSAGE'],
  intents: [Intents.FLAGS.GUILDS],
});
/* commands 등록하는곳 */
client.commands = new Collection();

/* 준비가되면 commands.set 으로 명령어 불러오는부분. */
client.once('ready', () => {
  console.log('Client Ready!');
  client.commands.set(ping.data.name, ping);
  client.commands.set(translator.data.name, translator);
});

/* 커멘드 이름 받아와서 실행시키는부분. */
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.excute(interaction);
  } catch (error) {
    console.log(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

/* discord client login.. */
client.login(DISCORD_TOKEN);
