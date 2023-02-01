import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/posts/index';
import { loadPosts } from '../../utils/load-posts'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

/// use clase ou funcao 

class Home extends Component {

  state = {

    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 5,
    searchValue: ''
  };
  async componentDidMount() {
    await this.loadPosts()
  }
  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts()
    /// this.setState({ posts: postsJson })
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state
    const nextPage = page + postsPerPage;
    const nexPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nexPosts)

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({searchValue: value})

  }


  render() {

    const { posts, page, postsPerPage, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    : posts ;
    return (
      <section className='container'>
        <div className='search-container'>
        {!!searchValue &&(
           <h1> Search value: {searchValue}</h1>
        )}
       
       <TextInput searchValue={searchValue} 
       handleChange={this.handleChange} />
      </div>

        <Posts posts={filteredPosts} />
        <div className='button-container'> 
        {!searchValue && (
          <Button
            text='Load more posts'
            quandoClica={this.loadMorePosts}
            disabled={noMorePosts}
          />
        )}
          
        </div>
        <div>
          <footer>
            Desenvolvido por <strong>Alan Dias</strong>
          </footer>
        </div>

      </section>
    )
  }
}
/* 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

export default Home;
