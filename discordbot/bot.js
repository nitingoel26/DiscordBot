const Discord = require("discord.js");
const { Permissions } = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();
client.on('ready', ()=>

{
  //const ob = new Discord.Permissions(['VIEW_CHANNEL']);
  console.log("Hello");
  
  // client.channels.cache.filter(ch=>{
  //   if(ch.id== '853581175053221900') {
  //       ch.updateOverwrite(, {
  //         SEND_MESSAGES: true,
  //         VIEW_CHANNEL: true
  //     });
      
  //   }
  // })
})

// encouragements = [
//     "Cheer up!",
//     "Hang in there.",
//     "You are a great person / bot!"
//   ]

//   sadWords = ["sad", "depressed", "unhappy", "angry", "miserable"]

// client.on('message',gotMessage);
// function gotMessage(msg)
// {
//   console.log(msg.guild.roles.cache);

//     if(msg.content == 'hello')
//     {
//         msg.reply('woorld');
//     }
// }

// client.on("message", msg => {
    
  
//     if (sadWords.some(word => msg.content.includes(word))) {
//       const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
//       msg.reply(encouragement)
//     }
  
//   })

const command = require('./command')

client.on('ready', () => {
  console.log('The client is ready!')

  command(client, ['ping', 'test'], (message) => {
    message.channel.send('Pong!')
  })
})

command(client, 'servers', (message) => {
  client.guilds.cache.forEach((guild) => {
    // message.channel.send(
    //   `${guild.name} has a total of ${guild.memberCount} members`

    //)
    console.log(guild.members.cache)
  })
})

command(client, ['cc', 'clearchannel'], (message) => {
  if (message.member.hasPermission('ADMINISTRATOR')) {
    message.channel.messages.fetch().then((results) => {
      message.channel.bulkDelete(results)
    })
  }
})

command(client, 'status', (message) => {
  const content = message.content.replace('$status ', '')
  // "!status hello world" -> "hello world"

  client.user.setPresence({
    activity: {
      name: content,
      type: 0,
    },
  })
})

client.on("message", msg => {
  //console.log(msg.guild.roles);
// msg.guild.owner.guild.members.cache.map(user=>console.log(user.user.username));
 msg.mentions.users.map(user =>console.log(user.username));
 //console.log(msg.channel)
 //console.log(msg.member.permissions);
//console.log(client.channels.(channel=> channel.id== '853581175053221900'));

 const chn = msg.guild.channels.cache.filter(channel=> channel.id== '853581175053221900');//server named
 const chnn = chn.find(channel=> channel.id== '853581175053221900');
//  chnn.createOverwrite(msg.mentions.users.map(user=> {return {
//   id: user.id,
//   allow: ['VIEW_CHANNEL'],
//   deny:['SEND_']
// }},'Needed to change permissions'));

msg.mentions.users.map(user=>chnn.createOverwrite(user, {'VIEW_CHANNEL': true,
'SEND_MESSAGES': false}))

new Promise((resolve,reject)=>{
  setTimeout(()=>{resolve()}, 10000)
})
.then(()=>{
  msg.mentions.users.map(user=>chnn.createOverwrite(user, {'VIEW_CHANNEL': true,
'SEND_MESSAGES': true}));
})
 //console.log(msg.author.username); // username1
 //console.log(msg.guild.members);
 //msg.guild.members.cache.map((us)=>console.log(us.user));
})



command(client, 'createtextchannel', (message) => {
  const name = message.content.replace('$createtextchannel ', '')
console.log(message.author.username);
  message.guild.channels
    .create(name, {
      type: 'text',
      permissionOverwrites: [
        {
          id: message.author.id,
          deny: ['VIEW_CHANNEL'],
        }
      ],
      
    })
    .then((channel) => {
      const categoryId = '852877438945853450'
      channel.setParent(categoryId)
      
    })
  })

client.login(process.env.BOT_TOKEN);