const Discord = require('discord.js');
const client = new Discord.Client();
const işaret = require('./işaret.json');
const { Client, MessageEmbed } = require('discord.js');
const hedefimiz = require('./hedef.json');
const kbio = require('./biyografi.json');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');
const play = require('discordjs-ytdl');

var hedef = hedefimiz.hedef

const { readdirSync } = require('fs'); // tanımlamalar
const { join } = require('path'); // tanımlamalar

const prefix = işaret.prefix


client.on('ready', () => {
    console.log(`${client.user.tag} botu kullanıma hazır`)
    const durumlar = [
      "tk!help",
      "Discord sunucumuza katılmayı unutmayın: discord.gg/muzik",
      "Instagram: @teamkardiyak",
      `Tam ${client.guilds.cache.size} sunucuda aktif olarak kullanılıyorum!!!`
    ]
    setInterval(function () {
      let durum = durumlar[Math.floor(Math.random()*durumlar.length)]
      client.user.setActivity(durum)
    }, 10000);
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
           const user = message.mentions.users.first();
           const kanal = client.channels.cache.find(ch => ch.id === '824594007266557964')
           const embed = new MessageEmbed()
           .setTitle('Kick')
           .setDescription('Olay: `Kick`')
           .setThumbnail('https://cdn.discordapp.com/attachments/782333538951102505/821787142614679572/TeamKardiyak.jpg')
           .addField('Kişi:', member)
           .addField('Neden:', neden)
           .addField('Kickleyen Yetkili:', `<@${message.author.id}>`)
           kanal.send(embed)
           message.channel.send(user + 'kişisi kicklenmiştir.');
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
    const args1 = message.content.split(' ').slice(2)
    const neden = args1.join(" ")
    const { MessageEmbed } = require('discord.js')
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban()
          .then(() => {
           const user = message.mentions.users.first();
           const kanal = client.channels.cache.find(ch => ch.id === '824594007266557964')
           const embed = new MessageEmbed()
           .setTitle('Ban')
           .setDescription('Olay: `Ban`')
           .setThumbnail('https://cdn.discordapp.com/attachments/782333538951102505/821787142614679572/TeamKardiyak.jpg')
           .addField('Kişi:', member)
           .addField('Neden:', neden)
           .addField('Banlayan Yetkili:', `<@${message.author.id}>`)
           kanal.send(embed)
           message.channel.send(user + 'kişisi banlanmıştır.');
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

client.on('guildCreate', async guild => {
    const embed1 = new Discord.MessageEmbed()
    .setTitle('Sunucunuza eklediğiniz için teşekkürler!')
    .setDescription('Sunucu Adı: `' + guild.name + '`')
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    guild.owner.send(embed1)
});

client.on('guildCreate', async guild => {
    const embed2 = new Discord.MessageEmbed()
    .setTitle('**YENİ SUNUCU!!**')
    .setDescription('Sunucu Adı: ' + guild.name)
    .addField('Üye sayısı: ', guild.memberCount)
    .addField('Sunucu Sahibi: ', guild.owner)
    .setThumbnail(guild.iconURL())
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    const channel = client.channels.cache.find(ch => ch.id === '823161505633534002')
    channel.send(embed2)
});
    
client.on('guildDelete', async guild => {
    const embed1 = new Discord.MessageEmbed()
    .setTitle('Sunucunuzdan çıkarmanız bizi üzdü..')
    .setDescription('Sunucu Adı: `' + guild.name + '`')
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    guild.owner.send(embed1)
});

client.on('guildDelete', async guild => {
    const embed2 = new Discord.MessageEmbed()
    .setTitle('**SUNUCUDAN ÇIKARILDIM**')
    .setDescription('Sunucu Adı: ' + guild.name)
    .addField('Üye sayısı: ', guild.memberCount)
    .addField('Sunucu Sahibi: ', guild.owner)
    .setThumbnail(guild.iconURL())
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    const channel = client.channels.cache.find(ch => ch.id === '823161505633534002')
    channel.send(embed2)
});
    

client.on('message', async message => {
  if (message.content.startsWith(prefix + 'oylama')) {
    const args = message.content.split(' ').slice(1)
    const botmesajı = args[0];
    const botmesajıa = args[1]
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Sadece yöneticiler oylama açabilir.');
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

client.on('message', async message => {
    if (message.content.startsWith(prefix + 'sil')) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Sadece **yöneticiler** mesaj silebilir.');
        const args = message.content.split(' ').slice(1)
        let time = args[0]
        if (isNaN(args)) return message.reply('lütfen bir sayı giriniz.');
        if (args < 2 || args > 100) return message.reply('Lütfen 2 ile 100 arasında bir sayı giriniz.');
        message.channel.bulkDelete(Number(args))
        const { MessageEmbed} = require('discord.js')
        const embed = new MessageEmbed()
        .setTitle('Mesajlar Başarıyla Silindi!')
        .setDescription('Silinen Mesaj Sayısı: ' + args)
        message.channel.send(embed).then(mesaj => {
          setTimeout(function () {
            message.delete()
          }, 5000);
        })
    }
});

client.on('message', async message => {
    if (message.content.startsWith(prefix + 'çekiliş')) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Sadece **yöneticiler** bir çekiliş başlatabilir.');
        const {MessageEmbed} = require('discord.js')
        const args = message.content.split(' ').slice(1)
        let time = args[0]
        let ödülargs = message.content.split(' ').slice(2)
        let ödül = ödülargs.join(" ")
        if (isNaN(time)) return;
        const embed1 = new MessageEmbed()
        .setTitle('Çekiliş Başladı!!!')
        .setDescription(ödül)
        .addField('Çekiliş' + time + 'saniye sonra açıklanacaktır')
        .setFooter()
        const embed2 = new MessageEmbed()
        .setDescription('Çekiliş Bitti Kazanan: <@' + message.react.member.cache.random() + '>')
        .setTitle(ödül)
        .addField('TEBRİKLER!!')
        .setFooter()
        message.channel.send(embed1).then(embed1 => {
        embedMessage.react("🎉")
        setTimeout(function (){
            embed1.edit(embed2)
        }, time * 1000);
    })
    }
});


client.on('message', message => {
  if (message.content.startsWith(prefix + 'duyuru')) {
    const channel = message.mentions.channel.first()
    const kanal = channel[1]
    const args = message.content.split('').slice(1)
    const botmesajı = args.join(" ")
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Sadece **yöneticiler** duyuru yapabilir.');
    if (!botmesajı) return message.reply('Ne duyuracağımı yazmadınız.');
    if (!kanal) return message.reply('Hangi kanalda duyuru yapacağımı yazmadınız.');
    kanal.send(args.join(" ") + "@everyone")
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === prefix + 'istatistik') {
    const uptime = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")
    const kanal = new MessageEmbed()

    .setTitle('📊 **İSTATİSTİK**')
    .setThumbnail('https://cdn.discordapp.com/attachments/782333538951102505/821787142614679572/TeamKardiyak.jpg')
    .addField('🙋 Kullanıcı Sayısı:', client.users.cache.size + ' Kullanıcı' )
    .addField('🏢 Sunucu Sayısı:', client.guilds.cache.size + ' Sunucu' )
    .addField('💠 Kanal Sayısı', client.channels.cache.size + ' Kanal' )
    .addField('🙇 Bot Sahibi', '**Team Kardiyak** (Mockir 👑#2102) ')
    .addField('⏱️ Çalışma Süresi', uptime)
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    message.channel.send(kanal);
  }
});

client.on('message', async message => {
  if (message.content.toLowerCase() === prefix + 'avatar') {
      const kanal = new MessageEmbed()
      const args = message.mentions.users.first()
      let user = args[0]
      if (user) {
          const kanal = new MessageEmbed()
              .setTitle(`**${message.author.tag} AVATARINIZ**`)
              .setImage(user.displayAvatarURL({ dynamic: true, size:4096 }))
              .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
          message.channel.send(kanal)
      } else { 
          const kanal = new MessageEmbed()
              .setTitle(`**${message.author.tag} AVATARINIZ**`)
              .setImage(message.author.displayAvatarURL({ dynamic: true, size:4096 }))
              .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
          message.channel.send(kanal);
      }
  }
});

client.on('message', async message => {
  if (message.content.startsWith(prefix + 'play')) {
    if (message.member.voice.channel) {
      const args = message.content.split(' ').slice(1)
      const connection = await message.member.voice.channel.join();
      play.play(connection, args.join(" "), 'AIzaSyAX6CyqRolKWVFmaMb3a7tbXXFdgggBiTo')
      let title = play.title(args.join(" "), 'AIzaSyAX6CyqRolKWVFmaMb3a7tbXXFdgggBiTo')
title.then(titlee => message.channel.send('Şuan Dinlenen Şarkı: ' + titlee))
    } else {
      message.reply('Bir sesli kanala katılmalısınız.')
    }
  }
});
           

client.on('message', async message => {
  if (message.content.startsWith(prefix + 'kayıt')) {
  if (!message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('Kullanıcı adı değiştirmek için yetkiniz yok.');
  const args = message.content.split(' ').slice(2)
  let member = message.mentions.members.first();
  let role = message.guild.roles.cache.find(r => r.id === "775800216950669393")
  let roles = message.guild.roles.cache.find(r => r.id === "777867930268073984")
  if (!member) return message.reply("Lütfen birini etiketleyiniz.")
  member.setNickname(args.join(" "))
  member.roles.add(role)
  member.roles.remove(roles)
     const kanal = new MessageEmbed()

    .setTitle('KAYIT')
    .setThumbnail('https://cdn.discordapp.com/attachments/782333538951102505/821787142614679572/TeamKardiyak.jpg')
    .addField('Kayıt Edilen Kullanıcı', `${member.user.username}` )
    .addField('Kayıt Eden Yetkili', `<@${message.author.id}>` )
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    message.channel.send(kanal);
  }
});
  
 

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.channel.send(`<@${msg.author.id}>` + ' as')
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
    msg.channel.send(`<@${msg.author.id}>` + ' merhaba dostum, nasılsın?')
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
  if (message.content.toLowerCase() === prefix + 'sosyalmedya') {
    const kanal = new MessageEmbed()

    .setTitle('Team Kardiyak Sosyal Medya Hesapları')
    .setThumbnail('https://cdn.discordapp.com/attachments/782333538951102505/821787142614679572/TeamKardiyak.jpg')
    .addField('Youtube', '[Youtube](https://www.youtube.com/c/TeamKardiyak)')
    .addField('İnstagram', '[İnstagram](https://www.instagram.com/teamkardiyak/)')
    .addField('Twitch', '[Twitch](https://www.twitch.tv/teamkardiyak/)')
    .addField('Discord', '[Discord](https://discord.gg/muzik)')
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    message.channel.send(kanal);
  }
});

client.on('message', async message => {
  if (message.content.startsWith(prefix + 'öner')) {
      const önerimesajı = message.content.split(' ').slice(1)
      const öner = önerimesajı.join(" ")
      kanal = client.users.cache.find(user => user.id === '483221261502119938')
      kanal.send(öner + ' - ' + message.author.tag)
      message.channel.send('Öneriniz için teşekkür ederiz.')
  }
});


client.on('message', message => {
  if (message.content.toLowerCase() === prefix + 'help') {
    const kanal = new MessageEmbed()

    .setTitle('Team Kardiyak Bot Yardım')
    .setDescription('Size nasıl yardımcı olabilirim?')
    .setColor("RANDOM")
    .setThumbnail('https://cdn.discordapp.com/attachments/782333538951102505/821787142614679572/TeamKardiyak.jpg')
    .addField('tk!bilgi', 'Kardiyak ve Team Kardiyak ile ilgili ayrıntılı bilgi verir. ')
    .addField('tk!komutlar', 'Team Kardiyak Bot komutlarını gösterir. ')
    .addField('tk!botdavet', 'Team Kardiyak Botu sunucunuza davet etmenizi sağlar. ')
    .addField('tk!istatistik', 'Botun istatistiklerini gösterir.')
    .addField('tk!öneri <fikir>', 'Bota sizce neler eklemeliyiz? Fikirlerinizi bizimle paylaşmalısınız.')
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    message.channel.send(kanal);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === prefix + 'bilgi') {
    const kanal = new MessageEmbed()

    .setTitle('Team Kardiyak Bot Bilgi')
    .setColor("RANDOM")
    .setThumbnail('https://cdn.discordapp.com/attachments/782333538951102505/821787142614679572/TeamKardiyak.jpg')
    .addField('tk!Kardiyak', 'Kardiyak ile ilgili ayrıntılı bilgi verir. ')
    .addField('tk!sosyalmedya', 'Team Kardiyak Sosyal medya hesaplarını gösterir. ')
    .addField('tk!botdavet', 'Team Kardiyak Botu sunucunuza davet etmenizi sağlar.')
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    message.channel.send(kanal);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === prefix + 'botdavet') {
    const kanal = new MessageEmbed()

    .setTitle('Team Kardiyak Bot Davet')
    .setColor("RANDOM")
    .setThumbnail('https://cdn.discordapp.com/attachments/782333538951102505/821787142614679572/TeamKardiyak.jpg')
    .addField('**BOTU SUNUCUNUZA DAVET EDİN**', '[Tıkla ve Botu sunucuna ekle](https://discord.com/oauth2/authorize?client_id=821659403861229568&scope=bot&permissions=2147483647)')
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    message.channel.send(kanal);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === prefix + 'komutlar') {
    const kanal = new MessageEmbed()

    .setTitle('Team Kardiyak Bot Komutları')
    .setColor("RANDOM")
    .setThumbnail('https://cdn.discordapp.com/attachments/782333538951102505/821787142614679572/TeamKardiyak.jpg')
    .addField('tk!help', 'Bot ile ilgili ayrıntılı bilgi için bir panel açılır. ')
    .addField('tk!play', 'Adınız yazdığınız şarkıyı çalar. ')
    .addField('tk!avatar', 'Mesajı yazan kişinin profil resmini gönderir. ') 
    .addField('tk!oylama <birinci kişi> <ikinci kişi> ', 'Belirttiğiniz kişiler arasında oylama yapar. ')
    .addField('tk!oyunara <oyun> <arananoyuncuözellikleri>', 'Bir oyun arkadaşı aramanıza yardımcı olur ')
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    message.channel.send(kanal);
  }
});

client.on('message', async message => {
  if (message.content.startsWith(prefix + 'oyunara')) {
    const args = message.content.split(' ').slice(1)
    const game = args[0]
    const nott = message.content.split(' ').slice(2)
    const not = nott.join(" ")
    if (message.member.voice.channel) {
    message.delete(message.author)
      const embed = new MessageEmbed()
      
      .setTitle(`Oyun Arayan:  <@${message.author.id}>`)
      .setThumbnail('https://cdn.discordapp.com/attachments/782333538951102505/821787142614679572/TeamKardiyak.jpg')
      .setColor("RANDOM")
      .addField("Oyun:", game)
      .addField('Sesli Kanal:', `${message.member.voice.channel}`)
      .addField("Not:", not)
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
    .setThumbnail('https://cdn.discordapp.com/attachments/782333538951102505/821787142614679572/TeamKardiyak.jpg')
    .addField('Kardiyak Kimdir?', 'Kardiyak, 12 Aralık 1995 de Muğla nın Marmaris ilçesinde doğmuştur. İlkokul ve Ortaokul yıllarında önemli Klasik Müzik Bestecilerinin eserlerine hakim olmuş ve daha sonra ergenlik yıllarında New Age (Epik Müzik) müziğe merak sarmış, sonrasında ise müzikal bilgi birikimini çeşitli şekillerde kullanmak ve farklı müzik türleriyle sentezlemek istemiştir. Rap müzik yapmaya ilk lise yılında başlamış, kendine “Salazar Records” isimli bir Ev Stüdyosu kurmuştur. Şarkılarının altyapılarından liriklerine, kapak tasarımlarından aranje ve mix mastering işlemlerine kadar birçok işi üstlenmiştir.')
    .addField('➖➖➖➖➖', 'Lise son sınıfa kadar katıldığı Hiphop etkinlikleri, Freestyle Battle (Doğaçlama Rap Yarışması) Turnuvalarındaki birincilikleri ve “Salazar Records” isimli kendi YouTube kanalına yüklediği şarkılar sayesinde kemik bir kitle oluşturmayı başarmıştır. Yine de akademik olarak kendini oldukça eksik hisseden Kardiyak, en sonunda Haliç Üniversitesi Konservatuarı Opera ve Konser Şarkıcılığı bölümü kazanmış ve bir yandan da Galatasaray ITM de Mix Mastering eğitim almaya başlamıştır. Okulda öğrendiklerini git gide daha da müziğine yansıtmayı başarmış ve her şarkıda tıpkı bir tiyatro oyuncusu gibi farklı karakterlere dönüşmek ya da birbirinden bağımsız konseptler ile dinleyiciye yalnızca bir müzikten daha fazlasını bulacakları bir deneyim yaşatmayı amaçladığı Epik Rap adını verdiği farklı bir müzik türü ortaya koymuştur.')
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    message.channel.send(kanal);
  }
});


client.login('ODIxNjU5NDAzODYxMjI5NTY4.YFG78w.I3qtnBPXcvtb4uy3aV0U0FIbkoY');
