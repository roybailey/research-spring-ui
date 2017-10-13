import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import { NumberPickerField } from '../component/FormField'


export class MovieSearchForm extends Component {

  componentWillReceiveProps() {
    console.log('******************')
    console.log('componentWillReceiveProps')
    console.log('******************')
  }

  shouldComponentUpdate() {
    console.log('******************')
    console.log('shouldComponentUpdate')
    console.log('******************')
    return true
  }

  componentWillUpdate() {
    console.log('******************')
    console.log('componentWillUpdate')
    console.log('******************')
  }

  componentDidUpdate() {
    console.log('******************')
    console.log('componentDidUpdate')
    console.log('******************')
  }

  componentWillMount(nextProps, nextState) {
    console.log('******************')
    console.log('componentWillMount')
    console.log(nextProps)
    console.log('******************')
  }

  componentDidMount(nextProps, nextState) {
    console.log('******************')
    console.log('componentDidMount')
    console.log(nextProps)
    console.log('******************')
  }

  render() {
    const { handleSubmit, onSubmit } = this.props;
    let handleFormSubmit = (formProps) => {
        console.log('MovieSearchForm.handleFormSubmit() '+JSON.stringify(formProps));
        onSubmit({
            search: formProps.get('movie'),
            pageSize: formProps.get('pageSize')
        });
    };
    return (
        <form className="ui form" onSubmit={handleSubmit(handleFormSubmit.bind(this))}>
            <div className="field">
                <label>Movie Search Form</label>
                <div className="ui search">
                    <div className="ui icon input">
                        <Field
                            className="prompt"
                            name="movie"
                            component="input"
                            type="text"
                            placeholder="search for movie..."
                            />
                        <i className="search icon"></i>
                    </div>
                </div>
            </div>
            <div className="fields">
                <div className="field">
                    <label>Page Size</label>
                    <Field name="pageSize" component={NumberPickerField} defaultValue={10} step={5} min={5} />
                </div>
            </div>
            <div className="fields">
                <div className="field">
                    <button className="ui primary button">Search...</button>
                </div>
            </div>
        </form>
    );
  }
}


function mapStateToProps(state, ownProps) {
    debugger;
  return {
        initialValues: {
          movie: ownProps.search
        }
    }
}


export default MovieSearchForm = reduxForm({
    form: 'movieSearchForm'
}, mapStateToProps)(MovieSearchForm);
