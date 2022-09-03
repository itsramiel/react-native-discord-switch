import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Toggle from "./components/Toggle";
import { COLORS } from "./constants";

export default function App() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <View style={styles.container}>
      <Toggle
        toggled={isToggled}
        onPress={() => setIsToggled((prev) => !prev)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_DARK,
    alignItems: "center",
    justifyContent: "center",
  },
});
