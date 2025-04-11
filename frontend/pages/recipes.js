function logout() {
    localStorage.removeItem("userId");
    window.location.href = "/index.html";
  }

  function irParaExplorar() {
    window.location.href = "/pages/explore.html";
  }
  
  function showToast(mensagem) {
    const toastContainer = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = mensagem;
    toastContainer.appendChild(toast);
  
    // Espera o tempo da animação + um pouco antes de remover
    setTimeout(() => {
      toast.style.opacity = "0"; // força sumir se não aplicar keyframe 100%
    }, 2500);
  
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
  
  function abrirModal() {
    document.getElementById("modalOverlay").style.display = "flex";
  }
  
  function fecharModal() {
    document.getElementById("modalOverlay").style.display = "none";
  }

  function abrirModalVisualizacao(recipe) {
    receitaSelecionadaId = recipe.id;
    document.getElementById("editNome").value = recipe.recipeName;
    document.getElementById("editTipo").value = recipe.recipeType;
    document.getElementById("editDescricao").value = recipe.description;
    document.getElementById("editPublicaReceita").checked = recipe.isPublic;
    document.getElementById("modalViewOverlay").style.display = "flex";
  }
  
  function fecharModalVisualizacao() {
    document.getElementById("modalViewOverlay").style.display = "none";
    receitaSelecionadaId = null;
  }
  
  function salvarReceita() {
    const userId = localStorage.getItem("userId");
    const recipeName = document.getElementById("nomeReceita").value;
    const recipeType = document.getElementById("tipoReceita").value;
    const description = document.getElementById("modoPreparo").value;
    const isPublic = document.getElementById("publicaReceita").checked;

    const novaReceita = {
      recipeName,
      recipeType,
      description,
      isPublic
    };
  
    fetch(`http://localhost:8080/recipes/user/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaReceita)
    })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao salvar a receita.");
      return res.json();
    })
    .then(() => {
      fecharModal();
      carregarReceitas();
    })
    .catch(err => {
      alert("Erro: " + err.message);
    });
  }
  
  function getUserId() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Você precisa estar logado para ver suas receitas.");
      window.location.href = "/index.html";
    }
    return userId;
  }

  function criarReceita() {
    const userId = localStorage.getItem("userId");
    const tipo = document.getElementById("tipoReceita").value;
    const nome = document.getElementById("nomeReceita").value;
    const descricao = document.getElementById("modoPreparo").value;
    const isPublic = document.getElementById("publicaReceita").checked;
  
    if (!userId || !nome || !descricao) return alert("Preencha todos os campos!");
  
    fetch(`http://localhost:8080/recipes/user/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeName: nome, recipeType: tipo, description: descricao, isPublic })
    })
      .then(res => res.json())
      .then(() => {
        fecharModal();
        carregarReceitas();
        showToast("Receita criada com sucesso!");
      });
  }
  
  function carregarReceitas() {
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:8080/recipes/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        const grid = document.getElementById("recipeGrid");
        grid.innerHTML = `
          <div class="card create-card" onclick="abrirModal()">
            <div>
              <p>＋</p>
              <span>Clique aqui para criar<br />uma nova receita</span>
            </div>
          </div>`;
  
        data.forEach(recipe => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <h3>${recipe.recipeName}</h3>
            <span>${recipe.recipeType}</span>
            <p>${recipe.description}</p>
            <span style="font-size: 12px; float: right;">${new Date(recipe.createdAt).toLocaleDateString()}</span>
          `;
          card.onclick = () => abrirModalVisualizacao(recipe);
          grid.appendChild(card);
        });
      });
  }

  function salvarEdicao() {
    const nome = document.getElementById("editNome").value;
    const tipo = document.getElementById("editTipo").value;
    const descricao = document.getElementById("editDescricao").value;
    const isPublic = document.getElementById("editPublicaReceita").checked;
  
    if (!nome || !descricao) return alert("Preencha todos os campos!");
  
    fetch(`http://localhost:8080/recipes/${receitaSelecionadaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeName: nome, recipeType: tipo, description: descricao, isPublic })
    })
      .then(res => res.json())
      .then(() => {
        fecharModalVisualizacao();
        carregarReceitas();
        showToast("Receita atualizada com sucesso!");
      })
      .catch(err => alert("Erro: " + err.message));
  }

  function deletarReceita() {
    if (!confirm("Tem certeza que deseja excluir esta receita?")) return;
  
    fetch(`http://localhost:8080/recipes/${receitaSelecionadaId}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao excluir");
        return res.text();
      })
      .then(() => {
        fecharModalVisualizacao();
        carregarReceitas();
        showToast("Receita excluída com sucesso!");
      })
      .catch(err => alert("Erro: " + err.message));
  }
  
  window.onload = carregarReceitas;