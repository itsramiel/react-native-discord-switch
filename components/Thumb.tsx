import { StyleSheet } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { COLORS, SIZE } from "../constants";
import Line1 from "./Line1";
import Line2 from "./Line2";

const {
  THUMB_START_WIDTH,
  THUMB_FINAL_WIDTH,
  THUMB_HEIGHT,
  THUMB_START_TRANSLATION,
  THUMB_FINAL_TRANSLATION,
  PADDING,
} = SIZE;
const { WHITE } = COLORS;

interface ThumbProps {
  animated: Animated.SharedValue<0 | 1>;
}

const Thumb = ({ animated }: ThumbProps) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      alignItems: "center",
      justifyContent: "center",
      width: interpolate(
        animated.value,
        [0, 0.5, 1],
        [THUMB_START_WIDTH, THUMB_FINAL_WIDTH, THUMB_START_WIDTH]
      ),
      height: THUMB_HEIGHT,
      borderRadius: THUMB_HEIGHT / 2,
      backgroundColor: WHITE,
      padding: PADDING,
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
    <Animated.View style={rStyle}>
      <Line1 animated={animated} />
      <Line2 animated={animated} />
    </Animated.View>
  );
};

export default Thumb;
