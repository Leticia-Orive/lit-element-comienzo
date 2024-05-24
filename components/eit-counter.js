import { LitElement,html,css } from "lit";
import { WiredButton } from "wired-elements/lib/wired-button.js";
import { WiredCard } from "wired-elements/lib/wired-card.js";
//import { WiredInput } from "wired-elements/lib/wired-input.js";
import { WiredSlider } from "wired-elements/lib/wired-slider.js";
import '@dile/dile-input/dile-input';

export class EitCounter extends LitElement {
  static styles = [
    css`
      //:host te permite dar diseño a toda la pagina seria el eit-counter seria la etiqueta padre de este componente
      :host {
        display: inline-block;
        
      }
      h2 {
        color: red;
      }
      .parrafo {
        color: blue;
        font-size: 1.5em;
      }
      wired-input {
        width: 50px;
        font-size: 1em;
        padding: 0.5em;
      }
      wired-button {
        background-color: lightblue;
      }
      wired-button.decrement {
        background-color: red;
      }
      wired-card{
        margin: 1em;
        padding: 1em;
      }
      @media (min-width: 500px) {
        .parrafo {
          font-size: 3em;
        }
      }
    `,
  ];
  //Creamos propiedades
  /**Esto es una forma mas antigua */
  static get properties() {
    return {
      prop1: { type: String },
    };
  }
  /*Esta es mas actual lo igualo a un objecto*/
  static properties = {
    counter: { 
        type: Number, 
        reflect: true
    },
    /**Voy hacer la propiedad quantity entonces ya no necesitaria el get */
    quantity:{
       type: Number, 
    }
  };
  
  /**Inializo la propiedades porque sino no me van a funcionar para ello uso el constructor */
  constructor() {
    super();
    this.counter = 10;
    /**Vamos a incializar el valor */
    this.quantity = 10;
  }

  //Me permite colocar la vista del componente
  render() {
    //Añado todo dentro de un wired-card
    return html`
      <wired-card elevation="3">
        <slot></slot>
        <!--<h2>Mi contador</h2>-->
        <!--Ponemos this.counter para llamar a la propiedad counter-->
        <p class="parrafo">${this.counter}</p>
        <p>
          <!--Permitirme que las acualizaciones de mi contador crezca y descrezcan mas rapido-->
          <!--Cambio el input por el wired-input-->
          <!--Ya el value no va ser un 1 sino una  interpobalacion-->
          <!--El . delante de value indica que vindeo a la propiedad del elemento envede a la del atributo y funciona con wired-input con el dile-input se lo tendriamos que quitar-->
          <!--Cambio el wired por el dile-->
          <dile-input id="quantity" type="number" value="${this.quantity}" label="Cantidad"></dile-input>
        </p>
        <p>
            <!--Le añado un evento change porque sino no me va funcionar-->
            <!--$ mas lo que le sigue se llama interpoblación-->
             <wired-slider 
                value="10" 
                min="1"
                max="20"
                @change=${this.doChangeQuantity}>
            </wired-slider>
        </p>
        <!--Manejador de eventos-->
        <!--Cambio el button por un <wired-button>-->
        <!--Cambio el +1 por incrementar y el -1 por decrementar -->
        <wired-button @click=${this.inclement}>Incrementar</wired-button>
        <wired-button @click=${this.decrement} class="decrement"
          >Decrementar</wired-button
        >
      </wired-card>
    `;
  }
  //Metodos
  /**Manejador de eventos
   * Recibe siempre un manejador de evento que lo puedes llamar e, event o como tu lo quieras llamar.
   */
  doChangeQuantity(e){
    //Voy a mostrar e para ver lo que pasa
    //console.log(e);
    this.quantity = e.detail.value;
    

  }
  /*Tambien puedo hacer esto que es js y me ahorro una linea en mis metodos
  get quantity() {
    return this.shadowRoot.getElementById("quantity").value;
  }*/
  inclement() {
    //this.counter++;
    /**Esto me lo ahoraria con el metodo get quantity 
    let quantity = this.shadowRoot.getElementById('quantity').value;
    this.counter += parseInt(quantity);*/
    this.counter += parseInt(this.quantity);
  }
  decrement() {
    //this.counter--;
    /**Esto me lo ahoraria con el metodo get quantity  
    let quantity = this.shadowRoot.getElementById("quantity").value;
    this.counter -= parseInt(quantity);*/
    this.counter -= parseInt(this.quantity);
  }
}
customElements.define('eit-counter', EitCounter);