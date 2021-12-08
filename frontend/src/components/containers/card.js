import '../../styles/container/card.css'

let Card = props =>
    {
        return (
            <div class="card">
            <div class="container">
            {props.children}
            </div>
            </div>
        );
    }

export default Card;