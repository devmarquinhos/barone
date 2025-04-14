let receitaSelecionadaId = null;

function showToast(mensagem) {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = mensagem;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
  }, 2500);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

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
          <div class="rating" id="rating-${recipe.id}">⭐ Carregando...</div>
          <span style="font-size: 12px; float: right;">${recipe.createdAt}</span>
        `;
      
        card.onclick = () => abrirVisualizacaoReceita(recipe);
        grid.appendChild(card);
      
        fetch(`http://localhost:8080/ratings/average/${recipe.id}`)
          .then(res => res.json())
          .then(nota => {
            const ratingDiv = document.getElementById(`rating-${recipe.id}`);
            ratingDiv.textContent = `⭐ ${nota.toFixed(1)}`;
          })
          .catch(() => {
            const ratingDiv = document.getElementById(`rating-${recipe.id}`);
            ratingDiv.textContent = "⭐ Sem nota";
          });
      });
    });
}

function abrirVisualizacaoReceita(recipe) {
  receitaSelecionadaId = recipe.id;
  document.getElementById("viewNome").textContent = recipe.recipeName;
  document.getElementById("viewTipo").textContent = recipe.recipeType;
  document.getElementById("viewDescricao").textContent = recipe.description;
  document.getElementById("viewData").textContent = recipe.createdAt;
  document.getElementById("autorReceita").textContent = recipe.user?.username || recipe.user?.email || "Autor desconhecido";
  document.getElementById("modalViewOverlay").style.display = "flex";
  renderizarEstrelas(recipe.userScore || 0);
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

function renderizarEstrelas(scoreAtual = 0) {
  const container = document.getElementById("estrelas");
  container.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const estrela = document.createElement("span");
    estrela.textContent = "★";
    estrela.className = "estrela";
    estrela.dataset.index = i;

    estrela.style.color = i <= scoreAtual ? "#FFD700" : "#555";

    estrela.addEventListener("mouseenter", () => {
      const estrelas = container.querySelectorAll(".estrela");
      estrelas.forEach((el, idx) => {
        el.style.color = idx < i ? "#FFD700" : "#555";
      });
    });

    estrela.addEventListener("mouseleave", () => {
      const estrelas = container.querySelectorAll(".estrela");
      estrelas.forEach((el, idx) => {
        el.style.color = idx < scoreAtual ? "#FFD700" : "#555";
      });
    });

    estrela.addEventListener("click", () => enviarAvaliacao(receitaSelecionadaId, i));

    container.appendChild(estrela);
  }
}

function enviarAvaliacao(recipeId, score) {
  const userId = localStorage.getItem("userId");
  if (!userId) return alert("Você precisa estar logado para avaliar.");

  const url = `http://localhost:8080/ratings?userId=${userId}&recipeId=${recipeId}&score=${score}`;

  fetch(url, {
    method: "POST"
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao enviar avaliação");
      return res.json();
    })
    .then(() => {
      showToast("Avaliação enviada com sucesso!");
      carregarReceitasPublicas();
    })
    .catch(err => {
      alert("Erro ao avaliar: " + err.message);
    });
}

document.querySelectorAll("textarea").forEach(textarea => {
  textarea.addEventListener("input", () => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  });
});



window.onload = carregarReceitasPublicas;
