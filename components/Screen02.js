import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';


// Component: BikeShop
const BikeShop = () => {
    const [bikes, setBikes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const [fontsLoaded] = useFonts({
        'Ubuntu-Bold': require('../assets/fonts/Ubuntu-Bold.ttf'),
        'Voltaire-Regular': require('../assets/fonts/Voltaire-Regular.ttf'),
    });

    useEffect(() => {
        // Mock data
        const mockData = [
            { id: '1', name: 'Pinarello', price: 1800, image: require('../assets/images/bike-1.png'), category: 'Mountain' },
            { id: '2', name: 'Pina Mountai', price: 1700, image: require('../assets/images/bike-2.png'), category: 'Mountain' },
            { id: '3', name: 'Pina Bike', price: 1500, image: require('../assets/images/bike-3.png'), category: 'Roadbike' },
            { id: '4', name: 'Pinarello', price: 1900, image: require('../assets/images/bike-4.png'), category: 'Roadbike' },
            { id: '5', name: 'Pinarello', price: 2700, image: require('../assets/images/bike-3.png'), category: 'Mountain' },
            { id: '6', name: 'Pinarello', price: 1350, image: require('../assets/images/bike-2.png'), category: 'Mountain' },
        ];
        setBikes(mockData);
    }, []);

    if (!fontsLoaded) {
        return null; // or a loading indicator
    }

    const filteredBikes = selectedCategory === 'All' ? bikes : bikes.filter(bike => bike.category === selectedCategory);

    const renderBikeItem = ({ item }) => (
        <View style={styles.bikeItem}>
            <TouchableOpacity style={styles.heartIcon}>
                <AntDesign name="heart" size={25} color="#E8D9D9" style={styles.heartIcon} />
            </TouchableOpacity>
            <Image source={item.image} style={styles.bikeImage} />
            <Text style={styles.bikeName}>{item.name}</Text>
            <Text style={styles.bikePrice}>
                <Text style={styles.currencySymbol}>$</Text>
                {item.price}
            </Text>
        </View>
    );

    const renderCategoryButton = (category) => (
        <TouchableOpacity
            style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}
        >
            <Text
                style={[
                    styles.categoryButtonText,
                    selectedCategory === category && styles.selectedCategoryButtonText,
                ]}
            >
                {category}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>The world's Best Bike</Text>
            <View style={styles.categoryContainer}>
                {renderCategoryButton('All')}
                {renderCategoryButton('Roadbike')}
                {renderCategoryButton('Mountain')}
            </View>
            <FlatList
                data={filteredBikes}
                renderItem={renderBikeItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.bikeList}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 15,
    },
    title: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 24,
        lineHeight: 33,
        color: '#E94141',
        marginTop: 20,
        marginBottom: 30,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    categoryButton: {
        width: 100,
        height: 32,
        lineHeight: 32,
        borderWidth: 1,
        borderColor: 'rgba(233, 65, 65, 0.53)',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    selectedCategoryButton: {
        backgroundColor: 'rgba(233, 65, 65, 0.1)',
    },
    categoryButtonText: {
        fontFamily: 'Voltaire-Regular',
        fontSize: 20,
        color: '#BEB6B6',
        textAlign: 'center',
        lineHeight: 22,
    },
    selectedCategoryButtonText: {
        color: '#E94141',
        textAlign: 'center',
    },
    bikeList: {
        justifyContent: 'space-between',
    },
    bikeItem: {
        width: '48%',
        height: 200,
        backgroundColor: 'rgba(247, 186, 131, 0.15)',
        borderRadius: 10,
        marginBottom: 15,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    bikeImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    bikeName: {
        fontFamily: 'Voltaire-Regular',
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.6)',
    },
    bikePrice: {
        fontFamily: 'Voltaire-Regular',
        fontSize: 20,
        color: '#000000',
    },
    currencySymbol: {
        color: '#F7BA83',
    },
});

export default BikeShop;