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
const fetch = require('node-fetch');
const player = require('discordjs-ytdl-advanced');

var hedef = hedefimiz.hedef

const { readdirSync } = require('fs'); // tanımlamalar
const { join } = require('path'); // tanımlamalar

const prefix = işaret.prefix


client.on('ready', () => {
    console.log(`${client.user.tag} botu kullanıma hazır`)
    const durumlar = [
      "tk!help",
      "Güncellemeleri ve yenilikleri önceden öğrenmek ve kullanmak için Beta Discord sunucumuza gelebilirsiniz.",
      `Tam ${client.guilds.cache.size} sunucuda aktif olarak kullanılıyorum!!!`
    ]
    setInterval(function () {
      let durum = durumlar[Math.floor(Math.random()*durumlar.length)]
      client.user.setActivity(durum)
    }, 10000);
});


client.on('guildMemberAdd', member => {
  try {
  const hedef = 3000
  const girişçıkış = member.guild.channels.cache.find(channel => channel.name === '🎯・hedef');
  girişçıkış.send(`${member} seninle birlikte **${member.guild.memberCount}** üye olduk. Hedefimiz **${hedef}** üye. Arkadaşlarınızı davet etmeyi unutmayın`);
} catch(e) {
    console.log(e)
}
});

client.on('guildMemberRemove', member => {
  try {
  const hedef = 3000
  const girişçıkış = member.guild.channels.cache.find(channel => channel.name === '🎯・hedef');
  girişçıkış.send(`${member} sunucudan ayrıldı. 😔 Üye sayımız **${member.guild.memberCount}**. Hedefimiz **${hedef}** üye.`);
} catch(e) {
    console.log(e)
}
});

client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'kick')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bunu yapacak yetkiye sahip olduğunu düşünmüyorum..')
    const args1 = message.content.split(' ').slice(2)
    const neden = args1.join(" ")
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick()
          .then(() => {
            try => {
            const kanal = client.channels.cache.find(ch => ch.id === '776538943445401601')
            const embed = new MessageEmbed()
            .setTitle('Kick')
            .setDescription('Olay: `Kick`')
            .setThumbnail('https://cdn.discordapp.com/attachments/826027915179065364/826150679546036234/logo.png')
            .addField('Kişi:', user)
            .addField('Neden:', neden)
            .addField('Kickleyen Yetkili:', `<@${message.author.id}>` )
            kanal.send(embed);
            message.channel.send(member + ' kişisi kicklenmiştir.');
          })
          .catch(err => {
            message.channel.send('Bunu yapamam.');
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
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban()
          .then(() => {
           try => {
           const kanal = client.channels.cache.find(ch => ch.id === '776538943445401601')
           const embed = new MessageEmbed()
           .setTitle('Ban')
           .setDescription('Olay: `Ban`')
           .setThumbnail('https://cdn.discordapp.com/attachments/826027915179065364/826150679546036234/logo.png')
           .addField('Kişi:', user)
           .addField('Neden:', neden)
           .addField('Banlayan Yetkili: ', `<@${message.author.id}>`)
           kanal.send(embed)
           message.channel.send(member + ' kişisi banlanmıştır.');
          })
          .catch(err => {
            message.channel.send('Bunu yapamam.');
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
    const channel = client.channels.cache.find(ch => ch.id === '826422140202647572')
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
    const channel = client.channels.cache.find(ch => ch.id === '826422226324291634')
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
    .setThumbnail('https://cdn.discordapp.com/attachments/826027915179065364/826150679546036234/logo.png')
    .addField(botmesajı, "🟢")
    .addField(botmesajıa, "🔴")
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
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
        if (isNaN(args)) return message.reply('lütfen bir sayı giriniz.');
        if (args < 2 || args > 100) return message.reply('Lütfen 2 ile 100 arasında bir sayı giriniz.');
        message.channel.bulkDelete(Number(args))
        const { MessageEmbed} = require('discord.js')
        message.delete(message.author)
        const embed = new MessageEmbed()
        .setTitle('Mesajlar Başarıyla Silindi!')
        .setDescription('Silinen Mesaj Sayısı: ' + args)
        .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
        message.channel.send(embed).then(mesaj => {
          setTimeout(function () {
            mesaj.delete()
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

client.on('message', async message => {
    if (message.content.startsWith(prefix + 'kullanıcı')) {
        let üye = message.mentions.users.first()
        if (üye) {
            let durum = üye.presence.status
            .replace('online', 'Çevrimiçi')
            .replace('idle', 'Boşta')
            .replace('dnd', 'Rahatsız Etmeyin')
            .replace('offline', 'Çevrimdışı')
            const embed = new MessageEmbed()
            .setThumbnail(üye.displayAvatarURL({dynamic: true}))
            .setColor('RANDOM')
            .setTitle(üye.username)
            .setDescription(üye.tag + ` kişinin bilgileri:\n\nKullanıcı Adı: ${üye.username}\n\nEtiketi: ${üye.discriminator}\n\nID: ${üye.id}\n\nKullanıcı Bot Mu? ${üye.bot ? 'Evet' : 'Hayır'}\n\nKullanıcı Aktivitesi: ${üye.presence.activities[0] ? üye.presence.activities[0].state : 'YOK'}\n\nÜye Durumu: ${durum}\n\nHesabın Oluşturulma Tarihi: ${moment(üye.createdAt).format('DD')}/${moment(üye.createdAt).format('MM')}/${moment(üye.createdAt).format('YY HH:mm:ss')}\n\nRoller: ${message.guild.members.cache.get(üye.id).roles.cache.filter(r => r.name !== "@everyone").map(r => r).join('  |  ')}`)
            .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
            message.channel.send(embed)
        } else {
            üye = message.author
            let durum = üye.presence.status
            .replace('online', 'Çevrimiçi')
            .replace('idle', 'Boşta')
            .replace('dnd', 'Rahatsız Etmeyin')
            .replace('offline', 'Çevrimdışı')
            const embed = new MessageEmbed()
            .setThumbnail(üye.displayAvatarURL({dynamic: true}))
            .setColor('RANDOM')
            .setTitle(üye.username)
            .setDescription(üye.tag + ` kişinin bilgileri:\n\nKullanıcı Adı: ${üye.username}\n\nEtiketi: ${üye.discriminator}\n\nID: ${üye.id}\n\nKullanıcı Bot Mu? ${üye.bot ? 'Evet' : 'Hayır'}\n\nKullanıcı Aktivitesi: ${üye.presence.activities[0] ? üye.presence.activities[0].state : 'YOK'}\n\nÜye Durumu: ${durum}\n\nHesabın Oluşturulma Tarihi: ${moment(üye.createdAt).format('DD')}/${moment(üye.createdAt).format('MM')}/${moment(üye.createdAt).format('YY HH:mm:ss')}\n\nRoller: ${message.guild.members.cache.get(üye.id).roles.cache.filter(r => r.name !== "@everyone").map(r => r).join('  |  ')}`)
            .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
            message.channel.send(embed)
        }
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
    .setThumbnail('https://cdn.discordapp.com/attachments/826027915179065364/826150679546036234/logo.png')
    .addField('🙋 Kullanıcı Sayısı:', client.users.cache.size + ' Kullanıcı' )
    .addField('🏢 Sunucu Sayısı:', client.guilds.cache.size + ' Sunucu' )
    .addField('💠 Kanal Sayısı', client.channels.cache.size + ' Kanal' )
    .addField('🙇 Bot Sahibi', 'Mockir 👑#2102 ')
    .addField('🖌 Tasarımcımız', 'Albus.png #1290')
    .addField('⏱️ Çalışma Süresi', uptime)
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    message.channel.send(kanal);
  }
});

client.on('message', async message => {
  if (message.content.startsWith() === prefix + 'avatar') {
      let user = message.mentions.users.first();
      if (user) {
          const kanal = new MessageEmbed()
              .setTitle(`**${user.tag} ADLI KULLANICININ AVATARI**`)
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
    if (message.content.startsWith(prefix + 'ayrıl')) {
      if (!message.member.voice.channel) return message.channel.send('Bir sesli kanalda değilsiniz.');
      if (!message.guild.me.voice.channel) return message.channel.send('Bot bir sesli kanalda değil.')
      if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send('Bot ile aynı sesli kanalda değilsiniz.')
      message.member.voice.channel.leave()
      message.channel.send('Sesli kanaldan çıktım. Tekrar şarkı dinlemek istersen tk!play yazman yeterli..')
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
  member.setNickname(args.join(" | "))
  member.roles.add(role)
  member.roles.remove(roles)
     const kanal = new MessageEmbed()

    .setTitle('KAYIT')
    .setThumbnail('https://cdn.discordapp.com/attachments/826027915179065364/826150679546036234/logo.png')
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
  if (msg.content.toLowerCase() === prefix) {
    msg.channel.send('tk!help yazarak bot ile ilgili ayrıntılı bilgiye erişebilirsiniz.');
  }
  if (msg.content.toLowerCase() === 'merhaba') {
    msg.channel.send(`<@${msg.author.id}>` + ' merhaba dostum, nasılsın?')
  }
  if (msg.content.toLowerCase() === 'Mitzi') {
    msg.channel.send('Merhaba ben Mitzi 👋')
  }
  if (msg.content.toLowerCase() === 'sen nasılsın bot') {
    msg.channel.send('Tam gaz çalışmaya devam..');
  }
  if (msg.content.toLowerCase() === 'iyiyim sen nasılsın bot') {
    msg.channel.send('Tam gaz çalışmaya devam..');
  }
  if (msg.content.toLowerCase() === 'kötüyüm sen nasılsın bot') {
    msg.channel.send('Tam gaz çalışmaya devam..');
  }
  if (msg.content.toLowerCase() === 'nasılsın bot') {
    msg.channel.send('Tam gaz çalışmaya devam..');
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
  if (msg.content.toLowerCase() === prefix + 'beta') {
    msg.channel.send('https://discord.gg/GZv84fm2ad');
  }
  if (msg.content.toLowerCase() === prefix + 'test') {
    msg.channel.send('Mitzi Bot Çalışıyor!\n\n`tk!help` yazarak komutlara erişebilirsiniz.\n\nMitzi Bot iyi günler diler.');
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

    .setTitle('Mitzi Bot Yardım')
    .setDescription('Size nasıl yardımcı olabilirim?')
    .setColor("RANDOM")
    .setThumbnail('https://cdn.discordapp.com/attachments/826027915179065364/826150679546036234/logo.png')
    .addField('**YENİ GÜNCELLEME**', '**-** tk!covid ve tk!covidtr komutu eklenmiştir. Bu sayede Dünyada ve Türkiyedeki anlık korona değerlerini öğrenebilirsiniz.')
    .addField('tk!bilgi', 'Botun istatistiklerini gösterir.')
    .addField('tk!beta', 'Botun Beta deneme sunucusunun linkini gönderir.')
    .addField('tk!komutlar', 'Mitzi Bot komutlarını gösterir. ')
    .addField('tk!botdavet', 'Mitzi Botu sunucunuza davet etmenizi sağlar. ')
    .addField('tk!istatistik', 'Botun istatistiklerini gösterir.')
    .addField('tk!öneri <fikir>', 'Bota sizce neler eklemeliyiz? Fikirlerinizi bizimle paylaşmalısınız.')
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    message.channel.send(kanal);
  }
});


client.on('message', message => {
  if (message.content.toLowerCase() === prefix + 'bilgi') {
    const kanal = new MessageEmbed()

    .setTitle('Mitzi Bot Bilgi')
    .setColor("RANDOM")
    .setThumbnail('https://cdn.discordapp.com/attachments/826027915179065364/826150679546036234/logo.png')
    .addField('Mitzi', 'Şarkı Dinleme, Moderasyon, Kayıt, Oylama gibi komutları bulunan bir bot ')
    .addField('Yapımcı', 'Mockir 👑#2102 (Mockir Medya Kurucusu)')
    .addField('Tasarımcımız', 'Albus.png #1290')
    .addField('Destekleyiciler ', '[MockirMedya(Beta Deneme Sunucusu)](https://discord.gg/h8stvaDQnP)')
    .addField('tk!botdavet', 'Mitzi Botu sunucunuza davet etmenizi sağlar.')
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    message.channel.send(kanal);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === prefix + 'botdavet') {
    const kanal = new MessageEmbed()

    .setTitle('Mitzi Bot Davet')
    .setColor("RANDOM")
    .setThumbnail('https://cdn.discordapp.com/attachments/826027915179065364/826150679546036234/logo.png')
    .addField('**BOTU SUNUCUNUZA DAVET EDİN**', '[Tıkla ve Botu sunucuna ekle](https://discord.com/oauth2/authorize?client_id=821659403861229568&scope=bot&permissions=2147483647)')
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    message.channel.send(kanal);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === prefix + 'moderasyon') {
    const kanal = new MessageEmbed()

    .setTitle('Mitzi Bot Moderasyon Komutları')
    .setColor("RANDOM")
    .setThumbnail('https://cdn.discordapp.com/attachments/826027915179065364/826150679546036234/logo.png')
    .addField('tk!ban <kişi>', 'Etiketlediğiniz kişiyi banlamanızı sağlar. ')
    .addField('tk!kick <kişi>', 'Etiketlediğiniz kişiyi kicklemenizi sağlar. ')
    .addField('tk!oylama <seçenek1> <seçenek2>', 'Belirttiğiniz 2 seçenek arasında oylama başlatırsınız.\n(Rolleri Yönet özelliği olan her kişi veya rol kullanabilir.)')
    .addField('tk!sil <sayı>', 'Belirttiğiniz kadar mesajı silmenizi sağlar. ')
    .addField('tk!çekiliş <süre> <ödül>', 'HENÜZ DÜZENLENİYOR. ')
    .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
    message.channel.send(kanal);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === prefix + 'komutlar') {
    const kanal = new MessageEmbed()

    .setTitle('Mitzi Bot Komutları')
    .setColor("RANDOM")
    .setThumbnail('https://cdn.discordapp.com/attachments/826027915179065364/826150679546036234/logo.png')
    .addField('tk!help', 'Bot ile ilgili ayrıntılı bilgi için bir panel açılır. ')
    .addField('tk!play', 'Adınız yazdığınız şarkıyı çalar. ')
    .addField('tk!ayrıl', 'Bot bir sesli kanalda iken sesli kanaldan ayrılmasını sağlar.') 
    .addField('tk!kullanıcı <kişi>', 'Etiketlediğiniz kişinin bilgilerini aktarır. ')
    .addField('tk!moderasyon', 'Moderasyon komutlarını içerir. ')
    .addField('tk!avatar', 'Mesajı yazan kişinin profil resmini gönderir. ') 
    .addField('tk!oylama <birinci kişi> <ikinci kişi> ', 'Belirttiğiniz kişiler arasında oylama yapar. ')
    .addField('tk!oyunara <oyun> <arananoyuncuözellikleri>', 'Bir oyun arkadaşı aramanıza yardımcı olur ')
    .addField('tk!covid', 'Tüm dünyanın korona değerlerini gösterir.')
    .addField('tk!covidtr', 'Türkiyenin korona değerlerini gösterir.')
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
      
      .setDescription(`**Oyun Arayan:**  <@${message.author.id}>`)
      .setThumbnail('https://cdn.discordapp.com/attachments/826027915179065364/826150679546036234/logo.png')
      .setColor("RANDOM")
      .addField("Oyun:", game)
      .addField('Sesli Kanal:', `${message.member.voice.channel}`)
      .addField("Not:", not)
      .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
      message.channel.send(embed)
    } else {
message.reply('Önce sesli bir kanala katılmalısınız!')
    }
  }
});


client.on('message', async message => {
  if (message.content.startsWith(prefix + 'play')) {
    const args = message.content.split(' ').slice(1)
    if (!args[0]) return message.channel.send('Lütfen bir şarkı ismi giriniz')
    if (message.member.voice.channel){
      try {
      const connection = await message.member.voice.channel.join()
      const şarkı = await player(args.join(" "))
      şarkı.play(connection)
      const embed = new MessageEmbed()
      .setTitle(şarkı.title)
      .setDescription(`**[${şarkı.title}](${şarkı.url})**`)
      .setColor('RANDOM')
      .setImage(`${şarkı.thumbnail}\n`)
      .addField('Süre:', `${şarkı.time}`)
      message.channel.send(embed);
     } catch(err) {
      message.channel.send('Şarkı bulunamadı.')
    }
  } else {
      message.channel.send('Lütfen bir sesli kanala giriniz.')
    }
  }
});

  
  client.on('message', message => {
    if (message.content.toLowerCase() === prefix + 'covidtr') {
        try{
          const respo = fetch("https://coronavirus-19-api.herokuapp.com/countries/Turkey").then(ok => ok.json())
          .then(json => {
            const embed = new MessageEmbed()
          .setDescription('**Türkiye İçin Sonuçlar:**')
          .setThumbnail('https://cdn.discordapp.com/attachments/826027915179065364/826150679546036234/logo.png')
          .setColor("RANDOM")
          .addField('😷 **Toplam Vaka:**', `${json.cases}`)
          .addField('🏥 **Günlük Hasta:**', `${json.todayCases}`)
          .addField('⚰️ **Toplam Ölü:**', `${json.deaths}`)
          .addField('☠️ **Günlük Ölü:**', `${json.todayDeaths}`)
          .addField('💊 **Toplam İyileşen:**', `${json.recovered}`)
          .addField('😷 **Aktif Vaka:**', `${json.active}`)
          .addField('🆘 **Ağır Hasta:**', `${json.critical}`)
          .addField('🧪 **Toplam Test:**', `${json.totalTests}`)
          .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
          message.channel.send(embed);
        });
        } catch (err) {
           console.log(err);
        }
      
      }
  });
  
  client.on('message', message => {
    if (message.content.toLowerCase() === prefix + 'covid') {
        try{
          const respo = fetch("https://coronavirus-19-api.herokuapp.com/all").then(ok => ok.json())
          .then(json => {
            const embed = new MessageEmbed()
          .setDescription('**Bütün Dünya İçin Sonuçlar:**')
          .setThumbnail('https://cdn.discordapp.com/attachments/826027915179065364/826150679546036234/logo.png')
          .setColor("RANDOM")
          .addField('😷 **Toplam Vaka:**', `${json.cases}`)
          .addField('⚰️ **Toplam Ölü:**', `${json.deaths}`)
          .addField('💊 **Toplam İyileşen:**', `${json.recovered}`)
          .setFooter('Bot ile ilgili sorun ve sorularınızı discord sunucumuza gelerek yardım alabilirsiniz.')
          message.channel.send(embed);
        });
        } catch (err) {
           console.log(err);
        }
      
      }
  });

  client.on('message', message => {
    if (message.content.startsWith(prefix + 'insta')) {
        try{
          const args = message.content.split(' ').slice(1)
          const respo = fetch(`https://videfikri.com/api/igstalk/?username=${args}`).then(res => res.json())
          .then(json => {
            const embed = new MessageEmbed()
            .setTitle('**ARADAĞINIZ İNSTAGRAM HESABININ BİLGİLERİ**')
            .setImage(`${json.result.profile_hd}`)
            .addField('Adı:', `${json.result.full_name}`)
            .addField('Kullanıcı Adı:', `${json.result.username}`)
            .addField('Biografi:', `${json.result.bio}`)
            .addField('Takipçi:', `${json.result.followers}`)
            .addField('Takip Edilen:', `${json.result.following}`)
            .addField('Gönderi Sayısı:', `${json.result.post_count}`)
            message.channel.send(embed);
          });
        } catch (err) {
           console.log(err);
        }
      
      }
  });

client.login('ODIxNjU5NDAzODYxMjI5NTY4.YFG78w.KN7HMkeF37S1F8owW3iFvKX1rDs');
