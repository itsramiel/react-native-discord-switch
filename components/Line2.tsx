import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SIZE, THEME } from "../constants";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

const START_LINE_LENGTH = SIZE.THUMB_HEIGHT - 2 * SIZE.PADDING;
const MIDDLE_LINE_LENGTH = SIZE.THUMB_HEIGHT - 2 * SIZE.PADDING;
const FINAL_LINE_LENGTH = (SIZE.THUMB_HEIGHT - 2 * SIZE.PADDING) * 0.7;

const LINE_THICKNESS = 2;

const START_ROTATION = 45;
const MIDDLE_ROTATION = 90;
const FINAL_ROTATION = 45;
interface Line2Props {
  animated: Animated.SharedValue<0 | 1>;
}

const Line2 = ({ animated }: Line2Props) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      backgroundColor: interpolateColor(
        animated.value,
        [0, 1],
        [THEME.INACTIVE_COLOR, THEME.ACTIVE_COLOR]
      ),
      height: interpolate(
        animated.value,
        [0, 0.5, 1],
        [START_LINE_LENGTH, MIDDLE_LINE_LENGTH, FINAL_LINE_LENGTH]
      ),
      width: interpolate(
        animated.value,
        [0, 0.5, 1],
        [LINE_THICKNESS, LINE_THICKNESS - 1, LINE_THICKNESS]
      ),
      transform: [
        {
          translateY: interpolate(
            animated.value,
            [0, 0.5, 1],
            [0, 0, FINAL_LINE_LENGTH * 0.5]
          ),
        },
        {
          rotate: `${interpolate(
            animated.value,
            [0, 0.5, 1],
            [START_ROTATION, MIDDLE_ROTATION, FINAL_ROTATION]
          )}deg`,
        },
        {
          translateY: interpolate(
            animated.value,
            [0, 0.5, 1],
            [0, 0, -FINAL_LINE_LENGTH * 0.5]
          ),
        },
      ],
    };
  }, []);

  return <Animated.View style={rStyle} />;
};

export default Line2;

const styles = StyleSheet.create({});
