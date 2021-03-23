const Discord = require('discord.js');
const client = new Discord.Client();
const işaret = require('./işaret.json');
const { Client, MessageEmbed } = require('discord.js');
const hedefimiz = require('./hedef.json');
const kbio = require('./biyografi.json');

var hedef = hedefimiz.hedef

const { readdirSync } = require('fs'); // tanımlamalar
const { join } = require('path'); // tanımlamalar

const prefix = işaret.prefix


client.on('ready', () => {
    client.user.setActivity('tk!help')
    console.log(`${client.user.tag} botu kullanıma hazır`);
});

client.on('guildMemberAdd', member => {
  const girişçıkış = member.guild.channels.cache.find(channel => channel.name === '🔒・yeni-gelenler-için');
  girişçıkış.send(`${member}, aramıza hoşgeldin dostum. Ses teyit kanallarından birine girip 'Kayıt Sorumlusu' rolünü etiketleyerek bir yetkilinin gelmesini beklemelisin.`);
  member.send(`Team Kardiyak Sunucumuza Hoşgeldin\n\nLütfen sunucumuzun kurallarını dikkatlice okuyun. Kayıt olduktan sonra ise Etkinlik programımıza bi göz atmanızı öneriririm, bir çok etkinliğimizden haberdar olabilirsiniz.\nTeam Kardiyak Discord sunumuzda iyi eğlenceler dileriz. İyi Günler`);
});

client.on('guildMemberAdd', member => {
  const girişçıkış = member.guild.channels.cache.find(channel => channel.name === '🎯・hedef');
  girişçıkış.send(`${member} seninle birlikte **${member.guild.memberCount}** üye olduk. Hedefimiz **${hedef}** üye. Arkadaşlarınızı davet etmeyi unutmayın`);

});

client.on('guildMemberRemove', member => {
  const girişçıkış = member.guild.channels.cache.find(channel => channel.name === '🎯・hedef');
  girişçıkış.send(`${member} sunucudan ayrıldı. 😔 Üye sayımız **${member.guild.memberCount}**. Hedefimiz **${hedef}** üye.`);
});

client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'kick')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bunu yapacak yetkiye sahip olduğunu düşünmüyorum..')
    const args1 = message.content.split(' ').slice(2)
    const neden = args1.join(" ")
    const { MessageEmbed } = require('discord.js')
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick()
          .then(() => {
           const kanal = message.guild.channel.cache.find(channels => channels.id === '823161505633534002')
           const embed = new MessageEmbe()
           .setTitle('Kick')
           .setDescription('Olay: `Kick`')
           .setThumbnail('https://cdn.discordapp.com/attachments/782333538951102505/821787142614679572/TeamKardiyak.jpg')
           .addField('Kişi:', member)
           .addField('Neden:', neden)
           kanal.send(embed);
           message.channel.send(`${user.tag} kişisi kicklenmiştir.`);
          })
          .catch(err => {
            message.channel.send('Bunu yapamam.');
            console.error(err);
          });
      } else {
        message.channel.send("Sunucuda bu kişiyi göremiyorum.");
      }
    } else {
      message.channel.send("Kimi atmamı istediğini yazmadın.");
    }
  }
});

client.on('message', message => {
  if (!message.guild) return;
if (message.content.startsWith(prefix + 'ban')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bunu yapacak yetkiye sahip olduğunu düşünmüyorum..')
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban()
          .then(() => {
           const kanal = message.guild.channel.cache.find(channels => channels.id === '823161505633534002')
           const embed = new MessageEmbe()
           .setTitle('Kick')
           .setDescription('Olay: `Kick`')
           .setThumbnail('https://cdn.discordapp.com/attachments/782333538951102505/821787142614679572/TeamKardiyak.jpg')
           .addField('Kişi:', member)
           .addField('Neden:', neden)
           kanal.send(embed);
           message.channel.send(`${user.tag} kişisi banlanmıştır.`);
          })
          .catch(err => {
            message.channel.send('Bunu yapamam.');
            console.error(err);
          });
      } else {
        message.channel.send("Sunucuda bu kişiyi göremiyorum.");
      }
    } else {
      message.channel.send("Kimi banlamamı istediğini yazmadın.");
    }
  }
});

client.on('message', async message => {
  if (message.content.startsWith(prefix + 'oylama')) {
    const botmesajı = args[0]
    const botmesajıa = args[1]
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Sadece yöneticiler oylama açabilir.');
    if (!botmesajı) return message.reply('Neleri oylayacağımızı yazmadınız.');
    message.delete(message.author)
    const embed = new MessageEmbed()
    .setTitle('OYLAMA')
    .setColor("RANDOM")
    .setThumbnail('https://cdn.discordapp.com/attachments/782333538951102505/821787142614679572/TeamKardiyak.jpg')
    .addField(botmesajı, "🟢")
    .addField(botmesajıa, "🔴")
    .setFooter('Bot ile ilgili sorun ve sorularınızı yetkililere bildiriniz.');
    message.channel.send({ embed: embed }).then( embedMessage => {
      embedMessage.react("🟢")
      embedMessage.react("🔴");
    })
  }
});

client.on('message', message => {
  if (message.content.startsWith(prefix + 'duyuru')) {
    const kanal = message.mentions.channel.first();
    const args = message.content.split('').slice(1)
    const botmesajı = args.join(" ")
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Sadece **yöneticiler** duyuru yapabilir.');
    if (!botmesajı) return message.reply('Ne duyuracağımı yazmadınız.');
    if (!kanal) return message.reply('Hangi kanalda duyuru yapacağımı yazmadınız.');
    kanal.send(args.join(" ") + "@everyone")
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === prefix + 'avatar') {
    const user = message.mention.users.first()
    const kanal = new MessageEmbed()
    if (user) {
      .setTitle(`**${message.author.tag} AVATARINIZ**`)
      .setImage(user.displayAvatarURL({ dynamic: true, size:4096 }))
      .setFooter('Bot ile ilgili sorun ve sorularınız için yetkililere ulaşabilirsiniz..')
      message.channel.send(kanal);
    } else {
      .setTitle(`**${message.author.tag} AVATARINIZ**`)
      .setImage(message.author.displayAvatarURL({ dynamic: true, size:4096 }))
      .setFooter('Bot ile ilgili sorun ve sorularınız için yetkililere ulaşabilirsiniz..')
      message.channel.send(kanal);
    }
  }
});

client.on('message', async message => {
  if (message.content.startsWith(prefix + 'play')) {
    const args = message.content.split(' ').slice(1)
    const botmesajı = args.join(" ")
    if (!botmesajı) return message.reply('Lütfen önce bir URL belirtiniz!')
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const ytdl = require('ytdl-core');
      connection.play(ytdl(`${botmesajı}`, { filter: 'audioonly' }))
    } else {
message.reply('Lütfen önce bir ses kanalına katılınız!');
    }
  }
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.channel.send(`<@${msg.author.id}> as`)
  }
  if (msg.content.toLowerCase() === 'selam') {
    msg.channel.send('Selam dostum, nasılsın?');
  }
  if (msg.content.toLowerCase() === prefix + 'youtube') {
    msg.channel.send('https://www.youtube.com/c/TeamKardiyak');
  }
  if (msg.content.toLowerCase() === prefix + 'instagram') {
    msg.channel.send('https://www.instagram.com/teamkardiyak/');
  }
  if (msg.content.toLowerCase() === prefix + 'twitch') {
    msg.channel.send('https://www.twitch.tv/teamkardiyak/');
  }
  if (msg.content.toLowerCase() === prefix + 'discord') {
    msg.channel.send('https://discord.gg/muzik');
  }
  if (msg.content.toLowerCase() === prefix) {
    msg.channel.send('tk!help yazarak bot ile ilgili ayrıntılı bilgiye erişebilirsiniz.');
  }
  if (msg.content.toLowerCase() === 'merhaba') {
    msg.channel.send(`<@${msg.author.id}> merhaba dostum, nasılsın?`)
  }
  if (msg.content.toLowerCase() === 'sen nasılsın bot') {
    msg.channel.send('Sanat için tam gaz çalışmaya devam..');
  }
  if (msg.content.toLowerCase() === 'iyiyim sen nasılsın bot') {
    msg.channel.send('Sanat için tam gaz çalışmaya devam..');
  }
  if (msg.content.toLowerCase() === 'kötüyüm sen nasılsın bot') {
    msg.channel.send('Sanat için tam gaz çalışmaya devam..');
  }
  if (msg.content.toLowerCase() === 'nasılsın bot') {
    msg.channel.send('Sanat için tam gaz çalışmaya devam..');
  }
  if (msg.content.toLowerCase() === 'adamsın bot') {
    msg.channel.send('Yapımcım gibi..');
  }
  if (msg.content.toLowerCase() === 'bot adamsın') {
    msg.channel.send('Yapımcım gibi..');
  }
  if (msg.content.toLowerCase() === 'selamun aleyküm') {
    msg.channel.send('Ve aleyküm selam');
  }
  if (msg.content.toLowerCase() === prefix + 'test') {
    msg.channel.send('Team Kardiyak Bot Çalışıyor!\n\n`tk!help` yazarak komutlara erişebilirsiniz.\n\nTeam Kardiyak iyi günler diler.');
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === prefix + 'help') {
    const kanal = new MessageEmbed()

    .setTitle('Team Kardiyak Yardım')
    .setDescription('Size nasıl yardımcı olabilirim?')
    .setAuthor('Team Kardiyak')
    .setColor("RANDOM")
    .setThumbnail('https://cdn.discordapp.com/attachments/782333538951102505/821787142614679572/TeamKardiyak.jpg')
    .addField('🔑 tk!Kardiyak', 'Kardiyakın biyografisini gösterir. ')
    .addField('🔑 tk!instagram', 'Team Kardiyak Instagram linkini gösterir. ')
    .addField('🔑 tk!youtube', 'Team Kardiyak Youtube linkini gösterir. ')
    .addField('🔑 tk!twitch', 'Team Kardiyak Twitch linkini gösterir. ')
    .addField('🔑 tk!discord', 'Team Kardiyak Discord linkini gösterir. ')
    .setFooter('Bot ile ilgili sorun ve sorularınız için yetkililere ulaşabilirsiniz..')
    message.channel.send(kanal);
  }
});

client.on('message', async message => {
  if (message.content.startsWith(prefix + 'oyunara')) {
    const game = args[0]
    const nott = message.content.split(' ').slice(2)
    const not = nott.join(" ")
    if (message.member.voice.channel) {
      const embed = new MessageEmbed()
      .setTitle(`Oyun Arıyor: **${message.author.tag}**`)
      .setColor("RANDOM")
      .setField("Oyun:", `${game}`)
      .setField('Sesli Kanal:', `${message.member.voice.channel}`)
      .setField("Not:", `${not}`);
      message.channel.send(embed)
    } else {
message.reply('Önce sesli bir kanala katılmalısınız!')
    }
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === prefix + 'kardiyak') {
    const kanal = new MessageEmbed()

    .setTitle('Team Kardiyak')
    .setAuthor('Team Kardiyak')
    .setColor("RANDOM")
    .setThumbnail('https://hizliresim.com/ruP6eM.png')
    .addField('Kardiyak Kimdir?', 'Kardiyak, 12 Aralık 1995 de Muğla nın Marmaris ilçesinde doğmuştur. İlkokul ve Ortaokul yıllarında önemli Klasik Müzik Bestecilerinin eserlerine hakim olmuş ve daha sonra ergenlik yıllarında New Age (Epik Müzik) müziğe merak sarmış, sonrasında ise müzikal bilgi birikimini çeşitli şekillerde kullanmak ve farklı müzik türleriyle sentezlemek istemiştir. Rap müzik yapmaya ilk lise yılında başlamış, kendine “Salazar Records” isimli bir Ev Stüdyosu kurmuştur. Şarkılarının altyapılarından liriklerine, kapak tasarımlarından aranje ve mix mastering işlemlerine kadar birçok işi üstlenmiştir.')
    .addField('➖➖➖➖➖', 'Lise son sınıfa kadar katıldığı Hiphop etkinlikleri, Freestyle Battle (Doğaçlama Rap Yarışması) Turnuvalarındaki birincilikleri ve “Salazar Records” isimli kendi YouTube kanalına yüklediği şarkılar sayesinde kemik bir kitle oluşturmayı başarmıştır. Yine de akademik olarak kendini oldukça eksik hisseden Kardiyak, en sonunda Haliç Üniversitesi Konservatuarı Opera ve Konser Şarkıcılığı bölümü kazanmış ve bir yandan da Galatasaray ITM de Mix Mastering eğitim almaya başlamıştır. Okulda öğrendiklerini git gide daha da müziğine yansıtmayı başarmış ve her şarkıda tıpkı bir tiyatro oyuncusu gibi farklı karakterlere dönüşmek ya da birbirinden bağımsız konseptler ile dinleyiciye yalnızca bir müzikten daha fazlasını bulacakları bir deneyim yaşatmayı amaçladığı Epik Rap adını verdiği farklı bir müzik türü ortaya koymuştur.')
    .setFooter('Bot ile ilgili sorun ve sorularınızı yetkililere bildiriniz.');
    message.channel.send(kanal);
  }
});


client.login('ODIxNjU5NDAzODYxMjI5NTY4.YFG78w.I3qtnBPXcvtb4uy3aV0U0FIbkoY');
