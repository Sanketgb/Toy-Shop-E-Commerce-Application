package com.toyShopProject.ecom.services.auth;

import com.toyShopProject.ecom.dto.SignupRequest;
import com.toyShopProject.ecom.dto.UserDto;

public interface AuthService {

    UserDto createUser(SignupRequest signupRequest);

    Boolean hasUserWithEmail(String email);
}
