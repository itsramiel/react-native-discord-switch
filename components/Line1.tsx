import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZE } from "../constants";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const START_LINE_LENGTH = SIZE.THUMB_HEIGHT - 2 * SIZE.PADDING;
const MIDDLE_LINE_LENGTH = SIZE.THUMB_HEIGHT - 2 * SIZE.PADDING;
const FINAL_LINE_LENGTH = (SIZE.THUMB_HEIGHT - 2 * SIZE.PADDING) * 0.5;
const LINE_THICKNESS = 5;
const START_ROTATION = -45;
const MIDDLE_ROTATION = -90;
const FINAL_ROTATION = -45;

interface Line1Props {
  animated: Animated.SharedValue<0 | 1>;
}

const Line1 = ({ animated }: Line1Props) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      height: interpolate(
        animated.value,
        [0, 0.5, 1],
        [START_LINE_LENGTH, MIDDLE_LINE_LENGTH, FINAL_LINE_LENGTH]
      ),
      width: LINE_THICKNESS,
      backgroundColor: COLORS.GRAY_LIGHT,
      transform: [
        {
          rotate: `${interpolate(
            animated.value,
            [0, 0.5, 1],
            [START_ROTATION, MIDDLE_ROTATION, FINAL_ROTATION]
          )}deg`,
        },
      ],
    };
  }, []);

  return <Animated.View style={rStyle} />;
};

export default Line1;

const styles = StyleSheet.create({});
