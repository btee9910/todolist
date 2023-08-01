import crossIcon from '../../../public/cross.png'
const StickyNote = () => {


    return (
        <div className="sticky-note">
            <div>
                <img id='cross-icon' src={crossIcon} alt="delete" />
            </div>
            <div>
                <h2 className='sticky-note-title'>{'<'}Title{'>'}</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro voluptatibus ab, obcaecati voluptatum, molestias debitis  eos?</p>
            </div>
        </div>
    )
}

export default StickyNote;