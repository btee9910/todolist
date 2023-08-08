import SectionBlock from "./components/SectionBlock";
import CkyComponent from "./components/CkyComponent";
const App = () => {

  return (
    <div className="container">
      <header>
      <h1>Get your work</h1>
      </header>
      <CkyComponent></CkyComponent>
      <SectionBlock title='To Do'/>
      <SectionBlock title='Completed'/>
      <SectionBlock title='On Hold'/>

    </div>
  )
}

export default App;
