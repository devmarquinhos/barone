/** Atualizado: suporte a comentários em receitas públicas na página explore **/

let receitaSelecionadaId = null;

function carregarReceitasPublicas() {
  fetch("http://localhost:8080/recipes/public")
    .then(res => res.json())
    .then(data => {
      const grid = document.getElementById("publicRecipeGrid");
      grid.innerHTML = "";

      data.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${recipe.recipeName}</h3>
          <span>${recipe.recipeType}</span>
          <p>${recipe.description}</p>
          <span style="font-size: 12px; float: right;">${new Date(recipe.createdAt).toLocaleDateString()}</span>
        `;
        card.onclick = () => abrirVisualizacaoReceita(recipe);
        grid.appendChild(card);
      });
    });
}

function abrirVisualizacaoReceita(recipe) {
  receitaSelecionadaId = recipe.id;
  document.getElementById("viewNome").textContent = recipe.recipeName;
  document.getElementById("viewTipo").textContent = recipe.recipeType;
  document.getElementById("viewDescricao").textContent = recipe.description;
  document.getElementById("viewData").textContent = new Date(recipe.createdAt).toLocaleDateString();
  document.getElementById("autorReceita").textContent = recipe.user?.username || recipe.user?.email || "Autor desconhecido";
  document.getElementById("modalViewOverlay").style.display = "flex";
  carregarComentarios(recipe.id);
}

function fecharModalVisualizacao() {
  document.getElementById("modalViewOverlay").style.display = "none";
  document.getElementById("comentariosContainer").innerHTML = "";
  document.getElementById("novoComentario").value = "";
}

function voltarParaMinhasReceitas() {
  window.location.href = "recipes.html";
}

function carregarComentarios(recipeId) {
  fetch(`http://localhost:8080/comments/recipe/${recipeId}`)
    .then(res => res.json())
    .then(comments => {
      const container = document.getElementById("comentariosContainer");
      container.innerHTML = "";
      if (comments.length === 0) {
        container.innerHTML = "<p style='color: #999;'>Nenhum comentário ainda.</p>";
        return;
      }
      comments.forEach(comment => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${comment.user?.username || comment.user?.email || "Anônimo"}:</strong> ${comment.text}`;
        container.appendChild(p);
      });
    });
}

function enviarComentario(recipe) {
  const userId = localStorage.getItem("userId");
  const text = document.getElementById("novoComentario").value;
  if (!text.trim()) return;

  fetch(`http://localhost:8080/comments/recipe/${receitaSelecionadaId}/user/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao comentar");
      return res.json();
    })
    .then(() => {
      document.getElementById("novoComentario").value = "";
      carregarComentarios(receitaSelecionadaId);
    })
    .catch(err => alert("Erro: " + err.message));
}

window.onload = carregarReceitasPublicas;
