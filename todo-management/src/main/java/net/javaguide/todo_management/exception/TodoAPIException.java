package net.javaguide.todo_management.exception;

public class TodoAPIException extends RuntimeException {
  public TodoAPIException(String message) {
    super(message);
  }
}
