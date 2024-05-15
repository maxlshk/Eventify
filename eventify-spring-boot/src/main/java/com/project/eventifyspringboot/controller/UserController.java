package com.project.eventifyspringboot.controller;

import com.project.eventifyspringboot.dto.UserDto;
import com.project.eventifyspringboot.security.AuthDetails;
import com.project.eventifyspringboot.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "${rest.prefix}/users", produces = "application/json")
@Tag(name = "Users", description = "User management endpoints!")
@SecurityRequirement(name = "basicAuth")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @Operation(summary = "Get information about authorized user.")
    @ApiResponse(responseCode = "200",
            content = {@Content(schema = @Schema(implementation = UserDto.class), mediaType = "application/json")})
    @GetMapping("/me")
    public UserDto getMe(@AuthenticationPrincipal AuthDetails authDetails) {
        return userService.getMe(authDetails);
    }
}