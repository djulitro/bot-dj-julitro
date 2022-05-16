const { player } = require(".");

module.exports = async (client, msg, args, command) => {
  if (command === "play") {
    const channel = msg.member.voice.channel;
    if (!channel)
      return msg.channel.send("Necesitas unirte al canal de voz!!!");

    const search_music = args.join(" ");
    if (!search_music)
      return msg.channel.send("Introduce el nombre o el enlace de la canción!!!");

    const queue = player.createQueue(msg.guild.id, {
      metadata: {
        channel: msg.channel,
      },
    });

    try {
      if (!queue.connection) await queue.connect(channel);
    } catch (error) {
      queue.destroy();
      return await msg.reply({
        content: "No se puede unir al servidor!!",
        ephemeral: true,
      });
    }

    const song = await player.search(search_music, {requestedBy: msg.author,}).then((x) => x.tracks[0]);
    client.user.setActivity(song.title, { type: "LISTENING" });
    if (!song) return msg.reply(`Error al buscar música: ${search_music}!!!`);
    queue.play(song);

    msg.channel.send({ content: `⏳ | Buscando... **${song.title}**!` });
  } else if (command === "skip") {
    const queue = player.getQueue(msg.guild.id);
    queue.skip();
    msg.channel.send(`Proxima canción...`);
  } else if (command === "stop") {
    const queue = player.getQueue(msg.guild.id);
    queue.stop();
    var despedida = ['chao hijo la perra', 'nos vemos chuche...', 'chao pato reculiao', 'pa que conchetumare me llamai aweonao'];
    let mygroceries = despedida[Math.floor(Math.random() * despedida.length)]
    msg.channel.send(mygroceries);
  } else if (command === "pause") {
    const queue = player.getQueue(msg.guild.id);
    queue.setPaused(true);
    msg.channel.send(`Pausa...`);
  } else if (command === "resume") {
    const queue = player.getQueue(msg.guild.id);
    queue.setPaused(false);
    msg.channel.send(`Play...`);
  }else if (command === "time"){
    const queue = player.totalTime;
    console.log(player.totalTime);
    // msg.channel.send(queue);
  }else if (command === "ping"){
    var ping = ['chupalo axel', 'chupalo vito', 'chupalo pato', 'que wea pao qlo', 'mascame la cabeza', 'lo que pega ese ctm'];
    let myping = ping[Math.floor(Math.random() * ping.length)]
    msg.channel.send(myping)
  }
};
