import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface Props { 
    screenshot?: string | null
    onTakeScreenshot: () => void    
    onRemoveScreenshot: () => void
}

export function ScreenshotButton({screenshot, onTakeScreenshot, onRemoveScreenshot}: Props) {
  return (
    <TouchableOpacity
        style={styles.container}
        onPress={screenshot ? onRemoveScreenshot : onTakeScreenshot}
    >
        {
            screenshot ? 

            <View>
                <Image source={{ uri: screenshot }} style={styles.image}/>
                <Text style={styles.removeIcon}>
                    R
                </Text>
            </View>

            :  
            
            <Text style={styles.removeIcon}>
                C 
            </Text>
        }
    </TouchableOpacity>
  );
}