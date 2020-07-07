const express = require('express');
const app = express();
app.get('/', (request, response) => {
	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	console.log(
		`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`
	);
	response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require('discord.js'); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require('./config.json'); //Pegando o prefixo do bot para respostas de comandos

client.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return
  if(message.content.startsWith(`<@${client.user.id}>`) ||
   message.content.startsWith(`<@!${client.user.id}>`)) {
    message.channel.send(new Discord.MessageEmbed()
      .setTitle(`**Prefix**`) 
      .setDescription("Ola meu prefix e **seu prefix** se você quiser saber mais sobre min use **xbotinfo** \n para saber sobre o seu server use **xserverinfo**"))
      .setColor("ffffff")
  }
})


	

client.on('message', message => {
	if (message.author.bot) return;
	if (message.channel.type == 'dm') return;
	if (!message.content.toLowerCase().startsWith(config.prefix)) return;
	if (
		message.content.startsWith(`<@!${client.user.id}>`) ||
		message.content.startsWith(`<@${client.user.id}>`)
	)
		return;

	const args = message.content
		.trim()
		.slice(config.prefix.length)
		.split(/ +/g);
	const command = args.shift().toLowerCase();

	try {
		const commandFile = require(`./commands/${command}.js`);
		commandFile.run(client, message, args);
	} catch (err) {
		console.error('Erro:' + err);
	}
});



client.on('ready', () => {
	let activities = [
                `escreva `,
               	'coisas',
	              'bem',
	              'aqui',
	         ],
		i = 0;
	setInterval(
		() =>
			client.user.setActivity(`${activities[i++ % activities.length]}`, {
				type: 'WATCHING'
			}),
		1000 * 60
	);
	client.user.setStatus('dnd').catch(console.error);
	console.log('Estou Online!');
});

client.on('message', async message => {
	const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
	if (regex.exec(message.content)) {
		await message.delete({ timeout: 1000 });
		await message.channel.send(
			`${
				message.author
			} **você não pode postar link de outros servidores aqui!**`
		);
	}
});










  

        
    





client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token
