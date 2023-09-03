import React, { useState } from 'react';
import { ingredientesDisponibles } from '../data/ingredientesDatas';

const PizzaCalculator = () => {
  const [cliente, setCliente] = useState('');
  const [tipoPizza, setTipoPizza] = useState('Personal');
  const [ingredientesBase,setIngredientesBase]=useState('');
  const [ingredientesAdicionales, setIngredientesAdicionales] = useState([]);
  const [mostrarFactura, setMostrarFactura] = useState(false);
  const [costoTotal, setCostoTotal] = useState(0);
  const [costoNormal, setCostoNormal] = useState(0);

  const [costoAdicional, setCostoAdicional] = useState(0);
  const [mostrarCalculadora, setMostrarCalculadora] = useState(true);



  const handleTipoPizzaChange = (e) => {
    setTipoPizza(e.target.value);
  };
  const handleIngredienteBaseChange= (e)=>{
        setIngredientesBase(e.target.value)
  };

  const handleCheckboxChange = (e) => {
    const ingredienteSeleccionado = e.target.value;

    if (ingredientesAdicionales.includes(ingredienteSeleccionado)) {
      setIngredientesAdicionales(ingredientesAdicionales.filter(ingrediente => ingrediente !== ingredienteSeleccionado));
    } else {
      setIngredientesAdicionales([...ingredientesAdicionales, ingredienteSeleccionado]);
    }
  };

  const validarCampos = () => {
    return cliente.trim() !== '';
  };

  const calcularCostoPizza = () => {
    let costoBase = 0;

    switch (tipoPizza) {
      case 'Personal':
        costoBase = 7.0;
        break;
      case 'Mediana':
        costoBase = 10.0;
        break;
      case 'Grande':
        costoBase = 12.0;
        break;
      default:
        costoBase = 0.0;
    }

    let costoIngredientesAdicionales = 0;

    const cantidadIngredientes = ingredientesAdicionales.length;

    if (cantidadIngredientes === 1) {
      switch (tipoPizza) {
        case 'Personal':
          costoIngredientesAdicionales = 1.0;
          break;
        case 'Mediana':
          costoIngredientesAdicionales = 2.0;
          break;
        case 'Grande':
          costoIngredientesAdicionales = 2.5;
          break;
        default:
          costoIngredientesAdicionales = 0.0;
      }
    } else if (cantidadIngredientes === 2) {
      switch (tipoPizza) {
        case 'Personal':
          costoIngredientesAdicionales = 0.75 * 2;
          break;
        case 'Mediana':
          costoIngredientesAdicionales = 1.0 * 2;
          break;
        case 'Grande':
          costoIngredientesAdicionales = 2.0 * 2;
          break;
        default:
          costoIngredientesAdicionales = 0.0;
      }
    } else if (cantidadIngredientes === 3) {
      switch (tipoPizza) {
        case 'Personal':
          costoIngredientesAdicionales = 0.5 * 3;
          break;
        case 'Mediana':
          costoIngredientesAdicionales = 0.75 * 3;
          break;
        case 'Grande':
          costoIngredientesAdicionales = 1.0 * 3;
          break;
        default:
          costoIngredientesAdicionales = 0.0;
      }
    } else if (cantidadIngredientes > 3) {
      switch (tipoPizza) {
        case 'Personal':
          costoIngredientesAdicionales = 0.25 * cantidadIngredientes;
          break;
        case 'Mediana':
          costoIngredientesAdicionales = 0.5 * cantidadIngredientes;
          break;
        case 'Grande':
          costoIngredientesAdicionales = 0.75 * cantidadIngredientes;
          break;
        default:
          costoIngredientesAdicionales = 0.0;
      }
    }

    const costoTotal = costoBase + costoIngredientesAdicionales;

    return {
      costoTotal,
      costoIngredientesAdicionales,
      costoBase
    };
  };

  const handleCalcularClick = () => {
    if (validarCampos()) {
      const { costoTotal, costoIngredientesAdicionales,costoBase } = calcularCostoPizza();
      setMostrarFactura(true);
      setCostoTotal(costoTotal);
      setCostoNormal(costoBase)
      setCostoAdicional(costoIngredientesAdicionales);
      setMostrarCalculadora(false); 
    } else {
      alert('Por favor, ingrese un nombre válido antes de calcular.');
    }
  };

  const volverACalculadora = () => {
  
    setCliente('');
    setTipoPizza('Personal');
    setIngredientesBase('Jamon y queso')
    setIngredientesAdicionales([]);
    setCostoTotal(0);
    setCostoNormal(0)
    setCostoAdicional(0);
    setMostrarFactura(false);
    setMostrarCalculadora(true);
  };

  return (
    <div className='pedido'>
      {mostrarCalculadora && (
        <>
             <h1 id='titulo'>Pizzería "La Italiana"</h1>
          <h1>Personalice su pedido</h1>
          <label>
            Nombre del Cliente:
            <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} />
          </label>
          <br />
          <label>
            Tipo de Pizza:
            <select value={tipoPizza} onChange={handleTipoPizzaChange}>
              <option value="Personal">Personal</option>
              <option value="Mediana">Mediana</option>
              <option value="Grande">Grande</option>
            </select>

          </label>
          <br />
          <label>
            Ingredientes de Pizza:
            <select value={ingredientesBase} onChange={handleIngredienteBaseChange}>
              <option value="Jamon y queso">Jamon y queso</option>
              <option value="Peperoni y queso">Peperoni y queso</option>
             
            </select>

          </label>
          <br />
          <label>
            Ingredientes Adicionales:
            <br />
            {ingredientesDisponibles.map(ingrediente => (
              <label key={ingrediente.nombre}>
                <input
                  type="checkbox"
                  value={ingrediente.nombre}
                  checked={ingredientesAdicionales.includes(ingrediente.nombre)}
                  onChange={handleCheckboxChange}
                />
                {ingrediente.nombre}
              </label>
            ))}
          </label>
          <br />
          <button onClick={handleCalcularClick}>Calcular Costo</button>
        </>
      )}
      {mostrarFactura && (
        <div>
          <h2>Factura</h2>
          <p>Cliente: {cliente}</p>
          <p>Tipo de Pizza: {tipoPizza}</p>
          <p>Ingrediente base de la Pizza : {ingredientesBase}</p>
          <p>Costo base de la Pizza : ${costoNormal}</p>
          <p>Ingredientes Adicionales: {
          ingredientesAdicionales.join(', ')}</p>
          <p>Costo Adicional de Ingredientes: ${costoAdicional.toFixed(2)}</p>
          <p>Costo Total de Pizza: ${costoTotal.toFixed(2)}</p>
          <button onClick={volverACalculadora}>Volver a Ordenar</button>
        </div>
      )}
    </div>
  );
};

export default PizzaCalculator;


