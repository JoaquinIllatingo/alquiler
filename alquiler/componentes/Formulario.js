import React, { useState} from 'react';
import { Text, StyleSheet, View, TextInput, Button,TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-community/picker';


const Formulario = ({citas,setCitas,guardarMostrarForm}) => {


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

/*
        const getCurrentDate=()=>{

          var date = new Date().getDate();
          var month = new Date().getMonth() + 1;
          var year = new Date().getFullYear();
    
          //Alert.alert(date + '-' + month + '-' + year);
          // You can turn it in to your desired format
          return year + '-' + month + '-' + date;//format: dd-mm-yyyy;
        }
*/

        //this.state = {date:"2016-05-15"};
        //this.state = {date: getCurrentDate()};

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

        const crearNuevaCita = () => {
          console.log("Desde crearNuevaCita")

          if(paciente.trim() ==='' || 
            propietario.trim() ==='' || 
            telefono.trim() ==='' || 
            fecha.trim() ==='' || 
            hora.trim() ==='' || 
            sintomas.trim() ==='' )
            {
              mostrarAlerta();
              return;

            }

            const cita ={paciente,propietario,telefono,fecha,hora,sintomas}

            const citasNuevo =[...citas,cita];
            setCitas(citasNuevo);

            //Ocultar formulario
            guardarMostrarForm(false);

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
                <TouchableHighlight onPress={ () => crearNuevaCita() } style={styles.btnSubmit}>
                    <Text style={styles.textoSubmit}>Guardar</Text>
                </TouchableHighlight>
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
        marginHorizontal: '2.5%'
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
      marginVertical: 10
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }

})

export default Formulario;