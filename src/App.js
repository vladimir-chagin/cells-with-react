import { Grid } from './components/Grid';
import { getGridData } from './utils/grid';

const data = getGridData();

function App() {
  return (
    <div className="App">
      <Grid data={data} />
    </div>
  );
}

export default App;
