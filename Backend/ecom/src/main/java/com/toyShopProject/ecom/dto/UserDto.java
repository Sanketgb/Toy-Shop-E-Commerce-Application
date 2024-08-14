package com.toyShopProject.ecom.dto;

import com.toyShopProject.ecom.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {

    private String id;

    private String email;

    private String name;

    private UserRole userRole;


}
