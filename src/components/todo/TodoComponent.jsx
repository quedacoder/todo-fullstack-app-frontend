import React, {Component} from "react";
import moment from 'moment';
import { Field, Form, Formik, ErrorMessage } from "formik";
import TodoDataService from "./api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";

class TodoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id : this.props.params.id,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.loadTodoData = this.loadTodoData.bind(this)
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveTodo(username, this.props.params.id)
        .then(response => this.loadTodoData(response))
    }

    loadTodoData(response) {
        console.log(response.data)
        this.setState({
            id : response.data.id,
            description : response.data.description,
            targetDate : moment(response.data.targetDate).format('YYYY-MM-DD')
        })
    }

    render() {
        let {description, targetDate} = this.state
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik initialValues={{ description, targetDate }}
                            onSubmit={this.onSubmit}
                            validate={this.validate}
                            validateOnChange={false}
                            validateOnBlur={false}
                            enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-danger" />
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-danger" />
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }

    onSubmit(values) {
        console.log(values);

        let username = AuthenticationService.getLoggedInUserName();

        let todo = {
            id : this.props.params.id,
            description : values.description, 
            targetDate : values.targetDate
        }

        TodoDataService.updateTodoItem(username, this.props.params.id, todo)
        .then(response => console.log(response))

        this.props.navigate(`/todos`);
    }

    validate(values) {
        let errors = {}

        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5){
            errors.description = 'Enter at least 5 characters in description'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        console.log(values)
        return errors
    }
}

export default TodoComponent