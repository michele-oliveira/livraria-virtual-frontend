import PropTypes from "prop-types";

const Item = ({
  data,
  component: Component,
  emptyComponent: EmptyComponent,
}) => {
  if (data && Object.keys(data).length) {
    return <Component />;
  } else {
    return <EmptyComponent />;
  }
};

Item.propTypes = {
  data: PropTypes.object,
  component: PropTypes.elementType.isRequired,
  emptyComponent: PropTypes.elementType.isRequired,
};

export default Item;
