

import React, { useState,useEffect} from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform, Touchable } from 'react-native';
import Formulario from './componentes/Formulario';
import Consulta from './componentes/Consulta';
import Dialog from "react-native-dialog";
import DeviceInfo from 'react-native-device-info';


const App = () => {

  const[mostrarForm, guardarMostrarForm] = useState(false);
  const[mostrarConsulta, guardarMostrarConsulta] = useState(false);

  const mostrarFormulario = () => {

    guardarMostrarConsulta(false);
    guardarMostrarForm(true);
    var uniqueId = DeviceInfo.getUniqueId();
    console.log(uniqueId);

  }

  const mostrarListado = () => {
    guardarMostrarConsulta(true);
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
              
            />
              
            </>
          ):(
          <>
            
          </>
          )}

          {mostrarConsulta?(
            <>
            <Consulta
            />
              
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

  container: {
  },
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
    marginTop: Platform.OS==='ios'? 20 : 10,
    marginBottom: 10,
    fontSize:24,
    fontWeight: "bold",
    textAlign: 'center'

  },
  contenido:{
    flex:1,
    marginHorizontal: 2
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
  },
  


});


export default App;
