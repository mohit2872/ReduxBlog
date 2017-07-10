import React from 'react'
import {connect} from 'react-redux'
import {fetchPosts, deletePost} from '../actions'
import {Link} from 'react-router-dom'

class PostShow extends React.Component {
  componentDidMount(){
    const id = this.props.match.params.id;
    this.props.fetchPosts(id);
  }

  onDeleteClick() {
    const id = this.props.match.params.id;
    this.props.deletePost(id, () => {
       this.props.history.push('/');
     });
  }

  render(){
    const { post } = this.props;

    if(!post){
      return <div>Loading.....</div>;
    }

    return(
      <div>
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
 }

function mapStateToProps({posts}, ownProps){ // ownProps refers to this.props
  return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPosts, deletePost })(PostShow);
