package com.devmarquinhos.br.controller;

import com.devmarquinhos.br.model.Comment;
import com.devmarquinhos.br.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/recipe/{recipeId}/user/{userId}")
    public Comment addComment(@PathVariable Integer recipeId,
                              @PathVariable Integer userId,
                              @RequestBody Comment comment) {
        return commentService.addComment(userId, recipeId, comment.getText());
    }

    @GetMapping("/recipe/{recipeId}")
    public List<Comment> getCommentsByRecipe(@PathVariable Integer recipeId) {
        return commentService.getCommentsByRecipe(recipeId);
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable Integer commentId) {
        commentService.deleteComment(commentId);
    }
}
