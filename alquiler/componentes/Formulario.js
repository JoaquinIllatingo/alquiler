import React, { useState,useEffect} from 'react';
import { Text, StyleSheet, View, TextInput, Button,TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import Dialog from "react-native-dialog";


const Formulario = ({guardarMostrarForm}) => {


        const [nombre, guardarNombre] = useState('');
        const [apellidoPaterno, guardarApellidoPaterno] = useState('');
        const [apellidoMaterno, guardarApellidoMaterno] = useState('');
        const [celular, guardarCelular] = useState('');
        const [dni, guardarDni] = useState('');
        const [fechaIngreso, guardarFechaIngreso] = useState(new Date());
        const [propiedad, guardarPropiedad] = useState(0);
        const [habitacion, guardarHabitacion] = useState(0);
        const [montoAlquiler, guardarMontoAlquiler] = useState('');


        const [visibleDialogRegistroOk, setVisibleDialogRegistroOk] = useState(false);
        const [visibleDialogRegistroError, setVisibleDialogRegistroError] = useState(false);
        const [visibleDialogAlerta, setVisibleDialogAlerta] = useState(false);

        const [textoAlerta, setTextoAlerta] = useState("");



        const [habitaciones, guardarHabitaciones] = useState(
          [
            {id: 0,nombre: "--Seleccione--",libre: true,estado: 1}
          ]
        )

        const guardarInquilino = () => {
          
          var inquilinoFormulario = {};

          var valid = validarFormulario();

          if(valid === "OK"){

            inquilinoFormulario = {nombre: nombre,
              apellidoPaterno: apellidoPaterno,
              apellidoMaterno: apellidoMaterno,
              celular: celular,
              tipoDocumento: "1",
              numeroDocumento: dni,
              trabajo: "abc",
              observacion: "abc",
              fechaIngreso: fechaIngreso,
              habitacion: habitacion,
              montoAlquiler: montoAlquiler              
            }

            console.log("inquilinoFormulario");
            console.log(inquilinoFormulario);
            guardarInquilinoAPI(inquilinoFormulario);



          }else{
            console.log("mostrar Alerta")
            mostrarAlerta(valid);
          }



            //Resetear Formulario


        }

        const validarFormulario = () => {
          if(nombre.trim() === ''){
            console.log("nombre vacio");
            return "Ingresar Nombre";
          }else if(apellidoPaterno.trim() === ''){
            return "Ingresar Apellido Paterno";
          }else if(apellidoMaterno.trim() === ''){
            return "Ingresar Apellido Materno";
          }else if(dni.trim() === ''){
            return "Ingresar DNI ";
          }else if(propiedad === 0){
            return "Seleccione la Propiedad";
          }else if(habitacion === 0){
            return "Seleccione la Habitacion";
          }else if(montoAlquiler.trim() === ''){
            return "Ingresar el Monto de alquilar";
          }else{
            return "OK";
          }


        }

        const guardarInquilinoAPI = (inquilinoFormulario) => {

          console.log("consultarAPIRegistro");
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inquilinoFormulario)
          };

          console.log("registrando");
          console.log(inquilinoFormulario);
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
                //setVisibleDialogRegistro(true);
                setVisibleDialogRegistroOk(true);

              }
            )
            .catch(error => {
              //this.setState({ errorMessage: error.toString() });
              console.log('There was an error!', error);
              setVisibleDialogRegistroError(true);
            });

       

        }

        const mostrarAlerta_old = (texto) =>{
          Alert.alert(
            'Alerta',//titulo
            "ingrese valores",//mensaje
            [
              {
                text:"OK" //Arreglo de botones
              }
            ]
          )
        }

        const mostrarAlerta = (texto) =>{
          setTextoAlerta(texto);
          setVisibleDialogAlerta(true);
         
        }

        const obtenerPropiedad = (propiedad) => {
          guardarPropiedad(propiedad);
          consultarHabitaciones(propiedad);

        }

        const consultarHabitaciones = (idPropiedad) =>{
            
          fetch(`https://kaela2505.herokuapp.com/habitacion?idPropiedad=${idPropiedad}`)
          .then(response => response.json())
          .then(data => {
            guardarHabitaciones(data);
          });
        }

        const obtenerHabitacion = (habit) => {
          guardarHabitacion(habit);
        }


        const handleOkDialogRegistro = () => {
          // The user has pressed the "Delete" button, so here you can do your own logic.
          // ...Your logic
          setVisibleDialogRegistroOk(false);
        };
      
        const handleOkDialogError = () => {
          // The user has pressed the "Delete" button, so here you can do your own logic.
          // ...Your logic
          setVisibleDialogRegistroError(false);
        };

        const handleOkDialogAlerta= () => {
          // The user has pressed the "Delete" button, so here you can do your own logic.
          // ...Your logic
          setVisibleDialogAlerta(false);
        };


    return (
        <>
        <ScrollView style={styles.Formulario}>
            <View>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText= {(texto) => guardarNombre(texto)}
                />
            </View>

            <View>
                <Text style={styles.label}>Apellido Paterno:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText= {(texto) => guardarApellidoPaterno(texto)}
                />
            </View>

            <View>
                <Text style={styles.label}>Apellido Materno:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText= {(texto) => guardarApellidoMaterno(texto)}                  
                />
            </View>

            <View>
                <Text style={styles.label}>Celular:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText= {(texto) => guardarCelular(texto)}
                  keyboardType= 'numeric'
                />
            </View>

            
            <View>
                <Text style={styles.label}>DNI:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText= {(texto) => guardarDni(texto)}
                />
            </View>

            <View>
                <Text style={styles.label}>Fecha de Ingreso:</Text>
                <DatePicker
                  style={{width: 200}}
                  date={fechaIngreso}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {guardarFechaIngreso(date)}}
                />
            </View>

            <View>
                <Text style={styles.label}>Propiedad:</Text>
                <Picker 
                selectedValue= {propiedad}
                onValueChange={propiedad => obtenerPropiedad(propiedad)}
                itemStyle ={{height:120}}
                >
                <Picker.Item label="--Seleccione--" value= ""/>
                <Picker.Item label="RETAMAS" value= "1"/>
                <Picker.Item label="CEDROS" value= "2"/>
                <Picker.Item label="SANTA ANITA" value= "3"/>
                <Picker.Item label="PP LECAROS" value= "4"/>
                <Picker.Item label="PP JIROM" value= "5"/>
                <Picker.Item label="PP STA PAULA" value= "6"/>
            </Picker>
            </View>

            <View>
                <Text style={styles.label}>Habitacion:</Text>
                <Picker 
                    selectedValue= {habitacion}
                    onValueChange={habit => obtenerHabitacion(habit)}
                    itemStyle ={{height:120}}
                >

                  
                    <Picker.Item label="--Seleccione--" value= ""/>
                    {  habitaciones.map( habit => (
                          <Picker.Item key={habit.id} label={habit.nombre} value= {habit.id}/>                    
                           ) ) }

                </Picker>

            </View>

            <View>
                <Text style={styles.label}>Monto Alquiler:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText= {(texto) => guardarMontoAlquiler(texto)}
                  keyboardType= 'numeric'
                />
            </View>

            

        
            <View>
                <TouchableHighlight onPress={ () => guardarInquilino() } style={styles.btnSubmit}>
                    <Text style={styles.textoSubmit}>Guardar</Text>
                </TouchableHighlight>
            </View>




            <View style={styles.container}>
              <Dialog.Container visible={visibleDialogRegistroOk}>
                <Dialog.Title>Confirmacion</Dialog.Title>
                <Dialog.Description>
                  REGISTRO EXITOSO
                </Dialog.Description>
                <Dialog.Button label="OK" onPress={handleOkDialogRegistro} />
              </Dialog.Container>
            </View>

            <View style={styles.container}>
              <Dialog.Container visible={visibleDialogRegistroError}>
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Description>
                  OCURRIO UN ERROR
                </Dialog.Description>
                <Dialog.Button label="OK" onPress={handleOkDialogError} />
              </Dialog.Container>
            </View>

            <View style={styles.container}>
              <Dialog.Container visible={visibleDialogAlerta}>
                <Dialog.Title>Alerta</Dialog.Title>
                <Dialog.Description>
                  {textoAlerta}
                </Dialog.Description>
                <Dialog.Button label="OK" onPress={handleOkDialogAlerta} />
              </Dialog.Container>
            </View>
           
        </ScrollView>
        </>

    );
}

const styles = StyleSheet.create({

    Formulario: {
        backgroundColor:'#FFF',
        paddingHorizontal:20,
        paddingVertical: 10,
        marginHorizontal: '2.5%',
        marginBottom:40,
        paddingBottom:30
    },
    label:{
        fontWeight:"bold",
        fontSize: 20,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        backgroundColor: '#e1e1e1',
        borderStyle: 'solid',
        fontSize:22
    },
    btnSubmit: {
      padding: 10,
      backgroundColor: '#7d024e',
      marginVertical: 10,
      marginBottom:20
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    tituloDialog:{
      fontWeight: 'bold',
      fontSize: 20,
      flexDirection: "row",
      paddingBottom:30
      
  }

})

export default Formulario;