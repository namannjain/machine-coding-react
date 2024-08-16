import './App.css';
import JobBoard from './components/JobBoard';
import KanbanDragDrop from './components/KanbanDragDrop';
import SelectableGrid from './components/SelectableGrid';
import SnakeGame from './components/SnakeGame';
import Stepper from './components/Stepper';
import Tabs from './components/Tabs';
import TicTacToe from './components/TicTacToe';
import Todo from './components/Todo';
import UberQues from './components/UberQues';
import VirtualizedList from './components/VirtualizedList';
import Otp from './components/Otp';
import Stopwatch from './components/Stopwatch';
import Faq from './components/Faq';
import ProgressBar from './components/ProgressBar';
import StarRating from './components/StarRating';
import TypeAhead from './components/TypeAhead';
import ToastContainer from './components/ToastContainer';
import CartCostRazorpay from './components/CartCostRazorpay';
import CommentSection from './components/CommentSection';
import CustomSwitchCase from './components/CustomSwitchCase';
import FeatureFlagLearnersBucket from './components/FeatureFlagLearnersBucket';

function App() {
  return (
    <div className="App">
      {/* <TypeAhead/> */}
      {/* <ToastContainer/> */}
      {/* <StarRating starCount={10} /> */}
      {/* <ProgressBar/> */}
      {/* <Faq/> */}
      {/* <Stopwatch/> */}
      {/* <Otp/> */}
      {/* <UberQues/> */}
      {/* <TicTacToe size={5}/> */}
      {/* <SnakeGame/> */}
      {/* <Todo/> */}
      {/* <Stepper/> */}
      {/* <VirtualizedList containerHeight={400} containerWidth={300} itemHeight={35} /> */}
      {/* <Tabs onChange={(ind) => {console.log(ind)}} /> */}
      {/* <KanbanDragDrop/> */}
      {/* <JobBoard/> */}
      {/* <SelectableGrid/> */}
      {/* <CartCostRazorpay/> */}
      {/* <InfiniteScrollWrapperSwiggy/> */}
      {/* <CommentSection/> */}
      {/* <CustomSwitchCase/> */}
      <FeatureFlagLearnersBucket/>
    </div>
  );
}

export default App;
