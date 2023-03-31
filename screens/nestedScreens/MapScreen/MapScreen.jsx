import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import {styles} from './MapScreen.styled'

export default function MapScreen({ route }) {
  console.log("route.params.location:", route.params.location);

  const { latitude, longitude } = route.params.location;

  console.log("latitude", latitude);
  console.log("longitude", longitude);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        // style={styles.map}
      >
        <Marker
          title="I am here"
          coordinate={{ latitude, longitude }}
          description="Hello"
        />
      </MapView>
    </View>
  );
}