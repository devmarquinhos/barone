package com.devmarquinhos.br.repository;

import com.devmarquinhos.br.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    List<Recipe> findByUserId(Integer id);
    List<Recipe> findByIsPublicTrue();

}
