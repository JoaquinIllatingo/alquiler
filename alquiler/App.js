

import React, { useState} from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform, Touchable } from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';
import Consulta from './componentes/Consulta';

const App = () => {

  //definir el state de citas
  const[mostrarForm, guardarMostrarForm] = useState(false);
  const[mostrarConsulta, guardarMostrarConsulta] = useState(false);
  const[mostrarFormPago, guardarMostrarFormPago] = useState(false);

  const [eventoGuardar, guardarEventoGuardar] = useState(false);

  const[citas, setCitas] = useState([
    {id: "1", paciente:"Hook", propietario: 'Juan', sintomas: "No Come"},
    {id: "2", paciente:"Redux", propietario: 'Itzel', sintomas: "No Duerme"},
    {id: "3", paciente:"Native", propietario: 'Josue', sintomas: "No Canta"}
  ]);




  const eliminarPaciente = id => {
    setCitas( (citasActuales) => {
      return citasActuales.filter(cita =>cita.id != id)

    })
  }

  const mostrarFormulario = () => {
    guardarMostrarConsulta(false);
    guardarMostrarFormPago(false);
    guardarMostrarForm(true);
  }

  const mostrarListado = () => {
    guardarMostrarConsulta(true);
    guardarMostrarFormPago(false);
    guardarMostrarForm(false);
  }

  const mostrarPago = () => {
    guardarMostrarConsulta(false);
    guardarMostrarFormPago(true);
    guardarMostrarForm(false);
  }

  const cerrarTeclado = ()=> {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style= {styles.contenedor}>
        <Text style= {styles.titulo}>Sistema de Alquiler</Text>

              <View style = {styles.barraBotones}>
                  <TouchableHighlight onPress={ () => mostrarListado() } style={styles.btnMostrarForm}>
                      <Text style={styles.textoMostrarForm}>Consultar</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={ () => mostrarPago() } style={styles.btnMostrarForm}>
                      <Text style={styles.textoMostrarForm}>Pagar</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={ () => mostrarFormulario() } style={styles.btnMostrarForm}>
                      <Text style={styles.textoMostrarForm}>Alquilar</Text>
                  </TouchableHighlight>
              </View>

        <View style={styles.contenido}>
          {mostrarForm?(
            <>
            <Text style= {styles.titulo}>Nuevo Inquilino</Text>
            <Formulario 
              guardarMostrarForm={guardarMostrarForm}
              eventoGuardar={eventoGuardar}
              guardarEventoGuardar={guardarEventoGuardar}
              
            />
              
            </>
          ):(
          <>
            
          </>
          )}

          {mostrarConsulta?(
            <>
            <Consulta />
              
            </>
          ):(
          <>
            
          </>
          )}


        </View>

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({

  contenedor: {
    backgroundColor: '#CFF9F9',
    flex: 1
  },

  barraBotones:{
    flexDirection:'row',
    justifyContent:'space-between',
    flexWrap:'wrap'
  },

  titulo: {
    color: '#121212',
    marginTop: Platform.OS==='ios'? 40 : 20,
    marginBottom: 20,
    fontSize:24,
    fontWeight: "bold",
    textAlign: 'center'

  },
  contenido:{
    flex:1,
    marginHorizontal: '2.5%'
  },
  listado:{
    flex:1
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
    flex: 1
  },
  textoMostrarForm: {
      color: '#FFF',
      fontWeight: 'bold',
      textAlign: 'center'
  }

});


export default App;
