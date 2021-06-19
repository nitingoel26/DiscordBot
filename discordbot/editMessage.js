


module.exports = async (client, id, text) => {
    const channel = await client.channels.fetch(id)
  
    channel.messages.fetch().then((messages) => {
      if (messages.size === 0) {
        channel.send(text);
    }
  })}