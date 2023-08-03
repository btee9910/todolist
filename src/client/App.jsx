import SectionBlock from "./components/SectionBlock";
import StickyNote from "./components/stickyNote";
import CkyComponent from "./components/CkyComponent";
const App = () => {

  return (
    <div className="container">
      <header>
      <h1>Get your work</h1>
      </header>
      <CkyComponent></CkyComponent>
      <SectionBlock title='To do' ></SectionBlock>
      <SectionBlock title='Completed' ></SectionBlock>
      <SectionBlock title='On hold' ></SectionBlock>

    </div>
  )
}

export default App;
