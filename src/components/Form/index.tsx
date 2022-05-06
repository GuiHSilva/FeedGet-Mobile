import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft, CodesandboxLogo } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system'

import { styles } from './styles';
import { theme } from '../../theme';

import { FeedbackType } from '../../components/Widget' 
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { api } from '../../libs/api';

interface Props { 
    feedbackType: FeedbackType, 
    onReturnIsCalled: () => void,
    onFeedbackHasSent: () => void
}

export function Form({ feedbackType, onReturnIsCalled, onFeedbackHasSent }: Props) {

  const [isSendingFeedback, setIsSendingFeedback] = useState(false)
  const [screenshot, setScreeshot] = useState<string | null>(null)
  const [comment, setComment] = useState<String>('')

  function handleScreenshot() {  
    captureScreen({
        format: 'jpg',
        quality: 0.8,
    })
    .then(url => setScreeshot(url))
    .catch(e => console.log(e))
    console.log("screenshot capturada: ", screenshot)
  }

  function handleScreenshotRemove() {
    setScreeshot(null)
  }

  async function handleSendFeedback() {   
    if ( isSendingFeedback ) return

    setIsSendingFeedback(true)
    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })
 
    try {
        
        await api.post('/feedback', {
            type: feedbackType,
            screenshot: `data:image/png;base64, ${screenshotBase64}`, 
            message: comment
        }).catch(e=> { console.error(e)})

        onFeedbackHasSent() 
        setIsSendingFeedback(false)

    } catch (error) {
        console.log(error)
        setIsSendingFeedback(false)
    }
  } 

  const feedbackTypeInfo = feedbackTypes[feedbackType]
 
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onReturnIsCalled}>
                {/* <ArrowLeft size={24} weight={'bold'} color={theme.colors.text_secondary}/> TA CRASHANDO*/}
                <Text style={{ color: theme.colors.text_secondary }}>
                    ←
                </Text>
            </TouchableOpacity>



            <View style={styles.titleContainer}>

                <Image source={feedbackTypeInfo.image} style={styles.image}/>

                <Text style={styles.titleText}>
                    { feedbackTypeInfo.title }
                </Text>

            </View>

        </View>

        <TextInput  
            style={styles.input}
            multiline   
            placeholder={feedbackTypeInfo.description}
            placeholderTextColor={theme.colors.text_secondary}
            onChangeText={setComment}
        />

        <View style={styles.footer}>
            <ScreenshotButton
                onRemoveScreenshot={handleScreenshotRemove} 
                onTakeScreenshot={handleScreenshot}
                screenshot={screenshot} 
            />
            <Button isLoading={isSendingFeedback} onPress={handleSendFeedback}/>
        </View>

    </View>
  );
}