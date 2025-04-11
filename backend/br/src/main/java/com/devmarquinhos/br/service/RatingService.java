package com.devmarquinhos.br.service;

import com.devmarquinhos.br.model.Rating;
import com.devmarquinhos.br.model.Recipe;
import com.devmarquinhos.br.model.User;
import com.devmarquinhos.br.repository.RatingRepository;
import com.devmarquinhos.br.repository.RecipeRepository;
import com.devmarquinhos.br.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    public Rating rateRecipe(Integer userId, Integer recipeId, Integer score) {
        if (score < 1 || score > 5) {
            throw new IllegalArgumentException("A nota deve estar entre 1 e 5");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Receita não encontrada"));

        Optional<Rating> existingRating = ratingRepository.findByUserAndRecipe(user, recipe);

        Rating rating = existingRating.orElse(new Rating());
        rating.setUser(user);
        rating.setRecipe(recipe);
        rating.setScore(score);

        return ratingRepository.save(rating);
    }

    public Double getAverageRating(Integer recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Receita não encontrada"));

        List<Rating> ratings = ratingRepository.findByRecipe(recipe);

        if (ratings.isEmpty()) return 0.0;

        double sum = ratings.stream().mapToInt(Rating::getScore).sum();
        return sum / ratings.size();
    }

    public Integer getUserRating(Integer userId, Integer recipeId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Receita não encontrada"));

        return ratingRepository.findByUserAndRecipe(user, recipe)
                .map(Rating::getScore)
                .orElse(null);
    }
}
