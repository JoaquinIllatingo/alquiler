import React, { useState,useEffect} from 'react';
import { Text, StyleSheet, View, TextInput, Button,TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';


const Formulario = ({guardarMostrarForm,guardarConsultarAPI,dataRegistro, guardarDataRegistro}) => {


        const [nombre, guardarNombre] = useState('');
        const [apellidoPaterno, guardarApellidoPaterno] = useState('');
        const [apellidoMaterno, guardarApellidoMaterno] = useState('');
        const [celular, guardarCelular] = useState('');
        const [dni, guardarDni] = useState('');
        const [fechaIngreso, guardarFechaIngreso] = useState(new Date());
        const [propiedad, guardarPropiedad] = useState(1);
        const [habitacion, guardarHabitacion] = useState('');
        const [montoAlquiler, guardarMontoAlquiler] = useState('');



        const [textoGuardando, guardarTextoGuardando] = useState('0');        

        const [habitaciones, guardarHabitaciones] = useState(
          [
            {id: 0,nombre: "--Seleccione--",libre: true,estado: 1}
          ]
        )

        const guardarInquilino = () => {

          if(nombre.trim() === ''){
            console.log("nombre vacio");
            return;
          }

            //Ocultar formulario
            guardarTextoGuardando("2");
            guardarDataRegistro(
              {nombre: nombre,
                apellidoPaterno: apellidoPaterno,
                apellidoMaterno: apellidoMaterno,
                tipoDocumento: "1",
                numeroDocumento: dni,
                trabajo: "abc",
                observacion: "abc",
                fechaIngreso: fechaIngreso,
                habitacion: habitacion,
                montoAlquiler: montoAlquiler              
              })
            //guardarMostrarForm(false);
            guardarConsultarAPI(true);


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