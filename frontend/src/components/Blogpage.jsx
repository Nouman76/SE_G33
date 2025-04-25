import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'bootstrap-4-react';
import { Link } from 'react-router-dom';
import '../styles/Blogpage.css';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: '10 Essential Vaccines Your Puppy Needs',
      date: '20 April 2025',
      category: 'Pet Health',
      excerpt: 'Protect your new furry friend with these crucial vaccinations. Learn the vaccination schedule, potential side effects, and why they are important for your puppys long-term health.',
      image: '/placeholder-blog-1.jpg',
      link: 'https://www.akc.org/expert-advice/health/puppy-shots-complete-guide/'
    },
    {
      id: 2,
      title: 'Best Cat Litters for Multiple-Cat Households',
      date: '18 April 2025',
      category: 'Cat Care',
      excerpt: 'Finding the right litter for multiple cats can be challenging. Our guide covers clumping vs. non-clumping, scented vs. unscented, and the best options for odor control.',
      image: '/placeholder-blog-2.jpg',
      link: 'https://www.petmd.com/cat/care/best-cat-litter-multiple-cats'
    },
    {
      id: 3,
      title: 'DIY Pet Toys: Entertain Your Pets on a Budget',
      date: '15 April 2025',
      category: 'Pet Accessories',
      excerpt: 'Create engaging toys for your pets using household items. These DIY projects are cost-effective, environmentally friendly, and provide hours of stimulation for your furry friends.',
      image: '/placeholder-blog-3.jpg',
      link: 'https://www.thesprucepets.com/homemade-cat-toys-555609'
    },
    {
      id: 4,
      title: 'How to Recognize and Treat Dog Anxiety',
      date: '12 April 2025',
      category: 'Dog Behavior',
      excerpt: 'Anxiety in dogs can manifest in different ways. Learn to identify the signs, understand potential triggers, and discover effective treatment options from behavior modification to medication.',
      image: '/placeholder-blog-4.jpg',
      link: 'https://www.akc.org/expert-advice/health/treating-dog-anxiety/'
    },
    {
      id: 5,
      title: 'Top 5 Automated Pet Feeders for Busy Pet Parents',
      date: '10 April 2025',
      category: 'Pet Technology',
      excerpt: 'Modern pet feeders do more than just dispense food. Discover smart feeders that can be controlled via smartphone, monitor eating habits, and even provide portion control for pets on diets.',
      image: '/placeholder-blog-5.jpg',
      link: 'https://www.nytimes.com/wirecutter/reviews/best-automatic-cat-feeder/'
    },
    {
      id: 6,
      title: 'Finding the Right Veterinarian: A Comprehensive Guide',
      date: '8 April 2025',
      category: 'Veterinary Care',
      excerpt: 'Choosing a veterinarian is one of the most important decisions you will make for your pet. Learn what credentials to look for, questions to ask, and how to evaluate a clinic before your first visit.',
      image: '/placeholder-blog-6.jpg',
      link: 'https://www.avma.org/resources/pet-owners/yourvet/choosing-veterinarian'
    },
    {
      id: 7,
      title: 'Natural Remedies for Pet Flea Prevention',
      date: '5 April 2025',
      category: 'Natural Pet Care',
      excerpt: 'Explore chemical-free alternatives to traditional flea treatments. From diatomaceous earth to essential oils, discover safer options that are effective for sensitive pets and eco-conscious owners.',
      image: '/placeholder-blog-7.jpg',
      link: 'https://www.dogsnaturallymagazine.com/natural-flea-control/'
    },
    {
      id: 8,
      title: 'Understanding Pet Insurance: Is It Worth the Cost?',
      date: '1 April 2025',
      category: 'Pet Finance',
      excerpt: 'Pet insurance can save thousands in emergency veterinary bills, but is it right for your situation? Our analysis breaks down coverage options, exclusions, and how to calculate if it is worth it for your pet.',
      image: '/placeholder-blog-8.jpg',
      link: 'https://www.consumerreports.org/pet-products/is-pet-insurance-worth-cost/'
    },
    {
      id: 9,
      title: 'The Ultimate Guide to Grooming Double-Coated Dogs',
      date: '28 March 2025',
      category: 'Pet Grooming',
      excerpt: 'Double-coated breeds like Huskies and German Shepherds require special grooming techniques. Learn the right tools, frequency, and methods to keep their coats healthy without damaging the undercoat.',
      image: '/placeholder-blog-9.jpg',
      link: 'https://www.petmd.com/dog/grooming/evr_dg_grooming_for_double_coated_dogs'
    },
    {
      id: 10,
      title: 'Specialized Diets for Pets with Food Allergies',
      date: '25 March 2025',
      category: 'Pet Nutrition',
      excerpt: 'Food allergies can cause significant discomfort for pets. Explore novel protein sources, elimination diets, and how to work with your vet to identify and address your pets specific food sensitivities.',
      image: '/placeholder-blog-10.jpg',
      link: 'https://www.vetnutrition.tufts.edu/2017/01/food-allergies/'
    },
    {
      id: 11,
      title: 'Training Cats: Yes, It is Possible and Here is How',
      date: '22 March 2025',
      category: 'Cat Training',
      excerpt: 'Despite the stereotype, cats are trainable! Discover clicker training techniques, positive reinforcement methods, and how to teach your feline basic commands and even impressive tricks.',
      image: '/placeholder-blog-11.jpg',
      link: 'https://icatcare.org/advice/training-your-cat/'
    },
    {
      id: 12,
      title: 'Choosing the Right Pet Boarding Facility',
      date: '20 March 2025',
      category: 'Pet Services',
      excerpt: 'When you can not bring your pet along, finding the right boarding option is crucial. Learn what to look for in kennels, in-home sitters, and pet hotels to ensure your furry friend is happy while you are away.',
      image: '/placeholder-blog-12.jpg',
      link: 'https://www.humanesociety.org/resources/choosing-boarding-kennel'
    }
  ]);

  const [petCareBlogs, setPetCareBlogs] = useState([]);

  useEffect(() => {
    const petCareContent = [
      {
        id: 101,
        title: 'Common Pet Medications: What You Need to Know',
        date: '15 April 2025',
        category: 'Pet Medicine',
        excerpt: 'Understanding your pets medications is essential for proper treatment. Learn about dosages, side effects, and how to administer common medications safely and effectively.',
        image: '/placeholder-petcare-1.jpg',
        link: 'https://www.fda.gov/animal-veterinary/animal-health-literacy/pet-medicine-safety-tips'
      },
      {
        id: 102,
        title: 'Finding a 24-Hour Emergency Vet Near You',
        date: '12 April 2025',
        category: 'Veterinary Services',
        excerpt: 'Pet emergencies do not follow business hours. We highlight the importance of knowing where your nearest emergency clinic is and what to expect when you arrive.',
        image: '/placeholder-petcare-2.jpg',
        link: 'https://www.aaha.org/your-pet/pet-owner-education/aaha-guidelines-for-pet-owners/emergency-care/'
      },
      {
        id: 103,
        title: 'Must-Have Accessories for Your New Kitten',
        date: '10 April 2025',
        category: 'Pet Accessories',
        excerpt: 'Prepare for your new kitten with these essential items. From scratching posts to interactive toys, ensure your home is properly equipped for your feline companion.',
        image: '/placeholder-petcare-3.jpg',
        link: 'https://www.battersea.org.uk/pet-advice/cat-advice/shopping-list-new-cat-or-kitten'
      },
    ];
    
    setPetCareBlogs(petCareContent);
  }, []);

  return (
    <div className="blog-page">
      <Container>
        <div className="blog-heading">Pet Care Blog</div>
        
        
        <div className="section-title">Featured Pet Care Resources</div>
        <Row className="featured-blogs">
          {petCareBlogs.map(blog => (
            <Col md={4} key={blog.id} className="mb-4">
              <div className="blog-card featured">
                <div className="blog-image"></div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-date">{blog.date}</span>
                    <span className="blog-category">{blog.category}</span>
                  </div>
                  <div className="blog-title">{blog.title}</div>
                  <div className="blog-excerpt">{blog.excerpt}</div>
                  <a href={blog.link} target="_blank" rel="noopener noreferrer" className="read-more-btn">Read More</a>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        
        <div className="section-title">All Pet Articles</div>
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
                  <div className="blog-title">{blog.title}</div>
                  <div className="blog-excerpt">{blog.excerpt}</div>
                  <a href={blog.link} target="_blank" rel="noopener noreferrer" className="read-more-btn">Read More</a>
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