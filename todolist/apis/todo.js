import axios from "axios";
const base_url = "http://192.168.1.133:9999/api/todo";

const api = {
  async readAllTodos(store, req) {
    let result = await this.standardRequest("get", "/get-all-items", null, req);
    if (result.status) {
      await store.dispatch("todo/inserttodos", result.data.items);
    }
    return result;
  },

  async createTodo(store, todo) {
    let result = await this.standardRequest("post", "/create-item", {
      item: todo
    });
    if (result.status) {
      await store.dispatch("todo/createtodo", result.data);
    }
    return result;
  },

  async updateTodo(store, todo) {
    let result = await this.standardRequest("put", "/update-item", todo);
    if (result.status) {
      await store.dispatch("todo/updatetodo", todo);
    }
    return result;
  },

  async deleteTodo(store, todo) {
    let result = await this.standardRequest(
      "delete",
      "/delete-item-by-id/" + todo.id
    );
    if (result.status) {
      await store.dispatch("todo/deletetodo", result.data);
    }
    return result;
  },

  async standardRequest(methodType, path, data, req) {
    methodType = methodType.toLowerCase();

    let config = {
      method: methodType,
      url: base_url + path
    };
    let headers = {};

    if (data != null && (methodType === "post" || methodType === "put")) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
      config.data = data;
    }

    if (methodType === "get" && data !== null) {
      config.params = data;
    }

    config.headers = headers;
    const response = await handleAsyncApi(axios(config));
    return response;
  }
};
// Tối giản lệnh gọi và xử lý lỗi từ API
function handleAsyncApi(promise) {
  return promise
    .then(response => {
      if (response)
        return {
          status: true,
          data: response.data
        };
      else
        return {
          status: false,
          message: "loi api"
        };
    })
    .catch(err => {
      return { status: false, message: "loi catch" };
    });
}
export default api;
