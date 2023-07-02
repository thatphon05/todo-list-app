import { jwtInterceptor } from "../../axios/jwtInterceptor.js";
import useSWRInfinite from "swr/infinite";

const API_PATH = '/todos'

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null // reached the end
  return `${API_PATH}?page=${pageIndex}`  // SWR key
}

const fetcher = (url) => jwtInterceptor.get(url, { withCredentials: true })
  .then(res => res.data );

const useTodo = () => {

  // fetch all todo
  const { data: todos, mutate, setSize } = useSWRInfinite(getKey, fetcher, { revalidateAll: true })

  const addTodo = async (form, setSubmitting, selectedTags) => {
    try {
      const { status } = await jwtInterceptor.post(`${API_PATH}`, {
        subject: form.subject,
        isComplete: 0,
        tagIds: selectedTags,
      }, {
        withCredentials: true,
      });

      if (status === 201) {
        await mutate();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false)
    }
  };

  const reloadTodo = () => {
    setSize(0)
    setTimeout(() => {
      setSize(1)
    }, 1000)
  }

  const deleteTodo = async (todoId) => {
    const { status } = await jwtInterceptor.delete(`${API_PATH}/${todoId}`, {
      withCredentials: true
    });

    if (status === 200) {
      await mutate();
    }
  };

  const toggleCompleteTodo = async (todoId) => {
    const { status } = await jwtInterceptor.patch(`${API_PATH}/${todoId}`, {}, {
      withCredentials: true
    });

    if (status === 200) {
      await mutate();
    }
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleCompleteTodo,
    reloadTodo,
    setSize,
  };
};

export { useTodo };
