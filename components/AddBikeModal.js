import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addBike } from '../store/bikesSlice';

const AddBikeModal = ({ visible, onClose }) => {
    const dispatch = useDispatch();
    const [newBike, setNewBike] = useState({
        name: '',
        price: '',
        category: '',
        image: 'https://example.com/placeholder.jpg', // Default image URL
    });

    const handleSubmit = () => {
        dispatch(addBike({
            ...newBike,
            price: Number(newBike.price)
        }));
        onClose();
        setNewBike({ name: '', price: '', category: '', image: '' });
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add New Bike</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Bike Name"
                        value={newBike.name}
                        onChangeText={(text) => setNewBike({ ...newBike, name: text })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Price"
                        value={newBike.price}
                        onChangeText={(text) => setNewBike({ ...newBike, price: text })}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Category (Mountain/Roadbike)"
                        value={newBike.category}
                        onChangeText={(text) => setNewBike({ ...newBike, category: text })}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Add Bike</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    submitButton: {
        backgroundColor: '#E94141',
        padding: 10,
        borderRadius: 5,
        width: '45%',
    },
    cancelButton: {
        backgroundColor: '#666',
        padding: 10,
        borderRadius: 5,
        width: '45%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default AddBikeModal;