import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Modalize } from 'react-native-modalize';

import styles from "./styles";

const CustomModalize = (props) => {
  const {
    data,
    isLoading,
    renderItem,
    alwaysOpen,
    modalTopOffset,
    modalizeRef,
    footerComponent,
    onClosed,
    onOpened,
  } = props;

  const renderListEmptyComponent = () => {
    return (
      <View style={{ ...styles.emptyComponentContainer }}>
        {isLoading && (<ActivityIndicator color={'#4DE528'} size="small" />)}
        <Text style={{ ...styles.emptyComponentText }}>{isLoading ? 'Loading, please wait.' : 'No record found.'}</Text>
      </View>
    )
  };

  return (
    <Modalize
      ref={modalizeRef ? modalizeRef : null}
      modalStyle={{ ...styles.modalStyle }}
      handleStyle={{ ...styles.handleStyle }}
      overlayStyle={{ ...styles.overlayStyle }}
      handlePosition={'inside'}
      alwaysOpen={alwaysOpen}
      adjustToContentHeight={false}
      modalTopOffset={modalTopOffset}
      onClosed={onClosed}
      onOpened={onOpened}
      FooterComponent={footerComponent ? footerComponent : null}
      flatListProps={{
        data: data,
        ListEmptyComponent: renderListEmptyComponent,
        renderItem: renderItem,
        keyExtractor: item => item.id,
        showsVerticalScrollIndicator: false,
      }}
    />
  )
};

CustomModalize.defaultProps = {
  data: [],
  isLoading: false,
  alwaysOpen: 0,
  modalTopOffset: 0,
};

CustomModalize.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  renderItem: PropTypes.node.isRequired,
  footerComponent: PropTypes.node,
  alwaysOpen: PropTypes.number,
  modalTopOffset: PropTypes.number,
  modalizeRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  onClosed: PropTypes.func,
  onOpened: PropTypes.func,
};

export default CustomModalize;
