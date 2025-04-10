package com.devmarquinhos.br.service;

import com.devmarquinhos.br.model.Comment;
import com.devmarquinhos.br.model.Recipe;
import com.devmarquinhos.br.model.User;
import com.devmarquinhos.br.repository.CommentRepository;
import com.devmarquinhos.br.repository.RecipeRepository;
import com.devmarquinhos.br.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    public Comment addComment(Integer userId, Integer recipeId, String text) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Receita não encontrada"));

        Comment comment = new Comment();
        comment.setUser(user);
        comment.setRecipe(recipe);
        comment.setText(text);

        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByRecipe(Integer recipeId) {
        return commentRepository.findByRecipeId(recipeId);
    }

    public void deleteComment(Integer id) {
        commentRepository.deleteById(id);
    }
}
