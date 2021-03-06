'use strict';

const Command = require('../../Command.js');

class AddCustomCommand extends Command {
  constructor(bot) {
    super(bot, 'customcommands.add', 'add cc');
    this.usages = [
      { description: 'Add a custom command', parameters: ['command call', 'comamnd response'] },
    ];
    this.regex = new RegExp(`^${this.call}\\s+(\\w+)?\\s?([\\s\\S]*)`, 'i');
    this.requiresAuth = true;
    this.allowDM = false;
  }

  async run(message) {
    const params = message.strippedContent.match(this.regex);
    if (!params[1] || !params[2]) {
      this.messageManager.embed(message, {
        title: 'Adding Custom Commands',
        fields: [{
          name: '_ _',
          value: `**${this.call}**\n` +
            '**command call**: command trigger\n' +
            '**comamnd response**: response to the trigger',
        }],
      }, true, false);
      return this.messageManager.statuses.FAILURE;
    }
    await this.bot.settings.addCustomCommand(message, params[1], params[2]);
    await this.commandHandler.loadCustomCommands();
    await this.messageManager.notifySettingsChange(message, true, true);
    return this.messageManager.statuses.SUCCESS;
  }
}

module.exports = AddCustomCommand;
