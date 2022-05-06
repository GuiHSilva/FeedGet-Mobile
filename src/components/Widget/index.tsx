import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native'; 
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import { theme } from '../../theme';
import { styles } from './styles';

import { Options } from '../Options';
import { Form } from '../Form';

import { feedbackTypes } from '../../utils/feedbackTypes'
import { Success } from '../Success';

export type FeedbackType = keyof typeof feedbackTypes

function Widget() {

  const bottomSheetRef = useRef<BottomSheet>(null)
  const [ feedbackType, setFeedbackType ] = useState<FeedbackType | null>(null)
  const [ feedbackSent, setFeedbackSend ] = useState(false)

  function handleOpen( ) {

    bottomSheetRef.current?.expand()

  }

  function handleCancelFeedback() {
    setFeedbackType(null)
    setFeedbackSend(false)
  }

  function handleFeedbackSent() {
    setFeedbackSend(true)
  }

  return (
    <>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleOpen}
      > 
        <Text style={{ color: theme.colors.text_on_brand_color }}>BTN</Text>
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}  
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSent ? 
          <Success onFeedbackHasSent={handleCancelFeedback}/>
          :
          ( feedbackType ? 
              <Form 
                feedbackType={feedbackType} 
                onReturnIsCalled={handleCancelFeedback}
                onFeedbackHasSent={handleFeedbackSent}
              />
            :
              <Options onFeedbackTypeChanged={setFeedbackType}/>
          )
        }


        {/* <Options/> */}
        {/* <Form feedbackType='BUG'/> */}
        {/* <Success/> */}
      </BottomSheet>

    </>
  );
}

export default gestureHandlerRootHOC(Widget)