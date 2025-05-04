// ChatbotService.js
import axios from 'axios';

class ChatbotService {
  
  static async searchProducts(query) {
    try {
      const response = await axios.get(`http://localhost:8000/products?search=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  
  static async getProductById(productId) {
    try {
      const response = await axios.get(`http://localhost:8000/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

 
  static async checkProductStock(productId) {
    try {
      const product = await this.getProductById(productId);
      return {
        inStock: product.stock > 0,
        stockCount: product.stock,
        product
      };
    } catch (error) {
      console.error('Error checking stock:', error);
      throw error;
    }
  }

  
  static async getProductsByCategory(category) {
    try {
      const response = await axios.get(`http://localhost:8000/products/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }
}

export default ChatbotService;