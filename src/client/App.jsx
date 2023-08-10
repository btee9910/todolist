import SectionBlock from "./components/SectionBlock";
import CkyComponent from "./components/CkyComponent";
import SortingDropdown from "./components/SortingDropdown";
const App = () => {

  return (
    <div className="container">
      <header>
      <h1>Get your work</h1>
      </header>
      <CkyComponent></CkyComponent>
      <div className='dropdown'>
          <SortingDropdown />
      </div>
      <SectionBlock title='To Do' status='toDo'/>
      <SectionBlock title='Completed' status='completed'/>
      <SectionBlock title='On Hold' status='onHold'/>

    </div>
  )
}

export default App;
