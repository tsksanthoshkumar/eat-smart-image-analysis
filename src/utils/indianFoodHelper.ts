
// Indian food recognition patterns and keywords
export const indianFoodPatterns = {
  // Visual characteristics that might help identify Indian foods
  visualCues: {
    roundWhite: ['Idli', 'Rasgulla'],
    goldenbrown: ['Samosa', 'Kachori', 'Jalebi', 'Pakora'],
    crepe: ['Masala Dosa', 'Plain Dosa', 'Rava Dosa'],
    curry: ['Butter Chicken', 'Palak Paneer', 'Dal Tadka', 'Rajma'],
    rice: ['Chicken Biryani', 'Vegetable Biryani', 'Basmati Rice', 'Jeera Rice'],
    bread: ['Chapati', 'Naan', 'Paratha'],
    fried: ['Medu Vada', 'Pakora', 'Samosa'],
    sweet: ['Gulab Jamun', 'Kheer', 'Jalebi']
  },
  
  // Regional preferences for better accuracy
  regionalPreferences: {
    south: ['Idli', 'Dosa', 'Sambhar', 'Rasam', 'Uttapam', 'Coconut Chutney'],
    north: ['Naan', 'Butter Chicken', 'Paneer Tikka', 'Paratha'],
    west: ['Vada Pav', 'Dhokla', 'Bhel Puri', 'Pani Puri'],
    east: ['Rasgulla', 'Fish Curry']
  },
  
  // Common combinations
  commonCombos: [
    ['Idli', 'Sambhar', 'Coconut Chutney'],
    ['Masala Dosa', 'Sambhar', 'Coconut Chutney'],
    ['Dal Tadka', 'Basmati Rice', 'Chapati'],
    ['Butter Chicken', 'Naan', 'Basmati Rice'],
    ['Rajma', 'Basmati Rice'],
    ['Curd Rice', 'Mango Pickle']
  ]
};

// Nutritional insights specific to Indian cuisine
export const indianNutritionInsights = {
  highProtein: ['Dal Tadka', 'Rajma', 'Chana Masala', 'Paneer Tikka'],
  highFiber: ['Dal Makhani', 'Rajma', 'Chapati', 'Whole Wheat items'],
  lowCalorie: ['Idli', 'Plain Dosa', 'Sambhar', 'Rasam'],
  balanced: ['Chicken Biryani', 'Vegetable Biryani', 'Curd Rice'],
  indulgent: ['Butter Chicken', 'Naan', 'Gulab Jamun', 'Kheer']
};

// Helper function to get related foods
export const getRelatedIndianFoods = (foodName: string): string[] => {
  for (const combo of indianFoodPatterns.commonCombos) {
    if (combo.includes(foodName)) {
      return combo.filter(item => item !== foodName);
    }
  }
  return [];
};

// Helper function to get nutritional category
export const getNutritionalCategory = (foodName: string): string => {
  for (const [category, foods] of Object.entries(indianNutritionInsights)) {
    if (foods.includes(foodName)) {
      return category;
    }
  }
  return 'standard';
};
