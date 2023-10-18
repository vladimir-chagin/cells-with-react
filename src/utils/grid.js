import { request, url } from './request';
import { cache } from './cache';

export const getGridData = () => ({
  rows: [{
    id: 1,
    cells: [{
      id: 1,
    }, {
      id: 2,
    }]
  }, {
    id: 2,
    cells: [{
      id: 1,
    }, {
      id: 2,
    }]
  }]
});

export const loadCellValue = async (ri, ci) => {
  const cellDataURL = url({ ri, ci });
  if (cache.has(cellDataURL)) {
    return cache.get(cellDataURL);
  }

  const { value } = await request(cellDataURL);
  cache.set(cellDataURL, value);
  return value;
};

export const updateCellValue = async (ri, ci, v) => {
  const cellDataURL = url({ ri, ci });
  const { value } = await request(cellDataURL, 'PUT', { value: v });
  cache.set(cellDataURL, value);
  return value;
};