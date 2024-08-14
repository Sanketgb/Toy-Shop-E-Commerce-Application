package com.toyShopProject.ecom.services.admin.category;

import com.toyShopProject.ecom.dto.CategoryDto;
import com.toyShopProject.ecom.entity.Category;
import com.toyShopProject.ecom.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public Category createCategory(CategoryDto categoryDto){
        Category category = new Category();
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        return  categoryRepository.save(category);
    }
}
