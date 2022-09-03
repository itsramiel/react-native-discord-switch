import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZE } from "../constants";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const LINE_LENGTH = SIZE.THUMB_HEIGHT - 2 * SIZE.PADDING;
const LINE_THICKNESS = 5;
const START_TRANSLATION_X =
  SIZE.THUMB_START_WIDTH / 2 - SIZE.PADDING - LINE_THICKNESS / 2;
const START_ROTATION = 45;

const MIDDLE_TRANSLATION_X =
  SIZE.THUMB_START_WIDTH / 2 - SIZE.PADDING - LINE_THICKNESS / 2;
const MIDDLE_ROTATION = 90;

interface Line2Props {
  animated: Animated.SharedValue<0 | 1>;
}

const Line2 = ({ animated }: Line2Props) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: SIZE.PADDING,
      left: SIZE.PADDING,
      height: LINE_LENGTH,
      width: LINE_THICKNESS,
      backgroundColor: COLORS.GRAY_LIGHT,
      transform: [
        {
          translateX: interpolate(
            animated.value,
            [0, 1],
            [START_TRANSLATION_X, MIDDLE_TRANSLATION_X]
          ),
        },
        {
          rotate: `${interpolate(
            animated.value,
            [0, 1],
            [START_ROTATION, MIDDLE_ROTATION]
          )}deg`,
        },
      ],
    };
  }, []);

  return <Animated.View style={rStyle} />;
};

export default Line2;

const styles = StyleSheet.create({});
