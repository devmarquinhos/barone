package com.devmarquinhos.br.controller;

import com.devmarquinhos.br.model.Rating;
import com.devmarquinhos.br.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ratings")
public class RatingController {
    // Fazer o front, so isso e o projeto ta file
    @Autowired
    private RatingService ratingService;

    @PostMapping
    public Rating rateRecipe(@RequestParam Integer userId, @RequestParam Integer recipeId, @RequestParam Integer score) {
        return ratingService.rateRecipe(userId, recipeId, score);
    }

    @GetMapping("/average/{recipeId}")
    public Double getAverageRating(@PathVariable Integer recipeId) {
        return ratingService.getAverageRating(recipeId);
    }

    @GetMapping("/user/{userId}/recipe/{recipeId}")
    public Integer getUserRating(@PathVariable Integer userId, @PathVariable Integer recipeId) {
        return ratingService.getUserRating(userId, recipeId);
    }
}
