import { useState, useEffect, useRef } from 'react';

import { loadCellValue, updateCellValue } from '../utils/grid';

import { CellLoadingSpinner } from './CellLoadingSpinner';

export const Cell = ({ rowId, cellId }) => {
  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [showEditButton, setShowEditButton] = useState(false);

  const [value, setValue] = useState(loadCellValue(rowId, cellId));

  const inputRef = useRef(null);
  const inputValueContainerRef = useRef(value);

  const handleCellMouseEnter = () => {
    setShowEditButton(true);
  };

  const handleCellMouseLeave = () => {
    setShowEditButton(false);
  };

  const handleOnFocus = () => {
    inputValueContainerRef.current = value;
  };

  const handleOnBlur = () => {
    setEditing(false);

    if (inputValueContainerRef.current === value) {
      return;
    }

    inputValueContainerRef.current = value;

    setLoading(true);
    updateCellValue(rowId, cellId, value).catch((err) => {
      //handle error
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  const handleEditCell = () => {
    setEditing(true);
  };

  useEffect(() => {
    setLoading(true);
    loadCellValue(rowId, cellId).then((v) => {
      setValue(v);
    }).catch((err) => {
      //handle error here
    }).finally(() => {
      setLoading(false);
    });
  }, [rowId, cellId]);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  if (loading) {
    return <div className='cell' onMouseEnter={handleCellMouseEnter} onMouseLeave={handleCellMouseLeave}>
      <CellLoadingSpinner />
    </div>
  }

  return <div className='cell' onMouseEnter={handleCellMouseEnter} onMouseLeave={handleCellMouseLeave}>
    <input
      ref={inputRef}
      type='text'
      value={value}
      readOnly={!editing}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      onChange={handleOnChange}
    />
    {showEditButton && <button className="button-clear-cell" onClick={handleEditCell}>e</button>}
  </div>
};