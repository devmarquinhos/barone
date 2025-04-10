package com.devmarquinhos.br.controller;

import com.devmarquinhos.br.model.Recipe;
import com.devmarquinhos.br.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    // Salvar alteracoes
    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable Integer id, @RequestBody Recipe updatedRecipe) {
        return recipeService.updateRecipe(id, updatedRecipe);
    }

    // Apagar uma receita
    @DeleteMapping("/{id}")
    public String deleteRecipe(@PathVariable Integer id) {
        recipeService.deleteRecipe(id);
        return "Receita deletada com sucesso.";
    }

    // Salvar receita no usuario
    @PostMapping("/user/{userId}")
    public Recipe saveRecipe(@PathVariable Integer userId, @RequestBody Recipe recipe) {
        return recipeService.saveRecipe(userId, recipe);
    }

    // Ver receitas de um usuario
    @GetMapping("/user/{userId}")
    public List<Recipe> getUserRecipes(@PathVariable Integer userId) {
        return recipeService.getRecipesByUserId(userId);
    }

    // Ver todas as receitas
    @GetMapping()
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/public")
    public List<Recipe> getPublicRecipes() {
        return recipeService.getPublicRecipes();
    }
}
