import React, { useState,useEffect} from 'react';
import { Text, StyleSheet, View, TextInput, Button,TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-community/picker';


const Formulario = ({guardarMostrarForm,eventoGuardar,guardarEventoGuardar,guardarConsultarAPI,dataRegistro, guardarDataRegistro}) => {


        const [nombre, guardarNombre] = useState('');
        const [apellidoPaterno, guardarApellidoPaterno] = useState('');
        const [apellidoMaterno, guardarApellidoMaterno] = useState('');
        const [celular, guardarCelular] = useState('');
        const [dni, guardarDni] = useState('');
        const [fechaIngreso, guardarFechaIngreso] = useState(new Date());
        const [propiedad, guardarPropiedad] = useState('');
        const [habitacion, guardarHabitacion] = useState('');
        const [montoAlquiler, guardarMontoAlquiler] = useState('');



        const [fecha, guardarFecha] = useState('');
        const [hora, guardarHora] = useState('');
        const [sintomas, guardarSintomas] = useState('');

        const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
        const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

        const [textoGuardando, guardarTextoGuardando] = useState(' ');
        const [cuenta, setCuenta] = useState(0);

        const showDatePicker = () => {
          setDatePickerVisibility(true);
        };
      
        const hideDatePicker = () => {
          setDatePickerVisibility(false);
        };
      
        const confirmarFecha = (date) => {
          const opciones = {year:'numeric', month:'long', day:"2-digit"};
          guardarFecha(date.toLocaleDateString('es-ES',opciones));
          guardarFechaIngreso(date.toLocaleDateString('es-ES',opciones));
          hideDatePicker();
        };

        const showTimePicker = () => {
          setTimePickerVisibility(true);
        };
      
        const hideTimePicker = () => {
          setTimePickerVisibility(false);
        };

        const confirmarHora = (hora) => {
          const opciones = {hour:'numeric', minute:"2-digit"};
          guardarHora(hora.toLocaleDateString('en-US',opciones));
          hideTimePicker();
        };



        const guardarInquilino = () => {
          console.log("GuardarInquilino");

          if(nombre.trim() === ''){
            console.log("nombre vacio");
            return;
          }
          console.log('nombre:'+nombre);

          

            //Ocultar formulario
            guardarTextoGuardando("guardando");
            guardarDataRegistro(
              {nombre: nombre,
                apellidoPaterno: apellidoPaterno,
                apellidoMaterno: apellidoMaterno,
                tipoDocumento: "1",
                numeroDocumento: dni,
                trabajo: "abc",
                observacion: "abc",
                fechaIngreso: "2012-01-01",
                habitacion: 1              
              })
            //guardarMostrarForm(false);
            guardarEventoGuardar(true);
            setCuenta(2);
            guardarConsultarAPI(true);
            
            

           //registrarInquilino();

            //Resetear Formulario


        }

        const mostrarAlerta = () =>{
          Alert.alert(
            'Error',//titulo
            'Todos los campos son obligatorios',//mensaje
            [
              {
                text:"OK" //Arreglo de botones
              }
            ]
          )
        }

        const obtenerPropiedad = (propiedad) => {
          guardarPropiedad(propiedad);
          console.log(propiedad);
        }

/*
        const registrarInquilino = () => {
          console.log(registrarInquilino);
          // POST request using fetch with error handling
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                nombre: nombre,
                apellidoPaterno: "Illatingo",
                apellidoMaterno: "Reynoso",
                tipoDocumento: "1",
                numeroDocumento: "70434083",
                trabajo: "abc",
                observacion: "abc",
                fechaIngreso: "2012-01-01",
                habitacion: 1
             })
          };

          fetch('https://kaela2505.herokuapp.com/registro', requestOptions)
              .then(async response => {
                  const data = await response.json();
      
                  console.log("data");
                  console.log(data);
                  // check for error response
                  if (!response.ok) {
                      // get error message from body or default to response status
                      const error = (data && data.message) || response.status;
                      //return Promise.reject(error);
                      console.log(error);
                  }
                  
      
                  console.log('There was an error!');
              })
              .catch(error => {
                  console.log('There was an error!', error);
              });
        }
*/
        

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
                <TextInput
                  style={styles.input}
                  onChangeText= {(texto) => guardarDni(texto)}
                />
            </View>

            <View>
                <Text style={styles.label}>Monto Alquiler:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText= {(texto) => guardarDni(texto)}
                  keyboardType= 'numeric'
                />
            </View>

            

        
            <View>
                <TouchableHighlight onPress={ () => guardarInquilino() } style={styles.btnSubmit}>
                    <Text style={styles.textoSubmit}>Guardar</Text>
                </TouchableHighlight>
            </View>
            <View style={{height:30}}>
              <Text>{textoGuardando}</Text>
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
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        backgroundColor: '#e1e1e1',
        borderStyle: 'solid'
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
    }

})

export default Formulario;