import { Component } from "react";
import './styles.css';
export class Button extends Component {
    render() {
        const {text, quandoClica, disabled} = this.props
        return (
            <button
           
            className="button"
            onClick={quandoClica}
            disabled={disabled}> 
               {text}
            </button>
        )
    }
}