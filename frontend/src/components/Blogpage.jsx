import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'bootstrap-4-react';
import { Link } from 'react-router-dom';
// import '../styles/Blogpage.css';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'TI gets $4.6bn in Chips Act funding',
      date: '08 June 2024',
      category: 'Technology',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas semper placerat. Aliquam dictum urna elit, vel fringilla ligula finibus at.',
      image: '/placeholder-blog-1.jpg'
    },
    {
      id: 2,
      title: 'Qindows Finally Expands FAT32 Formatting From 32GB to 2TB',
      date: '08 June 2024',
      category: 'Technology',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas semper placerat. Aliquam dictum urna elit, vel fringilla ligula finibus at.',
      image: '/placeholder-blog-2.jpg'
    },
    {
      id: 3,
      title: 'Video game performers announce strike, citing artificial...',
      date: '08 June 2024',
      category: 'Gaming',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas semper placerat. Aliquam dictum urna elit, vel fringilla ligula finibus at.',
      image: '/placeholder-blog-3.jpg'
    },
    {
      id: 4,
      title: 'Coveo Report Reveals AI Search Enriches Customer Engagement',
      date: '08 June 2024',
      category: 'Business',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas semper placerat. Aliquam dictum urna elit, vel fringilla ligula finibus at.',
      image: '/placeholder-blog-4.jpg'
    },
    {
      id: 5,
      title: 'Intex Announces New Tech To Battle in AI Market',
      date: '08 June 2024',
      category: 'Technology',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas semper placerat. Aliquam dictum urna elit, vel fringilla ligula finibus at.',
      image: '/placeholder-blog-5.jpg'
    },
    {
      id: 6,
      title: 'Are Mainframes an Indicator of Banking Reliability?',
      date: '08 June 2024',
      category: 'Finance',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas semper placerat. Aliquam dictum urna elit, vel fringilla ligula finibus at.',
      image: '/placeholder-blog-6.jpg'
    },
    {
      id: 7,
      title: 'Negative Online Experiences Drive Customers To Competitor...',
      date: '08 June 2024',
      category: 'Business',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas semper placerat. Aliquam dictum urna elit, vel fringilla ligula finibus at.',
      image: '/placeholder-blog-7.jpg'
    },
    {
      id: 8,
      title: 'What Is Gemini Live and How Do You Use It?',
      date: '08 June 2024',
      category: 'Technology',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas semper placerat. Aliquam dictum urna elit, vel fringilla ligula finibus at.',
      image: '/placeholder-blog-8.jpg'
    },
    {
      id: 9,
      title: 'Thypoch reveals its take on the ultimate street photography lens',
      date: '08 June 2024',
      category: 'Photography',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas semper placerat. Aliquam dictum urna elit, vel fringilla ligula finibus at.',
      image: '/placeholder-blog-9.jpg'
    },
    {
      id: 10,
      title: 'Fast FPV drones are now taking the control aircraft in Pakistan',
      date: '08 June 2024',
      category: 'Technology',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas semper placerat. Aliquam dictum urna elit, vel fringilla ligula finibus at.',
      image: '/placeholder-blog-10.jpg'
    },
    {
      id: 11,
      title: 'Creating Robust 5G SA Core Networks Through Synergy',
      date: '08 June 2024',
      category: 'Technology',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas semper placerat. Aliquam dictum urna elit, vel fringilla ligula finibus at.',
      image: '/placeholder-blog-11.jpg'
    },
    {
      id: 12,
      title: 'Your Gateway to a Vibrant Career in the Expanding Semiconduc...',
      date: '08 June 2024',
      category: 'Career',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas semper placerat. Aliquam dictum urna elit, vel fringilla ligula finibus at.',
      image: '/placeholder-blog-12.jpg'
    }
  ]);

  const [petCareBlogs, setPetCareBlogs] = useState([]);

  useEffect(() => {
    // You can fetch your actual blog data here from an API
    // For now, we'll create some pet care related blog data
    const petCareContent = [
      {
        id: 101,
        title: 'Essential Nutrition Tips for Your New Puppy',
        date: '15 June 2024',
        category: 'Dogs',
        excerpt: 'Learn the fundamentals of proper nutrition for your new puppy to ensure healthy growth and development in their first crucial months.',
        image: '/placeholder-petcare-1.jpg'
      },
      {
        id: 102,
        title: 'How to Train Your Cat to Use a Scratching Post',
        date: '12 June 2024',
        category: 'Cats',
        excerpt: 'Save your furniture with these proven techniques to encourage your feline friend to use their scratching post instead of your sofa.',
        image: '/placeholder-petcare-2.jpg'
      },
      {
        id: 103,
        title: 'The Benefits of Regular Grooming for Your Pet',
        date: '10 June 2024',
        category: 'Grooming',
        excerpt: 'Discover why regular grooming is essential for your pets health and how it strengthens the bond between you and your furry companion.',
        image: '/placeholder-petcare-3.jpg'
      },
      // Add more pet care specific blogs as needed
    ];
    
    setPetCareBlogs(petCareContent);
    
    // Optionally replace the sample data with pet care specific data
    // setBlogs(petCareContent);
  }, []);

  return (
    <div className="blog-page">
      <Container>
        <h1 className="blog-heading text-center my-5">Blog</h1>
        
        <Row className="blog-grid">
          {blogs.map(blog => (
            <Col md={4} key={blog.id} className="mb-4">
              <div className="blog-card">
                <div className="blog-image"></div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-date">{blog.date}</span>
                    <span className="blog-category">{blog.category}</span>
                  </div>
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-excerpt">{blog.excerpt}</p>
                  <Link to={`/blog/${blog.id}`} className="read-more-btn">Read More</Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default BlogPage;