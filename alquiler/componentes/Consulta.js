import React, { useState,useEffect}  from 'react';
import { Text, StyleSheet, View, TouchableHighlight, FlatList } from 'react-native';
import axios from 'axios';
import ItemInquilino from './ItemInquilino';
import {Picker} from '@react-native-community/picker';
import Dialog from "react-native-dialog";

const Consulta = ({}) => {

    const [propiedad, guardarPropiedad] = useState(1);
    const[inquilinos, guardarInquilinos]= useState([]);
    const [inquilinoSeleccionado, setInquilinoSeleccionado] = useState({});

    const [montoPagar, guardarMontoPagar] = useState();
    const [visibleDialogPago, setVisibleDialogPago] = useState(false);
    const [visibleDialogEliminar, setVisibleDialogEliminar] = useState(false);
  
    const [visibleDialogConfirmacion_Error, setVisibleDialogConfirmacion_Error] = useState(false);
    const [textoDialogConfirmacion_Error, setTextoDialogConfirmacion_Error] = useState("");

    const dialogoEliminar = inquilinar => {
        console.log('eliminando....', id);
    }

    

    const obtenerHabitaciones = (propiedad) => {
        guardarPropiedad(propiedad);
        consultarInquilinoPorPropiedad(propiedad);
        
    }

    const consultarInquilinoPorPropiedad =  async (idPropiedad) => {
          const url =`https://kaela2505.herokuapp.com/consulta/inquilino?idPropiedad=${idPropiedad}`;
          console.log(url);
          const resultado = await axios.get(url);
         console.log(resultado);
         guardarInquilinos(resultado.data);

        
      }


    useEffect(() => {
        const consultarInquilinos = async () => {
            const url ='https://kaela2505.herokuapp.com/consulta/inquilino?idPropiedad=1';
            console.log(url);
            const resultado = await axios.get(url);

           console.log(resultado);
           guardarInquilinos(resultado.data);
    
          
        }
        consultarInquilinos();
        
      }, []);

      const accionPagoInquilino = (inqui) => {

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({idRegistro: inqui.idRegistro,
            monto: montoPagar,
            fechaPagadoHasta: inqui.fechaFinMensualidad})
        };
    
        fetch('https://kaela2505.herokuapp.com/pago', requestOptions)
          .then(
            response => {
              console.log(response);
              const data = response.json();
              if (!response.ok) {
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
              }
              console.log("Registro OK");
              setVisibleDialogConfirmacion_Error(true);
              setTextoDialogConfirmacion_Error("El pago se realizó exitosamente.")
              consultarInquilinoPorPropiedad(propiedad);
            }
          )
          .catch(error => {
            console.log('There was an error!', error);
            setVisibleDialogConfirmacion_Error(true);
            setTextoDialogConfirmacion_Error("Ocurrió un error al realizar el pago.")
          });
    
      }

      const accionPagarDialogPago = () =>{
        accionPagoInquilino(inquilinoSeleccionado);
        setVisibleDialogPago(false);
        
      }
    
      const accionCancelarDialogPago = () =>{
        setVisibleDialogPago(false);
    
      }
      const accionOkDialogConfirmacion_Error = () =>{
          setVisibleDialogConfirmacion_Error(false);
      }


    
    return (
        <>
        <View style={styles.filtro}>
                <Text style={styles.label}>Propiedad:</Text>
                <Picker 
                style = {{width:180}}
                selectedValue= {propiedad}
                onValueChange={propiedad => obtenerHabitaciones(propiedad)}
                itemStyle ={{height:120}}
                >
                <Picker.Item label="RETAMAS" value= "1"/>
                <Picker.Item label="CEDROS" value= "2"/>
                <Picker.Item label="SANTA ANITA" value= "3"/>
                <Picker.Item label="PP LECAROS" value= "4"/>
                <Picker.Item label="PP JIROM" value= "5"/>
                <Picker.Item label="PP STA PAULA" value= "6"/>
            </Picker>
        </View>

        <View style={styles.fila}>
            <View>
                <Text style={styles.colHabitacion}>HAB</Text>
            </View>
            <View>
                <Text style={styles.colNombre}>NOMBRE</Text>
            </View>
         
            <View>
                <Text style={styles.colFecha}>PAGO HASTA</Text>
            </View>
            <View>
                <Text style={styles.colBtnPagar}>PAGAR</Text>
            </View>
            <View>
                <Text style={styles.colBtnBorrar}>BORRAR</Text>
            </View>
        </View>
      
        <FlatList
              style={styles.listado}
              data={inquilinos}
              renderItem= {({item}) => <ItemInquilino item = {item}
              setVisibleDialogPago= {setVisibleDialogPago}
              setInquilinoSeleccionado = {setInquilinoSeleccionado} />}
              keyExtractor={ inquilinos => inquilinos.idInquilino}
            />


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
            <Dialog.Input style={styles.inputMontoPago} keyboardType= 'numeric'
            onChangeText= {(texto) => guardarMontoPagar(texto)} >
            </Dialog.Input>

            <Dialog.Button label="ATRAS" onPress={accionCancelarDialogPago} />
            <Dialog.Button label="PAGAR" onPress={accionPagarDialogPago } />
          </Dialog.Container>
        </View>

        <View style={styles.container}>
          <Dialog.Container visible={visibleDialogConfirmacion_Error}>
            <Dialog.Title style={styles.tituloDialog}>Confirmacion</Dialog.Title>
           
            <Dialog.Description style={{paddingBottom:15, fontWeight:'bold'}}>
            {textoDialogConfirmacion_Error}
            </Dialog.Description>

            <Dialog.Button label="OK" onPress={accionOkDialogConfirmacion_Error} />
          </Dialog.Container>
        </View>
       

        
        </>

    ) 
}

const styles = StyleSheet.create({
   
    filtro:{
        flexDirection:'row',
    },

    celda:{
        borderStyle: 'solid',
        marginLeft: 10,
        textAlign: 'center'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 12
    },
    texto: {
        fontSize: 18,
        textAlign: 'center'
    },
    btnEliminar: {
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10
    },
    textoEliminar: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    colHabitacion: {
        fontWeight: 'bold',
        width:35,
        fontSize: 17,
        marginLeft:1
    },
    colNombre: {
        fontWeight: 'bold',
        width:85,
        fontSize: 17,
        marginLeft:5
    },
    colApellidoPaterno: {
        fontWeight: 'bold',
        width:100,
        fontSize: 17,
        marginLeft:5
    },
    colFecha: {
        fontWeight: 'bold',
        width:110,
        fontSize: 17,
        marginLeft:5
    },
    colBtnPagar: {
        fontWeight: 'bold',
        width:60,
        fontSize: 17,
        marginLeft:15,
    },
    colBtnBorrar: {
        fontWeight: 'bold',
        width:70,
        fontSize: 17,
        marginLeft:5,
    },
    fila: {
        backgroundColor: '#61BFE6',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 1,
        paddingHorizontal: 1,
        flexDirection:'row'
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
})
 
export default Consulta;