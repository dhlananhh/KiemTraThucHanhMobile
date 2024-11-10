import React, { useState } from "react";
import { 
    View, 
    ScrollView,
    Text, 
    Image, 
    TouchableOpacity, 
    StyleSheet 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { Screen02 } from "./Screen02";


// Component: PowerBikeShopScreen
const PowerBikeShopScreen = ({ navigation }) => {
    // State for name input
    const [name, setName] = useState(''); 

    // Load fonts
    const [fontsLoaded] = useFonts({
        'VT323': require('../assets/fonts/VT323-Regular.ttf'),
        'Ubuntu': require('../assets/fonts/Ubuntu-Bold.ttf')
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView style={styles.container}>
            <LinearGradient
                colors={['#F9F7F6', '#F9F7F6']}
                style={styles.background}
            >
                <Text style={styles.headerText}>
                    A premium online store for sporter and their stylish choice
                </Text>

                <View style={styles.bgItem}>
                    <Image
                        source={require('../assets/images/bike-4.png')}
                        style={styles.bikeImage}
                    />
                </View>

                <Text style={styles.titleText}>
                    POWER BIKE SHOP
                </Text>

                <TouchableOpacity 
                    style={styles.btnStarted}
                    onPress={() => {
                        navigation.navigate('Screen02', { name }); // Navigate to HomePage
                    }}
                >
                    <Text style={styles.btnText}>
                        Get Started
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 375,
        height: 812,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        overflow: 'hidden',
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 61,
        paddingBottom: 59,
    },
    headerText: {
        width: 351,
        fontFamily: 'VT323',
        fontSize: 26,
        lineHeight: 26,
        textAlign: 'center',
        color: '#000',
    },
    bgItem: {
        width: 359,
        height: 388,
        backgroundColor: 'rgba(233, 65, 65, 0.1)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bikeImage: {
        width: 292,
        height: 270,
    },
    titleText: {
        width: 351,
        fontFamily: 'Ubuntu',
        fontWeight: '700',
        fontSize: 26,
        lineHeight: 30,
        textAlign: 'center',
        color: '#000',
    },
    btnStarted: {
        width: 340,
        height: 61,
        backgroundColor: '#E94141',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    btnText: {
        fontFamily: 'VT323',
        fontSize: 27,
        color: '#FEFEFE',
        lineHeight: 27,
    },
});


export default PowerBikeShopScreen;