import React from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../actions'
import { Link } from 'react-router-dom'
import _ from 'lodash';

class PostIndex extends React.Component {
  componentDidMount(){
    this.props.fetchPost();
  }

  renderPost(){
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      )
    });
  }

  render(){
    return(
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Post</h3>
        <ul className="list-group">
          {this.renderPost()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {posts: state.posts};
}

export default connect(mapStateToProps, {fetchPost})(PostIndex);
