import SectionBlock from "./components/SectionBlock";
import HeaderBar from "./components/HeaderBar";
import Notice from "./components/Notice";
import Footer from "./components/Footer";
const App = () => {


  return (
    <div className="container">
      <HeaderBar />
      <Notice />
      <SectionBlock title='To Do' status='toDo' />
      <SectionBlock title='Completed' status='completed' />
      <SectionBlock title='On Hold' status='onHold' />
      <Footer />
    </div>
  );
};

export default App;
