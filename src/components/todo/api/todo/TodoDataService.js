import axios from "axios";

class TodoDataService {
    retrieveAllTodos(name) {
        return axios.get(`http://localhost:8080/users/${name}/todos`);
    }

    deleteTodo(name, id) {
        return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`);
    }

    retrieveTodo(name, id) {
        return axios.get(`http://localhost:8080/users/${name}/todo/${id}`);
    }

    updateTodoItem(name, id, todo) {
        console.log(todo);
        return axios({
            method: "put",
            url: `http://localhost:8080/users/${name}/todo/${id}`,
            data: todo,
        });
    }

    createTodoItem(name, todo) {
        console.log(todo);
        return axios({
            method: "post",
            url: `http://localhost:8080/users/${name}/todo`,
            data: todo,
        });
    }
}

export default new TodoDataService();