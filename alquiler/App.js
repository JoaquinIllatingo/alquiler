

import React, { useState,useEffect} from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform, Touchable } from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';
import Consulta from './componentes/Consulta';
import Dialog from "react-native-dialog";


const App = () => {

  const[mostrarForm, guardarMostrarForm] = useState(false);
  const[mostrarConsulta, guardarMostrarConsulta] = useState(false);
  const[mostrarFormPago, guardarMostrarFormPago] = useState(false);

  const [eventoGuardar, guardarEventoGuardar] = useState(false);

  const [consultarAPI, guardarConsultarAPI] = useState(false);

  const[dataRegistro, guardarDataRegistro] = useState({});



  //DIALOGS
  const [visibleDialogRegistro, setVisibleDialogRegistro] = useState(false);
  const [visibleDialogError, setVisibleDialogError] = useState(false);


  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const consultarAPIRegistro = async () => {
      console.log("consultarAPIRegistro");
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataRegistro)
      };

      if(consultarAPI){
        console.log("registrando");
        console.log(dataRegistro);
        fetch('https://kaela2505.herokuapp.com/registro', requestOptions)
          //.then(response => response.json())
          //.then(data => console.log(response))
          .then(
            response => {
              console.log(response);

              const data = response.json();

              // check for error response
              if (!response.ok) {
                  // get error message from body or default to response status
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
              }

              console.log("Registro OK");
              setVisibleDialogRegistro(true);

            }
          )
          .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.log('There was an error!', error);
          });

      }else{
        console.log("else")
      }
  }
  consultarAPIRegistro();


// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, [consultarAPI]);


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






  const handleOkDialogRegistro = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisibleDialogRegistro(false);
  };

  const handleOkDialogError = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisibleDialogError(false);
  };

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
              guardarConsultarAPI = {guardarConsultarAPI}
              dataRegistro = {dataRegistro}
              guardarDataRegistro = {guardarDataRegistro}
              
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




        <View style={styles.container}>
          <Dialog.Container visible={visibleDialogRegistro}>
            <Dialog.Title>Confirmacion</Dialog.Title>
            <Dialog.Description>
              REGISTRO EXITOSO
            </Dialog.Description>
            <Dialog.Button label="OK" onPress={handleOkDialogRegistro} />
          </Dialog.Container>
        </View>

        <View style={styles.container}>
          <Dialog.Container visible={visibleDialogError}>
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Description>
              OCURRIO UN ERROR
            </Dialog.Description>
            <Dialog.Button label="OK" onPress={handleOkDialogError} />
          </Dialog.Container>
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
