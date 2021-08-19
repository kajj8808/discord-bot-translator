const { SlashCommandBuilder } = require('@discordjs/builders');
const { papagoApi } = require('../api');
//입력된 언어 확인.
const getDetectLangs = async (query = undefined) => {
  if (query) {
    const {
      data: { langCode },
    } = await papagoApi.detectLangs(query);
    return langCode;
  }
};

//파파고 번역을하는 function. text 가없으면 없음으로.
const textTranslator = async (
  start = undefined,
  end = undefined,
  text = undefined
) => {
  if (start && end && text) {
    const {
      data: {
        message: { result },
      },
    } = await papagoApi.translator(start, end, text);
    return result;
  }
  return 'ERROR TRANSLATOR..';
};

//번역해서 돌려주는 부분!.
const translator = async (text = undefined, endCode = 'ko') => {
  if (text) {
    const startCode = await getDetectLangs(text);
    const { translatedText } = await textTranslator(startCode, endCode, text);
    return `${text}\n${translatedText}`;
  }
  return 'ERROR - NOT TEXT!';
};

const translatorPresenter = {
  data: new SlashCommandBuilder()
    .setName('translator')
    .setDescription('translator text'),
  async excute(interaction) {
    const text = interaction.options.getString('text');
    let end = interaction.options.getString('end');
    end = end !== null ? end : 'ko';
    await interaction.reply(await translator(text, end));
  },
};

module.exports = translatorPresenter;
