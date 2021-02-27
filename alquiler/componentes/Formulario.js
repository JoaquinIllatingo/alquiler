import React, { useState} from 'react';
import { Text, StyleSheet, View, TextInput, Button,TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Formulario = ({citas,setCitas,guardarMostrarForm}) => {


        const [nombre, guardarNombre] = useState('');
        const [apellidoPaterno, guardarApellidoPaterno] = useState('');
        const [apellidoMaterno, guardarApellidoMaterno] = useState('');
        const [celular, guardarCelular] = useState('');
        const [dni, guardarDni] = useState('');
        const [fechaIngreso, guardarFechaIngreso] = useState('');
        const [propiedad, guardarPropiedad] = useState('');
        const [habitacion, guardarHabitacion] = useState('');
        const [montoAlquiler, guardarMontoAlquiler] = useState('');

        const [fecha, guardarFecha] = useState('');
        const [hora, guardarHora] = useState('');
        const [sintomas, guardarSintomas] = useState('');

        const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
        const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

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
                <TextInput
                  style={styles.input}
                  onChangeText= {(texto) => guardarDni(texto)}
                />
            </View>
            <View>
              <Button title="Fecha de Ingreso" onPress={showDatePicker} />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={confirmarFecha}
                onCancel={hideDatePicker}
                locale='es_Es'
                headerTextIOS="Elige una fecha"
                cancelTextIOS="Cancelar"
                confirmTextIOS="Confirmar"
              />
              <Text>{fecha}</Text>
            </View>

            <View>
                <Text style={styles.label}>Propiedad:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText= {(texto) => guardarDni(texto)}
                />
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
        fontSize: 11,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
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