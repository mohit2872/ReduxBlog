import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {createPost} from '../actions'

class PostsNew extends React.Component{
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  renderField(field) {
    const classN = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

    return (
      <div className={classN}>
        <label>{field.label}</label>
        <input
          type="text"
          className="form-control"
          {...field.input}
        />
        <div className="text-danger">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values){
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if(!values.title){
    errors.title = "Enter a title"
  }
  if(!values.categories){
    errors.categories = "Enter a category"
  }
  if(!values.content){
    errors.content = "Enter some content"
  }

  return errors;
}



export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'
})(
  connect(null, {createPost})(PostsNew)
);
