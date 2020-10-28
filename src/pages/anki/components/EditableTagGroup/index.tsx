import React, { useState, useRef, useEffect } from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export interface EditableTagGroupProps {
  className?: string;
  tags: string[];
  onTagChange: (tags: string[]) => void;
}

const EditableTagGroup: React.FC<EditableTagGroupProps> = props => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');

  const editInputRef = useRef<Input>();
  const newInputRef = useRef<Input>();

  const { tags, onTagChange } = props;

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    let newTags: string[] = [...tags];
    if (editInputValue && tags.indexOf(editInputValue) === -1) {
      newTags[editInputIndex] = editInputValue;
      onTagChange(newTags);
    }
    setEditInputIndex(-1);
    setEditInputValue('');
  };

  const handleClose = (tag: string) => {
    let newTags = [...tags];
    newTags = newTags.filter(value => value !== tag);
    onTagChange(newTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let newTags: string[] = [];
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags = [...tags, inputValue];
      onTagChange(newTags);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const showInput = () => {
    setInputVisible(true);
  };

  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editInputIndex, editInputValue]);

  useEffect(() => {
    if (newInputRef.current) {
      newInputRef.current.focus();
    }
  }, [inputVisible]);

  return (
    <>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef as React.RefObject<Input>}
              key={tag}
              size="small"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag key={tag} closable onClose={() => handleClose(tag)}>
            <span
              onDoubleClick={e => {
                setEditInputIndex(index);
                setEditInputValue(tag);
                e.preventDefault();
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}` : tag}
            </span>
          </Tag>
        );

        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={newInputRef as React.RefObject<Input>}
          type="text"
          size="small"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};

export default EditableTagGroup;
