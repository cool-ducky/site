const doStuff = async () => {
  const search = window.location.search;
  const urlParams = new URLSearchParams(search);
  const code = urlParams.get('code')
  if (!code) {
    window.location.replace("http://imagine.cf/404");
    return alert('You did not login through discord!')
  }
  const getToken = async () => {
    const response = await fetch(`https://imagine.cf/token?code=${code}`, {
      method: 'GET',
    })
    const json = await response.json()
    if (json.msg == 'Invalid Code!') {
      window.location.replace("http://imagine.cf/404");
      return alert('An error occured while validating with discord, please send ducky#8930 a friend request to go through your appeal.')
    }
    return json.msg
  }
  const user = await getToken()
  console.log(user)
  const avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
  document.getElementById('avatar').src = avatar
  document.getElementById('email').innerHTML = user.email
  document.getElementById('tag').innerHTML = `${user.username}#${user.discriminator}`
  console.log(user)
  const form = document.getElementById('form')
  form.addEventListener('submit', (e) => {
    let ban = document.getElementById('ban').value
    let unban = document.getElementById('unban').value
    if (ban.length + unban.length > 2000) {
      alert('Your responses must be less than 2000 characters.')
      return e.preventDefault()
    }
    alert('Submitted')
    window.location.replace('https://imagine.cf')
    fetch('https://imagine.cf/hook', {
      method: 'POST',
      body: JSON.stringify({ ban, unban, user, avatar }),
      headers: {
        "Content-Type": "application/json"
      }
    })
  })
}
doStuff()

