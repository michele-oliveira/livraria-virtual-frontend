import PropTypes from "prop-types";

const List = ({ data, component, emptyComponent }) => {
  if (data.length) {
    return component;
  } else {
    return emptyComponent;
  }
};

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  component: PropTypes.node.isRequired,
  emptyComponent: PropTypes.node.isRequired,
};

export default List;
