package com.devmarquinhos.br.repository;

import com.devmarquinhos.br.model.Comment;
import com.devmarquinhos.br.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByRecipeId(Integer recipeId);
}
