package com.toyShopProject.ecom.services.admin.category;

import com.toyShopProject.ecom.dto.CategoryDto;
import com.toyShopProject.ecom.entity.Category;

public interface CategoryService {

    public Category createCategory(CategoryDto categoryDto);
}
