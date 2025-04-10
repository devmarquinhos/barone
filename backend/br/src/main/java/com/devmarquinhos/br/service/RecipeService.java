package com.devmarquinhos.br.service;

import com.devmarquinhos.br.model.Recipe;
import com.devmarquinhos.br.model.User;
import com.devmarquinhos.br.repository.RecipeRepository;
import com.devmarquinhos.br.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;
    @Autowired
    private UserRepository userRepository;

    public Recipe updateRecipe(Integer id, Recipe updatedRecipe) {
        Optional<Recipe> optRecipe = recipeRepository.findById(id);

        if (optRecipe.isPresent()) {
            Recipe recipe = optRecipe.get();
            recipe.setRecipeName(updatedRecipe.getRecipeName());
            recipe.setRecipeType(updatedRecipe.getRecipeType());
            recipe.setDescription(updatedRecipe.getDescription());
            recipe.setIsPublic(updatedRecipe.getIsPublic());

            return recipeRepository.save(recipe);
        } else {
            throw new RuntimeException("Receita não encontrada com o id: " + id);
        }
    }

    public void deleteRecipe(Integer id) {
        if (recipeRepository.existsById(id)) {
            recipeRepository.deleteById(id);
        } else {
            throw new RuntimeException("Receita não encontrada com o id: " + id);
        }
    }

    public List<Recipe> getRecipesByUserId(Integer userId) {
        return recipeRepository.findByUserId(userId);
    }

    public Recipe saveRecipe(Integer userId, Recipe recipe) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        recipe.setUser(optionalUser.get());
        return recipeRepository.save(recipe);
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public List<Recipe> getPublicRecipes() {
        return recipeRepository.findByIsPublicTrue();
    }

}
