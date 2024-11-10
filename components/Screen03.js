import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

// Mock Data
const mockData = [
    {
        id: '1',
        name: 'Pina Mountain',
        image: require('../assets/images/bike-1.png'),
        originalPrice: 449,
        discountedPrice: 350,
        discount: '15% OFF',
        description: 'It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.',
    },
];

// Render Data Product Item
const ProductItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.bgItem}>
                <Image source={item.image} style={styles.productImage} resizeMode="contain" />
            </View>
            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.discountedPrice}>
                    {item.discount} | ${item.discountedPrice}
                </Text>
                <Text style={styles.originalPrice}>
                    ${item.originalPrice}
                </Text>
            </View>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
            <TouchableOpacity style={styles.heartIcon}>
                <AntDesign name='hearto' size={24} color="black" borderColor="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addToCartButton}>
                <Text style={styles.addToCartText}>Add to cart</Text>
            </TouchableOpacity>
        </View>
    );
};

// Component: Product Page
const ProductPage = () => {
    const [fontsLoaded] = useFonts({
        'Voltaire': require('../assets/fonts/Voltaire-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <FlatList
            data={mockData}
            renderItem={({ item }) => <ProductItem item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.pageContainer}
        />
    );
};

// CSS StyleSheet
const styles = StyleSheet.create({
    pageContainer: {
        flexGrow: 1,
        paddingHorizontal: 16,
        backgroundColor: '#FFF',
    },
    container: {
        flex: 1,
        marginVertical: 10,
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
    bgItem: {
        flex: 1,
        backgroundColor: 'rgba(233, 65, 65, 0.1)',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    productImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 1.5, // Điều chỉnh tỷ lệ để hiển thị đầy đủ hình ảnh
    },
    productName: {
        fontFamily: 'Voltaire',
        fontSize: 28,
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    discountedPrice: {
        fontFamily: 'Voltaire',
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.59)',
    },
    originalPrice: {
        fontFamily: 'Voltaire',
        fontSize: 20,
        textDecorationLine: 'line-through',
        color: '#000',
    },
    descriptionTitle: {
        fontFamily: 'Voltaire',
        fontSize: 18,
        color: '#000',
        marginBottom: 6,
    },
    descriptionText: {
        fontFamily: 'Voltaire',
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.57)',
        marginBottom: 10,
    },
    heartIcon: {
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    addToCartButton: {
        backgroundColor: '#E94141',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
    },
    addToCartText: {
        fontFamily: 'Voltaire',
        fontSize: 18,
        color: '#FFFAFA',
    },
});

export default ProductPage;
