import './style.css';
import { Component } from 'react';

import { Posts } from '../components/Posts/';
import {loadPosts} from '../utils/load.posts'
import { Button } from '../components/Buttons';


export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 99,
  };

  async componentDidMount () {
    await this.loadPosts();
  }

  loadPosts = async () => {
   const { page, postsPerPage } = this.state;
   const photosAndPosts = await loadPosts();
   this.setState({ 
    posts: photosAndPosts.slice(page, postsPerPage),
    allPosts: photosAndPosts,
   });
  }
  
  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage
    const nextsPosts = allPosts.slice(nextPage, nextPage + postsPerPage );
    posts.push(...nextsPosts);

    this.setState({ posts, page: nextPage });
  }

  render (){
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

  return (
      <section className="container">
        <Posts posts={posts}/>

        <div className="button-container">
          <Button
            text='Load more posts'
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
        </div>
      </section>
    );
  }
}

