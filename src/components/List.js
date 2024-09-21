import PropTypes from "prop-types";

const List = ({ data, component, emptyComponent }) => {
  if (data.length) {
    return component;
  } else {
    return emptyComponent;
  }
};

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  component: PropTypes.node,
  emptyComponent: PropTypes.node,
};

export default List;
