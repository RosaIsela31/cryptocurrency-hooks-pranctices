import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from '../cryptomonedas.png';
import Formulario from './Formulario'; 
import Cotizacion from './Cotizacion';
import Spinner from './Spinner';
import '../index.css';


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media(min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }`;

const Imagen = styled.img`
    max-width: 100%;
    margin-top: 5rem; 
  `;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left; 
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }

`;


const AppContainer = () => {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guadarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false)

  useEffect(() => {
  
    const cotizarCriptomoneda = async () => {
        // Evitamos la ejecución la primera vez  
    if(moneda === '' ) return;

    // Consultar la api para obtener la cotización 
     const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

     const resultado = await axios.get(url);

     // Mostrar el spinner
     guardarCargando(true)

     // Ocultar el Spinner y mostrar el resultado 
      setTimeout(() => {

        // Cambiar el estado de cargando
        guardarCargando(false)

        // Guardar cotización 
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000)

    }
    cotizarCriptomoneda();
     

  }, [moneda, criptomoneda]);

  // Mostrar spinner o resultado 
  const componente = (cargando) ? <Spinner /> :  <Cotizacion resultado={resultado}/>

  return ( 
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt='imagen crypto'
        />
      </div>
      <div>
        <Heading>Cotiza monedas al instante</Heading>
        <Formulario 
          guardarMoneda={guardarMoneda}
          guadarCriptomoneda={guadarCriptomoneda}
        />
       {componente}
      </div>
    </Contenedor>
   );
}
 
export default AppContainer;