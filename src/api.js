export const baseURL = "https://www.themealdb.com/api/json/v1/1/";

export const categoriesURL = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

export const ingredient = JSON.parse(localStorage.getItem('ingredient'));

export const mealListURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${ingredient}`;