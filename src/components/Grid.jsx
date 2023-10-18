import { Row } from './Row';

export const Grid = (props) => {
  const { data } = props;
  return <>
    <div className='grid'>
      {data.rows.map((r) => <Row {...r} key={`row-${r.id}`}/>)}
    </div>
  </>;
};

