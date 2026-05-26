const btns = document.querySelectorAll(".btn-fav");
if (btns.length) {
  btns.forEach((btn) => btn.addEventListener("click", sendData));
}
const sendData = async (e) => {
  const login = e.currentTarget.dataset.login;
  // On verra plus tard comment bien gérer la ligne suivante avec try/catch pour capturer et traiter l'erreur
  const user = (await fetch(`https://api.github.com/users/${login}`)).json();
  fetch("/users/favourite", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((res) => res.json())
    // ici de l'objet qu'on récupère dans le then on décompose pour récupérer uniquement la propriété message
    .then(({ message }) => alert(message))
    .catch((err) => console.error("error", err));
};
