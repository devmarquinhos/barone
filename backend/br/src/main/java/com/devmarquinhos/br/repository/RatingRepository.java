package com.devmarquinhos.br.repository;

import com.devmarquinhos.br.model.Rating;
import com.devmarquinhos.br.model.Recipe;
import com.devmarquinhos.br.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Integer> {
    List<Rating> findByRecipe(Recipe recipe);

    Optional<Rating> findByUserAndRecipe(User user, Recipe recipe);
}
