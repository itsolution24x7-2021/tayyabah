// @flow
import { StyleSheet } from "react-native";
import { Metrics, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTextStyle: {
    fontSize: Metrics.ratio(20),
    color: '#454F63',
    fontFamily: Fonts.type.MontserratBold,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: Metrics.ratio(15),
    marginHorizontal: Metrics.ratio(12),
    marginBottom: Metrics.ratio(12),
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardText: {
    padding: Metrics.ratio(12),
    fontSize: Metrics.ratio(12),
    color: '#000000',
    fontFamily: Fonts.type.MontserratRegular,
  },
});
