import { Pressable, PressableProps, StyleSheet } from "react-native";
import React, { ComponentProps, useEffect } from "react";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Thumb from "./Thumb";
import { SIZE, THEME } from "../constants";

const { CONTAINER_WIDTH, CONTAINER_HEIGHT, CONTANER_BR, PADDING } = SIZE;
const { INACTIVE_COLOR, ACTIVE_COLOR } = THEME;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ToggleProps
  extends Omit<ComponentProps<typeof AnimatedPressable>, "key"> {
  toggled: boolean;
}

const Toggle = ({ toggled, ...props }: ToggleProps) => {
  const animated = useSharedValue<0 | 1>(0);

  useEffect(() => {
    if (toggled === true) {
      animated.value = withTiming(1, {
        easing: Easing.inOut(Easing.sin),
        duration: 1000,
      });
    } else {
      animated.value = withTiming(0, {
        easing: Easing.inOut(Easing.sin),
        duration: 1000,
      });
    }
  }, [toggled]);

  const rStyle = useAnimatedStyle(() => {
    return {
      width: CONTAINER_WIDTH,
      height: CONTAINER_HEIGHT,
      backgroundColor: interpolateColor(
        animated.value,
        [0, 1],
        [INACTIVE_COLOR, ACTIVE_COLOR]
      ),
      borderRadius: CONTANER_BR,
      padding: PADDING,
    };
  }, []);

  return (
    <AnimatedPressable {...props} style={rStyle}>
      <Thumb animated={animated} />
    </AnimatedPressable>
  );
};

export default Toggle;

const styles = StyleSheet.create({});
