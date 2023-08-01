import StickyNote from "./stickyNote";

const SectionBlock = ( {title} ) => {
    return (
        <div className="section-block">
            <div>
            <h2 className="section-block-title">{title}</h2>
            </div>
            <div>
                <StickyNote/>
                <StickyNote/>
                <StickyNote/>
            </div>

        </div>

    );
}
 
export default SectionBlock;