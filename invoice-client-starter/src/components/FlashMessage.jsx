import PropTypes from "prop-types";

export function FlashMessage({theme, text}) {
    return <div className={"alert alert-" + theme}>{text}</div>;
}

FlashMessage.propTypes = {
    theme: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default FlashMessage;
