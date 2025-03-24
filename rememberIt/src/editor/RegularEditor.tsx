import Tiptap from "./TipTap";


export interface doc {
    textContent:string;
}

function RegularEditor(file:doc) {

    let textContent = file.textContent;

    return (
        <div className='editor'><Tiptap textContent={textContent} /></div>
    );
}

export default RegularEditor