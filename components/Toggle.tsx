import { Pressable, PressableProps, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "../constants";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const CONTAINER_WIDTH = 74;
const CONTAINER_HEIGHT = CONTAINER_WIDTH * 0.55;
const CONTANER_BR = CONTAINER_HEIGHT;
const INACTIVE_COLOR = COLORS.GRAY_LIGHT;
const ACTIVE_COLOR = COLORS.RED;

const PADDING = 0.15 * CONTAINER_HEIGHT;

const THUMB_SIZE = CONTAINER_HEIGHT - PADDING * 2;
const THUMB_START_TRANSLATION = 0;
const THUMB_FINAL_TRANSLATION = CONTAINER_WIDTH - 2 * PADDING - THUMB_SIZE;

interface ToggleProps extends PressableProps {
  toggled: boolean;
}

const Toggle = ({ toggled, ...props }: ToggleProps) => {
  const animated = useSharedValue(0);

  useEffect(() => {
    if (toggled === true) {
      animated.value = withTiming(1);
    } else {
      animated.value = withTiming(0);
    }
  }, [toggled]);

  const rStyle = useAnimatedStyle(() => {
    return {
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      borderRadius: THUMB_SIZE / 2,
      backgroundColor: COLORS.WHITE,
      transform: [
        {
          translateX: interpolate(
            animated.value,
            [0, 1],
            [THUMB_START_TRANSLATION, THUMB_FINAL_TRANSLATION]
          ),
        },
      ],
    };
  }, [animated]);

  return (
    <Pressable
      {...props}
      style={{
        width: CONTAINER_WIDTH,
        height: CONTAINER_HEIGHT,
        backgroundColor: INACTIVE_COLOR,
        borderRadius: CONTANER_BR,
        padding: PADDING,
      }}
    >
      <Animated.View style={rStyle} />
    </Pressable>
  );
};

export default Toggle;

const styles = StyleSheet.create({});
