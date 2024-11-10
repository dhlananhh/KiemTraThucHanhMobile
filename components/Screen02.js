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
import { useSelector, useDispatch } from 'react-redux';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { fetchBikes, setSelectedCategory } from '../store/bikesSlice';
import AddBikeModal from './AddBikeModal';

const BikeShop = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();
    const { items, status, error, selectedCategory } = useSelector(state => state.bikes);

    const [fontsLoaded] = useFonts({
        'Ubuntu-Bold': require('../assets/fonts/Ubuntu-Bold.ttf'),
        'Voltaire-Regular': require('../assets/fonts/Voltaire-Regular.ttf'),
    });

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBikes());
        }
    }, [status, dispatch]);

    const filteredBikes = selectedCategory === 'All' 
        ? items 
        : items.filter(bike => bike.category === selectedCategory);

    if (!fontsLoaded) {
        return null;
    }

    if (status === 'loading') {
        return <Text>Loading...</Text>;
    }

    if (status === 'failed') {
        return <Text>Error: {error}</Text>;
    }

    const renderBikeItem = ({ item }) => (
        <View style={styles.bikeItem}>
            <TouchableOpacity style={styles.heartIcon}>
                <AntDesign name="heart" size={25} color="#E8D9D9" style={styles.heartIcon} />
            </TouchableOpacity>
            <Image 
                source={{ uri: item.image }} 
                style={styles.bikeImage} 
                defaultSource={require('../assets/images/bike-1.png')}
            />
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
            onPress={() => dispatch(setSelectedCategory(category))}
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
            
            <TouchableOpacity 
                style={styles.btnAddNewBike}
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={styles.addNewBikeText}>Add New Bike</Text>
            </TouchableOpacity>

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

            <AddBikeModal 
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            />
        </SafeAreaView>
    );
};

// Styles remain the same as in your original file



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 15,
        // flexDirection: 'column',
    },
    btnAddNewBike: {
        width: 150,
        height: 40,
        backgroundColor: '#E94141',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    addNewBikeText: {
        fontFamily: 'Voltaire-Regular',
        fontSize: 20,
        color: '#FFFFFF',
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