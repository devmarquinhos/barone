let isLogin = true;
console.log("passando")

function toggleMode() {
  isLogin = !isLogin;
  document.getElementById("form-title").textContent = isLogin ? "Login" : "Cadastro";
  document.querySelector("button").textContent = isLogin ? "Entrar" : "Cadastrar";
  document.getElementById("username-group").style.display = isLogin ? "none" : "block";
  document.querySelector(".toggle").textContent = isLogin ?
    "Não tem uma conta? Cadastre-se" :
    "Já tem uma conta? Faça login";
}

document.getElementById("auth-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;

  const baseUrl = "http://localhost:8080";
  const endpoint = isLogin ? `${baseUrl}/users/login` : `${baseUrl}/users/register`;
  const payload = isLogin ? { email, password } : { email, password, username };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Erro na requisição");

    const result = await response.json();

    if (isLogin) {
      alert("Login realizado com sucesso!");

      // Salva o ID do usuário e token no localStorage
      localStorage.setItem("userId", result.id);
      localStorage.setItem("token", result.token);

      // Redireciona para a página das receitas
      window.location.href = "/pages/recipes.html";
    } else {
      alert("Cadastro realizado com sucesso!");
    }

    console.log(result);
  } catch (err) {
    alert("Erro: " + err.message);
  }
});
