import { Cell } from './Cell';

export const Row = (props) => {
  const { id: rowId, cells } = props;

  return <div className='row'>
    {cells.map((c) => {
      const cellId = c.id;
      const cellProps = {
        rowId,
        cellId,
      };
      return <Cell {...cellProps} key={`cell-${rowId}-${cellId}`} />
    })}
  </div>
};