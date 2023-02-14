import axios from 'axios';

export const useCrud = (path) => {
  const getList = async (urlSearchParams = '') => {
    let result;

    await axios
      .get(path + urlSearchParams)
      .then((res) => (result = res.data))
      .catch((err) => (result = err.response));

    return result;
  };

  const getItem = async (id) => {
    let result;
    await axios
      .get(path + '/' + id)
      .then((res) => (result = res.data))
      .catch((err) => (result = err.response));

    return result;
  };

  const createItem = async (item) => {
    let result;
    await axios
      .post(path, item)
      .then((res) => (result = res.data))
      .catch((err) => (result = err.response));

    return result;
  };

  const updateItem = async (id, item) => {
    let result;
    await axios
      .patch(path + '/' + id, item)
      .then((res) => (result = res.data))
      .catch((err) => (result = err.response));

    return result;
  };

  const deleteItem = async (id) => {
    let result;
    await axios
      .delete(path + '/' + id)
      .then((res) => (result = res.data))
      .catch((err) => (result = err.response));

    return result;
  };

  return { getList, getItem, createItem, updateItem, deleteItem };
};
