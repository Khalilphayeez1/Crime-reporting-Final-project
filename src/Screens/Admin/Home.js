import React from "react";
import { Text, View, StyleSheet} from "react-native";
import { ip } from "../../ip";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";


const Home = () => {
    const [news, setNews] = useState([]);
    useEffect(() => {
        const getNews = async () => {
            try {
                let response = await fetch(`http://${ip}:3001/get_news`, {
                    method: "GET"
                });
                let json = await response.json();
                setNews(json.data);
                // else alert("Server error");
            } catch (error) {
                console.log(error)
            }
        }
        getNews();
    }, [news]);

    const tableData = news.map((item) => [item.headline, item.details]);

    return (
        <ScrollView style={style.container}>
            <Text style={style.title}>Crimes daily news</Text>
            {news.map((item, index) => (
                <View key={item.id || index}>
                    <View style={style.cont}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={style.head}>title: </Text>
                            <Text style={{ color: 'black' }}>{item.headline}</Text>
                            
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={style.head}>Details: </Text>
                            <Text style={{ color: 'black' }}>{item.details}</Text>
                            
                        </View>

                    </View>
                </View>
            ))}

        </ScrollView>
    )
}

export { Home }

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 33,
        backgroundColor: '#fff',
        
    },
    cont: {
        padding:20,
        borderRadius:0.9,
        borderWidth:1,
        alignItems:'center',
        margin:5
    },
    head: {
        height: 20,
        // backgroundColor: '#f1f8ff',
        color: 'lightblue',
        fontWeight: '800',
        
    },
    text:
    {
        color: 'black',
    },
    title: {
        color: 'black',
        fontWeight: '900',
        margin: 20,
        fontSize: 18,
        marginLeft: 110
    }
})