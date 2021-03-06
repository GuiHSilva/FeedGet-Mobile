import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import successImg from '../../assets/success.png'

import { styles } from './styles';

interface Props {
  onFeedbackHasSent: () => void
}

export function Success({ onFeedbackHasSent }: Props) {
  return (
    <View style={styles.container}>
        <Image source={successImg} style={styles.image}/>

        <Text style={styles.title}>
            Agradecemos o feedback
        </Text>

        <TouchableOpacity style={styles.button} onPress={onFeedbackHasSent}>
            <Text style={styles.buttonTitle}>Quero enviar outro</Text>
        </TouchableOpacity>

    </View>
  );
}