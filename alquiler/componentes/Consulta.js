import React, { useState,useEffect}  from 'react';
import { Text, StyleSheet, View, TouchableHighlight, FlatList } from 'react-native';
import axios from 'axios';
import ItemInquilino from './ItemInquilino';
import {Picker} from '@react-native-community/picker';

const Consulta = () => {

    const [consultarAPI, guardarConsultarAPI] = useState(true);

    const [propiedad, guardarPropiedad] = useState(true);

    const[inquilinos, guardarInquilinos]= useState([]);

    const dialogoEliminar = id => {
        console.log('eliminando....', id);
    }

    const obtenerPropiedad = (propiedad) => {
        guardarPropiedad(propiedad);
    }

    useEffect(() => {
        const cotizarCriptomoneda = async () => {
          if(consultarAPI){
            console.log('consultando libros');
            //const url = `https://www.json-generator.com/api/json/get/ccLAsEcOSq?indent=1`;
            //const url = `http://localhost:9091/consulta/inquilino?idPropiedad=1`;
            const url ='https://kaela2505.herokuapp.com/consulta/inquilinoDemo?idPropiedad=1';
            console.log(url);
            const resultado = await axios.get(url);

           console.log(resultado);
           guardarInquilinos(resultado.data);



            console.log('consultando inquilinos');
              const url2 = `http://localhost:9091/consulta/inquilino?idPropiedad=1`;
              console.log(url2);
              const resultado2 = await axios.get(url2);
  
             console.log(resultado2);
    
          }
        }

      
        cotizarCriptomoneda();
        
      }, []);


    
    return (
        <>
        <View style={styles.filtro}>
                <Text style={styles.label}>Propiedad:</Text>
                <Picker 
                style = {{width:180}}
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

        <View style={styles.fila}>
            <View>
                <Text style={styles.colHabitacion}>HAB</Text>
            </View>
            <View>
                <Text style={styles.colNombre}>NOMBRE</Text>
            </View>
         
            <View>
                <Text style={styles.colFecha}>PAGADO</Text>
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
              renderItem= {({item}) => <ItemInquilino item = {item} />}
              keyExtractor={ inquilinos => inquilinos.idInquilino}
            />
       

        
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
        width:100,
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
        width:95,
        fontSize: 17,
        marginLeft:5
    },
    colBtnPagar: {
        fontWeight: 'bold',
        width:60,
        fontSize: 17,
        marginLeft:10,
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
})
 
export default Consulta;