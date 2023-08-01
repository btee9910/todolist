import SectionBlock from "./components/SectionBlock";
import StickyNote from "./components/stickyNote";
const App = () => {

  return (
    <div className="container">
      <header>
      <h1>Get your work</h1>
      </header>

      <SectionBlock title='To do' ></SectionBlock>
      <SectionBlock title='Completed' ></SectionBlock>
      <SectionBlock title='On hold' ></SectionBlock>

    </div>
  )
}

export default App;
