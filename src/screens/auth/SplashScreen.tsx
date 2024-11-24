import React, { useEffect } from 'react';
import { View, Dimensions, Image, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  Easing,
  withDelay,
} from 'react-native-reanimated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

const { width, height } = Dimensions.get('window');

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
  route: {
    params: {
      onSplashComplete: () => void;
    };
  };
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation, route }) => {
  // Animation values
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const logoRotate = useSharedValue(0);
  const circleScale = useSharedValue(0);
  
  useEffect(() => {
    // Start animations
    const startAnimations = () => {
      logoScale.value = withSpring(1, {
        damping: 15,
        stiffness: 100,
      });
      
      logoOpacity.value = withTiming(1, {
        duration: 1000,
        easing: Easing.ease,
      });
      
      logoRotate.value = withSequence(
        withTiming(360, {
          duration: 1000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
        withTiming(0, { duration: 0 })
      );
      
      circleScale.value = withDelay(
        500,
        withSpring(1, {
          damping: 12,
          stiffness: 80,
        })
      );
    };

    // Exit animations
    const exitAnimations = () => {
      logoScale.value = withTiming(1.2, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
      
      logoOpacity.value = withDelay(
        500,
        withTiming(0, {
          duration: 500,
          easing: Easing.ease,
        })
      );
      
      circleScale.value = withDelay(
        300,
        withTiming(1.5, {
          duration: 500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
      );
    };

    // Animation sequence
    startAnimations();

    const timer = setTimeout(() => {
      exitAnimations();
      
      // Notify parent about completion and navigate
      setTimeout(() => {
        route.params.onSplashComplete();
      }, 1500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [logoScale, logoOpacity, logoRotate, circleScale, navigation, route.params]);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      // { rotate: `${logoRotate.value}deg` },
    ],
    opacity: logoOpacity.value,
  }));

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
    opacity: withTiming(circleScale.value ? 0.2 : 0, { duration: 500 }),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circleContainer, circleStyle]}>
        <View style={styles.circle} />
      </Animated.View>
      
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <Image
          source={require('../../../assets/Img/dice-logo3.png')}
          style={styles.logo}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: 'contain',
  },
  circleContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: '#1A659E',
  },
});

export default SplashScreen;