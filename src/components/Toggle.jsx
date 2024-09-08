import "./Toggle.scss";

export const Toggle = ({ text, checked, onChange }) => {
  return (
    <label className="toggle">
      <input
        className="toggle__checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <div className="toggle__switch"></div>
      <span className="toggle__label">{text}</span>
    </label>
  );
};
