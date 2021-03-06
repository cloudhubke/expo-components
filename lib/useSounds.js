import React from 'react';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import Sounds from './theme/Sounds';

const useSounds = () => {
  const playInquisitiveNotification = async () => {
    try {
      const { sound: soundObject, status } = await Audio.Sound.createAsync(
        Sounds.Inquisitive,
        {
          shouldPlay: true,
        }
      );
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  };

  const playInboxNotification = async () => {
    try {
      const { sound: soundObject, status } = await Audio.Sound.createAsync(
        Sounds.Inbox,
        { shouldPlay: true }
      );
    } catch (error) {
      // An error occurred!
    }
  };

  const playFallingInPlaceNotification = async () => {
    try {
      const { sound: soundObject, status } = await Audio.Sound.createAsync(
        // require('../../assets/sounds/birdroid.mp3'),
        Sounds.FallingInPlace,
        { shouldPlay: true }
      );
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  };

  return {
    playInquisitiveNotification,
    playInboxNotification,
    playFallingInPlaceNotification,
  };
};

export default useSounds;
