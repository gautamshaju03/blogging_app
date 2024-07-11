import React, { useState, useEffect } from "react";
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import Post from '../../component/home/posts/Post'; // Import the individual Post component

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [noMatch, setNoMatch] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await API.getPosts();
            if (response.isSuccess) {
                const sortedPosts = response.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
                setPosts(sortedPosts);
                setFilteredPosts(sortedPosts);
            } else {
                console.error('Error fetching posts:', response.message);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        filterPosts(e.target.value);
    };

    const filterPosts = (keyword) => {
        if (!keyword) {
            setFilteredPosts(posts);
            setNoMatch(false);
            return;
        }
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredPosts(filtered);
        setNoMatch(filtered.length === 0);
    };

    const handleCreatePost = () => {
        navigate('/create');
    };

    return (
        <div className="home-container">
            <header className="header">
                <h2>BlogSphere</h2>
                <nav>
                    <ul>
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/login">LOGOUT</Link></li>
                    </ul>
                </nav>
                <input 
                    type="text" 
                    placeholder="Search by title" 
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="search-bar"
                />
                <button className="search-button" onClick={() => filterPosts(searchQuery)}>Search</button>
            </header>

            <div className="content-container">
                <div className="sidebar">
                    <button className="create-button" onClick={handleCreatePost}>CREATE BLOG</button>
                </div>
                <section className="post-listings">
                    <h2>Latest Posts</h2>
                    {loading ? (
                        <h2>Loading...</h2>
                    ) : posts.length === 0 ? (
                        <h2>No posts available</h2>
                    ) : noMatch ? (
                        <h2>No matching posts found</h2>
                    ) : (
                        filteredPosts.map(post => (
                            <div key={post._id} className="post-container" onClick={() => navigate(`/details/${post._id}`)}>
                                <Post post={post} />
                            </div>
                        ))
                    )}
                </section>
            </div>
        </div>
    );
};

export default Home;
