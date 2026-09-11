import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

// Componente de botão reutilizável, recebe título e ação via props.
export default function CustomButton({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}
