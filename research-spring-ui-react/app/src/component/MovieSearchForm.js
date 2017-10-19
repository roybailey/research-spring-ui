import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import { NumberPickerField } from '../component/FormField'
import { connect } from 'react-redux'


export class MovieSearchForm extends Component {

  render() {
    const { handleSubmit, onSubmit, initialValues } = this.props;
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


const ReduxFormMovieSearchForm = reduxForm({
    form: 'movieSearchForm',
    enableReinitialize: true // required for incoming changes from menu bar search
})(MovieSearchForm);


export default connect()(ReduxFormMovieSearchForm);
