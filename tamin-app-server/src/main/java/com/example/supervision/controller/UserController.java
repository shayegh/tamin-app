package com.example.supervision.controller;

import com.example.supervision.exception.ResourceNotFoundException;
import com.example.supervision.model.User;
import com.example.supervision.payload.*;
import com.example.supervision.repository.PollRepository;
import com.example.supervision.repository.UserRepository;
import com.example.supervision.repository.VoteRepository;
import com.example.supervision.security.CurrentUser;
import com.example.supervision.security.UserPrincipal;
import com.example.supervision.service.PollService;
import com.example.supervision.util.AppConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.supervision.util.Utils.validatePageNumberAndSize;

@Slf4j
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private PollService pollService;


    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        return new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName(), currentUser.getBrchName(), currentUser.getUnitName());
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        return new UserProfile(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getCreatedAt(),
                user.getBrchName(), user.getUnitName());
    }

    @PutMapping(path = "/user")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UserRequest userRequest) {
        User user = userRepository.findByUsername(userRequest.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", userRequest.getUsername()));
//        Optional<User> user = userRepository.findByUsername(userRequest.getUsername());
//        if(!user.isPresent())
//            return ResponseEntity.notFound().build();
//        User user1 = user.get();
//        if(userRequest.getPassword().isEmpty())
//            userRequest.setPassword(user1.getPassword());
//        userRequest.setId(user1.getId());
        BeanUtils.copyProperties(userRequest, user);
        log.debug("Updated User :{}", user);
        userRepository.save(user);
        return ResponseEntity.ok(new ApiResponse(true, "User Updated"));
    }

    @PostMapping("/user/changePass")
    @PreAuthorize("#changePassRequest?.userName == authentication?.name")
    public ResponseEntity<?> changeUserPass(@Valid @RequestBody @Param("changePassRequest") ChangePassRequest changePassRequest) {
        User user = userRepository.findByUsername(changePassRequest.getUserName())
                .orElseThrow(() -> new ResourceNotFoundException("User", "userName", changePassRequest.getUserName()));
        if (!passwordEncoder.matches(changePassRequest.getOldPass(), user.getPassword())) {
            log.error("OldPassword Does Not Match!");
            return ResponseEntity.badRequest().body(new ApiResponse(false, "OldPassword Does Not Match!"));
        }
        user.setPassword(passwordEncoder.encode(changePassRequest.getNewPass()));
        userRepository.save(user);
        return ResponseEntity.ok(new ApiResponse(true, "Password Changed Successfully!"));
    }

    @GetMapping(path = "/users")
    @PreAuthorize("hasRole('ADMIN')")
    public PagedResponse<UserResponse> getUsers(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        validatePageNumberAndSize(page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<User> users = userRepository.findAll(pageable);

        if (users.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), users.getNumber(),
                    users.getSize(), users.getTotalElements(), users.getTotalPages(), users.isLast());
        }
        List<User> userList = users.getContent();
        List<UserResponse> userResponseList = userList.stream()
                .map(user -> {
                    UserResponse userResponse = new UserResponse();
                    BeanUtils.copyProperties(user, userResponse);
                    return userResponse;
                })
                .collect(Collectors.toList());

        return new PagedResponse<>(userResponseList, users.getNumber(),
                users.getSize(), users.getTotalElements(), users.getTotalPages(), users.isLast());
    }

    @GetMapping("/users/{username}/polls")
    public PagedResponse<PollResponse> getPollsCreatedBy(@PathVariable(value = "username") String username,
                                                         @CurrentUser UserPrincipal currentUser,
                                                         @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                         @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return pollService.getPollsCreatedBy(username, currentUser, page, size);
    }


    @GetMapping("/users/{username}/votes")
    public PagedResponse<PollResponse> getPollsVotedBy(@PathVariable(value = "username") String username,
                                                       @CurrentUser UserPrincipal currentUser,
                                                       @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                       @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return pollService.getPollsVotedBy(username, currentUser, page, size);
    }

}
