import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm PetPal, your shopping assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  
  
  const OPENAI_API_KEY = "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";
  
  const systemPrompt = `
    You are PetPal, a helpful assistant for a pet e-commerce website. 
    You can help users find products, check availability, and add items to their cart.
    The website sells pet food, accessories, and medicine for cats and dogs.
    
    Available categories: Cat Food, Dog Food, Cat Accessories, Dog Accessories, Pet Medicine
    
    When a user asks about a product:
    1. If they want to know if a specific product is available, check the product database and respond accordingly.
    2. If they want to add a product to cart, help them by providing a link or button.
    3. If they want to see products from a specific category, suggest viewing that category.
    
    Keep responses short, friendly, and helpful. Be conversational but efficient.
    
    If the user inquiry seems like a product search, respond with: 
    "SEARCH_QUERY: [product name or category]"
    
    If the user wants to add an item to cart, respond with:
    "ADD_TO_CART: [product_id]"
    
    If the user wants to view a product detail, respond with:
    "VIEW_PRODUCT: [product_id]"
  `;

  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (inputMessage.trim() === '') return;
    
 
    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    try {
      
      const transformedMessage = `User asks: "${inputMessage}"`;
      
      console.log("Making API call to OpenAI...");
      
     
      const openaiApi = axios.create({
        baseURL: 'https://api.openai.com/v1',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        }
      });
      
      
      const response = await openaiApi.post('/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: transformedMessage },
        ]
      });
      
      console.log("API response received:", response.status);
      
      const botReply = response.data.choices[0].message.content;
      
      
      if (botReply.includes('SEARCH_QUERY:')) {
        const searchTerm = botReply.split('SEARCH_QUERY:')[1].trim();
        handleProductSearch(searchTerm, botReply);
      } else if (botReply.includes('ADD_TO_CART:')) {
        const productId = botReply.split('ADD_TO_CART:')[1].trim();
        handleAddToCart(productId, botReply);
      } else if (botReply.includes('VIEW_PRODUCT:')) {
        const productId = botReply.split('VIEW_PRODUCT:')[1].trim();
        handleViewProduct(productId, botReply);
      } else {
        
        setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
      }
    } catch (error) {
      console.error('Error with chatbot API call:', error);
      
      let errorMessage = "Sorry, I'm having trouble connecting right now. Please try again later.";
      
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        
        if (error.response.status === 401) {
          errorMessage = "There seems to be an authentication issue. Please contact support.";
        }
      } else if (error.request) {
        console.error('Error request:', error.request);
        errorMessage = "Can't reach the OpenAI servers. Please check your internet connection.";
      }
      
      setMessages(prev => [...prev, { 
        text: errorMessage, 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  
  const handleProductSearch = async (searchTerm, originalReply) => {
    try {
      const cleanReply = originalReply.replace(/SEARCH_QUERY:.*$/m, '').trim();
      
      
      if (cleanReply) {
        setMessages(prev => [...prev, { text: cleanReply, sender: 'bot' }]);
      }
      
      
      const response = await axios.get(`http://localhost:8000/products?search=${searchTerm}`);
      const products = response.data;
      
      if (products.length === 0) {
        setMessages(prev => [...prev, { 
          text: `I couldn't find any products matching "${searchTerm}". Can I help you look for something else?`, 
          sender: 'bot' 
        }]);
      } else {
        
        const isCategory = ["cat food", "dog food", "cat accessories", "dog accessories", "pet medicine"]
          .some(category => searchTerm.toLowerCase().includes(category.toLowerCase()));
        
       
        setMessages(prev => [...prev, { 
          text: `I found ${products.length} products matching "${searchTerm}":`, 
          sender: 'bot'
        }]);
        
        
        const displayProducts = products.slice(0, 10);
        displayProducts.forEach(product => {
          setMessages(prev => [...prev, { 
            text: `${product.name} - Rs. ${product.price}`, 
            sender: 'bot',
            productInfo: product
          }]);
        });
        
        if (products.length > 10) {
          let url = '';
          
          if (isCategory) {
            let categoryName = '';
            ["cat food", "dog food", "cat accessories", "dog accessories", "pet medicine"].forEach(category => {
              if (searchTerm.toLowerCase().includes(category)) {
                categoryName = category.replace(' ', '-'); 
              }
            });
            
            url = `/category/${categoryName}`;
          } else {
            url = `/shoppage?search=${searchTerm}`;
          }
          
          setMessages(prev => [...prev, { 
            text: `And ${products.length - 10} more. Would you like to see all results?`, 
            sender: 'bot',
            action: {
              type: 'link',
              text: 'View All Results',
              url: url
            }
          }]);
        }
      }
    } catch (error) {
      console.error('Error searching products:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I had trouble searching for products. Please try again later.", 
        sender: 'bot' 
      }]);
    }
  };

  
  const handleAddToCart = async (productId, originalReply) => {
    try {
      const cleanReply = originalReply.replace(/ADD_TO_CART:.*$/m, '').trim();
      
      if (cleanReply) {
        setMessages(prev => [...prev, { text: cleanReply, sender: 'bot' }]);
      }
      
      const response = await axios.get(`http://localhost:8000/products/${productId}`);
      const product = response.data;
      
      setMessages(prev => [...prev, { 
        text: `I can add ${product.name} to your cart. Would you like to proceed?`, 
        sender: 'bot',
        action: {
          type: 'addToCart',
          productId: product._id,
          productName: product.name
        }
      }]);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I couldn't add that item to the cart. The product might not be available.", 
        sender: 'bot' 
      }]);
    }
  };

  
  const handleViewProduct = async (productId, originalReply) => {
    try {
      const cleanReply = originalReply.replace(/VIEW_PRODUCT:.*$/m, '').trim();
      
      if (cleanReply) {
        setMessages(prev => [...prev, { text: cleanReply, sender: 'bot' }]);
      }
      
      const response = await axios.get(`http://localhost:8000/products/${productId}`);
      const product = response.data;
      
      setMessages(prev => [...prev, { 
        text: `Here's the product you asked about: ${product.name}`, 
        sender: 'bot',
        action: {
          type: 'viewProduct',
          productId: product._id,
          productName: product.name
        }
      }]);
    } catch (error) {
      console.error('Error fetching product:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I couldn't find that product. It might have been removed or is temporarily unavailable.", 
        sender: 'bot' 
      }]);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleActionClick = (action) => {
    if (action.type === 'addToCart') {
      setMessages(prev => [...prev, { 
        text: `${action.productName} has been added to your cart!`, 
        sender: 'bot' 
      }]);
    } else if (action.type === 'viewProduct') {
      navigate(`/product/${action.productId}`);
    } else if (action.type === 'link') {
      window.location.href = action.url;
    }
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-button ${isOpen ? 'open' : ''}`} onClick={toggleChatbot}>
        <span className="chatbot-icon">🐾</span>
      </div>
      
      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <h3>PetPal Assistant</h3>
            <button className="close-button" onClick={toggleChatbot}>×</button>
          </div>
          
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.text}
                </div>
                
                {message.productInfo && (
                  <div 
                    className="product-link" 
                    onClick={() => handleProductClick(message.productInfo._id)}
                  >
                    View Details
                  </div>
                )}
                
                {message.action && (
                  <button 
                    className="action-button" 
                    onClick={() => handleActionClick(message.action)}
                  >
                    {message.action.type === 'addToCart' ? 'Add to Cart' : 
                     message.action.type === 'viewProduct' ? 'View Details' : 
                     message.action.text}
                  </button>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chat-input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              placeholder="Ask me about our pet products..."
              className="chat-input"
            />
            <button type="submit" className="send-button">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;