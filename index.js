const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config.json')
const owner = require("./config.json").owner;
const bar_token = config.bar_token;
const prefix = config.prefix;   
const { SlashCommandBuilder } = require('@discordjs/builders')


client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Segue o brabo pô", { type: 'STREAMING', url: "https://www.twitch.tv/erikcristianplay"})

    const data = {
        name: 'ip',
        description: 'Get ip info!',
    };
    

    const command = await client.guilds.cache.get('784898406878543872')?.commands.create(data);

});



client.on('messageCreate', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const embed = new Discord.MessageEmbed()
    .setAuthor(`mtasa://135.148.6.107:24083`)
    .setTimestamp()
    if (message.content === prefix + 'ip') {
        message.channel.send({ embeds: [embed]})
 }  
    if (message.content === prefix + 'ping') {
        const m = await message.channel.send('ping?');
  
        m.edit(`:ping_pong: **| Pong!**\nLatência do Server: **${m.createdTimestamp -
         message.createdTimestamp}ms.**\nLatência da API: **${Math.round(
         client.ws.ping
      )}ms**
  `);
    }
    if(message.content === 'boost') {
        message.react('<:server_boost:792701691614855178>')
    }


    if(message.content === prefix + 'eval') {
        if (message.author.id !== "873648766761189408") return;

            const code = args.join(" ");
            if(!code) return message.reply("Please provide some code to evaluate");

            try {
            const result = await eval(code);
            let output = result;
            if(typeof result !== "string") output = require("util").inspect(result);

            let embed2 = new Discord.MessageEmbed()
            .setAuthor("Eval", message.author.avatarURL())
            .addField("Input", `\`\`\`${code}\`\`\``)
            .addField("Output", `\`\`\`${output}\`\`\``)
            .setColor("RANDOM")

            message.channel.send({ embeds: [embed2]});
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``)
        }
    }
});

client.on('interactionCreate', async interaction => {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`mtasa://135.148.6.107:24083`)
    .setFooter(`Equipe Brasil Action Roleplay`)
    .setTimestamp()
    if(interaction.isCommand()) {

        if(interaction.commandName === 'ip') 
        await interaction.reply({ embeds: [embed]})

        
	    if (interaction.commandName === 'info2') 
	    	if (interaction.options.getSubcommand() === 'user') {
			const user = interaction.options.getUser('target');

			if (user) {
				await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
			} else {
				await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
			}
		} else if (interaction.options.getSubcommand() === 'server') {
			await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
		}
    }


});

client.login(bar_token);