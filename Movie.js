import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { FlatList, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import axios from 'axios'
import CardView from 'react-native-cardview'


export default class Movie extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             categories :[],
             search:''
        }
    }


    componentDidMount (){
        var url = "http://omdbapi.com/?apikey=e01f82b8&t=Harry";
        axios.post(url).
        then(res => {
        const categories = res.data;
        // alert(res.data.Search)
        console.log(categories);
        this.setState({categories})
        }).catch(function(error){
        alert(error)
        });
    }
   
    _search = async () => {
        var url = "http://omdbapi.com/?apikey=e01f82b8&s=" + this.state.search;
        await axios.post(url).
        then(res => {
        const categories = res.data.Search;
        // alert(res.data.Search)
        console.log(res.data.Search);
        this.setState({categories})
        }).catch(function(error){
        alert(error)
        });
    }
    keyExtractor =(item, index)=> index.toString()
    renderItem = ({item}) => (
        <View>
        <CardView
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
          margin={10}>
        <Image
          style={{width: 100, height: 100, marginLeft: 20, marginTop:10}}
          source={{uri: item.Poster}}
        />
        <Text style={{marginLeft: 10, fontWeight: 'bold', marginTop: 10}}> Title : {item.Actors}</Text>
        <Text style={{marginLeft: 10, fontWeight: 'bold', marginTop: 10, marginBottom: 10}}> Years : {item.Year}</Text> 
    </CardView>
    </View>
    )



    render() {
        const {search} = this.state
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>LIST MOVIE</Text>
                <Text style={{fontWeight: 'bold', marginLeft: 10, marginTop: 10}}>Enter List Movie..</Text>
            
                <TextInput style={{borderRadius: 1, margin: 10}} underlineColorAndroid="blue" onChangeText={search => this.setState(prevState => ({
                    ...prevState, 
                        search

            }))} value={search}></TextInput>
           <TouchableHighlight onPress={this._search} style={{backgroundColor : 'lightblue', marginLeft: 10, marginRight: 10, padding: 10}}>
            <Text style={{textAlign: "center", fontSize :16, color : 'white', fontWeight: 'bold'}}>SEARCH</Text>
         </TouchableHighlight>
            <FlatList keyExtractor={this.keyExtractor}
                data={this.state.categories}
                renderItem={this.renderItem}
            ></FlatList>         
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        flex : 1
    }
})
