import Card from '../containers/card'
import {useState} from 'react';

let Interface = props =>{

    let [question,questionState] = useState("");
    let [selection,selectionState] = useState("TextField");
    let {addToList} = props;

    return (
        <Card>
            <div class="rating-container">
                <div>
            <label for="unique"><b>Question</b></label>
            <input type="text" placeholder="Enter Question"
            onChange={e=>questionState(old=>e.target.value)}
            name="unique" required></input>
            </div>
            <div>
            <label for="select"><b>Component</b></label> <br/>
            <select style={{minWidth:"200%",minHeight:"40px",border:0}}
            onChange={e=>selectionState(old=>e.target.value)}
            name="select">
                   <option value="TextField">TextField</option>
                   <option value="TextArea">TextArea</option>
                   <option value="Select">Select</option>
                   <option value="Rating">Rating</option>
                   <option value="GeoLocation">GeoLocation</option>
                   <option value="FileUpload">FileUpload</option>
                   <option value="DateTime">DateTime</option>        
                </select>
                </div>
                <div>
                    <button
                    onClick={e=>addToList(question,selection)}
                    >Add</button>
                    </div>
            </div>
        </Card>
    );
}

export default Interface;