package net.javaguide.todo_management.service;

import net.javaguide.todo_management.dto.LoginDto;
import net.javaguide.todo_management.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);

    String login(LoginDto loginDto);
}
