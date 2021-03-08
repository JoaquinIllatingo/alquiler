

import React, { useState,useEffect} from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform, Touchable } from 'react-native';
import Formulario from './componentes/Formulario';
import Consulta from './componentes/Consulta';
import Dialog from "react-native-dialog";


const App = () => {

  const[mostrarForm, guardarMostrarForm] = useState(false);
  const[mostrarConsulta, guardarMostrarConsulta] = useState(false);
  const[mostrarFormPago, guardarMostrarFormPago] = useState(false);

  const [consultarAPI, guardarConsultarAPI] = useState(false);


  //DIALOGS
  const [visibleDialogRegistro, setVisibleDialogRegistro] = useState(false);
  const [visibleDialogError, setVisibleDialogError] = useState(false);
  const [visibleDialogPago, setVisibleDialogPago] = useState(false);
  const [visibleDialogEliminar, setVisibleDialogEliminar] = useState(false);

  const [visibleDialogPagoConfirmacion, setVisibleDialogPagoConfirmacion] = useState(false);
  const [visibleDialogEliminarConfirmacion, setVisibleDialogEliminarConfirmacion] = useState(false);

  const [inquilinoSeleccionado, setInquilinoSeleccionado] = useState({});



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




  const handlePagarDialogPago = () =>{
    setVisibleDialogPago(false);
  }

  const handleCerrarDialogPago = () =>{
    setVisibleDialogPago(false);

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
              setVisibleDialogPago = {setVisibleDialogPago}
              setInquilinoSeleccionado = {setInquilinoSeleccionado}
            />
              
            </>
          ):(
          <>
            
          </>
          )}


        </View>


        <View style={styles.container}>
          <Dialog.Container visible={visibleDialogPago}>
            <Dialog.Title style={styles.tituloDialog}>Realizar Pago</Dialog.Title>
            <Dialog.Description>
              Inquilino
            </Dialog.Description>
            <Dialog.Description style={{paddingBottom:15, fontWeight:'bold'}}>
              {inquilinoSeleccionado.nombrePersona +" "+inquilinoSeleccionado.apellidoPaterno}
            </Dialog.Description>

            <Dialog.Description>
              Monto de Alquiler
            </Dialog.Description>
            <Dialog.Description style={{paddingBottom:15, fontWeight:'bold'}}>
              {inquilinoSeleccionado.montoAlquiler}
            </Dialog.Description>        
            
            <Dialog.Description>
              Monto a Pagar
            </Dialog.Description>
            <Dialog.Input style={styles.inputMontoPago} keyboardType= 'numeric' >
            </Dialog.Input>

            <Dialog.Button label="PAGAR" onPress={handlePagarDialogPago} />
            <Dialog.Button label="ATRAS" onPress={handleCerrarDialogPago} />
          </Dialog.Container>
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
  },
  inputMontoPago:{
    backgroundColor:"#74D9D9"
  },
  tituloDialog:{
    fontWeight: 'bold',
    fontSize: 20,
    flexDirection: "row",
    paddingBottom:30
    
  }


});


export default App;
