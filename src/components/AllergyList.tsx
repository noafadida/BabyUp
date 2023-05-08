import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Allergies } from '../consts';
import { GlobalStyles } from '../consts/styles';
import { Ionicons } from '@expo/vector-icons';

const Checkbox = ({ label, checked, onChange }: any) => {
    return (
        <TouchableOpacity onPress={onChange} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: "flex-end" }} >
            <Text style={{ fontSize: 16, color: "#B7C4CF" }}>{label}</Text>
            <View
                style={{
                    width: 30,
                    height: 30,
                    margin: 4,
                    borderRadius: 8,
                    borderWidth: 1.5,
                    borderColor: '#B7C4CF',
                    marginRight: 5,
                    marginHorizontal: 15,
                    backgroundColor: checked ? 'white' : '#ECF2FF',
                }}
            >
                <View>
                    {checked ?
                        <Ionicons name="checkmark" size={24} color="#B7C4CF" /> : null}
                </View>
            </View>
        </TouchableOpacity>
    );
};

type Props = {
    onClose: () => void;
    toggleAllergy: (allergyId: string) => void;
    selectedAllergies: string[]
}

export default function AllergyList({ onClose, selectedAllergies, toggleAllergy }: Props) {

    const renderItem = ({ item }: any) => (
        <Checkbox
            label={item.name}
            checked={selectedAllergies.includes(item.id)}
            onChange={() => toggleAllergy(item.id)}
        />

    );

    return (
        <View style={styles.container}>
            <FlatList
                data={Allergies}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <Pressable onPress={onClose} style={styles.updateButton}>
                <Text style={[GlobalStyles.buttonLightTextStyle, { color: '#95BDFF' }]}>שמירה </Text>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '80%',
        backgroundColor: '#ECF2FF',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
    },
    updateButton: {
        alignSelf: "center",
        padding: 10,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 8
    }
})
