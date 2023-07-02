import { Form } from 'react-bootstrap'
import { useEffect, useState } from "react";
import useSWR from 'swr';
import PropTypes from 'prop-types';
import { jwtInterceptor } from "../axios/jwtInterceptor";

const API_PATH = `/todos/tags`;

const fetcher = (url) => jwtInterceptor.get(url, { withCredentials: true }).then(res => res.data);

const useTags = () => {
  const { data, error, isLoading } = useSWR(API_PATH, fetcher);

  return {
    tags: data,
    isLoading,
    isError: error,
  };
}

const TagCheckbox = ({ onChangeTag }) => {

  const { tags } = useTags();

  const [checkedTag, setCheckedTag] = useState([]);
  

  useEffect(() => {
    onChangeTag(checkedTag);
  }, [checkedTag, onChangeTag])


  const onCheckboxChange = (event, id) => {

    if (event.target.checked) {

      setCheckedTag((checkedTag) => [
        ...checkedTag, id
      ]);
      
    } else {
      const uncheckedTag = checkedTag.filter((tag) => {
        return tag !== id
      })

      setCheckedTag(uncheckedTag);
    }
  }

  return (
    <>
      เลือก Tags
      {
        tags?.map((tag) =>
          <Form.Check key={tag?.id}
            id={tag?.id}
            onChange={(event) => onCheckboxChange(event, tag?.id)}
            type="checkbox"
            label={tag?.name}
          />
        )
      }
    </>
  )
}

TagCheckbox.propTypes = {
  onChangeTag: PropTypes.func,
};

export { TagCheckbox }